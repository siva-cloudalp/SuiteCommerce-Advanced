/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("ItemsSearcher.Item.View", ["require", "exports", "underscore", "itemssearcher_item.tpl", "GlobalViews.StarRating.View", "Backbone.View"], function (require, exports, _, itemssearcher_item_tpl, GlobalViewsStarRatingView, BackboneView) {
    "use strict";
    return BackboneView.extend({
        // @property {Function} template
        template: function () { },
        // @property {ItemsSearcher.View.Options} defaultOptions
        // @class ItemsSearcher.View.Options.Item.View.Option
        defaultOptions: {
            // @property {Function} template
            template: itemssearcher_item_tpl
        },
        // @class ItemsSearcher.Item.View
        // @method initialize
        // @param {ItemsSearcher.View.Options.Item.View.Option?} options
        // @return {Void}
        initialize: function (options) {
            this.options = _.defaults(options || {}, this.defaultOptions);
            this.template = this.options.template;
        },
        // @property {Object} childViews
        childViews: {
            'Global.StarRating': function () {
                return new GlobalViewsStarRatingView({
                    model: this.model,
                    showRatingCount: false
                });
            }
        },
        // @method getContext
        // @returns {ItemsSearcher.Item.View.Context}
        getContext: function () {
            // @class ItemsSearcher.Item.View.Context
            return {
                // @property {Item.Model} model
                model: this.model,
                // @property {String} currentQuery
                currentQuery: _(this.options.query).escape(),
                // @property {Boolea} isItemSelected
                isItemSelected: !!this.model,
                // @property {Boolean} hasResults
                hasResults: this.options.areResults,
                // @property {Boolean} isAjaxDone
                isAjaxDone: this.options.isAjaxDone
            };
            // @class ItemsSearcher.Item.View
        }
    });
});

//# sourceMappingURL=ItemsSearcher.Item.View.js.map
