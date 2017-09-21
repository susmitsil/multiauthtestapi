'use strict';

/**
@author: Varun Ojha
@version: 1.0
@date: 04/02/2017
@Description: constants file
**/

module.exports = {
	
	//Waybill mapping
	"ENTITY_WAYBILL_MAPPING_SUFFIX": 'EWMS',

	//Http codes
	"INTERNAL_SERVER_ERROR": 500,
	"INVALID_INPUT": 400,
	"SUCCESS": 200,
	"SUCCESS_NO_CHANGE": 200,
	"UNAUTHORIZED": 401,
	"ERROR_START_CODE": 400,
	"NOT_FOUND": 404,

	//Http methods
	"HTTP_GET": 'GET',
	"HTTP_POST": 'POST',
	"HTTP_PUT": 'PUT',
	"HTTP_DELETE": 'DELETE',
	
	"TRANS_DATA_LIMIT" : 10,


	"VCAP_SERVICES_CLOUDANT":"cloudantNoSQLDB",
	"VCAP_SERVICES_BLOCKCHAIN":"ibm-blockchain-5-prod",
	"CLOUDANT_INSTANCE_NAME": "cloudantInstanceName",
	"MARKETPLACE_APP_MASTER_DB":"marketplaceAppMaster",

	"BLOCKCHAIN_DEFAULT_USERS" : "blockchain_default_users",

	"BLOCKCHAIN_CHAINCODE_NAME" : "marketplace_cc",
	"BLOCKCHAIN_CHAINCODE" : "chaincode",
	"BLOCKCHAIN_CHAIN_KVSTORE_PATH" : "./tmp/keyValStore",
	"BLOCKCHAIN_CHAIN_KVSTORE_TEST_PATH" : "./test/tmp/keyValStore",

	"BLOCKCHAIN_NW_CERT_PATH" : "./us.blockchain.ibm.com.cert",
	"BLOCKCHAIN_NW_PROTOCOL" : "grpcs://",
	"BLOCKCHAIN_REGISTRAR_ID" : "WebAppAdmin",
	"BLOCKCHAIN_ADMIN_ID" : "admin",

	"BLOCKCHAIN_USER_AFFILIATION": "registrar",
	"BLOCKCHAIN_USER_AFFILIATION_CODE": "0001",
	"BLOCKCHAIN_USER_ROLE_ADMIN": 'admin',
	"BLOCKCHAIN_USER_GROUP": 'group1',

	"BLOCKCHAIN_API_REGISTRAR": 'registrar',
	"BLOCKCHAIN_BUYER_AFFILIATION_CODE": 1,
	"BLOCKCHAIN_SELLER_AFFILIATION_CODE": 2,
	"BLOCKCHAIN_BANK_AFFILIATION_CODE": 3,
	"BLOCKCHAIN_APPRAISER_AFFILIATION_CODE": 4,
	"BLOCKCHAIN_AUDITOR_AFFILIATION_CODE": 5,

	"ENROLL_ID": "enrollId",
	"ENROLL_SECRET": "enrollSecret",


	//Models
	"MODEL_USER": 'user',
	"MODEL_KEYVALUESTORE": 'keyvaluestore',
	

	"CLOUDANT_ID_FIELD": '_id',
	
	//Routes
	'ROUTE_VIEW_HOME_PUBLIC': '/',
	

	//Data api entities

	//Request Actions
	'REQUEST_ACTION_UPDATE': 'update',

	//Request type
	'REQUEST_TYPE_DATA': 'requestTypeData',
	'REQUEST_TYPE_CONTROLLER': 'requestTypeController',

	"CLOUDANT_VIEW_LIKES_LIST": 'likes_list',

	"STATUS_SUBMITTED": "Submitted",
	"STATUS_NEW": "New",
	"STATUS_REVIEW": "Under Review",
	"STATUS_APPROVED": "Approved",
	"STATUS_REJECTED": "Rejected",
	"STATUS_COMPLETED": "Completed",


	"BLOCKCHAIN_RESTAPI_REGISTRAR": "/registrar",
	"BLOCKCHAIN_RESTAPI_CHAINCODE": "/chaincode",

	"GLOBAL_PASSPHRASE" : "invochain1234",
	"Ready_for_Processing":"Ready for Processing",
	"Request_Buyer_Approval":"Request Buyer Approval",
	"Approved_by_Buyer":"Approved by Buyer",
	"Initiated_for_Quote":"Initiated for Quote",
	"Quote_Accepted":"Quote Accepted",
	"Payment_Initiated_by_FI":"Payment Initiated by FI",
	"Payment_Received_By_Seller":"Payment Received By Seller",
	"Payment_Initiated_by_Buyer":"Payment Initiated by Buyer",
	"Payment_Received_By_FI":"Payment Received By FI",
	"tmpFilePath":"./tmp/",
	"InvoiceAssetName":"Invoice",
	"InvoiceAssetTypeId":"Invoice"
	
}


