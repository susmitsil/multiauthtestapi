'use strict';


// node modules
var express = require('express');


// routes
var trouter = require('../../../src/controller/UserManagement/usermanagement_controller.js');


var router = module.exports = express.Router();

/**
 * Mapping for UserController 
 */
router.get("/greetUser/:userName", trouter.greetUser);
