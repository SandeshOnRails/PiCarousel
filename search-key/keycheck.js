module.exports = (searchKey)=> {
  
  var database = ['parrot', 'bird', 'dog', 'kingfisher', 'huskey', 'cute']


             for(var i =0; i < database.length; i++) {

             	   if(database[i].length > searchKey.length) {
                         
                         if(database[i].match(searchKey)) return database[i]
             	   }

             	else {
                         
                         if(searchKey.match(database[i])) return database[i]

             	}
             }
   return ''

                
}