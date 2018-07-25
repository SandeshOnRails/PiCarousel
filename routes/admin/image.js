module.exports = function (app,dbRequest,con) {
	
	var _recPerPage = 2;
	var _page =1;
	var _totalpage=0;
	var _list;

	function initializeListview(callback){

		dbRequest.getImageCount(con,"",function(itemcount){

				_totalpage= Math.ceil(Number.parseInt(itemcount[0].itemcount,10) / Number.parseInt(_recPerPage,10));
				next(_totalpage,_page);				
                         
    		});

	 	function next(totalpage,page){
    		console.log("after list : ");
    		 dbRequest.getImages(con,page,_recPerPage,"",function(result){

				_list = result;
				_page=page;
				
             callback();            
    		});
    			
    	};
	}

	 app.post('/images', function(req, res){
	 	console.log("images");
	 	console.log("admin page session id: " + req.session.user_id)
	 	if (req.query.page)
	 		_page = req.query.page;
	 	initializeListview(function(){
	 		res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	});
	 


	 })


    app.post('/imagesEdit', function(req, res){
		
		dbRequest.updateCategorie(con,req.body,function(result){

			_llist = result;
			initializeListview(function(){
	 		res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	});
                         
    	});
    	

         //res.render('viewCategorie/categoriemain');

    });

    app.post('/imagesSaveNew', function(req, res){
		
		dbRequest.insertCategorie(con,req.body,function(result){

			_list = result;
			_page=1;
			initializeListview(function(){
	 			res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 		});
                         
    	});

    });

    app.post('/imagesDelete', function(req, res){
		
		
		
		dbRequest.deleteCategorie(con,req.body,function(result){

			_list = result;
			initializeListview(function(){
	 			res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 		});
                         
    	});

    });

    app.post('/imagesChangePage', function(req, res){
		
		
		
		if (req.body.page == '+'){
			if (_totalpage>_page)
			_page++;
		}else if (req.body.page == '-'){
			if (_page>1)
			_page--;
		}else
		_page = Number.parseInt(req.body.page,10);
		initializeListview(function(){
	 			res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 		});
    	


    });
	 
}




