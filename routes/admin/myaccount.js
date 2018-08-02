module.exports = function (app,dbRequest,con) {
	
	var _recPerPage = 2;
	var _page =1;
	var _totalpage=0;
	var _list;
	var _filter ="no";
	var G_user ={
		id : '',
		name : '',
		accounttype : ''
	}
	var G_listcondition = {
    	licence: 'all',
    	privacy: 'all',
    	status : 'all',
    	user : G_user
	};
	
	



	function initializeListview(callback){

		dbRequest.getUserImageCount(con,G_user,function(itemcount){

				_totalpage= Math.ceil(Number.parseInt(itemcount[0].itemcount,10) / Number.parseInt(_recPerPage,10));
				next(_totalpage,_page);				
                         
    		});

	 	function next(totalpage,page){
    		console.log("after list : ");
    		 dbRequest.getUserImages(con,page,_recPerPage,G_user,function(result){

				_list = result;
				_page=page;
				
             callback();            
    		});
    			
    	};
	}




	function imageListviewByFilter(callback ,G_listcondition){

		console.log("a cond :"+G_listcondition);
		G_listcondition = G_listcondition;

		dbRequest.getUserImageCountByFiler(con,G_listcondition,G_user,function(itemcount){

				_totalpage= Math.ceil(Number.parseInt(itemcount[0].itemcount,10) / Number.parseInt(_recPerPage,10));
				next(_totalpage,_page,G_listcondition);				
                         
    		});

	 	function next(totalpage,page,G_listcondition){
    		console.log("db cond: "+G_listcondition);
    		 dbRequest.getUserImagesByFilter(con,page,_recPerPage,G_listcondition,G_user,function(result){

				_list = result;
				_page=page;
				
             callback();            
    		});
    			
    	};
	}

	app.post('/myaccountProfile', function(req, res){
		G_user.id  = req.session.user_id;
	 	_filter = "no";
	 	console.log("my account profile");
	 	console.log("admin page session id: " + req.session.user_id)
	 		
	 		dbRequest.getOneUser(con,G_user,function(data){
				res.render('admin/viewMyaccountProfile', {operation:'list',result:data});//from views categories.ejs					
    		});	 


	 })

	app.post('/myaccountProfileSave', function(req, res){
		G_user.id  = req.session.user_id;
		_filter = "no";
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
		G_user.id  = req.session.user_id;
		_filter = "no";	 	
	 	console.log("my account images");
	 	console.log("admin page session id: " + req.session.user_id)
	 	
	 	if (req.query.page)
	 		_page = req.query.page;

	 	initializeListview(function(){
	 		res.render('admin/viewMyaccountImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	});

	 })

	app.post('/myaccountImagesChangePhotoProperties', function(req, res){
		G_user.id  = req.session.user_id;
		_filter = "no";	 	
	 	console.log("my account images change image properties section");
	 	console.log("admin page session id: " + req.session.user_id)
	 	
	 	if (req.query.page)
	 		_page = req.query.page;

	 
    	
    			dbRequest.editPropertiesUserImages(con,req.body,function(result){

					imageListviewByFilter(function(){
						console.log("page next / prev"+G_listcondition);
	 					res.render('admin/viewMyaccountImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 				},G_listcondition);
    			});
        		console.log("editPropertiesUserImages");


	 	/*
	 	initializeListview(function(){
	 		res.render('admin/viewMyaccountImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	});
		*/


	 })

	app.post('/myaccountImagesUpload', function(req, res){
		G_user.id  = req.session.user_id;
		_filter = "no";
	 	console.log("my account images");
	 	console.log("admin page session id: " + req.session.user_id)
	 	if (req.query.page)
	 		_page = req.query.page;

	 	 dbRequest.getCategoriesAll(con,"",function(result){

				res.render('admin/photoUploadForm', {operation:'list',result:result});//from views categories.ejs
    		});

	 })
/*
	 app.post('/myaccountImagesByCondition', function(req, res){
	 	console.log("my account images condition");
	 	console.log("admin page session id: " + req.session.user_id)
	 	if (req.query.page)
	 		_page = req.query.page;

	 	ListviewBycondition(function(){
	 		res.render('admin/viewMyaccountImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	},'waiting');
	 


	 })
*/
	app.post('/myaccountImagesByConditionFilter', function(req, res){
		G_user.id  = req.session.user_id;
		_filter = "yes";
		console.log("filter"+_filter);
		//console.log(data.sampleTime);
		//console.log(req.body.privacy);
		//console.log(req.body.status);
		_page=1;
		G_listcondition.licence = req.body.licence;
		G_listcondition.privacy = req.body.privacy;
		G_listcondition.status = req.body.status;
			imageListviewByFilter(function(){
				console.log("page next / prev"+G_listcondition);
	 			res.render('admin/viewMyaccountImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 		},G_listcondition);
		/*
	 	console.log("my account images condition");
	 	console.log("admin page session id: " + req.session.user_id)
	 	if (req.query.page)
	 		_page = req.query.page;

	 	ListviewBycondition(function(){
	 		res.render('admin/viewMyaccountImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	},'waiting');
	 */


	 })

    app.post('/myaccountimagesChangePage', function(req, res){
		G_user.id  = req.session.user_id;
		
		
		if (req.body.page == '+'){
			if (_totalpage>_page)
			_page++;
		}else if (req.body.page == '-'){
			if (_page>1)
			_page--;
		}else
		_page = Number.parseInt(req.body.page,10);
		if (_filter=="no"){
			initializeListview(function(){
	 		res.render('admin/viewMyaccountImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	});
		}else{
			imageListviewByFilter(function(){
				console.log("page next / prev"+G_listcondition);
	 			res.render('admin/viewMyaccountImages', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 		},G_listcondition);
		}


    	
    });
	 
}




