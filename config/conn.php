<?php

$conn = new mysqli("localhost", "root", "", "student_p_e");

if ($conn->connect_error) {
    echo $conn->error;
}
