module.exports = function (app) {


	   app.get('/download/:id/:extension', function(req, res) {

	   	console.log("image ID: " + req.params.id)

	   	console.log("extension: " + req.params.extension)

	   	let extension = req.params.extension.split('.')[1]

	   	    res.download('original/16_' + req.params.id + '.' + extension)
	   })


}