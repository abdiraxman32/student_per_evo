btnAction = "Insert";

loaddepartment();





$("#departmentform").on("submit", function (event) {

  event.preventDefault();


  let name = $("#name").val();
 
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "name": name,
     
      "action": "register_department"
    }

  } else {
    sendingData = {
      "department_id": id,
      "name": name,
      
      "action": "update_department"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/department.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#departmentform")[0].reset();
        loaddepartment();


      } else {
        departmentmessage("error", response);
      }

    },
    error: function (data) {
      departmentmessage("error", data.responseText);

    }

  })

})




function loaddepartment() {
  $("#departmentTable tbody").html('');
  $("#departmentTable thead").html('');

  let sendingData = {
    "action": "read_all_department"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/department.php",
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
              <a class="dropdown-item  update_info" href="javascript:void(0);" update_id=${res['department_id']}><i class="bx bx-edit-alt me-1"></i> Edit</a>
             
          </div>
      </div></td>`
          tr += "</tr>"

         

        })
        $("#departmentTable thead").append(th);
        $("#departmentTable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}

function get_department_info(department_id) {

  let sendingData = {
    "action": "get_department_info",
    "department_id": department_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/department.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['department_id']);
        $("#name").val(response['name']);
        
        $("#departmentmodal").modal('show');




      } else {
        departmentmessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}






$("#departmentTable").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_department_info(id)
})


$("#departmentTable").on('click', "a.delete_info", function () {
  let id = $(this).attr("delete_id");
  if (confirm("Are you sure To Delete")) {
    Delete_department(id)

  }

})