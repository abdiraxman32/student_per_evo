load_teachers();
fill_branch();
fill_jobs();
btnAction = "Insert";

function fill_branch() {

  let sendingData = {
      "action": "read_all_branch"
  }

  $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/branch.php",
      data: sendingData,

      success: function (data) {
          let status = data.status;
          let response = data.data;
          let html = '';
          let tr = '';

          if (status) {
              response.forEach(res => {
                  html += `<option value="${res['branch_id']}">${res['branch_name']}</option>`;

              })

              $("#branch_id").append(html);


          } else {
              displaymessage("error", response);
          }

      },
      error: function (data) {

      }

  })
}

function fill_jobs() {

  let sendingData = {
      "action": "read_all_job_title"
  }

  $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/job_title.php",
      data: sendingData,

      success: function (data) {
          let status = data.status;
          let response = data.data;
          let html = '';
          let tr = '';

          if (status) {
              response.forEach(res => {
                  html += `<option value="${res['job_title_id']}">${res['position']}</option>`;

              })

              $("#job_title_id").append(html);


          } else {
              displaymessage("error", response);
          }

      },
      error: function (data) {

      }

  })
}

$("#teacherForm").on("submit", function (event) {

  event.preventDefault();


  let full_name = $("#full_name").val();
  let phone = $("#phone").val();
  let city = $("#city").val();
  let state = $("#state").val();
  let branch_id = $("#branch_id").val();
  let job_title_id = $("#job_title_id").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "full_name": full_name,
      "phone": phone,
      "city": city,
      "state": state,
      "branch_id": branch_id,
      "job_title_id": job_title_id,
      "action": "register_teachers"
    }

  } else {
    sendingData = {
      "teacher_id": id,
      "full_name": full_name,
      "phone": phone,
      "city": city,
      "state": state,
      "branch_id": branch_id,
      "job_title_id": job_title_id,
      "action": "update_teacher"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/teacher.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#teacherForm")[0].reset();
        load_teachers();





      } else {
        swal("NOW!", response, "error");
      }

    },
    error: function (data) {
      swal("NOW!", response, "error");

    }

  })

})


function load_teachers() {
  $("#teacherTable tbody").html('');
  $("#teacherTable thead").html('');

  let sendingData = {
    "action": "read_all_teachers"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/teacher.php",
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


            tr += `<td>${res[r]}</td>`;


          }

          tr += `<td <div class="dropdown">
          <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
              <i class="bx bx-dots-vertical-rounded"></i>
          </button>
          <div class="dropdown-menu">
              <a class="dropdown-item  update_info" href="javascript:void(0);" update_id=${res['teacher_id']}><i class="bx bx-edit-alt me-1"></i> Edit</a>
              <a class="dropdown-item delete_info" href="javascript:void(0);" delete_id=${res['teacher_id']}><i class="bx bx-trash me-1"></i> Delete</a>
          </div>
      </div></td>`
          tr += "</tr>"


        })
        $("#teacherTable thead").append(th);
        $("#teacherTable tbody").append(tr);
      }


    },
    error: function (data) {

    }

  })
}

function get_teacher_info(teacher_id) {

  let sendingData = {
    "action": "get_teacher_info",
    "teacher_id": teacher_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/teacher.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['teacher_id']);
        $("#full_name").val(response['full_name']);
        $("#phone").val(response['phone']);
        $("#city").val(response['city']);
        $("#state").val(response['state']);
        $("#branch_id").val(response['branch_id']);
        $("#job_title_id").val(response['job_title_id']);
        $("#teachermodal").modal('show');




      } else {
        dispalaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}

function Delete_teacher(teacher_id) {

  let sendingData = {
    "action": "Delete_teacher",
    "teacher_id": teacher_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/teacher.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        swal("Good job!", response, "success");
        load_teachers();


      } else {
        swal(response);
      }

    },
    error: function (data) {

    }

  })
}

$("#teacherTable").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_teacher_info(id)
})


$("#teacherTable").on('click', "a.delete_info", function () {
  let id = $(this).attr("delete_id");
  if (confirm("Are you sure To Delete")) {
    Delete_teacher(id)

  }

})