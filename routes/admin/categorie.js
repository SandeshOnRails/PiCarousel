module.exports = function (app,dbRequest,con) {

	app.post('/categories', function(req, res){
		
		console.log('admin categorie');
		
		dbRequest.getCategories(con,"",function(result){

			let listcategories = result;
			console.log("in photo="+req.query.operation);
			res.render('admin/viewCategories', {operation:'categorielist',result:listcategories});//from views categories.ejs
			//console.log("data:"+JSON.stringify(result[0].categorie));
                         
    	});

         //res.render('viewCategorie/categoriemain');

    });

    	app.post('/categoriesEdit', function(req, res){
		
		console.log('admin edit ategorie');
		
		dbRequest.editCategories(con,"",function(result){

			let listcategories = result;
			console.log("in photo="+req.query.operation);
			res.render('admin/viewCategories', {operation:'categorielist',result:listcategories});//from views categories.ejs
			//console.log("data:"+JSON.stringify(result[0].categorie));
                         
    	});

         //res.render('viewCategorie/categoriemain');

    });

	 
}




