module.exports = {
 
            checkText: function(data ,callback) {

                let iChars = "~`!#$%^&*+=-[]\\\';,/{}|\":<>?";
                let status = 0;
                for (var i = 0; i < data.length; i++) {
                    if (iChars.indexOf(data.charAt(i)) != -1) {
                      console.log("These are not allowed\n");
                      status=1;
                      break;
                    }
                }
                if (status == 1)
                  callback('data contains illegal char');
                else
                  callback('ok');

            }

           
 
};