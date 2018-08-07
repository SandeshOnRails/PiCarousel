
function activateUsers(){

      
      var checkboxes = document.getElementsByName('userCheckboxids[]');
      var vals = "";
      for (var i=0, n=checkboxes.length;i<n;i++) 
      {
          if (checkboxes[i].checked) 
          {
              vals += checkboxes[i].value+",";
          }
      }
      if (vals.length>0){
      vals = vals.substring(0, vals.length - 1); 
      //alert(vals);
      var data={};
      data.operation = "usersActivate";
      data.id = vals;
      data.resultDiv = "categorieContent";
      postData(data);
    }
}

function suspendUsers(){

      
      var checkboxes = document.getElementsByName('userCheckboxids[]');
      var vals = "";
      for (var i=0, n=checkboxes.length;i<n;i++) 
      {
          if (checkboxes[i].checked) 
          {
              vals += checkboxes[i].value+",";
          }
      }
        if (vals.length>0){
      vals = vals.substring(0, vals.length - 1); 
      alert(vals);
      var data={};
      data.operation = "usersSuspend";
      data.id = vals;
      data.resultDiv = "categorieContent";
      postData(data);
    }
}