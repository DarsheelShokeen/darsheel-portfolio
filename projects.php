<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");

if (file_exists(__DIR__ . '/projects.html')) {
    include __DIR__ . '/projects.html';
} else {
    header("Location: index.html#projects");
}
exit;
?>