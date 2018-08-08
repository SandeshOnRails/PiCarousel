
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

function popimage(dest,imname){

     
    var data={};
    data.imgname = imname;

     $.ajax({
            type: "POST",
            url: "/"+dest,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              //alert('suc');
                console.log('success post data');
                            //console.log(JSON.stringify(data));
                            //alert(resultdiv);
                            var w = window.open('about:blank', 'windowname');
                            w.document.write(data);
                            w.document.close();
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

function passRecover(email){
  if (email == "")
    alert("please provide an email address to recover your password");
  else{
      var data={};
      data.email = email;
      data.operation = "recover";
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
                            document.getElementById('recov').innerHTML=data;
            }
        });

     }

}