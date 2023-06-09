<?php


header("content-type: application/json");
include '../config/conn.php';
// $action = $_POST['action'];

function register_student($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO student(fristname, lastname, mother_name, phone, distract, discount)
     values('$fristname', '$lastname', '$mother_name', '$phone', '$distract', '$discount')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_student($conn)
{
    $data = array();
    $array_data = array();
    $query = "select * from student";
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


// function read_student_statement($conn)
// {
//     extract($_POST);
//     $data = array();
//     $array_data = array();
//     $query = "CALL read_student_statement('$tellphone')";
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


// function read_all_student_name($conn)
// {
//     $data = array();
//     $array_data = array();
//     $query = "CALL read_student_name";
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


function get_student_info($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT * FROM student where student_id= '$student_id'";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function update_student($conn)
{
    extract($_POST);
    $data = array();
    $query = "UPDATE student set fristname = '$fristname', lastname= '$lastname', mother_name= '$mother_name', phone = '$phone', distract= '$distract', discount= '$discount' WHERE student_id = '$student_id'";
    $result = $conn->query($query);


    if ($result) {

        $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function Delete_student($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "DELETE FROM student where student_id= '$student_id'";
    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Deleted😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $action($conn);
} else {
    echo json_encode(array("status" => false, "data" => "Action Required....."));
}
