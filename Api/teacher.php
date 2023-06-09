<?php


header("content-type: application/json");
include '../config/conn.php';
// $action = $_POST['action'];

function register_teachers($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO teacher(full_name, phone, city, state, branch_id, job_title_id)
     values('$full_name','$phone','$city', '$state', '$branch_id','$job_title_id')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_teachers($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT t.teacher_id,t.full_name,t.phone,t.city,t.state,b.branch_name,j.position,j.salary,t.date from teacher t JOIN branch b on t.branch_id=b.branch_id JOIN job_title j on t.job_title_id=j.job_title_id";
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



// function read_all_customer_statement($conn)
// {
//     extract($_POST);
//     $data = array();
//     $array_data = array();
//     $query = "CALL read_customer_statement('$from', '$to')";
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


function get_teacher_info($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT *FROM teacher where teacher_id= '$teacher_id'";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function update_teacher($conn)
{
    extract($_POST);
    $data = array();
    $query = "UPDATE teacher set full_name = '$full_name', phone= '$phone',  city = '$city', state= '$state', branch_id= '$branch_id', job_title_id= '$job_title_id' WHERE teacher_id = '$teacher_id'";
    $result = $conn->query($query);


    if ($result) {

        $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function Delete_teacher($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "DELETE FROM teacher where teacher_id= '$teacher_id'";
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
