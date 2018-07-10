const con = require('../config/config.js');

module.exports = (searchKey, callback)=> {

    var found = false

var database = []

    con.connect(function(err) {

  if(err){
    console.log("error connecting: " + err)
  }
  else {
    console.log('connection successful')
  }

 con.query("SELECT * FROM photos", function(err, result, fields){
              

      if(err){
        console.log(err)
      }
        else { 
             
             for(var j =0; j < result.length; j++) {
                   
                   var newArr = result[j].description.split(',')
                   database.push(newArr)

             }

            database = [].concat.apply([], database);


                           for(var i =0; i < database.length; i++) {

                   if(database[i].length > searchKey.length) {
                         
                         if(database[i].match(searchKey)){ 
                          callback(database[i])
                          found =true
                          break
                      }

                   }

                else {
                         
                         if(searchKey.match(database[i])){
                            found = true
                          callback(database[i])
                          break 
                      }

                }
             }


             if(!found) callback('')

        }
});


});
 
                
}