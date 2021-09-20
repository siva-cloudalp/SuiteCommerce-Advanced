/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="Contact.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts"/>

import * as _ from 'underscore';
import * as contact_tpl from 'contact_us.tpl';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
/*import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';
import { Configuration } from '../../../Advanced/SCA/JavaScript/Configuration';*/
//import { ProfileModel } from '../../../Commons/Profile/JavaScript/Profile.Model';
import { Loggers } from '../../../Commons/Loggers/JavaScript/Loggers';
import { GlobalViewsMessageView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.Message.View';
import { Configuration } from '../../../Commons/Utilities/JavaScript/Configuration';
//import Tracker = require('../../../Commons/Tracker/JavaScript/Tracker');


import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');
//import AccountRegisterModel = require('../../../Advanced/Account/JavaScript/Account.Register.Model');
import ContactUsModel = require('./Contact.Us.Model');
import BackboneFormView = require('../../../Commons/Backbone.FormView/JavaScript/Backbone.FormView');
import GlobalViewsCountriesDropdownView = require('../../../Commons/GlobalViews/JavaScript/GlobalViews.CountriesDropdown.View');
import GlobalViewsStatesView = require('../../../Commons/GlobalViews/JavaScript/GlobalViews.States.View');
//import AddressModel = require('../../../Commons/Address/JavaScript/Address.Model');
//import { template } from 'underscore';*/

// @module Contact.View @extends Backbone.View
const ContactView: any = BackboneView.extend({
    template: contact_tpl,

    title: Utils.translate('Contact us'),

    page_header: Utils.translate('Contact us'),

    attributes: {
        id: 'landing-page',
        class: 'landing-page'
    },

    events: {
        'click [data-action="validate"]': 'validateFields',
        'change [data-action="selectcountry"]': 'updateStates'
    },
    
    bindings:{
        '[name="firstname"]': 'firstname',
        '[name="lastname"]': 'lastname',
        '[name="email"]': 'email',
        '[name="country"]': 'country'
    },

    initialize:function(){
        this.model = new ContactUsModel();
        //this.model.on('save', _.bind(this.redirect, this));
        this.countries = Configuration.get('siteSettings.countries');
        this.selectedCountry =
            this.model.get('country') || Configuration.get('siteSettings.defaultshipcountry');
            

        if (!this.selectedCountry && _.size(this.countries) === 1) {
            this.selectedCountry = _.first(_.keys(this.countries));
        }

        if (this.selectedCountry) {
            this.model.set({ country: this.selectedCountry }, { silent: true });
        }
        BackboneFormView.add(this);
        
    },

    // @method updateStates Initialize state of the  dropdowns
    // @param {jQuery.Event} e
    // @return {Void}
    updateStates: function(e: any) {
        const statesView = this.getChildViewInstance('StatesView');
        statesView.options.selectedCountry = this.$(e.currentTarget).val();
        statesView.render();
        //this.eraseZip(e);
    },

    childViews: {
        'CountriesDropdown': function(){
            return new GlobalViewsCountriesDropdownView({
                countries: this.countries,
                selectedCountry: this.selected_country
                //manage: this.options.manage
            })
        },
        'StatesView' : function() {
            return new GlobalViewsStatesView({
                countries: this.countries,
                selectedCountry: this.selected_country,
                selectedState: this.model.get('state'),
                //manage: this.manage
            })
        }
    },


    validateFields: function(e, model, props) {
        const self =  this;
        const loggers = Loggers.getLogger();
        const actionId = loggers.start('contact-submit form');

        const promise = self.saveForm(e, model, props);

            if (promise) {
                promise.done(() => {
                    loggers.end(actionId, {
                        operationIds: self.model.getOperationIds(),
                        status: 'success'
                    });
                });
                const placeholder = jQuery('<div/>', {
                    'data-type': 'alert-placeholder'
                });
                this.$el
                .children()
                .first()
                .prepend(placeholder);
                const global_view_message = new GlobalViewsMessageView({
                    message: "Your's request is submitted and Thank you",
                    type: 'success',
                    closable: true
                });
                placeholder.append(global_view_message.render().$el.html());
            } 
            else {
                const placeholder = jQuery('<div/>', {
                    'data-type': 'alert-placeholder'
                });
                this.$el
                .children()
                .first()
                .prepend(placeholder);
                const global_view_message = new GlobalViewsMessageView({
                    message: "Something went wrong, please try again later!",
                    type: 'error',
                    closable: true
                });
                placeholder.append(global_view_message.render().$el.html());
            }
               
    },            
   
    // @method getContext @return Contact.View.Context
    getContext: function() {
        console.log("contact");
        
        
        return {
             
        };
    }
});

export = ContactView;
