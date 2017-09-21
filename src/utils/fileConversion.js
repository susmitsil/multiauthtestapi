var base64 = require('file-base64');
var fs = require('fs');
var constants = require('../constants/constants.js');
var logHelper = require('../logging/logging.js');
var logger = logHelper.getLogger('fileConversion.js');
var Promise = require('bluebird');


module.exports = {
	convertToFile:convertToFile,
    convertToBase64String:convertToBase64String
}

/**
 * Method to convert file to base64 string
 */
function convertToBase64String(strFilePath){
    return new Promise(function(resolve, reject) {
        try{

            base64.encode(strFilePath,function(err, base64String){
                
                console.log('FileConverted');

                 if(err) {
                    logHelper.logError(logger, 'convertToBase64String', 'Could not convert file', err);
                    return reject({ statusCode: constants.INTERNAL_SERVER_ERROR, body: 'Could not add Blob' });
                 } 
                 else{
                    var paramResult={};
                    paramResult.response=base64String;
                    paramResult.details="File converted to byte64 successfully";

                    logHelper.logMessage(logger, 'convertToBase64String', 'File converted to byte64 successfully');
                    return resolve({ statusCode: constants.SUCCESS, body: JSON.stringify(paramResult)});
                 }
            });

            
        } catch (err) {
         logHelper.logError(logger, 'convertToBase64String', 'Could not convert file', err);
         return reject({ statusCode: constants.INTERNAL_SERVER_ERROR, body: 'Could not convert file' });
      }
    }); 
}


/**
 * Method to convert base64 to file
 */
function convertToFile(strBase64String, strFilePath){
    return new Promise(function(resolve, reject) {
        try{
            console.log("File to be uploaded: "+strFilePath);

            base64.decode(strBase64String, strFilePath, function(err, output){
                if(err) {
                    logHelper.logError(logger, 'convertToBase64String', 'Could not convert file', err);
                    return reject({ statusCode: constants.INTERNAL_SERVER_ERROR, body: 'Could not add Blob' });
                 } 
                 else
                 {
                    var paramResult={};
                    paramResult.response=strFilePath;
                    paramResult.details="File converted successfully";
                    logHelper.logMessage(logger, 'convertToBase64String', 'File converted successfully');
                    return resolve({ statusCode: constants.SUCCESS, body: JSON.stringify(paramResult)});
                 }
            });
        } catch (err) {
         logHelper.logError(logger, 'convertToFile', 'Could not convert file', err);
         return reject({ statusCode: constants.INTERNAL_SERVER_ERROR, body: 'Could not convert file' });
      }
    });
}
/*
function convertToString(strFilePath){

    base64.encode(strFilePath,function(err, base64String){
        //console.log(base64String);

        fs.writeFile('./sample/sample.txt',base64String,function(err){
            if(err){
                console.log('Error in filewritting', err);
                return;
            }
            console.log('File Written');
        })

        base64.decode(base64String, './sample/test2222.zip', function(err, output){
            console.log(JSON.stringify(output));
        });
    });
}
*/


/*
var strData =  fs.readFileSync('./sample/testimage-11.txt','utf8');
convertToFile(strData, './sample/testimage-31.png').then(function(resp) {
          console.log('File Converted: '+resp.body.response);
});
*/
//var fileData1 = fs.readFileSync('./sample/testimage-31.png');
//console.log('File: '+ fileData1.toString("base64"));

//var strData =  fs.readFileSync('./sample/testimage-11.txt','utf8');
//convertToOriginal(strData, 'testimage-21.png');
/*

* sample method to be used from a controller 

function uploadFile(request, response) {
	   try {

	       var params;
	       params = request.body;
	    
           fileUpload.convertToFile(params.fileData, params.fileName);

           console.log("File sent for upload!");

           response.status(200).send({"status":"success"});    

    	} catch (exception) {
           console.log(exception) 
	       response.status(404).send("Backend server error");
	       return;
	   }
}
*/
/*convertToBase64String('./tmp/inv1.jpg').then(function(resp){
    console.log(resp);
});*/