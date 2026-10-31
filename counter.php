<?php
/**
 * Worldwide Real-Time Visitor Counter & Telemetry Sync
 * Darsheel Shokeen Portfolio & Apps
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Delegate to analytics_data.json for unified count
$analyticsFile = __DIR__ . '/analytics_data.json';
$total = 482; // Fallback baseline

if (file_exists($analyticsFile)) {
    $raw = @file_get_contents($analyticsFile);
    if ($raw) {
        $data = json_decode($raw, true);
        if (is_array($data) && isset($data['summary']['total_pageviews'])) {
            $total = intval($data['summary']['total_pageviews']);
        }
    }
}

echo json_encode([
    'count' => $total,
    'status' => 'success'
]);
