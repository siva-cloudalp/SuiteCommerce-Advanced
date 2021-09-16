/// <amd-module name="LocationQuntatity.View"/>

import * as location_quntatity_tpl from 'location_quntatity.tpl';
import * as _ from 'underscore';
import ProductDetailsBaseView = require('../../../Advanced/ProductDetails/JavaScript/ProductDetails.Base.View');


import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');

export = BackboneView.extend({
    template: location_quntatity_tpl,
       title:'',
        page_header:'',
        // initialize: function initialize(options) {
        //     console.log(this);
            
        // },

        initialize: function() {
           console.log(this.model.getSku());
           
             
            
        },
        
        getContext: function() {

            const item_model = this.model.get('item');
            // const  price =item_model.get('quantityavailable_detail');
            const location = item_model.get('location')? item_model.get('location'):"No location present";
            const quntatity =item_model.get('quantityavailable') ? item_model.get('quantityavailable') :"No quntatity available";
            console.log(this);
            
            
            const check = item_model.get('location');
            
            return {
                name:"Location&Quntatity",
            // @property {string} location
            location:location,
            // @property {string} quntatityavailable
            QuntatityAvailable:quntatity,
            check:check
            };
        }
    })
 