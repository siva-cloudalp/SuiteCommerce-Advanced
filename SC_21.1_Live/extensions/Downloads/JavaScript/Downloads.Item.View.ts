/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="Downloads.Item.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/GlobalDeclarations.d.ts" />
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts"/>

import '../../../Commons/Quote/JavaScript/Quote.ListExpirationDate.View';

import * as _ from 'underscore';
import * as downloads_tpl from 'downloads_item.tpl';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';
import { Configuration } from '../../../Advanced/SCA/JavaScript/Configuration';
import { AjaxRequestsKiller } from '../../../Commons/AjaxRequestsKiller/JavaScript/AjaxRequestsKiller';

import { ListHeaderView } from '../../../Commons/ListHeader/JavaScript/ListHeader.View';
import { GlobalViewsPaginationView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.Pagination.View';
import { GlobalViewsShowingCurrentView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.ShowingCurrent.View';
 
import TransactionListView = require('../../../Commons/Transaction/JavaScript/Transaction.List.View');
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');
 import DownloadModel = require('./Downloads.Model');
import DownloadCollection = require('./Downloads.Collection');

import Handlebars = require('../../../Commons/Utilities/JavaScript/Handlebars');
import RecordViewsActionableView = require('../../../Advanced/RecordViews/JavaScript/RecordViews.Actionable.View');
import { RecordViewsView } from '../../../Commons/Utilities/JavaScript/RecordViewsView';


import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');
import BackboneCollectionView = require('../../../Commons/Backbone.CollectionView/JavaScript/Backbone.CollectionView');


// @module Download.View @extends Backbone.View
const DownloadableView: any =TransactionListView.extend({
    template: downloads_tpl,

    className: 'DownloadsView',

    title: Utils.translate('Downloads'),

    page_header: Utils.translate('Downloads'),
    attributes: {
        id: 'Downloads',
        class: 'downloadableitemView'
    },
    getBreadcrumbPages: function() {
        return {
            text: this.title,
            href: '/Downloads'
        };
    },
    initialize:function(options){ 
        // console.log(this);
        const { application } = options;
        this.application = options.application;
     
       
        this.collection = new  DownloadCollection();
        //  this.application = application;
          // manges sorting and filtering of the collection
        //   this.listHeader = new ListHeaderView({
        //     view: this,
        //     application: application,
        //     collection: this.collection,
        //     filters: this.filterOptions,
        //     sorts: this.sortOptions,
        //     rangeFilter: 'date',
        //     selectable: true,
        //     hidePagination: true
        // });
        
        this.listenCollection();
         this.listHeader = new ListHeaderView({
            view: this,
            application: this.application,
            collection: this.collection,
            sorts: this.sortOptions,
            rangeFilter: 'date',
            rangeFilterLabel: Utils.translate('From'),
            hidePagination: true,
            allowEmptyBoundaries: true
        });
       
       
         this.collection.on('reset',this.showContent,this)
    },

    // beforeShowContent: function beforeShowContent() {     
    //     return this.collection.fetch();
         
    // },


    // @method listenCollection
    listenCollection: function() {
        this.setLoading(true);

        this.collection.on({
            request: jQuery.proxy(this, 'setLoading', true),
            reset: jQuery.proxy(this, 'setLoading', false)
        });
    },
    
    // @method setLoading @param {Boolean} bool
    setLoading: function(bool) {
        this.isLoading = bool;
    },

    // @property {Array<ListHeader.View.SortOption>} sortOptions
    sortOptions: [
        {
            value: 'custrecord_downloadable_item',
            name: Utils.translate('by Number'),
            selected: true
        },
        {
            value: 'custrecord_download_expiry_date',
            name: Utils.translate('by Request date')
        }
        
    ],

    childViews: {
       
        'ListHeader.View': function() {
            return this.listHeader;
        },
        
        'Downloads.Collection': function() {
        
            console.log(this.collection);
                const records_collection = new Backbone.Collection(
                    // this.collection.model[0].records.map()
                    this.collection.map(function(download_item) {
                    console.log(download_item);
                    
                   var len =download_item.records;
                     for(var i=0 ; i<len.length ;i++){
                         var internalid =len[i].internalid;
                         var   value=len[i].custrecord_download_expiry_date;
                         var  tranid=len[i].custrecord_downloadable_item;
                        console.log(len[i].internalid);

                         const model = new Backbone.Model({
                            touchpoint: 'customercenter',
                            title: new Handlebars.SafeString(
                                Utils.translate('<span class="custrecord_downloadable_item">$(0)</span>',tranid)
                            ),
                            // id:download_item.get('internalid'),
                            id:internalid,
                            // internalid:download_item.get('internalid'), 
                            internalid:internalid ,
    
                            columns: [
                                {
                                    label: Utils.translate('Date:'),
                                    type: 'date',
                                    name: 'date',
                                     value: value
                                //    value:download_item.get('custrecord_download_expiry_date')
                                },    
                            ]
                        
                        });
                        return model;
                         
                    }
                   
                }) 
                );

            return new BackboneCollectionView({
                childView: RecordViewsView,
                collection: records_collection,
                viewsPerRow: 1
            });
        },
        'GlobalViews.Pagination': function() {
            // console.log(this.collection.totalRecordsFound);
            
            return new GlobalViewsPaginationView(
                _.extend(
                    {
                        totalPages: Math.ceil(
                            
                            //  this.collection.totalRecordsFound / this.collection.recordsPerPage  
                            //  this.collection.totalRecordsFound /  2 
                            6/2
                          
                    )}
                    )
                 );
        },
        'GlobalViews.ShowCurrentPage': function() {
            return new GlobalViewsShowingCurrentView({
                items_per_page: this.collection.recordsPerPage,
                total_items: this.collection.totalRecordsFound,
                total_pages: Math.ceil(
                    // this.collection.totalRecordsFound / this.collection.recordsPerPage  
                    6/2

                   
                )
            });
        },
     
        
    },
    
   
    getContext: function() {    
    
        return {

        Down:"DownloadItem",
        pageHeader: this.page_header,
        // @property {Boolean} collectionLengthGreaterThan0
        collectionLengthGreaterThan0: this.collection.length > 0,
                   // @property {Boolean} showPagination
                   showPagination: !!(this.collection.totalRecordsFound && 2),
             
        };
    }
});

export = DownloadableView;