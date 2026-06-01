<?php

declare(strict_types=1);

require_once __DIR__ . '/Mailer.php';
require_once __DIR__ . '/templates/render.php';

ini_set('display_errors', '0');
ini_set('html_errors', '0');
error_reporting(E_ALL);

$config = load_mail_config();

if (!empty($config['timezone']) && is_string($config['timezone'])) {
    date_default_timezone_set($config['timezone']);
}

set_common_headers($config);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, [
        'ok' => false,
        'code' => 'SERVER_ERROR',
        'message' => 'Unexpected server error.',
    ]);
}

try {
    $ipAddress = get_request_ip();
    enforce_rate_limit($ipAddress);

    $formType = strtolower(trim((string) ($_POST['formType'] ?? '')));
    $definitions = get_form_definitions();

    if (!isset($definitions[$formType])) {
        json_response(422, [
            'ok' => false,
            'code' => 'VALIDATION_ERROR',
            'message' => 'Please review the highlighted fields.',
            'fields' => ['formType'],
        ]);
    }

    $sanitized = sanitize_form_payload($_POST, $definitions[$formType]['fields']);
    $sanitized['source_url'] = filter_source_url_against_allowed_origins(
        (string) ($sanitized['source_url'] ?? ''),
        $config
    );
    $validationErrors = validate_form_payload($formType, $sanitized);

    if ($validationErrors !== []) {
        json_response(422, [
            'ok' => false,
            'code' => 'VALIDATION_ERROR',
            'message' => 'Please review the highlighted fields.',
            'fields' => array_values(array_unique($validationErrors)),
        ]);
    }

    $antiSpamResult = run_spam_checks($sanitized);
    if (!$antiSpamResult['ok']) {
        json_response(422, [
            'ok' => false,
            'code' => 'SPAM_REJECTED',
            'message' => 'The request could not be submitted.',
        ]);
    }

    if (!has_valid_delivery_config($config)) {
        debug_log($config, 'Mail delivery configuration is incomplete or invalid.');
        json_response(503, [
            'ok' => false,
            'code' => 'MAIL_FAILED',
            'message' => 'The request could not be sent right now. Please try again later.',
        ]);
    }

    if (!can_deliver_from_current_environment($config)) {
        debug_log($config, 'Blocked delivery because localhost is not allowed to send to a non-local SMTP target.');
        json_response(503, [
            'ok' => false,
            'code' => 'MAIL_FAILED',
            'message' => 'The request could not be sent right now. Please try again later.',
        ]);
    }

    $requestId = generate_request_id((string) ($config['request_id_prefix'] ?? 'GEN'));
    $submittedAt = gmdate('c');
    $products = $formType === 'request_quote'
        ? json_decode((string) $sanitized['products_json'], true, 512, JSON_THROW_ON_ERROR)
        : [];

    $emailBodies = render_email_bodies([
        'anti_spam_status' => $antiSpamResult['status'],
        'form_data' => $sanitized,
        'form_type' => $formType,
        'products' => $products,
        'request_id' => $requestId,
        'source_path' => (string) ($sanitized['source_path'] ?? ''),
        'source_url' => (string) ($sanitized['source_url'] ?? ''),
        'submitted_at' => $submittedAt,
    ]);

    $subject = $formType === 'contact'
        ? 'Website contact request [' . $requestId . ']'
        : 'Website quote request [' . $requestId . ']';

    $mailer = new Mailer($config);
    $mailer->send([
        'from_email' => (string) $config['from_email'],
        'from_name' => (string) $config['from_name'],
        'html_body' => $emailBodies['html'],
        'reply_to_email' => (string) $sanitized['email'],
        'reply_to_name' => (string) $sanitized['fullName'],
        'subject' => $subject,
        'text_body' => $emailBodies['text'],
        'to_email' => (string) $config['recipient'],
        'to_name' => 'Website Forms Inbox',
    ]);

    json_response(200, [
        'ok' => true,
        'code' => 'MAIL_SENT',
        'message' => 'Your request was sent successfully.',
        'requestId' => $requestId,
    ]);
} catch (JsonException $exception) {
    debug_log($config, 'JSON validation failed: ' . $exception->getMessage());
    json_response(422, [
        'ok' => false,
        'code' => 'VALIDATION_ERROR',
        'message' => 'Please review the highlighted fields.',
        'fields' => ['products_json'],
    ]);
} catch (MailTransportException $exception) {
    debug_log($config, 'Mail transport failed: ' . $exception->getMessage());
    json_response(503, [
        'ok' => false,
        'code' => 'MAIL_FAILED',
        'message' => 'The request could not be sent right now. Please try again later.',
    ]);
} catch (Throwable $exception) {
    debug_log($config, 'Server error: ' . $exception->getMessage());
    json_response(500, [
        'ok' => false,
        'code' => 'SERVER_ERROR',
        'message' => 'Unexpected server error.',
    ]);
}

function load_mail_config(): array
{
    $exampleConfigPath = __DIR__ . '/config.example.php';
    $localConfigPath = __DIR__ . '/config.local.php';

    $exampleConfig = is_file($exampleConfigPath) ? require $exampleConfigPath : [];
    $localConfig = is_file($localConfigPath) ? require $localConfigPath : [];

    return array_replace($exampleConfig, $localConfig);
}

function set_common_headers(array $config): void
{
    header('Content-Type: application/json; charset=UTF-8');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');
    header('X-Content-Type-Options: nosniff');

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (is_allowed_origin((string) $origin, $config)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Accept');
    }
}

function is_allowed_origin(string $origin, array $config): bool
{
    if ($origin === '') {
        return false;
    }

    $normalizedOrigin = normalize_origin($origin);
    if ($normalizedOrigin === '') {
        return false;
    }

    $allowedOrigins = $config['allowed_origins'] ?? [];
    return is_array($allowedOrigins) && in_array($normalizedOrigin, normalize_allowed_origins($allowedOrigins), true);
}

function get_request_ip(): string
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    return preg_match('/^[A-Fa-f0-9:.]+$/', $ip) ? $ip : 'unknown';
}

function enforce_rate_limit(string $ipAddress): void
{
    $directory = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'general-form-rate-limit';
    if (!is_dir($directory) && !@mkdir($directory, 0775, true) && !is_dir($directory)) {
        return;
    }

    $file = $directory . DIRECTORY_SEPARATOR . sha1($ipAddress) . '.json';
    $now = time();
    $windowSeconds = 15 * 60;
    $maxRequests = 5;
    $minimumIntervalSeconds = 8;
    $timestamps = [];

    if (is_file($file)) {
        $decoded = json_decode((string) file_get_contents($file), true);
        if (is_array($decoded)) {
            $timestamps = array_values(array_filter(
                $decoded,
                static fn($timestamp): bool => is_int($timestamp) && $timestamp >= ($now - $windowSeconds)
            ));
        }
    }

    $lastTimestamp = end($timestamps);
    if (is_int($lastTimestamp) && ($now - $lastTimestamp) < $minimumIntervalSeconds) {
        json_response(422, [
            'ok' => false,
            'code' => 'SPAM_REJECTED',
            'message' => 'The request could not be submitted.',
        ]);
    }

    if (count($timestamps) >= $maxRequests) {
        json_response(429, [
            'ok' => false,
            'code' => 'SPAM_REJECTED',
            'message' => 'The request could not be submitted.',
        ]);
    }

    $timestamps[] = $now;
    file_put_contents($file, json_encode($timestamps, JSON_THROW_ON_ERROR), LOCK_EX);
}

function get_form_definitions(): array
{
    return [
        'contact' => [
            'fields' => [
                'formType',
                'fullName',
                'companyName',
                'email',
                'phone',
                'location',
                'inquiryType',
                'contactMethod',
                'timeline',
                'message',
                'consent',
                'company_website',
                'form_started_at',
                'source_path',
                'source_url',
            ],
        ],
        'request_quote' => [
            'fields' => [
                'formType',
                'fullName',
                'companyName',
                'companyRole',
                'vatNumber',
                'email',
                'phone',
                'location',
                'inquiryType',
                'contactMethod',
                'timeline',
                'deliveryPreference',
                'message',
                'consent',
                'products_json',
                'company_website',
                'form_started_at',
                'source_path',
                'source_url',
            ],
        ],
    ];
}

function sanitize_form_payload(array $input, array $allowedFields): array
{
    $payload = [];

    foreach ($allowedFields as $field) {
        $value = $input[$field] ?? '';

        if ($field === 'consent') {
            $payload[$field] = normalize_checkbox($value);
            continue;
        }

        if ($field === 'products_json') {
            $payload[$field] = trim((string) $value);
            continue;
        }

        if ($field === 'source_url') {
            $payload[$field] = sanitize_source_url((string) $value);
            continue;
        }

        if ($field === 'source_path') {
            $payload[$field] = sanitize_source_path((string) $value);
            continue;
        }

        $payload[$field] = sanitize_text((string) $value);
    }

    return $payload;
}

function normalize_checkbox($value): bool
{
    if (is_array($value)) {
        return false;
    }

    return in_array(strtolower(trim((string) $value)), ['1', 'true', 'on', 'yes'], true);
}

function sanitize_text(string $value): string
{
    $value = trim($value);
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = strip_tags($value);

    return preg_replace('/[^\P{C}\n\t]/u', '', $value) ?? '';
}

function sanitize_source_path(string $value): string
{
    $value = trim($value);
    if ($value === '') {
        return '';
    }

    $value = preg_replace('/[^A-Za-z0-9\-._~\/?=&%]/', '', $value) ?? '';

    if ($value === '') {
        return '';
    }

    return str_starts_with($value, '/') ? $value : '/' . ltrim($value, '/');
}

function sanitize_source_url(string $value): string
{
    $value = trim($value);
    if ($value === '') {
        return '';
    }

    $parts = parse_url($value);
    if (!is_array($parts)) {
        return '';
    }

    $scheme = strtolower((string) ($parts['scheme'] ?? ''));
    if (!in_array($scheme, ['http', 'https'], true)) {
        return '';
    }

    $host = preg_replace('/[^A-Za-z0-9.-]/', '', (string) ($parts['host'] ?? ''));
    if ($host === '') {
        return '';
    }

    $path = sanitize_source_path((string) ($parts['path'] ?? '/'));
    $query = preg_replace('/[^A-Za-z0-9\-._~=&%]/', '', (string) ($parts['query'] ?? '')) ?? '';
    $port = isset($parts['port']) ? ':' . (int) $parts['port'] : '';

    return $scheme . '://' . $host . $port . $path . ($query !== '' ? '?' . $query : '');
}

function filter_source_url_against_allowed_origins(string $value, array $config): string
{
    if ($value === '') {
        return '';
    }

    $parts = parse_url($value);
    if (!is_array($parts)) {
        return '';
    }

    $candidateOrigin = normalize_origin(build_origin_from_parts($parts));
    if ($candidateOrigin === '' || !is_allowed_origin($candidateOrigin, $config)) {
        return '';
    }

    $requestOrigin = normalize_origin((string) ($_SERVER['HTTP_ORIGIN'] ?? ''));
    if ($requestOrigin !== '' && $candidateOrigin !== $requestOrigin) {
        return '';
    }

    return $value;
}

function validate_form_payload(string $formType, array $payload): array
{
    $errors = [];
    $requiredFields = ['fullName', 'companyName', 'email', 'phone', 'location', 'inquiryType', 'contactMethod', 'timeline', 'message', 'form_started_at'];

    foreach ($requiredFields as $field) {
        if (($payload[$field] ?? '') === '') {
            $errors[] = $field;
        }
    }

    if (string_length((string) ($payload['fullName'] ?? '')) < 2) {
        $errors[] = 'fullName';
    }

    if (!filter_var((string) ($payload['email'] ?? ''), FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'email';
    }

    if (string_length((string) ($payload['message'] ?? '')) < 10) {
        $errors[] = 'message';
    }

    if (empty($payload['consent'])) {
        $errors[] = 'consent';
    }

    $formStartedAt = strtotime((string) ($payload['form_started_at'] ?? ''));
    if ($formStartedAt === false) {
        $errors[] = 'form_started_at';
    } else {
        $ageSeconds = time() - $formStartedAt;
        if ($ageSeconds < 0 || $ageSeconds > 86400) {
            $errors[] = 'form_started_at';
        }
    }

    if ($formType === 'request_quote') {
        $productsJson = (string) ($payload['products_json'] ?? '');

        if ($productsJson === '') {
            $errors[] = 'products_json';
        } else {
            try {
                $products = json_decode($productsJson, true, 512, JSON_THROW_ON_ERROR);
            } catch (JsonException) {
                $errors[] = 'products_json';
                $products = [];
            }

            if (is_array($products)) {
                foreach ($products as $product) {
                    if (!is_array($product)) {
                        $errors[] = 'products_json';
                        break;
                    }

                    $quantity = $product['quantity'] ?? null;
                    if (!is_numeric($quantity) || (int) $quantity < 1) {
                        $errors[] = 'products_json';
                        break;
                    }
                }
            } else {
                $errors[] = 'products_json';
            }
        }
    }

    return array_values(array_unique($errors));
}

function run_spam_checks(array $payload): array
{
    if ((string) ($payload['company_website'] ?? '') !== '') {
        return ['ok' => false, 'status' => 'Rejected: honeypot field was filled'];
    }

    $formStartedAt = strtotime((string) ($payload['form_started_at'] ?? ''));

    if ($formStartedAt !== false && (time() - $formStartedAt) < 2) {
        return ['ok' => false, 'status' => 'Rejected: submitted too quickly'];
    }

    $message = (string) ($payload['message'] ?? '');
    if (preg_match_all('/https?:\/\//i', $message) > 5) {
        return ['ok' => false, 'status' => 'Rejected: too many links'];
    }

    return ['ok' => true, 'status' => 'Passed local checks'];
}

function can_deliver_from_current_environment(array $config): bool
{
    $environment = strtolower((string) ($config['mail_env'] ?? 'local'));
    if ($environment !== 'local') {
        return true;
    }

    if (!empty($config['allow_live_delivery_from_localhost'])) {
        return true;
    }

    if (empty($config['use_smtp'])) {
        return false;
    }

    $host = strtolower((string) ($config['smtp_host'] ?? ''));
    return in_array($host, ['127.0.0.1', 'localhost', 'mailpit', 'mailhog'], true);
}

function has_valid_delivery_config(array $config): bool
{
    $fromEmail = (string) ($config['from_email'] ?? '');
    $fromName = trim((string) ($config['from_name'] ?? ''));
    $recipient = (string) ($config['recipient'] ?? '');

    if (!filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
        return false;
    }

    if ($fromName === '') {
        return false;
    }

    if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
        return false;
    }

    if (empty($config['use_smtp'])) {
        return true;
    }

    $smtpHost = trim((string) ($config['smtp_host'] ?? ''));
    $smtpPort = (int) ($config['smtp_port'] ?? 0);
    $smtpSecure = strtolower(trim((string) ($config['smtp_secure'] ?? '')));

    if ($smtpHost === '' || $smtpPort < 1) {
        return false;
    }

    return in_array($smtpSecure, ['', 'ssl', 'tls'], true);
}

function generate_request_id(string $prefix): string
{
    $safePrefix = preg_replace('/[^A-Za-z0-9]/', '', strtoupper($prefix)) ?: 'GEN';
    return $safePrefix . '-' . gmdate('Ymd-His') . '-' . strtoupper(bin2hex(random_bytes(3)));
}

function debug_log(array $config, string $message): void
{
    if (empty($config['debug'])) {
        return;
    }

    error_log('[general-mail] ' . $message);
}

function normalize_allowed_origins(array $origins): array
{
    $normalized = [];

    foreach ($origins as $origin) {
        if (!is_string($origin)) {
            continue;
        }

        $value = normalize_origin($origin);
        if ($value !== '') {
            $normalized[] = $value;
        }
    }

    return array_values(array_unique($normalized));
}

function normalize_origin(string $origin): string
{
    $origin = trim($origin);
    if ($origin === '') {
        return '';
    }

    $parts = parse_url($origin);
    if (!is_array($parts)) {
        return '';
    }

    return build_origin_from_parts($parts);
}

function build_origin_from_parts(array $parts): string
{
    $scheme = strtolower((string) ($parts['scheme'] ?? ''));
    $host = strtolower((string) ($parts['host'] ?? ''));

    if (!in_array($scheme, ['http', 'https'], true) || $host === '') {
        return '';
    }

    $port = isset($parts['port']) ? ':' . (int) $parts['port'] : '';

    return $scheme . '://' . $host . $port;
}

function string_length(string $value): int
{
    if (function_exists('mb_strlen')) {
        return mb_strlen($value);
    }

    return strlen($value);
}

function json_response(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}
