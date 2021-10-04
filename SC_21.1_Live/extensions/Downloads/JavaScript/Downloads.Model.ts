/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="Downloads.Model"/>
/// <reference path="../../../Commons/Utilities/JavaScript/GlobalDeclarations.d.ts"/>
// @module Account.Register.Model

import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';

import TransactionModel = require('../../../Commons/Transaction/JavaScript/Transaction.Model');
import TransactionCollection = require('../../../Commons/Transaction/JavaScript/Transaction.Collection');
 
const DownloadModel: any = TransactionModel.extend({
    urlRoot: Utils.getAbsoluteUrl('services/Downloads.Service.ss'),
	// initialize: function(attributes) {
	// 	   // call the initialize of the parent object, equivalent to super()
	// 	   TransactionModel.prototype.initialize.apply(this, arguments);
		   
	// }

})
export = DownloadModel;
// @class Account.Register.Model
// Sends user input data to the register service
// validating fields before they are sent
// [Backbone.validation](https://github.com/thedersen/backbone.validation)
// @extend Backbone.Model
// const DownloadModel: any =  TransactionModel.extend({
//     // @property {String} urlRoot
//     urlRoot: Utils.getAbsoluteUrl('services/Downloads.Service.ss'),
// 	parse: function(response) {
// 		this.totalRecordsFound = response.length;
// 		this.recordsPerPage = 2;
//  		console.log(response);
		 
// 		return response;
// 	},
 

	
 