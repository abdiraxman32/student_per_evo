btnAction = "Insert";

loadfaculty();





$("#facultyform").on("submit", function (event) {

  event.preventDefault();


  let name = $("#name").val();
 
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "name": name,
     
      "action": "register_faculty"
    }

  } else {
    sendingData = {
      "Faculty_id": id,
      "name": name,
      
      "action": "update_faculty"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/faculty.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#facultyform")[0].reset();
        loadfaculty();


      } else {
        facultymessage("error", response);
      }

    },
    error: function (data) {
      facultymessage("error", data.responseText);

    }

  })

})




function loadfaculty() {
  $("#facultyTable tbody").html('');
  $("#facultyTable thead").html('');

  let sendingData = {
    "action": "read_all_faculty"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/faculty.php",
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
              <a class="dropdown-item  update_info" href="javascript:void(0);" update_id=${res['Faculty_id']}><i class="bx bx-edit-alt me-1"></i> Edit</a>
             
          </div>
      </div></td>`
          tr += "</tr>"

         

        })
        $("#facultyTable thead").append(th);
        $("#facultyTable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}

function get_faculty_info(Faculty_id) {

  let sendingData = {
    "action": "get_faculty_info",
    "Faculty_id": Faculty_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/faculty.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['Faculty_id']);
        $("#name").val(response['name']);
        
        $("#facultymodal").modal('show');




      } else {
        facultymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}






$("#facultyTable").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_faculty_info(id)
})


// $("#facultyTable").on('click', "a.delete_info", function () {
//   let id = $(this).attr("delete_id");
//   if (confirm("Are you sure To Delete")) {
//     Delete_faculty(id)

//   }

// })