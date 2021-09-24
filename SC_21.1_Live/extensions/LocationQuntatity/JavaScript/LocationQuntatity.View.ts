/// <amd-module name="LocationQuntatity.View"/>

import * as location_quntatity_tpl from 'location_quntatity.tpl';
import * as _ from 'underscore';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';

import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');

import LocationQuantityModel = require('./Location.Quntatity.Model');
import { Model } from 'backbone';
export = BackboneView.extend({
    template: location_quntatity_tpl,
    title: '',
    page_header: '',


    initialize: function () {
        // var myData = new  LocationQuantityModel();
        // var self =  myData.fetch();
        // console.log(self);



    },

    getContext: function () {
        let locationQuantity = new LocationQuantityModel();
        locationQuantity.fetch()
            .then((myJson) => { localStorage.setItem('el', JSON.stringify(myJson)); });


        let staticData = JSON.parse(localStorage.getItem('el'));
        const item_model = this.model.get('item');
        const quantityavailable_detail = item_model.get('quantityavailable_detail').locations;

        let inventoryData = quantityavailable_detail;
        var matrixData = [];


        // if (quantityavailable_detail.length>0) {
        //     inventoryData = quantityavailable_detail;

        // };

        $.each(item_model.get('matrixchilditems_detail'), function (key, val) {
            matrixData.push(val.quantityonhand_detail);

            // console.log(val.quantityonhand_detail.locations.length >0);
        });

        //------------------------------------------------------------------------------------------



        var matrix;
        var matrixLocationId;

        for (var i = 0; i < matrixData.length; i++) {
            matrix = matrixData[i];
            matrixLocationId = matrix.locations;
            for (var j = 0; j < staticData.length; j++) {
                var stati = staticData[j]
                matrixLocationId.map(obj =>  obj.internalid == stati.internalid ?  matrix.locationname = stati.name : 1 );

            }

        }




        for (var k = 0; k < inventoryData.length; k++) {
            var inventoryId = inventoryData[k];
            for (var o = 0; o < staticData.length; o++) {
                var Static = staticData[o];
                console.log(`${inventoryId.internalid}--${k}<--->${Static.internalid}--${o}`);
                if (inventoryId.internalid == Static.internalid) {
                    inventoryData[k].locationname = Static.name

                }
            }

        }


        var location_quntatity = matrixData.length > 0 ? matrixData : inventoryData;
        // console.log(location_quntatity);

        // console.log(matrixData);



        console.log(location_quntatity);
        //   console.log(staticData);



        return {

            // quantityavailable_detail:itemLocQunt,
            // matrixData: matrixData ,
            z: location_quntatity,
            show: quantityavailable_detail,
            // staticData: staticData


        }
    }
})
