function selectField(evt) {
    $(".fieldBorder").attr("fill", "rgba(255, 255, 255, 0)");
    var fieldId = evt.target.parentElement.id.split("_")[1];
    $("#fieldId").val(fieldId);
    $("#fieldIdP").html("<b>Field " + fieldId + "</b>");
    $("#" + evt.target.parentElement.id + "_border").attr("fill", "rgba(255, 255, 0, 0.25)");
}