
function postStatusMyAccount(postTo, resDiv){

      var data={};
      data.operation = postTo;
      data.resultDiv = resDiv;
      postData(data);
}
var filter ={};

function filterMyPhoto(postTo,resDiv){
      

      var data={};
      data.licence = document.getElementById("licence").value;
      data.privacy = document.getElementById("privacy").value;
      data.status = document.getElementById("status").value;
      data.operation = postTo;
      data.resultDiv = resDiv;
      
      postData(data);
}
function myaccountImagesChangePhotoProperties(  postTo, userAction,resDiv){
      
      //set image(s) delete, public, private etc 
     var checkboxes = document.getElementsByName('imageCheckboxids[]');
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
      data.id= vals;
      data.useraction = userAction;
      data.operation = postTo;
      data.resultDiv = resDiv;
      //    alert(vals);
      postData(data);
}

function saveMyAccountProfile(id){
  //alert(categorie);
  //alert(document.getElementById("categorieInput").value);
   var data={};
    data.operation = "myaccountProfileSave";
    data.id=id;
    data.firstname = document.getElementById("firstnameedit").value;
    data.lastname = document.getElementById("lastnameedit").value;
    data.email = document.getElementById("emailedit").value;
    data.age = document.getElementById("ageedit").value;
    data.gender = document.getElementById("genderedit").value;
    data.resultDiv = "categorieContent";
    postData(data);
   
}

function makeMyAccountProfileEditable(id, firstname,lastname,email,age,gender,account){
   
   
    /*document.getElementById("profileTable").innerHTML = "<td><form id=\"editcategorie\" method=\"post\">"+
    "<input type=\"text\" id=\"categorieInput\" name=\"categorieInput\" value=\""+categorie+"\">"+
    "</form></td><td><a href=\"#\" onclick=\"saveCategorieEditable("+id+",'categorieInput');\" >submit</a> <a href=\"#\" onclick=\"cancelCategorieEditable("+id+",'"+categorie+"');\" >cancel</a></td>";
    */
    document.getElementById("firstname").innerHTML =  "<input type=\"text\" id=\"firstnameedit\" name=\"firtname\" value=\""+firstname+"\">";
    document.getElementById("lastname").innerHTML = "<input type=\"text\" id=\"lastnameedit\" name=\"lastname\" value=\""+lastname+"\">";
    document.getElementById("email").innerHTML = "<input type=\"text\" id=\"emailedit\" name=\"email\" value=\""+email+"\">";
    document.getElementById("age").innerHTML = "<input type=\"text\" id=\"ageedit\" name=\"age\" value=\""+age+"\">";
    //document.getElementById("gender").innerHTML = "<input type=\"text\" id=\"genderedit\" name=\"gender\" value=\""+gender+"\">";
    
     formselect  = "<select id=\"genderedit\" class=\"selectpicker\">";

                if (gender == "not specified" && gender != "male" && gender != "female"){
                  formselect = formselect + "<option selected=\"true\">not specified</option>";
                  formselect = formselect + "<option>male</option>";
                  formselect = formselect + "<option>female</option></select>";
                  
                }
                else if ( gender == "male" ){
                  formselect = formselect + "<option >not specified</option>";
                  formselect = formselect + "<option selected=\"true\">male</option>";
                  formselect = formselect + "<option>female</option></select>";
                }else{
                  formselect = formselect + "<option >not specified</option>";
                  formselect = formselect + "<option >male</option>";
                  formselect = formselect + "<option selected=\"true\">female</option></select>";
                }

     document.getElementById("gender").innerHTML = formselect;

    document.getElementById("buttons").innerHTML = "<button style=\"color:white;background-color:#d65151;\" "+
     "type=\"button\" onclick=\"saveMyAccountProfile("+id+");\""+
      "class=\"btn btn-secondary btn-sm\">save </button>"+
      "<button style=\"color:white;background-color:#d65151;\" "+
     "type=\"button\" onclick=\"postStatusMyAccount('myaccountProfile','categorieContent');\""+
      "class=\"btn btn-secondary btn-sm\">cancel </button>";
}




function b(){
  alert('a');
}
function uploadNewPhoto(){
  alert('a');
}