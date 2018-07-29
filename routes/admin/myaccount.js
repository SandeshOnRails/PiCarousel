module.exports = function (app,dbRequest,con) {
	
	var _recPerPage = 10;
	var _page =1;
	var _totalpage=0;
	var _list;
	var _listcondition;
	var _licence="all";
	var _privacy="all";;
	var _verification="all";

	function initializeListview(callback){

		dbRequest.getImageCount(con,"",function(itemcount){

				_totalpage= Math.ceil(Number.parseInt(itemcount[0].itemcount,10) / Number.parseInt(_recPerPage,10));
				next(_totalpage,_page);				
                         
    		});

	 	function next(totalpage,page){
    		console.log("after list : ");
    		 dbRequest.getUserImages(con,page,_recPerPage,"",function(result){

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
	 	console.log("my account");
	 	console.log("admin page session id: " + req.session.user_id)
	 	if (req.query.page)
	 		_page = req.query.page;
	 	initializeListview(function(){
	 		res.render('admin/viewMyaccount', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	});
	 


	 })

	app.post('/myaccountProfile', function(req, res){
	 	_listcondition = "all";
	 	console.log("my account profile");
	 	console.log("admin page session id: " + req.session.user_id)
	 	
	 		
	 		dbRequest.getOneUser(con,req.body,function(data){

				
				res.render('admin/viewMyaccountProfile', {operation:'list',result:data});//from views categories.ejs					
                         
    		});	 


	 })

	app.post('/myaccountProfileSave', function(req, res){

		console.log("my acount profile save ");
	 	
	 	dbRequest.editUserProfile(con,req.body,function(result){

		callnext();
                         
    	});

    	function callnext(){


    		dbRequest.getOneUser(con,req.body,function(data){

				
				res.render('admin/viewMyaccountProfile', {operation:'list',result:data});//from views categories.ejs
                         
    		});	 


    			
			
    	}


	 })

	app.post('/myaccountImages', function(req, res){
	 	_listcondition = "all";
	 	console.log("my account images");
	 	console.log("admin page session id: " + req.session.user_id)
	 	if (req.query.page)
	 		_page = req.query.page;
	 	initializeListview(function(){
	 		res.render('admin/viewMyaccountImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	});

	 })

	app.post('/myaccountImagesUpload', function(req, res){
	 	_listcondition = "all";
	 	console.log("my account images");
	 	console.log("admin page session id: " + req.session.user_id)
	 	if (req.query.page)
	 		_page = req.query.page;
	 	dbRequest.getCategoriesAll(con,"",function(data){

				
				res.render('admin/photoUploadForm', {operation:'list',result:data});//from views categories.ejs		
                         
    		});	 
	 	

	 })

	 app.post('/myaccountImagesByCondition', function(req, res){
	 	console.log("my account images condition");
	 	console.log("admin page session id: " + req.session.user_id)
	 	if (req.query.page)
	 		_page = req.query.page;

	 	ListviewBycondition(function(){
	 		res.render('admin/viewMyaccountImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	},'waiting');
	 


	 })

	

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
	 			res.render('admin/viewMyaccountImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 		},_listcondition);
    	


    });
	 
}




