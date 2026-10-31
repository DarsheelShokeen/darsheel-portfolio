<?php
/**
 * Guestbook API & Storage Endpoint
 * Secure, sanitized, privacy-friendly, anti-spam honeypot
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dataFile = __DIR__ . '/guestbook_entries.json';

// Initialize with sample seed entry if not exists
if (!file_exists($dataFile)) {
    $initialData = [
        [
            'id' => 'seed_1',
            'name' => 'Darsheel Shokeen',
            'message' => 'Welcome to my digital headquarters and guestbook. Feel free to leave a note or thought on any of the projects!',
            'website' => 'https://darsheelshokeen.xo.je',
            'date' => '2026-10-31',
            'approved' => true
        ]
    ];
    @file_put_contents($dataFile, json_encode($initialData, JSON_PRETTY_PRINT), LOCK_EX);
}

// 1. GET: Return approved entries
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $raw = @file_get_contents($dataFile);
    $entries = $raw ? json_decode($raw, true) : [];
    if (!is_array($entries)) $entries = [];

    // Filter approved only and return public fields
    $publicEntries = [];
    foreach ($entries as $e) {
        if (!empty($e['approved'])) {
            $publicEntries[] = [
                'name' => htmlspecialchars($e['name'] ?? '', ENT_QUOTES, 'UTF-8'),
                'message' => htmlspecialchars($e['message'] ?? '', ENT_QUOTES, 'UTF-8'),
                'website' => !empty($e['website']) ? filter_var($e['website'], FILTER_SANITIZE_URL) : '',
                'date' => $e['date'] ?? date('Y-m-d')
            ];
        }
    }

    echo json_encode(['status' => 'success', 'entries' => array_reverse($publicEntries)]);
    exit;
}

// 2. POST: Submit a new entry
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        $input = $_POST;
    }

    $name = trim($input['name'] ?? '');
    $message = trim($input['message'] ?? '');
    $website = trim($input['website'] ?? '');
    $honeypot = trim($input['website_hp'] ?? '');

    // Anti-spam honeypot
    if (!empty($honeypot)) {
        echo json_encode(['status' => 'success', 'message' => 'Your note has been submitted for review.']);
        exit;
    }

    if (empty($name) || empty($message)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Name and message are required.']);
        exit;
    }

    if (strlen($name) > 60 || strlen($message) > 400) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Message exceeds maximum length.']);
        exit;
    }

    // Validate website URL if provided
    if (!empty($website)) {
        if (!preg_match('/^https?:\/\//i', $website)) {
            $website = 'https://' . $website;
        }
        if (!filter_var($website, FILTER_VALIDATE_URL)) {
            $website = '';
        }
    }

    $raw = @file_get_contents($dataFile);
    $entries = $raw ? json_decode($raw, true) : [];
    if (!is_array($entries)) $entries = [];

    $newEntry = [
        'id' => uniqid('gb_', true),
        'name' => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
        'message' => htmlspecialchars($message, ENT_QUOTES, 'UTF-8'),
        'website' => $website,
        'date' => date('Y-m-d'),
        'ip' => $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
        'approved' => true // Default approved with auto-moderation sanitization
    ];

    $entries[] = $newEntry;
    if (count($entries) > 200) {
        $entries = array_slice($entries, -150);
    }

    @file_put_contents($dataFile, json_encode($entries, JSON_PRETTY_PRINT), LOCK_EX);

    echo json_encode([
        'status' => 'success',
        'message' => 'Thank you for signing the guestbook! Your note is published.'
    ]);
    exit;
}
