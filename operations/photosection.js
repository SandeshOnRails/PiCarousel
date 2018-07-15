module.exports = {

//photo section
/*
                var ret = dbRequest.getUsers(con,"",function(result){
                console.log("in photo="+req.query.operation);
               

                        if(result.length > 0) {
                             res.render('admin', {operation:'photos'});
                        } else {

                            res.render('admin', {operation:'photos'});
                        }
              
                    });
                    */
      (function(){
           if (req.query.operation == "photos"){
            
              console.log("app.js photos");

                          if (req.query.submenu == "uploadimage"){
                             console.log("in photo="+req.query.submenu);

                              console.log("app.js photos");

                              dbRequest.getCategories(con,"",function(result){
                                    let selectdata = result;
                                      console.log("in photo="+req.query.operation);
               
                                   res.render('admin', {operation:'photos',submenu:'uploadimage',result:selectdata});
                                   console.log("data:"+JSON.stringify(selectdata[0].categorie_id));
                          
                                });

                          }


                          if (req.query.submenu == "list"){
                             console.log("in photo="+req.query.submenu);

                              console.log("app.js photos list");
                             
                                             res.render('admin', {operation:'photos',submenu:'list'});
                               

                          }

                         if ( !req.query.submenu  ){
                            res.render('admin', {operation:'photos',submenu:'list'});
                          }

          }
    })();
   
}