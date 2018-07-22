module.exports = function (app,dbRequest,con) {
	
	var recPerPage = 2;
	var page =1;
	var totalpage=0;
	 app.get('/categories', function(req, res){
	 	if (req.query.page)
	 		page = req.query.page;
	 	else
	 		page = 1;
	 	console.log("route here ");
	 	
	 	 
	 	 dbRequest.getCategorieCount(con,"",function(itemcount){

    			console.log("itcnt:"+itemcount[0].itemcount);
				totalpage= Math.ceil(Number.parseInt(itemcount[0].itemcount,10) / Number.parseInt(recPerPage,10));
				
				console.log("page *:"+page);
				console.log("total page *:"+totalpage);
				console.log("item count*:"+itemcount[0].itemcount);
				console.log(JSON.stringify(itemcount));
				next(totalpage,page);				
                         
    		});

	 	function next(totalpage,page){
    		console.log("after list : ");
    		 dbRequest.getCategories(con,page,recPerPage,"",function(result){

				let listcategories = result;

				res.render('admin/viewCategories', {operation:'categorielist',result:listcategories,totalpage:totalpage,page:page});//from views categories.ejs
                         
    		});
    		

    		
    	};



	 })

	app.post('/categories', function(req, res){
		
		console.log('admin categorie');
		res.redirect('/categories');
    });

    app.post('/categoriesEdit', function(req, res){
		
		console.log("cat edit:"+JSON.stringify(req.body));
		
		dbRequest.updateCategorie(con,req.body,function(result){

			let listcategories = result;
			res.redirect('/categories?page=2');
                         
    	});
    	

         //res.render('viewCategorie/categoriemain');

    });

    app.post('/categoriesSaveNew', function(req, res){
		
		console.log("cat save new:"+JSON.stringify(req.body));
		
		dbRequest.insertCategorie(con,req.body,function(result){

			let listcategories = result;
			res.redirect('/categories?page=3');
                         
    	});
    	

         //res.render('viewCategorie/categoriemain');

    });

    app.post('/categoriesDelete', function(req, res){
		
		console.log("cat save new:"+JSON.stringify(req.body));
		
		dbRequest.deleteCategorie(con,req.body,function(result){

			let listcategories = result;
			res.redirect('/categories?page');
                         
    	});
    	

         //res.render('viewCategorie/categoriemain');

    });

    app.post('/categorieChangePage', function(req, res){
		
		console.log("navigate:"+JSON.stringify(req.body.page));
		console.log("navigate :"+req.body);
		page = req.body.page;
		res.redirect('/categories?page='+req.body.page);
    	

         //res.render('viewCategorie/categoriemain');

    });
	 
}




