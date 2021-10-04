/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// Download.ServiceController.js
// ----------------
// Service to submit a user request
   
define('Downloads.ServiceController'
    ,[
        'ServiceController'
        ,'Downloads.Model'
        ,'underscore'], function(
    ServiceController,
    DownloadModel,
    _,
) {
    // @class DownloadS.ServiceController
    // @extend ServiceController
    return ServiceController.extend({
        // @property {String} name Mandatory for all ssp-libraries model
        name: 'Downloads.ServiceController',

        get: function() {
            const recordtype = this.request.getParameter('recordtype');
            const id = this.request.getParameter('internalid');
            // If the id exist, sends the response of Order.get(id), else sends the response of (Order.list(options) || [])
            if (recordtype && id) {
                return   DownloadModel.get(recordtype, id);
            }
            return   DownloadModel.getDownloadableItems({
                filter: this.request.getParameter('filter'),
                order: this.request.getParameter('order'),
                sort: this.request.getParameter('sort'),
                from: this.request.getParameter('from'),
                to: this.request.getParameter('to'),
                origin: this.request.getParameter('origin'),
                page: this.request.getParameter('page') || 1,
                results_per_page: this.request.getParameter('results_per_page')
            });
        },
       
    });
  
 
});