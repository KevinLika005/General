<?php

return [
    'mail_env' => 'local',
    'recipient' => 'info@company-domain.example',
    'from_email' => 'info@company-domain.example',
    'from_name' => 'Website Forms',
    'use_smtp' => true,
    'smtp_host' => '127.0.0.1',
    'smtp_port' => 1025,
    'smtp_secure' => '',
    'smtp_username' => '',
    'smtp_password' => '',
    'debug' => true,
    'allow_live_delivery_from_localhost' => false,
    'allowed_origins' => [
        'http://127.0.0.1:5173',
        'http://localhost:5173',
    ],
    'timezone' => 'UTC',
    'request_id_prefix' => 'GEN',
];
