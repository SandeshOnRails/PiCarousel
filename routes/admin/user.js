module.exports = function (app,dbRequest,con) {
	
	var _recPerPage = 10;
	var _page =1;
	var _totalpage=0;
	var _list;

	function initializeListview(callback){

		dbRequest.getUserCount(con,"",function(itemcount){

				_totalpage= Math.ceil(Number.parseInt(itemcount[0].itemcount,10) / Number.parseInt(_recPerPage,10));
				next(_totalpage,_page);				
                         
    		});

	 	function next(totalpage,page){
    		//console.log("after list : ");
    		 dbRequest.getUsers(con,page,_recPerPage,"",function(result){

				_list = result;
				_page=page;
				
             callback();            
    		});
    			
    	};
	}

	 app.post('/users', function(req, res){
	 	//console.log("userrs");
	 	//console.log("admin page session id: " + req.session.user_id)
	 	if (req.query.page)
	 		_page = req.query.page;
	 	initializeListview(function(){
	 		res.render('admin/viewUsers', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 	});
	 


	 })



    app.post('/usersSuspend', function(req, res){
		
		
		if (req.body.id!=""){	
			dbRequest.suspendUser(con,req.body,function(result){

				_list = result;
				initializeListview(function(){
		 			res.render('admin/viewUsers', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
		 		});
	                         
	    	});
		}

    });

        app.post('/recover', function(req, res){
			console.log("geldi gelid"+req.body.email);
			dbRequest.getUserEmail(con,req.body.email,function(result){

				if (result[0].email == 1)
				res.send("new password has been send to your email "+req.body.email);
			else
				res.send("provided email does not exist :"+req.body.email);
				
		 	
	                         
	    	});
		
		console.log("geldi gelid");

    });


    app.post('/usersActivate', function(req, res){
		
		
		if (req.body.id!=""){	
			dbRequest.activateUser(con,req.body,function(result){

				_list = result;
				initializeListview(function(){
		 			res.render('admin/viewUsers', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
		 		});
	                         
	    	});
		}

    });

    app.post('/usersChangePage', function(req, res){
		
		
		
		if (req.body.page == '+'){
			if (_totalpage>_page)
			_page++;
		}else if (req.body.page == '-'){
			if (_page>1)
			_page--;
		}else
		_page = Number.parseInt(req.body.page,10);
		initializeListview(function(){
	 			res.render('admin/viewUsers', {operation:'list',result:_list,totalpage:_totalpage,page:_page});//from views categories.ejs		
	 		});
    	


    });
	 
}




