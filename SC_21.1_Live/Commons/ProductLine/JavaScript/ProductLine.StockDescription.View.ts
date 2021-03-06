/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="ProductLine.StockDescription.View"/>

import * as product_line_stock_description_tpl from 'product_line_stock_description.tpl';

import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');

// @class ProductLine.StockDescription.View @extends Backbone.View
export = BackboneView.extend({
    template: product_line_stock_description_tpl,

    // @method initialize Override default method to attach model's change event to re-render
    initialize: function() {
        this.model.on('change', this.render, this);
    },

    // @method getContext
    // @return {ProductLine.StockDescription.View.Context}
    getContext: function() {
        this.stock_info = this.model.getStockInfo();

        // @class ProductLine.Stock.View.Context
        return {
            // @property {Boolean} showStockDescription
            showStockDescription: !!(
                this.stock_info.showStockDescription && this.stock_info.stockDescription
            ),
            // @property {Item.Model.StockInfo} stockInfo
            stockInfo: this.stock_info
        };
        // @class ProductLine.StockDescription.View
    }
});

// @class ProductLine.StockDescription.View.Initialize.options
