<?php
// Define constants for the API
define('AUTH_TOKEN', 'xxxx');
define('SMART_LOCK_ID', '1234');

define('NUKI_API_URL', 'https://api.nuki.io/smartlock/' . SMART_LOCK_ID);

// Function to make cURL requests to Nuki API
function makeNukiApiRequest($url, $method = 'GET') {
    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . AUTH_TOKEN,
        'Content-Type: application/json'
    ]);

    if ($method === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
    }

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200 || $httpCode === 204) {
        return json_decode($response, true);
    } else {
        return ['error' => 'Request failed with status ' . $httpCode];
    }
}

// Handle the GET request to fetch the current state
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $response = makeNukiApiRequest(NUKI_API_URL);

    if (isset($response['state'])) {
        $state = $response['state']['state'];
        if ($state == 1) {
            echo json_encode(['isLocked' => true]);
        } elseif ($state == 3) {
            echo json_encode(['isLocked' => false]);
        } else {
            echo json_encode(['error' => 'Unknown state']);
        }
    } else {
        echo json_encode(['error' => 'Failed to get state']);
    }
}

// Handle the POST request to lock/unlock
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? null;

    if ($action === 'lock') {
        $response = makeNukiApiRequest(NUKI_API_URL . '/action/lock', 'POST');
        echo json_encode($response);
    } elseif ($action === 'unlock') {
        $response = makeNukiApiRequest(NUKI_API_URL . '/action/unlock', 'POST');
        echo json_encode($response);
    } else {
        echo json_encode(['error' => 'Invalid action']);
    }
}
