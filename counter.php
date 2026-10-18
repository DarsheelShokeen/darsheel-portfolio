<?php
/**
 * Worldwide Real-Time Visitor Counter
 * Darsheel Shokeen Portfolio & Apps
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dataFile = __DIR__ . '/visits.json';
$baselineCount = 264; // Base worldwide visits

$data = [
    'total' => $baselineCount,
    'last_updated' => date('Y-m-d H:i:s'),
    'visitors' => []
];

if (file_exists($dataFile)) {
    $raw = @file_get_contents($dataFile);
    if ($raw) {
        $decoded = json_decode($raw, true);
        if (is_array($decoded) && isset($decoded['total'])) {
            $data = $decoded;
            if ($data['total'] < $baselineCount) {
                $data['total'] = $baselineCount;
            }
        }
    }
}

$action = isset($_GET['action']) ? $_GET['action'] : 'increment';
$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$today = date('Y-m-d');
$visitorKey = hash('sha256', $ip . '_' . $today);

if ($action === 'increment') {
    // Only increment once per IP per 24-hour day to keep counts authentic
    if (!isset($data['visitors'][$visitorKey])) {
        $data['total'] = intval($data['total']) + 1;
        $data['visitors'][$visitorKey] = time();
        $data['last_updated'] = date('Y-m-d H:i:s');

        // Prune old visitor records to keep file small
        if (count($data['visitors']) > 1500) {
            $data['visitors'] = array_slice($data['visitors'], -750, null, true);
        }

        @file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT), LOCK_EX);
    }
}

echo json_encode([
    'count' => intval($data['total']),
    'status' => 'success'
]);
