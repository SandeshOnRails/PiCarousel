module.exports = function (app,dbRequest,con) {
	
	var _recPerPage = 10;
	var _page =1;
	var _totalpage=0;
	var _list;
	var _listcondition;

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

	function ListviewBycondition(callback ,listconditon){
		
		console.log("a cond :"+listconditon);
		_listcondition = listconditon;

		dbRequest.getImageCount(con,"",function(itemcount){

				_totalpage= Math.ceil(Number.parseInt(itemcount[0].itemcount,10) / Number.parseInt(_recPerPage,10));
				next(_totalpage,_page,_listcondition);				
                         
    		});

	 	function next(totalpage,page,_listconditon){
    		console.log("db cond: "+_listconditon);
    		 dbRequest.getImagesBycondition(con,page,_recPerPage,_listconditon,"",function(result){

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

	 app.post('/imagesListWaiting', function(req, res){
	 	console.log("images");
	 	console.log("admin page session id: " + req.session.user_id)
	 	if (req.query.page)
	 		_page = req.query.page;

	 	ListviewBycondition(function(){
	 		res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	},'waiting');
	 


	 })

	 app.post('/imagesListRejected', function(req, res){
	 	console.log("images");
	 	console.log("admin page session id: " + req.session.user_id)
	 	if (req.query.page)
	 		_page = req.query.page;
	 	ListviewBycondition(function(){
	 		res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	},'rejected');
	 


	 })

	 app.post('/imagesListVerified', function(req, res){
	 	console.log("images");
	 	console.log("admin page session id: " + req.session.user_id)
	 	if (req.query.page)
	 		_page = req.query.page;
	 	ListviewBycondition(function(){
	 		res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	},'verified');
	 


	 })

    app.post('/waitingImage', function(req, res){
		
		
		
		dbRequest.waitingImage(con,req.body,function(result){

			_list = result;
			initializeListview(function(){
	 			res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 		});
                         
    	});

    });

    app.post('/verifiedImage', function(req, res){
		
		
		
		dbRequest.verifiedImage(con,req.body,function(result){

			_list = result;
			initializeListview(function(){
	 			res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 		});
                         
    	});

    });
    app.post('/rejectedImage', function(req, res){
		
		
		
		dbRequest.rejectedImage(con,req.body,function(result){

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




