<?php
// Enforce strict zero-cache HTTP response headers
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");

// Serve index.html directly
if (file_exists(__DIR__ . '/index.html')) {
    include __DIR__ . '/index.html';
} else {
    echo "Portfolio loading...";
}
exit;
?>