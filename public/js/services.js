function makeCategorieEditable(id, categorie){
   
   
    document.getElementById("categorie"+id).innerHTML = "<td><form id=\"editcategorie\" method=\"post\">"+
    "<input type=\"text\" id=\"categorieInput\" name=\"categorieInput\" value=\""+categorie+"\">"+
    "</form></td><td><a href=\"#\" onclick=\"saveCategorieEditable("+id+",'categorieInput');\" >submit</a> <a href=\"#\" onclick=\"cancelCategorieEditable("+id+",'"+categorie+"');\" >cancel</a></td>";
}
function cancelCategorieEditable(id, categorie){
   
   
    document.getElementById("categorie"+id).innerHTML = "<td ><a onclick=\"makeCategorieEditable("+id+",'"+categorie+"');\" href=\"#"+id+"\">"+categorie+"</a></td><td> <input type=\"checkbox\" class=\"form-check-input\" value=\""+id+"\"></td>";
}
function saveCategorieEditable(id, categorie){
  //alert(categorie);
  //alert(document.getElementById("categorieInput").value);
    var data={};
    data.operation = "categoriesEdit";
    data.id=id;
    data.categorie = document.getElementById(categorie).value;
    data.resultDiv = "categories";
    editData(data);
   
    //alert("will save soon");
}

function adNewCategorie(){
  
   
    document.getElementById("operation").innerHTML = "<form id=\"newcategorie\" method=\"post\">"+
    "<input type=\"text\" id=\"categorie\" name=\"categorie\" >"+
    "</form><a href=\"#\" onclick=\"saveNewCategorie('categorie');\" >submit</a> <a href=\"#\" onclick=\"newCategorieCancel();\" >cancel</a>";
}

function newCategorieCancel(){
  document.getElementById("operation").innerHTML ="";
}

function saveNewCategorie(tagid){
  var data={};
    data.operation = "categoriesSaveNew";
    data.categorie = document.getElementById(tagid).value;
    data.resultDiv = "categories";
    insertData(data);
}
function deleteCategorie(tagid){

      
      var checkboxes = document.getElementsByName('categorieDeleteids[]');
      var vals = "";
      for (var i=0, n=checkboxes.length;i<n;i++) 
      {
          if (checkboxes[i].checked) 
          {
              vals += checkboxes[i].value+",";
          }
      }
      
      vals = vals.substring(0, vals.length - 1); 
      //alert(vals);
  var data={};
    data.operation = "categoriesDelete";
    data.id = vals;
    data.resultDiv = "categories";
    deleteData(data);
}
//general functions
function gotoMenu(menu){
     //alert('cav');
     //#idForm is the id
     //data: $("#idForm").serialize(),
     //alert(menu);
     var data = {};
          data.title = "title";
          data.message = "message";
     $.ajax({
            type: "POST",
            url: "http://localhost:3000/"+menu,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
             // alert('suc');
                console.log('success');
                            //console.log(JSON.stringify(data));
                           document.getElementById("categorieContent").innerHTML=data;
            }
        });
};

function editData(data){
     //alert('editing categorie');
     //alert(data.operation);
     //#idForm is the id
     //data: $("#idForm").serialize(),
     var resultdiv= data.resultDiv;

     $.ajax({
            type: "POST",
            url: "http://localhost:3000/"+data.operation,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              //alert('suc');
                console.log('success edit categorie');
                            //console.log(JSON.stringify(data));
                            //alert(resultdiv);
                            document.getElementById(resultdiv).innerHTML=data;
            }
        });
};

function insertData(data){
     //alert('editing categorie');
     //alert(data.operation);
     //#idForm is the id
     //data: $("#idForm").serialize(),
     var resultdiv= data.resultDiv;

     $.ajax({
            type: "POST",
            url: "http://localhost:3000/"+data.operation,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              //alert('suc');
                console.log('success edit categorie');
                            //console.log(JSON.stringify(data));
                            //alert(resultdiv);
                            document.getElementById(resultdiv).innerHTML=data;
            }
        });
};

function deleteData(data){
     //alert('editing categorie');
     //alert(data.operation);
     //#idForm is the id
     //data: $("#idForm").serialize(),
     var resultdiv= data.resultDiv;

     $.ajax({
            type: "POST",
            url: "http://localhost:3000/"+data.operation,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              //alert('suc');
                console.log('success delete data');
                            //console.log(JSON.stringify(data));
                            //alert(resultdiv);
                            document.getElementById(resultdiv).innerHTML=data;
            }
        });
};

function postData(data){
     //alert('editing categorie');
     //alert(data.operation);
     //#idForm is the id
     //data: $("#idForm").serialize(),
     var resultdiv= data.resultDiv;

     $.ajax({
            type: "POST",
            url: "http://localhost:3000/"+data.operation,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              //alert('suc');
                console.log('success delete data');
                            //console.log(JSON.stringify(data));
                            //alert(resultdiv);
                            document.getElementById(resultdiv).innerHTML=data;
            }
        });
};

function navigateToPage(section,resultdiv,page){
     //alert('editing categorie');
     //alert(data.operation);
     //#idForm is the id
     //data: $("#idForm").serialize(),
     var data={};
    data.operation = section;
    data.page = page;
    data.resultDiv = resultdiv;
     var resultdiv= data.resultDiv;

     $.ajax({
            type: "POST",
            url: "http://localhost:3000/"+data.operation,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              //alert('suc');
                console.log('success navigate to page');
                            //console.log(JSON.stringify(data));
                            //alert(resultdiv);
                            document.getElementById(resultdiv).innerHTML=data;
            }
        });
};