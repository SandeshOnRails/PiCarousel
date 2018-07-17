
module.exports = function (app, con, search, checkForKey, findMatchPercent) {


// '/search' route to the search engine


 app.get('/search', function(req, res){

      	 res.render('search/search')
      })



 app.post('/search/results', function(req, res){


      	  var actualResult = ''
            
      // function to see if the searchKey matches the database descriptions. callback function return true if the search result matches

      // this function does REVERSE %LIKE SQL search by getting all the description of each image and storing them

      // into an array and matching instance of it

          checkForKey(req.body.searchKey, function(result){

              var searchTerm = result

              // if the search result does not match the search term
              
              if(!searchTerm) searchTerm = req.body.searchKey

                // %LIKE SQL search
     	  
              search(searchTerm, con, function(result){
                         
                      
                          // find match percent through findMatchPercent() implemented below

                        if(result.length > 0) {

                          let matchPercent = findMatchPercent(req.body.searchKey, searchTerm).toFixed(0)

                          matchPercent = matchPercent +"% match"

                             res.render('search/search-results', {result: result, searchKey:req.body.searchKey, actualResult: searchTerm, matchPercent: matchPercent})
                        } 

                                 // if no match in the database then return empty result object to search-results page
                        else {

                            res.render('search/search-results', {result: result})
                        }


              
              })
            
          })

      })














}