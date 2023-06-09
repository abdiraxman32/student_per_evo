<?php


header("content-type: application/json");
include '../config/conn.php';
// $action = $_POST['action'];

function register_shift($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO shift(name)
     values('$name')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_shift($conn)
{
    $data = array();
    $array_data = array();
    $query = "select * from shift";
    $result = $conn->query($query);


    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $array_data[] = $row;
        }
        $data = array("status" => true, "data" => $array_data);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


// function read_shift_statement($conn)
// {
//     extract($_POST);
//     $data = array();
//     $array_data = array();
//     $query = "CALL read_shift_statement('$tellphone')";
//     $result = $conn->query($query);


//     if ($result) {
//         while ($row = $result->fetch_assoc()) {
//             $array_data[] = $row;
//         }
//         $data = array("status" => true, "data" => $array_data);
//     } else {
//         $data = array("status" => false, "data" => $conn->error);
//     }

//     echo json_encode($data);
// }


// function read_all_shift_name($conn)
// {
//     $data = array();
//     $array_data = array();
//     $query = "CALL read_shift_name";
//     $result = $conn->query($query);


//     if ($result) {
//         while ($row = $result->fetch_assoc()) {
//             $array_data[] = $row;
//         }
//         $data = array("status" => true, "data" => $array_data);
//     } else {
//         $data = array("status" => false, "data" => $conn->error);
//     }

//     echo json_encode($data);
// }


function get_shift_info($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT *FROM shift where shift_id= '$shift_id'";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function update_shift($conn)
{
    extract($_POST);
    $data = array();
    $query = "UPDATE shift set name = '$name' WHERE shift_id = '$shift_id'";
    $result = $conn->query($query);


    if ($result) {

        $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


// function Delete_shift($conn)
// {
//     extract($_POST);
//     $data = array();
//     $array_data = array();
//     $query = "DELETE FROM shift where shift_id= '$shift_id'";
//     $result = $conn->query($query);


//     if ($result) {


//         $data = array("status" => true, "data" => "successfully Deleted😎");
//     } else {
//         $data = array("status" => false, "data" => $conn->error);
//     }

//     echo json_encode($data);
// }

if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $action($conn);
} else {
    echo json_encode(array("status" => false, "data" => "Action Required....."));
}
