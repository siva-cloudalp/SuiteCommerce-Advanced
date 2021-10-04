/// <amd-module name="Downloads.Collection"/>
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';


import TransactionCollection = require('../../../Commons/Transaction/JavaScript/Transaction.Collection');
import DownloadModel = require('./Downloads.Model');
import Backbone = require('.../../../Commons/Utilities/JavaScript/backbone.custom');



const DownloadCollection:any =  TransactionCollection .extend({
       // @property {Downloads.Model} model
    model:DownloadModel,
        // @property {String} url
        url: Utils.getAbsoluteUrl('services/Downloads.Service.ss'),
        initialize: function(models, options) {
            TransactionCollection.prototype.initialize.apply(this, arguments);
    
            this.customFilters = options && options.filters;
            
        },
          // @method initialize
        parse: function(response) {
            this.totalRecordsFound = response.totalRecordsFound;
            this.recordsPerPage = response.recordsPerPage;
           
            // console.log(response);
            return response
      
         },
         
       // @method update Method called by ListHeader.View when applying new filters and constrains
    // @param {Collection.Filter} options
    // @return {Void}
    update: function(options): void {
        console.log(options);
        
        const range = options.range || {};
        // const from = range.from && Utils.stringToDate(range.from);
        // const to = range.to && Utils.stringToDate(range.to);
  
        // this.order = options.order;
        // this.range = options.range;
        // this.from= range.from,
        // this.to= range.to,
        // this.page = options.page;
 
        this.fetch({
            data: {
                filter: this.customFilters || (options.filter && options.filter.value),
                sort: options.sort.value,
                order: options.order,
                from: range.from,
                to:  range.to,
                page: options.page
            },
            reset: true,
            killerId: options.killerId
        }).then(data => console.log(data)
        )
    }
    
    });
     
 

export = DownloadCollection;