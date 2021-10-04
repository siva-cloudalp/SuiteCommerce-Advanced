// @module Account
// ----------
// Handles account creation, login, logout and password reset
// module Account
define('Downloads.Model',[
    'Application',
    'Utils',
    'StoreItem.Model',
    'Transaction.Model',
    'Transaction.Model.Extensions',
    'SiteSettings.Model',
    'SC.Model',
    'ReturnAuthorization.Model',
    'ExternalPayment.Model',
    'Models.Init',
    'Configuration',
    'bignumber',
    'underscore'
], function(
    Application,
    Utils,
    StoreItem,
    Transaction,
    TransactionModelExtensions,
    SiteSettings,
    SCModel,
    ReturnAuthorization,
    ExternalPayment,
    ModelsInit,
    Configuration,
    BigNumber,
    _
) {
    // @class Account.Model Defines the model used by the all Account related services.
    // @extends SCModel

   return Transaction.extend({
       name:'Downloads',
    
    
    });

})
// return  SCModel.extend({
//     name:'Downloads',

// getdata: function(){

//       console.warn(JSON.stringify(ITEMS),"DownloadsItems");
//      return ITEMS;
//  },

  