'use strict';

/**
@author: Susmit Sil
@version: 1.0
@date: 08/08/2017
@Description: Controller for user management 
**/

var Promise = require('bluebird');
var _ = require('underscore');

var logHelper = require('../../../src/logging/logging.js');
var logger = logHelper.getLogger('usermanagement_controller.js');
var validate = require('../../../src/utils/validation_helper.js');
var constants = require('../../../src/constants/constants.js');


module.exports = {
    greetUser : greetUser
};

/**
 * Method to provide controller handling for getting user based on provided user id
 */
function greetUser(request, response) {
    var result={};
    try {

        logHelper.logEntryAndInput(logger, 'greetUser', {});

        var params = {};
        //params = request.body;
        params = request.params;
        logHelper.logMessage(logger, 'greetUser request params 1', params);
        var userName = params.userName;

        logHelper.logMessage(logger, 'greetUser request params', userName);

        if (!validate.isValidString(userName)) {
            logHelper.logError(logger, 'greetUser', 'userName is invalid');
            return response.status(constants.INVALID_INPUT).send('userName is invalid');
        }

        
        result.message="Hey "+ userName +"! Howz it going...";

        response.status(200).send(result);

        return result;
    
    } catch (exception) {
        response.status(constants.INTERNAL_SERVER_ERROR).send('Could not getUser with name ' + userName);
        return;
    }
}
