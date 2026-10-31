<?php
/**
 * Contact Form Handler — Darsheel Shokeen Portfolio
 * Secure, sanitized contact endpoint with anti-spam honeypot
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

// Read JSON or POST body
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');
$honeypot = trim($input['website'] ?? '');

// Anti-spam honeypot check
if (!empty($honeypot)) {
    // Silently succeed for bots
    echo json_encode(['status' => 'success', 'message' => 'Message transmitted.']);
    exit;
}

// Validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Please fill in all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Please provide a valid email address.']);
    exit;
}

// Sanitize
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$subject = htmlspecialchars($subject ?: 'Portfolio Inquiry', ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Store message securely in local json log
$logFile = __DIR__ . '/messages.json';
$messages = [];
if (file_exists($logFile)) {
    $raw = @file_get_contents($logFile);
    if ($raw) {
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            $messages = $decoded;
        }
    }
}

$newMessage = [
    'id' => uniqid('msg_', true),
    'date' => date('Y-m-d H:i:s'),
    'ip' => $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
    'name' => $name,
    'email' => $email,
    'subject' => $subject,
    'message' => $message
];

$messages[] = $newMessage;
if (count($messages) > 500) {
    $messages = array_slice($messages, -300);
}

@file_put_contents($logFile, json_encode($messages, JSON_PRETTY_PRINT), LOCK_EX);

// Attempt PHP mail() if sendmail configured, otherwise log is preserved
$to = 'darsheelshokeen@gmail.com';
$mailSubject = "Portfolio Contact: " . $subject;
$mailBody = "From: {$name} <{$email}>\nDate: " . date('r') . "\n\nMessage:\n{$message}";
$headers = "From: noreply@darsheelshokeen.xo.je\r\nReply-To: {$email}\r\nX-Mailer: PHP/" . phpversion();

@mail($to, $mailSubject, $mailBody, $headers);

echo json_encode([
    'status' => 'success',
    'message' => 'Thank you for reaching out. Your message has been sent successfully.'
]);
