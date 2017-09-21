var Promise = require('bluebird');
var logHelper = require('../logging/logging.js');
var logger = logHelper.getLogger('retryUtil.js');


var defaultRetParams={};
defaultRetParams.retCount=1;
defaultRetParams.retLimit=4;
defaultRetParams.retGap=1000;

module.exports = {
    retry:retry
}

/**
 * Method to make any promise based method retriable
 * @param {*} clientMethod - Holds the method to be invoked
 * @param {*} options - Holds teh optional configurations (i.e. retCount, retLimit & retGap)
 */
function retry(clientMethod, options){
    return new Promise(function(resolve, reject) {
        if(options!=undefined && options.retCount==undefined){
            options.retCount=0;
        }
        else if(options==undefined){
            options = defaultRetParams;
        }

        try{
            clientMethod.call().then(function(resp){
                return resolve(resp);
            })
            .catch(function(err) {
                if(options.retCount<=options.retLimit){
                    logHelper.logMessage(logger, 'Retry Count: ', options.retCount, err);
                    options.retCount++;
                    setTimeout(function(){
                        return retry(clientMethod, options).then(function(resp){
                                return resolve(resp);
                            }).catch(function(err) {
                                return reject(err);
                            });
                    }, options.retGap);
                    
                }
                else{
                    logHelper.logMessage(logger, 'Retry Exhausted: ', options.retCount, err);
                    return reject(err);
                }
            });
        }catch(e){
           logHelper.logMessage(logger, 'Retry Count: ', options.retCount, e);

           if(options.retCount<=options.retLimit){
                options.retCount++;
                setTimeout(function(){
                    return retry(clientMethod, options).then(function(resp){
                                return resolve(resp);
                            }).catch(function(err) {
                                return reject(err);
                            });
                        }, options.retGap);
                
           }
           else{
               logHelper.logMessage(logger, 'Retry Exhausted: ', options.retCount, err);
               return reject(err);
           }
        }
    });
}


/**
 * This is the test method for testing the above developed retry mechaism
 * <The whole content of the function has to be invoked inside this block>
 * return retry(
    function() { 
        <Body of the function has to be here>
    }
    );
 */
var count=0;
function testMethod(params1, params2){
   return retry(
    function() { 
        return new Promise(function(resolve, reject) {
            count++;
            var result=count % 3;
            if(result==0){
                logHelper.logMessage(logger, 'Success', params1, params2);
                return resolve({body:"Success occurred while executing command"});
            }
            else{
                logHelper.logMessage(logger, 'Failure', params1, params2);
                return reject({body: "Error occurred while executing the method"});
            }
        });
    });
}

/*

var paramsData1={Param1: "Data 1", Param2: "Data 2"};
var paramsData2={Param1: "Data 1", Param2: "Data 2"};

testMethod(paramsData1, paramsData2).then(function(resp){
    logHelper.logMessage(logger, 'Outer Success', resp);
}).catch(function(err) {
    logHelper.logMessage(logger, 'Outer Failure', err);
});

*/