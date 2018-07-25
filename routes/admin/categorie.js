module.exports = function (app,dbRequest,con) {
	
	var _recPerPage = 2;
	var _page =1;
	var _totalpage=0;
	var _listcategories;

	function initializeListview(callback){

		dbRequest.getCategorieCount(con,"",function(itemcount){

    			//console.log("itcnt:"+itemcount[0].itemcount);
				_totalpage= Math.ceil(Number.parseInt(itemcount[0].itemcount,10) / Number.parseInt(_recPerPage,10));
				
				//console.log("page *:"+_page);
				//console.log("total page *:"+_totalpage);
				//console.log("item count*:"+itemcount[0].itemcount);
				//console.log(JSON.stringify(itemcount));
				next(_totalpage,_page);				
                         
    		});

	 	function next(totalpage,page){
    		console.log("after list : ");
    		 dbRequest.getCategories(con,page,_recPerPage,"",function(result){

				_listcategories = result;
				_page=page;
				
             callback();            
    		});
    			
    	};
	}

	 app.post('/categories', function(req, res){
	 	console.log("admin page session id: " + req.session.user_id)
	 	if (req.query.page)
	 		_page = req.query.page;
	 	initializeListview(function(){
	 		res.render('admin/viewCategories', {operation:'categorielist',result:_listcategories,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	});
	 


	 })


    app.post('/categoriesEdit', function(req, res){
		
		dbRequest.updateCategorie(con,req.body,function(result){

			_llistcategories = result;
			initializeListview(function(){
	 		res.render('admin/viewCategories', {operation:'categorielist',result:_listcategories,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	});
                         
    	});
    	

         //res.render('viewCategorie/categoriemain');

    });

    app.post('/categoriesSaveNew', function(req, res){
		
		dbRequest.insertCategorie(con,req.body,function(result){

			_listcategories = result;
			page=1;
			initializeListview(function(){
	 			res.render('admin/viewCategories', {operation:'categorielist',result:_listcategories,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 		});
                         
    	});

    });

    app.post('/categoriesDelete', function(req, res){
		
		
		
		dbRequest.deleteCategorie(con,req.body,function(result){

			let listcategories = result;
			initializeListview(function(){
	 			res.render('admin/viewCategories', {operation:'categorielist',result:_listcategories,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 		});
                         
    	});

    });

    app.post('/categorieChangePage', function(req, res){
		
		
		
		if (req.body.page == '+'){
			if (_totalpage>_page)
			_page++;
		}else if (req.body.page == '-'){
			if (_page>1)
			_page--;
		}else
		_page = Number.parseInt(req.body.page,10);
		initializeListview(function(){
	 			res.render('admin/viewCategories', {operation:'categorielist',result:_listcategories,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 		});
    	


    });
	 
}




