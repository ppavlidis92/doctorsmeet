


///////////    DATATABLES  ---->>>>>
$(document).ready(function () {
  $("#myTable").DataTable();
});
///////////    DATATABLES  <<<<<-------




///////////////Checkboxes //////////////////
////// function that lets user have selected only one checkbox
$("input:checkbox").on("click", function () {


  // in the handler, 'this' refers to the box clicked on
  var $box = $(this);
  if ($box.is(":checked")) {
    // the name of the box is retrieved using the .attr() method
    // as it is assumed and expected to be immutable
    var group = "input:checkbox[name='" + $box.attr("name") + "']";
    // the checked state of the group/box on the other hand will change
    // and the current value is retrieved using .prop() method
    $(group).prop("checked", false);
    $box.prop("checked", true);
  } else {
    $box.prop("checked", false);
  }
});

/////////////////   army  /////////////////
$(document).on("click", ".armyCheckd", function () {

  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#armyText").hide();
    } else {
      $("#armyText").show();
    }
  } else {
    if (value == "false") {
      $("#armyText").hide();
    }
  }
});
/////////////////   army /////////////////

/////////////////   history /////////////////
$(document).on("click", ".historyCheckd", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#historyText").show();
    } else {
      $("#historyText").hide();
    }
  } else {
    if (value == "true") {
      $("#historyText").hide();
    }
  }
});
/////////////////   history /////////////////

/////////////////   annarotiki /////////////////
$(document).on("click", ".annarotikiCheckd", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#annarotikiText").show();
    } else {
      $("#annarotikiText").hide();
    }
  } else {
    if (value == "true") {
      $("#annarotikiText").hide();
    }
  }
});
/////////////////   annarotiki /////////////////

////////////////   therapia /////////////////
$(document).on("click", ".therapiaCheckd", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#therapiaText").show();
    } else {
      $("#therapiaText").hide();
    }
  } else {
    if (value == "true") {
      $("#therapiaText").hide();
    }
  }
});
/////////////////   therapia /////////////////

////////////////   anaimia /////////////////
$(document).on("click", ".anaimiaCheckd", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#anaimiaText").show();
    } else {
      $("#anaimiaText").hide();
    }
  } else {
    if (value == "true") {
      $("#anaimiaText").hide();
    }
  }
});
/////////////////   anaimia /////////////////

////////////////   alergia /////////////////
$(document).on("click", ".alergiaCheckd", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#alergiaText").show();
    } else {
      $("#alergiaText").hide();
    }
  } else {
    if (value == "true") {
      $("#alergiaText").hide();
    }
  }
});
/////////////////   alergia /////////////////

////////////////   egxeirish /////////////////
$(document).on("click", ".egxeirishCheckd", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#egxeirishText").show();
    } else {
      $("#egxeirishText").hide();
    }
  } else {
    if (value == "true") {
      $("#egxeirishText").hide();
    }
  }
});
/////////////////   egxeirish /////////////////

////////////////   SakxarodiDiabiti /////////////////
$(document).on("click", ".SakxarodiDiabitiCheckd", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#SakxarodiDiabitiText").show();
    } else {
      $("#SakxarodiDiabitiText").hide();
    }
  } else {
    if (value == "true") {
      $("#SakxarodiDiabitiText").hide();
    }
  }
});
/////////////////   SakxarodiDiabiti /////////////////

////////////////   gunaikologikaProblimata /////////////////
$(document).on("click", ".gunaikologikaProblimata", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#gunaikologikaProblimataText").show();
    } else {
      $("#gunaikologikaProblimataText").hide();
    }
  } else {
    if (value == "true") {
      $("#gunaikologikaProblimataText").hide();
    }
  }
});
/////////////////   gunaikologikaProblimata /////////////////


////////////////   egkuos /////////////////
$(document).on("click", ".egkuos", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#egkuosText").show();
    } else {
      $("#egkuosText").hide();
    }
  } else {
    if (value == "true") {
      $("#egkuosText").hide();
    }
  }
});
/////////////////   egkuos /////////////////


////////////////   farmaka /////////////////
$(document).on("click", ".farmaka", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#farmakaText").show();
    } else {
      $("#farmakaText").hide();
    }
  } else {
    if (value == "true") {
      $("#farmakaText").hide();
    }
  }
});
/////////////////   farmaka /////////////////


////////////////   allo /////////////////
$(document).on("click", ".allo", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#alloText").show();
    } else {
      $("#alloText").hide();
    }
  } else {
    if (value == "true") {
      $("#alloText").hide();
    }
  }
});
/////////////////   allo /////////////////


////////////////   covid /////////////////
$(document).on("click", ".covid", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#covidText").show();
    } else {
      $("#covidText").hide();
    }
  } else {
    if (value == "true") {
      $("#covidText").hide();
    }
  }
});
/////////////////   covid /////////////////



////////////////   kardia /////////////////
$(document).on("click", ".kardia", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#kardiaText").show();
    } else {
      $("#kardiaText").hide();
    }
  } else {
    if (value == "true") {
      $("#kardiaText").hide();
    }
  }
});
/////////////////   kardia /////////////////



////////////////   dermatopatheia /////////////////
$(document).on("click", ".dermatopatheia", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#dermatopatheiaText").show();
    } else {
      $("#dermatopatheiaText").hide();
    }
  } else {
    if (value == "true") {
      $("#dermatopatheiaText").hide();
    }
  }
});
/////////////////   dermatopatheia /////////////////



////////////////   osteosinthesi /////////////////
$(document).on("click", ".osteosinthesi", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#osteosinthesiText").show();
    } else {
      $("#osteosinthesiText").hide();
    }
  } else {
    if (value == "true") {
      $("#osteosinthesiText").hide();
    }
  }
});
/////////////////   osteosinthesi /////////////////



////////////////   apeikonistiko /////////////////
$(document).on("click", ".apeikonistiko", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#apeikonistikoText").show();
    } else {
      $("#apeikonistikoText").hide();
    }
  } else {
    if (value == "true") {
      $("#apeikonistikoText").hide();
    }
  }
});
/////////////////   apeikonistiko /////////////////



////////////////   karkinos /////////////////
$(document).on("click", ".karkinos", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#karkinosText").show();
    } else {
      $("#karkinosText").hide();
    }
  } else {
    if (value == "true") {
      $("#karkinosText").hide();
    }
  }
});
/////////////////   karkinos /////////////////


////////////////   checkup /////////////////
$(document).on("click", "#checkup", function () {
  // in the handler, 'this' refers to the box clicked on
  var value = $(this).val();
  var $box = $(this);

  if ($box.is(":checked")) {
    if (value == "true") {
      $("#checkupText").show();
    } else {
      $("#checkupText").hide();
    }
  } else {
    if (value == "true") {
      $("#checkupText").hide();
    }
  }
});
/////////////////   checkup /////////////////

///////////////Checkboxes //////////////////







///////////////////////       ADD TABLE ROW ///////////////////////

//egxeiriseisTable
$("#AddTableRow").on("click", function () {
  let id = $("#egxeiriseisTableBody").children().last().attr("id");
  id++;

  $("#egxeiriseisTable > tbody:last-child").append(
    ' <tr id="' +
    id +
    '"> <td> <input class="form-control" type="text" name="egxeirishTextWHO_' +
    id +
    '"></td>' +
    '<td> <input class="form-control" type="text" name="egxeirishTextWHERE_' +
    id +
    '"></td>' +
    '<td> <input class="form-control" type="text" name="egxeirishTextWHEN_' +
    id +
    '"></td>   </tr>'
  );
});

////////////////nosiliesTableBody

$("#AddTableNosiliesRow").on("click", function () {
  let id = $("#nosiliesTableBody").children().last().attr("id");
  id++;

  $("#nosiliesTable > tbody:last-child").append(
    ' <tr id="' +
    id +
    '"> <td> <input class="form-control" type="text" name="allesNosilies_' +
    id +
    '"></td> </tr>'
  );
});


//SakxarodiDiabitisTableBody
$("#AddTableDiabitiRow").on("click", function () {
  let id = $("#SakxarodiDiabitisTableBody").children().last().attr("id");
  id++;

  $("#diabitiTable > tbody:last-child").append(
    ' <tr id="' +
    id +
    '"> <td> <input class="form-control" type="text" name="SakxarodiDiabitiWHO_' +
    id +
    '"></td>' +
    '<td> <input class="form-control" type="text" name="SakxarodiDiabitiWHEN_' +
    id +
    '"></td>' +
    '<td> <input class="form-control" type="text" name="SakxarodiDiabitiRESULT_' +
    id +
    '"></td>   </tr>'
  );
});

//checkupTable
$("#AddTableCheckupRow").on("click", function () {
  let id = $("#checkupTableBody").children().last().attr("id");
  id++;

  $("#checkupTable > tbody:last-child").append(
    ' <tr id="' +
    id +
    '"> <td> <input class="form-control" type="text" name="checkupWHO_' +
    id +
    '"></td>' +
    '<td> <input class="form-control" type="text" name="checkupWHEN_' +
    id +
    '"></td>' +
    '<td> <input class="form-control" type="text" name="checkupRESULT_' +
    id +
    '"></td>   </tr>'
  );
});
///////////////////////       ADD TABLE ROW ///////////////////////





////   ADD new user form ---->>>>>

$("#UserForm").click(function () {
  $("#UserEmailForm").removeClass("active");
  $("#UserEmailFormDiv").removeClass("active");
  $("#UserForm").addClass("active");
  $("#UserFormDiv").addClass("active");
});

$("#UserEmailForm").click(function () {
  $("#UserForm").removeClass("active");
  $("#UserFormDiv").removeClass("active");
  $("#UserEmailForm").addClass("active");
  $("#UserEmailFormDiv").addClass("active");
});
///////////     ADD new user form  <<<<<-------




//////minorCheck  ---->>>>>
$("#isMinor").click(function () {
  if ($("#isMinor").is(":checked")) {
    $("#hasParent").show();
  } else {
    $("#hasParent").hide();
  }
});
///////////    minorCheck  <<<<<-------




//////toast-header  ---->>>>>
$(".toast-header").click(function () {
  $("#toast").hide();
});
///////////    toast-header  <<<<<-------




///////////// input type number for  - ///////////////////////
var invalidChars = ["-", "e", "+", "E"];

$("input[type='number']").on("keydown", function (e) {
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
})

///////////// number for  - ///////////////////////



function printForm() {
  print()
}
// function exportHTML(){
//   var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
//        "xmlns:w='urn:schemas-microsoft-com:office:word' "+
//        "xmlns='http://www.w3.org/TR/REC-html40'>"+
//        "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
//   var footer = "</body></html>";
//   var sourceHTML = header+document.getElementById("source-html").innerHTML+footer;
  
//   var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
//   var fileDownload = document.createElement("a");
//   document.body.appendChild(fileDownload);
//   fileDownload.href = source;
//   fileDownload.download = 'document.doc';
//   fileDownload.click();
//   document.body.removeChild(fileDownload);
// }

$( document ).ready(function() {
  let text =$('#has_Access').val()
 if (text== 'true') {
  $('#grandAccess').prop('disabled', true)
 } else  if (text== 'false'){
  $('#deleteAccess').prop('disabled', true)
 }
});



async function Access(id,boolean) {
console.log('hi');
  window.location.href= ("/admin/Access/"+id+'/'+boolean);
}
