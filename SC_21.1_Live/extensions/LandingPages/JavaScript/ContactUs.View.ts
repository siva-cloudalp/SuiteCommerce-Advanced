<<<<<<< HEAD

///<amd-module name="ContactUs.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts" />




// import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');
import BackboneFormView = require('../../../Commons/Backbone.FormView/JavaScript/Backbone.FormView');
// import '../../../Commons/Utilities/JavaScript/backbone.validation';
// import * as Validation from '../../../Commons/Utilities/JavaScript/backbone.validation';
// Validation


import * as _ from 'underscore';
import * as contact_us_tpl from 'contact_us.tpl';
import ContactUsPageModel = require('./ContactUs.Model');
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';
import { Loggers } from '../../../Commons/Loggers/JavaScript/Loggers';
// import LiveOrderModel = require('../../../Commons/LiveOrder/JavaScript/LiveOrder.Model');
// import { Configuration } from '../../../Advanced/SCA/JavaScript/Configuration';
// import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');
// import { Validation } from '../../../Commons/Core/JavaScript/backbone/backbone';



let BackboneViewExtend: any = BackboneView.extend({
    template: contact_us_tpl,

    title: Utils.translate('Contact Us'),

    page_header: Utils.translate('Contact Us'),

    attributes: {
        id: 'contact-us',
        class: 'contact-us'
    },

    events: {
        'submit form': 'submitForm'
    },

    bindings: {
        '[name="firstname"]': 'firstname',
        '[name="lastname"]': 'lastname',
        '[name="email"]': 'email',
        '[name="phone"]': 'phone',
        '[name="comments"]': 'comments'
    },
    initialize: function(options) {
      
        this.options=options;
        // console.log(options);
        
        this.application = options.application;
        // console.log(this.application);
        
        this.parentView=options.parentView;
        // console.log(options.parentView);
        
        this.model = options.model || new ContactUsPageModel();
        // Backbone.Validation
      
        BackboneFormView.add(this);
        // Backbone.Validation.bind(this);
        // this.model.on('save', _.bind(this.redirect, this));
        this.model.on('save', _.bind(this,this));
       
     },
    submitForm:function(e,model,props){
         e.preventDefault();
         const logger =Loggers.getLogger();
         const actionId= logger.start('Customer Contact Page');
         const self=this;
         const data=(<any>jQuery(e.target).closest('form')).serializeObject();
            // console.log(data);
            
         return this.cancelableTrigger('before:ContactUs',data).then(function(){
            self.saveForm(e,model,props);

            //  if(promise){
            //      promise.done(() =>{
            //          logger.end(actionId,{
            //              operationIds:self.model.getOperationIds(),
            //              status:'success'

            //          });

            //      });
            //  }
         })

    },
   

    // childViews:{
    //     Messages: function() {
    //         if (this.message) {
    //             return new GlobalViewsMessageView({
    //                 message: this.message.text,
    //                 type: this.message.type || 'error',
    //                 closable: true
    //             });
    //         }
    //     }
    // },
    
    // @method getContext @return ContactUs.View.Context
    getContext: function() {
    console.log("hello");
    


      

        return {
          
        };
      
    }
});

export = BackboneViewExtend;




=======
/// <amd-module name="ContactUs.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts" />
/// <reference path="../../../Commons/Utilities/JavaScript/GlobalDeclarations.d.ts" />

import * as _ from 'underscore';
import * as login_register_tpl from 'login_register.tpl';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';


import { GlobalViewsMessageView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.Message.View';
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');


const ContactUsView:any = BackboneView.extend({
    template: login_register_tpl,

    attributes: {
        id: 'ContactUs.View',
        'data-root-component-id': 'ContactUs.View'
    },
 title:Utils.translate('ContactUs')

})












export = ContactUsView;
>>>>>>> 82dfd574152e92bfd84da48b63bede767e841da5
