<?php

declare(strict_types=1);

final class MailTransportException extends RuntimeException
{
}

final class Mailer
{
    private array $config;

    public function __construct(array $config)
    {
        $this->config = $config;
    }

    public function send(array $message): void
    {
        $this->assertValidMessage($message);

        if (!empty($this->config['use_smtp'])) {
            $this->sendViaSmtp($message);
            return;
        }

        $this->sendViaMailFunction($message);
    }

    private function sendViaSmtp(array $message): void
    {
        $scheme = strtolower((string) ($this->config['smtp_secure'] ?? '')) === 'ssl' ? 'ssl://' : 'tcp://';
        $host = (string) ($this->config['smtp_host'] ?? '');
        $port = (int) ($this->config['smtp_port'] ?? 25);
        $endpoint = $scheme . $host . ':' . $port;

        $stream = @stream_socket_client($endpoint, $errorNumber, $errorMessage, 15);

        if (!$stream) {
            throw new MailTransportException('SMTP connection failed.');
        }

        stream_set_timeout($stream, 15);

        try {
            $this->readResponse($stream, [220]);
            $this->sendCommand($stream, 'EHLO ' . $this->getClientName(), [250]);

            if (strtolower((string) ($this->config['smtp_secure'] ?? '')) === 'tls') {
                $this->sendCommand($stream, 'STARTTLS', [220]);

                if (!stream_socket_enable_crypto($stream, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                    throw new MailTransportException('Unable to enable TLS.');
                }

                $this->sendCommand($stream, 'EHLO ' . $this->getClientName(), [250]);
            }

            $username = (string) ($this->config['smtp_username'] ?? '');
            if ($username !== '') {
                $this->sendCommand($stream, 'AUTH LOGIN', [334]);
                $this->sendCommand($stream, base64_encode($username), [334], true);
                $this->sendCommand($stream, base64_encode((string) ($this->config['smtp_password'] ?? '')), [235], true);
            }

            $this->sendCommand($stream, 'MAIL FROM:<' . $message['from_email'] . '>', [250]);
            $this->sendCommand($stream, 'RCPT TO:<' . $message['to_email'] . '>', [250, 251]);
            $this->sendCommand($stream, 'DATA', [354]);

            $rawMessage = $this->buildMimeMessage($message);
            fwrite($stream, $this->dotStuff($rawMessage) . "\r\n.\r\n");
            $this->readResponse($stream, [250]);
            $this->sendCommand($stream, 'QUIT', [221]);
        } finally {
            fclose($stream);
        }
    }

    private function sendViaMailFunction(array $message): void
    {
        $mimeMessage = $this->buildMimeMessage($message, false);
        [$headerBlock, $body] = explode("\r\n\r\n", $mimeMessage, 2);

        $result = @mail(
            $message['to_email'],
            $this->encodeHeader($message['subject']),
            $body,
            $headerBlock
        );

        if (!$result) {
            throw new MailTransportException('mail() delivery failed.');
        }
    }

    private function buildMimeMessage(array $message, bool $includeSubject = true): string
    {
        $boundary = 'b_' . bin2hex(random_bytes(12));
        $headers = [
            'Date: ' . gmdate('D, d M Y H:i:s O'),
            'From: ' . $this->formatAddress($message['from_email'], $message['from_name']),
            'To: ' . $this->formatAddress($message['to_email'], $message['to_name']),
            'Reply-To: ' . $this->formatAddress($message['reply_to_email'], $message['reply_to_name']),
            'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . $this->getClientName() . '>',
            'MIME-Version: 1.0',
            'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        ];

        if ($includeSubject) {
            array_splice($headers, 4, 0, 'Subject: ' . $this->encodeHeader($message['subject']));
        }

        $parts = [
            '--' . $boundary,
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            '',
            $message['text_body'],
            '--' . $boundary,
            'Content-Type: text/html; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            '',
            $message['html_body'],
            '--' . $boundary . '--',
            '',
        ];

        return implode("\r\n", array_merge($headers, [''], $parts));
    }

    private function assertValidMessage(array $message): void
    {
        $requiredAddressFields = ['from_email', 'to_email', 'reply_to_email'];

        foreach ($requiredAddressFields as $field) {
            if (!isset($message[$field]) || !filter_var((string) $message[$field], FILTER_VALIDATE_EMAIL)) {
                throw new MailTransportException('Invalid email address in outgoing message.');
            }
        }

        foreach (['from_name', 'to_name', 'reply_to_name', 'subject', 'html_body', 'text_body'] as $field) {
            if (!array_key_exists($field, $message)) {
                throw new MailTransportException('Outgoing message is incomplete.');
            }
        }
    }

    private function formatAddress(string $email, string $name): string
    {
        if ($name === '') {
            return '<' . $email . '>';
        }

        return $this->encodeHeader($name) . ' <' . $email . '>';
    }

    private function encodeHeader(string $value): string
    {
        return '=?UTF-8?B?' . base64_encode($value) . '?=';
    }

    private function dotStuff(string $message): string
    {
        return preg_replace('/(^|\r\n)\./', '$1..', $message) ?? $message;
    }

    private function sendCommand($stream, string $command, array $expectedCodes, bool $sensitive = false): void
    {
        if (fwrite($stream, $command . "\r\n") === false) {
            throw new MailTransportException('Unable to write SMTP command.');
        }

        $this->debug($sensitive ? 'SMTP command: [redacted]' : 'SMTP command: ' . $command);
        $this->readResponse($stream, $expectedCodes);
    }

    private function readResponse($stream, array $expectedCodes): void
    {
        $response = '';

        while (($line = fgets($stream, 515)) !== false) {
            $response .= $line;

            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }

        if ($response === '') {
            throw new MailTransportException('Empty SMTP response.');
        }

        $this->debug('SMTP response: ' . trim($response));
        $code = (int) substr($response, 0, 3);

        if (!in_array($code, $expectedCodes, true)) {
            throw new MailTransportException('Unexpected SMTP response.');
        }
    }

    private function getClientName(): string
    {
        $host = gethostname();

        if (is_string($host) && $host !== '') {
            return preg_replace('/[^A-Za-z0-9.-]/', '', $host) ?: 'localhost';
        }

        return 'localhost';
    }

    private function debug(string $message): void
    {
        if (empty($this->config['debug'])) {
            return;
        }

        error_log('[general-mail] ' . $message);
    }
}
