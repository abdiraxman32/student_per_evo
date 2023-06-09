btnAction = "Insert";
filllevel();

loadclass();


function filllevel() {

  let sendingData = {
    "action": "read_all_level"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/class.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;
      let html = '';
      let tr = '';

      if (status) {
        response.forEach(res => {
          html += `<option value="${res['level_id']}">${res['name']}</option>`;

        })

        $("#level_id").append(html);


      } else {
        displaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}

$("#classForm").on("submit", function (event) {

  event.preventDefault();


  let name = $("#name").val();
  let level_id = $("#level_id").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "name": name,
      "level_id": level_id,
      "action": "register_class"
    }

  } else {
    sendingData = {
      "class_id": id,
      "name": name,
      "level_id": level_id,
      "action": "update_class"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/class.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#classForm")[0].reset();
        loadclass();


      } else {
        employemessage("error", response);
      }

    },
    error: function (data) {
      employemessage("error", data.responseText);

    }

  })

})




function loadclass() {
  $("#classTable tbody").html('');
  $("#classTable thead").html('');

  let sendingData = {
    "action": "read_all_class"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/class.php",
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
              <a class="dropdown-item  update_info" href="javascript:void(0);" update_id=${res['class_id']}><i class="bx bx-edit-alt me-1"></i> Edit</a>
              
          </div>
      </div></td>`
          tr += "</tr>"

          // tr += `<td> <a class="btn btn-info update_info"  update_id=${res['class_id']}><i class="mdi mdi-grease-pencil" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['class_id']}><i class="mdi mdi-close-box
          // " style="color: #fff"></i></a> </td>`
          // tr += "</tr>"

        })
        $("#classTable thead").append(th);
        $("#classTable tbody").append(tr);
      }


    },
    error: function (data) {

    }

  })
}

function get_class_info(class_id) {

  let sendingData = {
    "action": "get_class_info",
    "class_id": class_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/class.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['class_id']);
        $("#name").val(response['name']);
        $("#level_id").val(response['level_id']);
        $("#classmodal").modal('show');




      } else {
        employemessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}



$("#classTable").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_class_info(id)
})

