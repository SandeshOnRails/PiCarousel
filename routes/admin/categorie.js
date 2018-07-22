module.exports = function (app,dbRequest,con) {
	var page =0;
	 app.get('/categories', function(req, res){

	 	page = req.query.page;

	 	 dbRequest.getCategories(con,"",function(result){

			let listcategories = result;
			next(result);
                         
    	});
	 	function next(result){
    		console.log("after list : ");

    		dbRequest.getCategorieCount(con,"",function(pagecount){

				let listcategories = result;
				res.render('admin/viewCategories', {operation:'categorielist',result:listcategories,page:pagecount});//from views categories.ejs
				console.log("page:"+page);
				page = 5;
                         
    		});

    		
    	}
	 })

	app.post('/categories', function(req, res){
		
		console.log('admin categorie');
		
		dbRequest.getCategories(con,"",function(result){

			let listcategories = result;
			res.redirect('/categories?page=1');

                         
    	});

         //res.render('viewCategorie/categoriemain');

    });

    app.post('/categoriesEdit', function(req, res){
		
		console.log("cat edit:"+JSON.stringify(req.body));
		
		dbRequest.updateCategorie(con,req.body,function(result){

			let listcategories = result;
			res.redirect('/categories');
                         
    	});
    	

         //res.render('viewCategorie/categoriemain');

    });

    app.post('/categoriesSaveNew', function(req, res){
		
		console.log("cat save new:"+JSON.stringify(req.body));
		
		dbRequest.insertCategorie(con,req.body,function(result){

			let listcategories = result;
			res.redirect('/categories');
                         
    	});
    	

         //res.render('viewCategorie/categoriemain');

    });

    app.post('/categoriesDelete', function(req, res){
		
		console.log("cat save new:"+JSON.stringify(req.body));
		
		dbRequest.deleteCategorie(con,req.body,function(result){

			let listcategories = result;
			res.redirect('/categories');
                         
    	});
    	

         //res.render('viewCategorie/categoriemain');

    });
	 
}




