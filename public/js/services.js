
//general functions
function gotoMenu(menu){

      if (menu =="home"){
          postMet = "get";
          dest = "";
      }else{
          postMet = "post";
          dest = menu;
      }
      
      var data={};
      if (dest == ""){
        window.location.href = "/";
        return false;
      }
     $.ajax({
            type: postMet,
            url: "/"+menu,
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

function navigateToPage(section,resultdiv,page){

    var data={};
    data.operation = section;
    data.page = page;
    data.resultDiv = resultdiv;
    postData(data);

};


function postData(data){

     var resultdiv= data.resultDiv;


     $.ajax({
            type: "POST",
            url: "/"+data.operation,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              //alert('suc');
                console.log('success post data');
                            //console.log(JSON.stringify(data));
                            //alert(resultdiv);
                            document.getElementById(resultdiv).innerHTML=data;
            }
        });
};

function getData(data){

     var resultdiv= data.resultDiv;


     $.ajax({
            type: "GET",
            url: "/"+data.operation,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              //alert('suc');
                console.log('success post data');
                            //console.log(JSON.stringify(data));
                            //alert(resultdiv);
                            document.getElementById(resultdiv).innerHTML=data;
            }
        });
};