<?php
header('Access-Control-Allow-Origin : *');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Methods : POST, GET, OPTIONS, PUT, DELETE');
    header('Access-Control-Allow-Headers : Content-Type');
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));

$link = mysqli_connect('localhost', 'root', 'root', 'event_calendar');

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM events";
        break;
    case 'POST':
        $post = json_decode(file_get_contents('php://input'), true);
        $name = $post['name'];
        $date = $post['date'];
        $time = $post['time'];
        $color = $post['color'];
        $sql = "INSERT INTO events VALUES (DEFAULT, '".$name."', '".date($date)."', '".$time."', '".$color."')";
        break;
    case 'DELETE':
        $id = $_GET['id'];
        $sql = "DELETE FROM events WHERE id=$id";
        break;
}

$result = mysqli_query($link, $sql);
if (!$result) {
    http_response_code(404);
    die(mysqli_error());
}

switch ($method) {
    case 'GET':
        echo '[';
        for ($i = 0; $i < mysqli_num_rows($result); $i++) {
            echo ($i > 0 ? ',' : '').json_encode(mysqli_fetch_object($result));
        }
        echo ']';
        break;
    case 'POST':
        echo mysqli_insert_id($link);
        break;
    case 'DELETE':
        echo mysqli_affected_rows($link);
        break;
}
