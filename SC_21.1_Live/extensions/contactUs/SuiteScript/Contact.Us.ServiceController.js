/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// Contact.Us.ServiceController.js
// ----------------
// Service to submit a user request
define('Contact.Us.ServiceController', ['ServiceController', 'Contact.Model'], function(
    ServiceController,
    ContactModel
) {
    // @class Contact.Us.ServiceController Supports contact process
    // @extend ServiceController
    return ServiceController.extend({
        // @property {String} name Mandatory for all ssp-libraries model
        name: 'Contact.Us.ServiceController',

        // @method post The call to Contact.Us.Service.ss with http method 'post' is managed by this function
        // @return {Contact.Model.register.data} Object literal with registration related data
        post: function() {
            return ContactModel.register(this.data);
        }
    });
});
