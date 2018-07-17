

module.exports = function (vt, fs, filename, filepath, fileMimeType) {



var connection = vt.MakePublicConnection()

connection.setKey("e2513a75f92a4169e8a47b4ab1df757f83ae45008b4a8a49903450c8402add4d")

connection.submitFileForAnalysis(filename, fileMimeType, fs.readFileSync("./assets/"+filename), function(data) {

connection.getFileReport(data.scan_id, function(data){

  console.log(data.scans.McAfee) 

}, function(error) {

  console.log(error) 

});

}, function(error) {

  console.log(error) 

});


}