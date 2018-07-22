function makeCategorieEditable(id, categorie){
   
   
    document.getElementById("categorie"+id).innerHTML = "<td><form id=\"editcategorie\" method=\"post\">"+
    "<input type=\"text\" name=\"fname\" value=\""+categorie+"\">"+
    "</form></td><td><a href=\"#\" onclick=\"saveCategorieEditable("+id+",'"+categorie+"');\" >submit</a> <a href=\"#\" onclick=\"cancelCategorieEditable("+id+",'"+categorie+"');\" >cancel</a></td>";
}
function cancelCategorieEditable(id, categorie){
   
   
    document.getElementById("categorie"+id).innerHTML = "<td ><a onclick=\"makeCategorieEditable("+id+",'"+categorie+"');\" href=\"#"+id+"\">"+categorie+"</a></td><td> <input type=\"checkbox\" class=\"form-check-input\" value=\""+id+"\"></td>";
}
function saveCategorieEditable(id, categorie){
   
   
    alert("will save soon");
}

function gotoMenu(menu){
     //alert('cav');
     //#idForm is the id
     //data: $("#idForm").serialize(),
     var data = {};
          data.title = "title";
          data.message = "message";
     $.ajax({
            type: "POST",
            url: "http://localhost:3000/"+menu,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              //alert('suc');
                console.log('success');
                            //console.log(JSON.stringify(data));
                            document.getElementById("categorieContent").innerHTML=data;
            }
        });
};