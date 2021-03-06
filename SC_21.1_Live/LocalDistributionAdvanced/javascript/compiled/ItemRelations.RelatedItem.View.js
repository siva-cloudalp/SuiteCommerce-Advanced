/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("ItemRelations.RelatedItem.View", ["require", "exports", "item_relations_related_item.tpl", "Utils", "ProductViews.Price.View", "GlobalViews.StarRating.View", "Backbone.View"], function (require, exports, item_relations_related_item_tpl, Utils, ProductViewsPriceView, GlobalViewsStarRatingView, BackboneView) {
    "use strict";
    // @class ItemViews.RelatedItem.View Responsible for rendering an item details. The idea is that the item rendered is related to another one in the same page
    // @extend Backbone.View
    var ItemRelationsRelatedItemView = BackboneView.extend({
        // @property {Function} template
        template: item_relations_related_item_tpl,
        // @method initialize Override default method to make this view composite
        // @param {ItemViews.RelatedItem.View.Initialize.Options} options
        // @return {Void}
        initialize: function () {
            BackboneView.prototype.initialize.apply(this, arguments);
        },
        contextData: {
            item: function () {
                return Utils.deepCopy(this.model);
            }
        },
        childViews: {
            'Item.Price': function () {
                return new ProductViewsPriceView({
                    model: this.model,
                    origin: 'RELATEDITEM'
                });
            },
            'Global.StarRating': function () {
                return new GlobalViewsStarRatingView({
                    model: this.model,
                    showRatingCount: false
                });
            }
        },
        // @method getContext
        // @returns {ItemViews.RelatedItem.View.Context}
        getContext: function () {
            // @class ItemViews.RelatedItem.View.Context
            return {
                // @property {String} itemURL
                itemURL: this.model.getFullLink(),
                // @property {String} itemName
                itemName: this.model.get('_name') || this.model.Name,
                // @property {ImageContainer} thumbnail
                thumbnail: this.model.getThumbnail(),
                // @property {String} sku
                sku: this.model.get('_sku'),
                // @property {String} itemId
                itemId: this.model.get('_id'),
                // @property {Item.Model} model
                model: this.model,
                // @property {Boolean} showRating
                showRating: SC.ENVIRONMENT.REVIEWS_CONFIG && SC.ENVIRONMENT.REVIEWS_CONFIG.enabled,
                // @property {String} track_productlist_list
                track_productlist_list: this.model.get('track_productlist_list'),
                // @property {String} track_productlist_position
                track_productlist_position: this.model.get('track_productlist_position'),
                // @property {String} track_productlist_category
                track_productlist_category: this.model.get('track_productlist_category')
            };
            // @class ItemViews.RelatedItem.View
        }
    });
    return ItemRelationsRelatedItemView;
});

//# sourceMappingURL=ItemRelations.RelatedItem.View.js.map
