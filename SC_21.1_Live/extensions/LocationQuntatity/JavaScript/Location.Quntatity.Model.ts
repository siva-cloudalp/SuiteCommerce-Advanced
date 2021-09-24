/// <amd-module name="Location.Quntatity.Model"/>
/// <reference path="../../../Commons/Utilities/JavaScript/GlobalDeclarations.d.ts"/>


import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');
import * as _ from 'underscore';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';


const LocationQuantityModel: any  = Backbone.Model.extend({
    urlRoot: Utils.getAbsoluteUrl('services/LocationQuantity.Service.ss'),
});

export = LocationQuantityModel;