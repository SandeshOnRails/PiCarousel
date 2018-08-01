
function postStatusImage(postTo){

      
      var checkboxes = document.getElementsByName('imageCheckboxids[]');
      var vals = "";
    
          for (var i=0, n=checkboxes.length;i<n;i++) 
          {
              if (checkboxes[i].checked) 
              {
                  vals += checkboxes[i].value+",";
              }
          }
          //if ( postTo !="waitingImage"  &&   postTo !="verifiedImage" && postTo !="rejectedImage"){
          vals = vals.substring(0, vals.length - 1); 
          //alert(vals);
          var data={};
          data.operation = postTo;
          data.id = vals;
          data.resultDiv = "categorieContent";
          
            //alert('posting');
            postData(data);
          //}else{
           //  alert('not');
         // }
      
      
      
}

