<?php

declare(strict_types=1);

function render_email_bodies(array $context): array
{
    $formData = is_array($context['form_data'] ?? null) ? $context['form_data'] : [];
    $products = is_array($context['products'] ?? null) ? $context['products'] : [];
    $formType = (string) ($context['form_type'] ?? '');

    $summaryRows = build_summary_rows($context, $formData, $products);
    $contactRows = build_contact_rows($formType, $formData);

    $html = '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Website form</title></head><body style="margin:0;padding:24px;background:#f5f4ef;color:#1f2937;font:14px/1.6 Arial,sans-serif;">';
    $html .= '<div style="max-width:1100px;margin:0 auto;background:#ffffff;border:1px solid #d9d6cf;padding:24px;">';
    $html .= '<h1 style="margin:0 0 16px;color:#111827;font-size:24px;">Website form submission</h1>';
    $html .= render_html_table('Submission summary', $summaryRows);
    $html .= render_html_table('Buyer / contact details', $contactRows);
    $html .= '<h2 style="margin:24px 0 8px;color:#111827;font-size:18px;">Message</h2>';
    $html .= '<div style="border:1px solid #d9d6cf;background:#faf9f6;padding:16px;white-space:pre-wrap;">' . escape_html((string) ($formData['message'] ?? '')) . '</div>';

    if ($formType === 'request_quote') {
        $html .= render_products_table($products);
        $html .= render_json_block('Products payload JSON', $products);
    }

    $html .= '</div></body></html>';

    $textSections = [
        'Website form submission',
        '',
        render_text_rows('Submission summary', $summaryRows),
        render_text_rows('Buyer / contact details', $contactRows),
        "Message\n-------\n" . (string) ($formData['message'] ?? ''),
    ];

    if ($formType === 'request_quote') {
        $textSections[] = render_text_products($products);
        $textSections[] = render_json_text_block('Products payload JSON', $products);
    }

    return [
        'html' => $html,
        'text' => implode("\n\n", array_filter($textSections)),
    ];
}

function build_summary_rows(array $context, array $formData, array $products): array
{
    $rows = [
        ['Form type', display_value((string) ($context['form_type'] ?? ''))],
        ['Request ID', display_value((string) ($context['request_id'] ?? ''))],
        ['Submission timestamp', display_value((string) ($context['submitted_at'] ?? ''))],
        ['Form started at', display_value((string) ($formData['form_started_at'] ?? ''))],
        ['Source path', display_value((string) ($context['source_path'] ?? ''))],
        ['Source URL', display_value((string) ($context['source_url'] ?? ''))],
        ['Consent', !empty($formData['consent']) ? 'Yes' : 'No'],
        ['Honeypot field', display_value((string) ($formData['company_website'] ?? ''))],
        ['Anti-spam result', display_value((string) ($context['anti_spam_status'] ?? ''))],
    ];

    if (($context['form_type'] ?? '') === 'request_quote') {
        $rows[] = ['Selected products', (string) count($products)];
    }

    return $rows;
}

function build_contact_rows(string $formType, array $formData): array
{
    $rows = [
        ['Full name', display_value((string) ($formData['fullName'] ?? ''))],
        ['Company name', display_value((string) ($formData['companyName'] ?? ''))],
        ['Email', display_value((string) ($formData['email'] ?? ''))],
        ['Phone', display_value((string) ($formData['phone'] ?? ''))],
        ['Location', display_value((string) ($formData['location'] ?? ''))],
        ['Inquiry type', display_value((string) ($formData['inquiryType'] ?? ''))],
        ['Preferred contact method', display_value((string) ($formData['contactMethod'] ?? ''))],
        ['Timeline', display_value((string) ($formData['timeline'] ?? ''))],
    ];

    if ($formType === 'request_quote') {
        $rows[] = ['Company role', display_value((string) ($formData['companyRole'] ?? ''))];
        $rows[] = ['VAT number', display_value((string) ($formData['vatNumber'] ?? ''))];
        $rows[] = ['Delivery preference', display_value((string) ($formData['deliveryPreference'] ?? ''))];
    }

    return $rows;
}

function render_html_table(string $title, array $rows): string
{
    $html = '<h2 style="margin:24px 0 8px;color:#111827;font-size:18px;">' . escape_html($title) . '</h2>';
    $html .= '<table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border:1px solid #d9d6cf;">';

    foreach ($rows as [$label, $value]) {
        $html .= '<tr>';
        $html .= '<th align="left" style="width:240px;border:1px solid #d9d6cf;background:#faf9f6;padding:10px;vertical-align:top;">' . escape_html((string) $label) . '</th>';
        $html .= '<td style="border:1px solid #d9d6cf;padding:10px;vertical-align:top;">' . escape_html((string) $value) . '</td>';
        $html .= '</tr>';
    }

    $html .= '</table>';

    return $html;
}

function render_products_table(array $products): string
{
    $html = '<h2 style="margin:24px 0 8px;color:#111827;font-size:18px;">Selected products</h2>';

    if ($products === []) {
        return $html . '<p style="margin:0;">No products were included in the request.</p>';
    }

    $headers = [
        'Inquiry item',
        'Product ID',
        'Slug',
        'Brand',
        'Model',
        'Title',
        'SKU',
        'Category',
        'Subcategory',
        'Quantity',
        'Formatted price',
        'Price mode',
        'Raw price',
        'Availability',
        'Condition',
        'Location',
        'Year',
        'Operating hours',
        'Mileage km',
        'Notes',
        'Product path',
        'Product URL',
    ];

    $html .= '<table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border:1px solid #d9d6cf;">';
    $html .= '<thead><tr>';

    foreach ($headers as $header) {
        $html .= '<th align="left" style="border:1px solid #d9d6cf;background:#faf9f6;padding:10px;vertical-align:top;">' . escape_html($header) . '</th>';
    }

    $html .= '</tr></thead><tbody>';

    foreach ($products as $product) {
        $cells = [
            display_value((string) ($product['inquiryItemId'] ?? '')),
            display_value((string) ($product['productId'] ?? '')),
            display_value((string) ($product['slug'] ?? '')),
            display_value((string) ($product['brand'] ?? '')),
            display_value((string) ($product['model'] ?? '')),
            display_value((string) ($product['title'] ?? '')),
            display_value((string) ($product['sku'] ?? '')),
            display_value(get_taxonomy_display_value($product['category'] ?? null)),
            display_value(get_taxonomy_display_value($product['subcategory'] ?? null)),
            display_value((string) ($product['quantity'] ?? '')),
            display_value((string) ($product['formattedPrice'] ?? '')),
            display_value((string) ($product['priceMode'] ?? '')),
            display_price_amount($product),
            display_value((string) ($product['availability'] ?? '')),
            display_value((string) ($product['condition'] ?? '')),
            display_value((string) ($product['location'] ?? '')),
            display_value((string) ($product['year'] ?? '')),
            display_value((string) ($product['operatingHours'] ?? '')),
            display_value((string) ($product['mileageKm'] ?? '')),
            display_value((string) ($product['notes'] ?? '')),
            display_value((string) ($product['productPath'] ?? '')),
            display_value((string) ($product['productUrl'] ?? '')),
        ];

        $html .= '<tr>';

        foreach ($cells as $cell) {
            $html .= '<td style="border:1px solid #d9d6cf;padding:10px;vertical-align:top;">' . escape_html($cell) . '</td>';
        }

        $html .= '</tr>';
    }

    $html .= '</tbody></table>';

    return $html;
}

function render_json_block(string $title, array $value): string
{
    $json = json_encode($value, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    $json = is_string($json) ? $json : '[]';

    return '<h2 style="margin:24px 0 8px;color:#111827;font-size:18px;">'
        . escape_html($title)
        . '</h2><pre style="margin:0;border:1px solid #d9d6cf;background:#faf9f6;padding:16px;overflow:auto;white-space:pre-wrap;">'
        . escape_html($json)
        . '</pre>';
}

function render_text_rows(string $title, array $rows): string
{
    $lines = [$title, str_repeat('-', strlen($title))];

    foreach ($rows as [$label, $value]) {
        $lines[] = $label . ': ' . $value;
    }

    return implode("\n", $lines);
}

function render_text_products(array $products): string
{
    $lines = ['Selected products', '-----------------'];

    if ($products === []) {
        $lines[] = 'No products were included in the request.';
        return implode("\n", $lines);
    }

    foreach ($products as $index => $product) {
        $lines[] = '';
        $lines[] = 'Product ' . ($index + 1);
        $lines[] = 'Inquiry item: ' . display_value((string) ($product['inquiryItemId'] ?? ''));
        $lines[] = 'Product ID: ' . display_value((string) ($product['productId'] ?? ''));
        $lines[] = 'Slug: ' . display_value((string) ($product['slug'] ?? ''));
        $lines[] = 'Brand: ' . display_value((string) ($product['brand'] ?? ''));
        $lines[] = 'Model: ' . display_value((string) ($product['model'] ?? ''));
        $lines[] = 'Title: ' . display_value((string) ($product['title'] ?? ''));
        $lines[] = 'SKU: ' . display_value((string) ($product['sku'] ?? ''));
        $lines[] = 'Category: ' . display_value(get_taxonomy_display_value($product['category'] ?? null));
        $lines[] = 'Subcategory: ' . display_value(get_taxonomy_display_value($product['subcategory'] ?? null));
        $lines[] = 'Quantity: ' . display_value((string) ($product['quantity'] ?? ''));
        $lines[] = 'Formatted price: ' . display_value((string) ($product['formattedPrice'] ?? ''));
        $lines[] = 'Price mode: ' . display_value((string) ($product['priceMode'] ?? ''));
        $lines[] = 'Raw price: ' . display_price_amount($product);
        $lines[] = 'Availability: ' . display_value((string) ($product['availability'] ?? ''));
        $lines[] = 'Condition: ' . display_value((string) ($product['condition'] ?? ''));
        $lines[] = 'Location: ' . display_value((string) ($product['location'] ?? ''));
        $lines[] = 'Year: ' . display_value((string) ($product['year'] ?? ''));
        $lines[] = 'Operating hours: ' . display_value((string) ($product['operatingHours'] ?? ''));
        $lines[] = 'Mileage km: ' . display_value((string) ($product['mileageKm'] ?? ''));
        $lines[] = 'Notes: ' . display_value((string) ($product['notes'] ?? ''));
        $lines[] = 'Product path: ' . display_value((string) ($product['productPath'] ?? ''));
        $lines[] = 'Product URL: ' . display_value((string) ($product['productUrl'] ?? ''));
    }

    return implode("\n", $lines);
}

function render_json_text_block(string $title, array $value): string
{
    $json = json_encode($value, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    $json = is_string($json) ? $json : '[]';

    return $title . "\n" . str_repeat('-', strlen($title)) . "\n" . $json;
}

function display_price_amount(array $product): string
{
    $amount = $product['priceAmount'] ?? null;
    $currency = (string) ($product['priceCurrency'] ?? '');

    if ($amount === null || $amount === '') {
        return 'Not provided';
    }

    return trim($currency . ' ' . $amount);
}

function display_value(string $value): string
{
    $trimmed = trim($value);
    return $trimmed === '' ? 'Not provided' : $trimmed;
}

function get_taxonomy_display_value(mixed $value): string
{
    if (!is_array($value)) {
        return '';
    }

    $title = trim((string) ($value['title'] ?? ''));
    if ($title !== '') {
        return $title;
    }

    return trim((string) ($value['slug'] ?? ''));
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
