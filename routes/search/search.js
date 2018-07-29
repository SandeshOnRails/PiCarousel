
module.exports = function (app, con, search, checkForKey, findMatchPercent) {


// '/search' route to the search engine


 

 app.post('/search', function(req, res) {

          
          console.log(req.body.category)

        search(req.body.category, con, result=>{

            console.log(result.length)
              
              res.render('search/search-results', {session_username: req.session.user || '', results: result, searchkey: req.body.searchKey})

        })


       

 })

















}