btnAction = "Insert";

loadstudent();

$("#studentform").on("submit", function (event) {

  event.preventDefault();


  let fristname = $("#fristname").val();
  let lastname = $("#lastname").val();
  let mother_name = $("#mother_name").val();
  let phone = $("#phone").val();
  let distract = $("#distract").val();
  let discount = $("#discount").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "fristname": fristname,
      "lastname": lastname,
      "mother_name": mother_name,
      "phone": phone,
      "distract": distract,
      "discount": discount,
      "action": "register_student"
    }

  } else {
    sendingData = {
      "student_id": id,
      "fristname": fristname,
      "lastname": lastname,
      "mother_name": mother_name,
      "phone": phone,
      "distract": distract,
      "discount": discount,
      "action": "update_student"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/student.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#studentform")[0].reset();
        loadstudent();


      } else {
        studentmessage("error", response);
      }

    },
    error: function (data) {
      studentmessage("error", data.responseText);

    }

  })

})




function loadstudent() {
  $("#studentTable tbody").html('');
  $("#studentTable thead").html('');

  let sendingData = {
    "action": "read_all_student"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/student.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;
      let html = '';
      let tr = '';
      let th = '';

      if (status) {
        response.forEach(res => {
          th = "<tr>";
          for (let r in res) {
            th += `<th>${r}</th>`;
          }

          th += "<td>Action</td></tr>";




          tr += "<tr>";
          for (let r in res) {

            if(r=="salary"){
              tr += `<td>$${res[r]}</td>`;
            }else{
              tr += `<td>${res[r]}</td>`;

            }



          }

          tr += `<td <div class="dropdown">
          <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
              <i class="bx bx-dots-vertical-rounded"></i>
          </button>
          <div class="dropdown-menu">
              <a class="dropdown-item  update_info" href="javascript:void(0);" update_id=${res['student_id']}><i class="bx bx-edit-alt me-1"></i> Edit</a>
              <a class="dropdown-item delete_info" href="javascript:void(0);" delete_id=${res['student_id']}><i class="bx bx-trash me-1"></i> Delete</a>
          </div>
      </div></td>`
          tr += "</tr>"

         

        })
        $("#studentTable thead").append(th);
        $("#studentTable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}

function get_student_info(student_id) {

  let sendingData = {
    "action": "get_student_info",
    "student_id": student_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/student.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['student_id']);
        $("#fristname").val(response['fristname']);
        $("#lastname").val(response['lastname']);
        $("#mother_name").val(response['mother_name']);
        $("#phone").val(response['phone']);
        $("#distract").val(response['distract']);
        $("#discount").val(response['discount']);
        $("#studentmodal").modal('show');




      } else {
        studentmessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}


function Delete_student(student_id) {

  let sendingData = {
    "action": "Delete_student",
    "student_id": student_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/student.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        swal("Good job!", response, "success");
        loadstudent();


      } else {
        swal(response);
      }

    },
    error: function (data) {

    }

  })
}



$("#studentTable").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_student_info(id)
})


$("#studentTable").on('click', "a.delete_info", function () {
  let id = $(this).attr("delete_id");
  if (confirm("Are you sure To Delete")) {
    Delete_student(id)

  }

})