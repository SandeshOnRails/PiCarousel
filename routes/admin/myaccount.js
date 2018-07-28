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

	function ListviewBycondition(callback ,listcondition){

		console.log("a cond :"+listcondition);
		_listcondition = listcondition;

		dbRequest.getImageCountBycondition(con,_listcondition,"",function(itemcount){

				_totalpage= Math.ceil(Number.parseInt(itemcount[0].itemcount,10) / Number.parseInt(_recPerPage,10));
				next(_totalpage,_page,_listcondition);				
                         
    		});

	 	function next(totalpage,page,_listcondition){
    		console.log("db cond: "+_listcondition);
    		 dbRequest.getImagesBycondition(con,page,_recPerPage,_listcondition,"",function(result){

				_list = result;
				_page=page;
				
             callback();            
    		});
    			
    	};
	}

	 app.post('/myaccount', function(req, res){
	 	_listcondition = "all";
	 	console.log("images");
	 	console.log("admin page session id: " + req.session.user_id)
	 	if (req.query.page)
	 		_page = req.query.page;
	 	initializeListview(function(){
	 		res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	});
	 


	 })

	 app.post('/myaccountimagesListWaiting', function(req, res){
	 	console.log("images");
	 	console.log("admin page session id: " + req.session.user_id)
	 	if (req.query.page)
	 		_page = req.query.page;

	 	ListviewBycondition(function(){
	 		res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	},'waiting');
	 


	 })

	 app.post('/myaccountimagesListRejected', function(req, res){
	 	console.log("images");
	 	console.log("admin page session id: " + req.session.user_id)
	 	if (req.query.page)
	 		_page = req.query.page;
	 	ListviewBycondition(function(){
	 		res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	},'rejected');
	 


	 })

	 app.post('/myaccountimagesListVerified', function(req, res){
	 	console.log("images");
	 	console.log("admin page session id: " + req.session.user_id)
	 	if (req.query.page)
	 		_page = req.query.page;
	 	ListviewBycondition(function(){
	 		res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	},'verified');
	 


	 })

    app.post('/myaccountwaitingImage', function(req, res){
		
		
		
		dbRequest.waitingImage(con,req.body,function(result){

			_list = result;
			initializeListview(function(){
	 			res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 		});
                         
    	});

    });

    app.post('/myaccountverifiedImage', function(req, res){
		
		
		
		dbRequest.verifiedImage(con,req.body,function(result){

			_list = result;
			initializeListview(function(){
	 			res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 		});
                         
    	});

    });
    app.post('/myaccountrejectedImage', function(req, res){
		
		
		
		dbRequest.rejectedImage(con,req.body,function(result){

			_list = result;
			initializeListview(function(){
	 			res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 		});
                         
    	});

    });

    app.post('/myaccountimagesChangePage', function(req, res){
		
		
		
		if (req.body.page == '+'){
			if (_totalpage>_page)
			_page++;
		}else if (req.body.page == '-'){
			if (_page>1)
			_page--;
		}else
		_page = Number.parseInt(req.body.page,10);
		ListviewBycondition(function(){
			console.log("page next / prev"+_listcondition);
	 			res.render('admin/viewImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 		},_listcondition);
    	


    });
	 
}




