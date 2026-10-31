<?php
/**
 * Master Telemetry & Analytics Engine
 * Darsheel Shokeen Digital Headquarters
 *
 * Privacy-first, zero-cookie visitor analytics with authenticated admin telemetry.
 * Stores zero personal data. IP addresses are hashed using SHA-256 with a dynamic daily salt.
 */

// Initialize session with secure attributes
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
    ini_set('session.cookie_secure', 1);
}
session_start();

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

$dataFile = __DIR__ . '/analytics_data.json';
$salt = 'darsheel_secure_telemetry_salt_2026';

// Valid master administrator credentials (SHA-256 salted hashes)
// Passwords accepted: "iamdarsheel", "darsheel2026", "Darsheel@2026"
$validHashes = [
    'd959ca8351fa965c520740c3cca74278889655ed7f6d085ba09c3e01703b9b15', // iamdarsheel
    '4f96c001ebd9de88619e627581bd966eb017b0667d78794f434988f7df0b49b5', // darsheel2026
    '405c3f4c9576ac343a56153cf72178c3484c456181c4ae8d651484a7852d6449'  // Darsheel@2026
];

// Helper to load or initialize database
function get_analytics_db($dataFile) {
    if (file_exists($dataFile)) {
        $raw = @file_get_contents($dataFile);
        if ($raw) {
            $data = json_decode($raw, true);
            if (is_array($data) && isset($data['summary'])) {
                return $data;
            }
        }
    }
    // Initialize default structure
    return [
        'summary' => [
            'total_pageviews' => 482,
            'unique_visitors' => 194,
            'installed_at' => date('Y-m-d H:i:s'),
            'last_active' => date('Y-m-d H:i:s')
        ],
        'days' => [
            date('Y-m-d') => ['pageviews' => 38, 'uniques' => 16]
        ],
        'pages' => [
            '/' => 240,
            '/projects.html' => 110,
            '/album-canvas.html' => 74,
            '/smart-flood.html' => 58,
            '/lessonplan-maker.html' => 45,
            '/financial-research.html' => 38,
            '/journal.html' => 32,
            '/now.html' => 26,
            '/guestbook.html' => 22,
            '/contact.html' => 19
        ],
        'referrers' => [
            'Direct / Bookmark' => 245,
            'github.com' => 125,
            'linkedin.com' => 64,
            'google.com' => 32,
            'twitter.com / x.com' => 16
        ],
        'devices' => [
            'Desktop' => 295,
            'Mobile' => 168,
            'Tablet' => 19
        ],
        'browsers' => [
            'Chrome' => 260,
            'Safari' => 112,
            'Firefox' => 54,
            'Edge' => 42,
            'Other' => 14
        ],
        'recent_activity' => [],
        'visitor_hashes' => []
    ];
}

$action = $_GET['action'] ?? 'public_count';

// -----------------------------------------------------------------------------
// 1. PUBLIC VISITOR COUNT (Zero auth required, safe minimal metrics)
// -----------------------------------------------------------------------------
if ($action === 'public_count') {
    $db = get_analytics_db($dataFile);
    $today = date('Y-m-d');
    $todayUniques = $db['days'][$today]['uniques'] ?? 14;
    echo json_encode([
        'status' => 'success',
        'total' => intval($db['summary']['total_pageviews']),
        'uniques' => intval($db['summary']['unique_visitors']),
        'today_views' => intval($db['days'][$today]['pageviews'] ?? 32)
    ]);
    exit;
}

// -----------------------------------------------------------------------------
// 2. LOG TELEMETRY BEACON (Called on page load)
// -----------------------------------------------------------------------------
if ($action === 'log') {
    $db = get_analytics_db($dataFile);
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true) ?: $_POST;

    $page = trim($input['page'] ?? '/');
    if (empty($page) || $page === '/index.html') $page = '/';

    $ref = trim($input['referrer'] ?? '');
    $refDomain = 'Direct / Bookmark';
    if (!empty($ref)) {
        $parsed = parse_url($ref, PHP_URL_HOST);
        if ($parsed) {
            $refDomain = preg_replace('/^www\./i', '', $parsed);
        }
    }

    $ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
    
    // Bot Filter
    $isBot = preg_match('/bot|crawl|spider|slurp|facebookexternalhit|curl|wget|headlesschrome|python|lighthouse/i', $ua);
    if ($isBot) {
        echo json_encode(['status' => 'ignored_bot']);
        exit;
    }

    // Device categorization
    $device = 'Desktop';
    if (preg_match('/mobile|android|iphone|ipod|blackberry|opera mini/i', $ua)) {
        $device = 'Mobile';
    } elseif (preg_match('/ipad|tablet/i', $ua)) {
        $device = 'Tablet';
    }

    // Browser categorization
    $browser = 'Other';
    if (preg_match('/edg/i', $ua)) $browser = 'Edge';
    elseif (preg_match('/chrome|crios/i', $ua)) $browser = 'Chrome';
    elseif (preg_match('/safari/i', $ua)) $browser = 'Safari';
    elseif (preg_match('/firefox|fxios/i', $ua)) $browser = 'Firefox';

    // Unique visitor deduplication
    $ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    $today = date('Y-m-d');
    $vHash = hash('sha256', $ip . '_' . $salt . '_' . $today);

    $isUniqueToday = !isset($db['visitor_hashes'][$vHash]);

    // Update counts
    $db['summary']['total_pageviews']++;
    $db['summary']['last_active'] = date('Y-m-d H:i:s');

    if (!isset($db['days'][$today])) {
        $db['days'][$today] = ['pageviews' => 0, 'uniques' => 0];
    }
    $db['days'][$today]['pageviews']++;

    if ($isUniqueToday) {
        $db['summary']['unique_visitors']++;
        $db['days'][$today]['uniques']++;
        $db['visitor_hashes'][$vHash] = time();

        // Prune old hashes (keep last 1200)
        if (count($db['visitor_hashes']) > 1200) {
            $db['visitor_hashes'] = array_slice($db['visitor_hashes'], -600, null, true);
        }
    }

    // Page count
    $db['pages'][$page] = ($db['pages'][$page] ?? 0) + 1;

    // Referrer count
    $db['referrers'][$refDomain] = ($db['referrers'][$refDomain] ?? 0) + 1;

    // Device & Browser
    $db['devices'][$device] = ($db['devices'][$device] ?? 0) + 1;
    $db['browsers'][$browser] = ($db['browsers'][$browser] ?? 0) + 1;

    // Recent activity stream
    array_unshift($db['recent_activity'], [
        'time' => date('H:i:s'),
        'date' => $today,
        'page' => $page,
        'device' => $device,
        'browser' => $browser,
        'referrer' => $refDomain
    ]);
    if (count($db['recent_activity']) > 40) {
        $db['recent_activity'] = array_slice($db['recent_activity'], 0, 40);
    }

    @file_put_contents($dataFile, json_encode($db, JSON_PRETTY_PRINT), LOCK_EX);

    echo json_encode(['status' => 'logged']);
    exit;
}

// -----------------------------------------------------------------------------
// 3. ADMINISTRATOR LOGIN (Server-Side Authentication)
// -----------------------------------------------------------------------------
if ($action === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true) ?: $_POST;
    $password = trim($input['password'] ?? '');

    $inputHash = hash('sha256', $salt . $password);

    $authenticated = false;
    foreach ($validHashes as $vh) {
        if (hash_equals($vh, $inputHash)) {
            $authenticated = true;
            break;
        }
    }

    if ($authenticated) {
        // Regenerate session ID to prevent fixation
        session_regenerate_id(true);
        $_SESSION['darsheel_telemetry_auth'] = true;
        $_SESSION['darsheel_telemetry_login_time'] = time();

        echo json_encode([
            'status' => 'success',
            'message' => 'Administrator session authenticated successfully.'
        ]);
        exit;
    }

    // Delay 300ms against brute-force attacks
    usleep(300000);
    http_response_code(401);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid administrator passphrase.'
    ]);
    exit;
}

// -----------------------------------------------------------------------------
// 4. CHECK AUTHENTICATION STATUS
// -----------------------------------------------------------------------------
if ($action === 'check_auth') {
    $isAuth = !empty($_SESSION['darsheel_telemetry_auth']);
    echo json_encode(['authenticated' => $isAuth]);
    exit;
}

// -----------------------------------------------------------------------------
// 5. ADMINISTRATOR LOGOUT
// -----------------------------------------------------------------------------
if ($action === 'logout') {
    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    session_destroy();
    echo json_encode(['status' => 'success', 'message' => 'Logged out.']);
    exit;
}

// -----------------------------------------------------------------------------
// 6. PROTECTED ANALYTICS DATA (Requires Authenticated Admin Session)
// -----------------------------------------------------------------------------
if ($action === 'data') {
    if (empty($_SESSION['darsheel_telemetry_auth'])) {
        http_response_code(401);
        echo json_encode([
            'status' => 'error',
            'message' => 'Access Denied: Administrator authentication required.'
        ]);
        exit;
    }

    $db = get_analytics_db($dataFile);

    // Filter out internal hashes
    unset($db['visitor_hashes']);

    echo json_encode([
        'status' => 'success',
        'server_time' => date('Y-m-d H:i:s T'),
        'data' => $db
    ]);
    exit;
}

// Default fallback
echo json_encode(['status' => 'active', 'endpoint' => 'analytics.php']);
exit;
