/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("Cart.QuickAddToCart.View", ["require", "exports", "underscore", "cart_quickaddtocart.tpl", "Configuration", "LiveOrder.Model", "Cart.AddToCart.Button.View", "ProductViews.Price.View", "Backbone.View"], function (require, exports, _, cart_quickaddtocart_tpl, Configuration_1, LiveOrderModel, CartAddToCartButtonView, ProductViewsPriceView, BackboneView) {
    "use strict";
    return BackboneView.extend({
        // @property {Function} template
        template: cart_quickaddtocart_tpl,
        events: {
            'blur [data-action="setquantity"]': 'updateQuantity'
        },
        // @method initialize Override default method to define state properties and attach to model's change event
        // @param {Cart.QuickAddToCart.View.Initialize.Options} options
        // @return {Void}
        initialize: function initialize() {
            this.cart = LiveOrderModel.getInstance();
            // @property {Boolean} showQuickAddToCartButton Indicate if the current model is valid to be added form the facet list and if the configuration to show this button is enabled
            this.showQuickAddToCartButton = !!(Configuration_1.Configuration.get('addToCartFromFacetsView', false) &&
                this.model.getItem().get('_isPurchasable') &&
                !this.hasRequiredCustomFields() &&
                this.model.areAttributesValid(['options']));
        },
        //@method hasRequiredCustomFields Returns if the item has required custom fields
        //@return {Boolean}
        hasRequiredCustomFields: function hasRequiredCustomFields() {
            var hasRequiredFields = false;
            if (this.model.getItem().get('_optionsDetails') && this.model.getItem().get('_optionsDetails').fields) {
                _.find(this.model.getItem().get('_optionsDetails').fields, function (field) {
                    if (field.ismandatory) {
                        hasRequiredFields = true;
                        return;
                    }
                });
            }
            return hasRequiredFields;
        },
        // @method getMinimumQuantity Returns the minimum quantity taking into account how many item are in the cart
        // @return {Number}
        getMinimumQuantity: function getMinimumQuantity() {
            return !this.cart.findLine(this.model) ? this.model.getItem().get('_minimumQuantity') : 1;
        },
        // @method getMaximumQuantity Returns the maximum quantity, if set, taking into account how many item are in the cart
        // @return {Number}
        getMaximumQuantity: function getMaximumQuantity() {
            var maximum_quantity = this.model.getItem().get('_maximumQuantity');
            if (maximum_quantity) {
                var line_in_cart = this.cart.findLine(this.model);
                maximum_quantity = !line_in_cart
                    ? maximum_quantity
                    : maximum_quantity - line_in_cart.quantity;
                return maximum_quantity;
            }
        },
        // @method updateQuantity Set the quantity into the current line
        // @param {jQuery.Event} e
        // @return {Void}
        updateQuantity: function updateQuantity(e) {
            var new_quantity = parseInt(this.$(e.target).val(), 10);
            var minimum_quantity = this.getMinimumQuantity();
            var maximum_quantity = this.getMaximumQuantity();
            if (_.isNaN(new_quantity) || !_.isNumber(new_quantity) || new_quantity < minimum_quantity) {
                new_quantity = minimum_quantity;
            }
            else if (!!maximum_quantity && new_quantity > maximum_quantity) {
                new_quantity = maximum_quantity;
            }
            this.model.set('quantity', new_quantity);
            this.render();
        },
        childViews: {
            AddToCart: function () {
                return new CartAddToCartButtonView({
                    model: this.model,
                    application: this.options.application
                });
            },
            'ProductViewsPrice.Price': function () {
                return new ProductViewsPriceView({
                    model: this.model,
                    origin: 'ITEMCELL'
                });
            }
        },
        // @method getContext
        // @return {Cart.QuickAddToCart.View.Context}
        getContext: function getContext() {
            var item_model = this.model.get('item');
            // @class Cart.QuickAddToCart.View.Context
            return {
                // @property {String} itemId
                itemId: item_model.get('_id'),
                // @property {Boolean} showQuickAddToCartButton
                showQuickAddToCartButton: this.showQuickAddToCartButton,
                // @property {Number} minimumQuantity
                minimumQuantity: this.getMinimumQuantity(),
                // @property {Boolean} maximumQuantity
                isMaximumQuantity: !!this.getMaximumQuantity(),
                // @property {Number} isMaximumQuantity
                maximumQuantity: this.getMaximumQuantity(),
                // @property {Number} quantity
                quantity: this.model.get('quantity')
            };
            // @class Cart.QuickAddToCart.View
        }
    });
});
// @class Cart.QuickAddToCart.View.Initialize.Options
// @property {Product.Model} model

//# sourceMappingURL=Cart.QuickAddToCart.View.js.map
