/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// @module Account
// ----------
// Handles account creation, login, logout and password reset
// module Account
define('Account.Model', [
    'SC.Model',
    'Application',
    'SC.Models.Init',
    'Profile.Model',
    'LiveOrder.Model',
    'Address.Model',
    'CreditCard.Model',
    'SiteSettings.Model',
    'underscore'
], function(
    SCModel,
    Application,
    ModelsInit,
    Profile,
    LiveOrder,
    Address,
    CreditCard,
    SiteSettings,
    _
) {
    // @class Account.Model Defines the model used by the all Account related services.
    // @extends SCModel
    return SCModel.extend({
        name: 'Contact',

        
        // @method register
        // @param {UserData} user_data
        // @param {Account.Model.Attributes} user_data
        register: function(user_data) {
			
		}
           
    });
});

// @class UserData
// @property {String} email
// @property {String} password
// @property {String} password2
// @property {String} firstname
// @property {String} lastname
// @property {String} company
// @property {String} emailsubscribe T or F
