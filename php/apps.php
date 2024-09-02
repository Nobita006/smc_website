<?php
include('config.php');

$action = $_POST['action'] ?? $_GET['action'];

if ($action == 'add') {
    $name = $_POST['name'];
    $query = "INSERT INTO popular_apps (name) VALUES ('$name')";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['status' => 'success', 'message' => 'New app added successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error adding app.']);
    }
} elseif ($action == 'delete') {
    $id = $_POST['id'];
    $query = "DELETE FROM popular_apps WHERE id = $id";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['status' => 'success', 'message' => 'App deleted successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error deleting app.']);
    }
} elseif ($action == 'edit') {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $query = "UPDATE popular_apps SET name = '$name' WHERE id = $id";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['status' => 'success', 'message' => 'App updated successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error updating app.']);
    }
} elseif ($action == 'view') {
    $search = $_GET['query'] ?? '';
    if ($search) {
        $query = "SELECT * FROM popular_apps WHERE name LIKE '%$search%'";
    } else {
        $query = "SELECT * FROM popular_apps";
    }
    $result = mysqli_query($conn, $query);
    $apps = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $apps[] = $row;
    }
    echo json_encode($apps);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid action.']);
}
?>
