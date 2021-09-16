///<amd-module name="ContactUs.Model"/>
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts"/>


// import BackboneModel = require('../../../Commons/BackboneExtras/JavaScript/Backbone.Model');
// import Backbone = require('../../../Commons/Core/JavaScript/backbone/BackboneExtras');
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import ContactUsView =require('./ContactUs.View');
import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');

const validate: any = Backbone.Model.extend({
    // @property {String} urlRoot
    // var any1= this.data;?
    urlRoot: Utils.getAbsoluteUrl('services/LandingPages.Service.ss'),
    validation:{
        firstname:{
            required:true,
            // patten:'firstName',
            msg:Utils.translate('First Name is required')
        },
        lastName:{
            required:true,
            // patten:'lastName',
            msg:Utils.translate('Last Name is required')
        },
       email:{
           required:true,
           patten:'email',
           msg:Utils.translate('Valid Email is required')
       },
       phone:{
           required:true,
           fn: Utils.validatePhone,
        //    pattern:'number',
        //    msg:Utils.translate('phone Number is required')

       },
       comments:{
        //    pattern:'comments'

       }
    }

   
});

export = validate;
