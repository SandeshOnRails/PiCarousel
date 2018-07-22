module.exports = function (app,dbRequest,con) {

	app.post('/images', function(req, res){
		
		console.log('admin categorie');
		
		dbRequest.getImages(con,"",function(result){

			let listcategories = result;
			console.log("in photo="+req.query.operation);
			res.render('admin/categories', {operation:'categorielist',result:listcategories});//from views categories.ejs
			console.log("data:"+JSON.stringify(result[0].categorie));
                         
    	});

         //res.render('viewCategorie/categoriemain');

    });

	 
}