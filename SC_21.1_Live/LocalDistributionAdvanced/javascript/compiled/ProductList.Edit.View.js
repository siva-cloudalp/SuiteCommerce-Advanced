/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("ProductList.Edit.View", ["require", "exports", "underscore", "product_list_new.tpl", "Utils", "ProductList.Item.Collection", "Backbone.View", "Backbone.FormView"], function (require, exports, _, product_list_new_tpl, Utils, ProductListItemCollection, BackboneView, BackboneFormView) {
    "use strict";
    return BackboneView.extend({
        template: product_list_new_tpl,
        attributes: { class: 'product-list-new-wrapper' },
        events: {
            'submit form': 'saveForm',
            '[data-action="prevent-enter"]': 'preventEnter'
        },
        bindings: {
            '[name="name"]': 'name'
        },
        initialize: function (options) {
            this.application = options.application;
            this.parentView = options.parentView;
            this.model = options.model;
            this.isEdit = this.model.get('internalid');
            this.page_header = this.getTitle();
            this.inModal = options.inModal;
            BackboneFormView.add(this);
            this.model.once('saveCompleted', _.bind(this.onSaveComplete, this));
        },
        // @method preventEnter Prevents not desired behavior when hitting enter
        preventEnter: function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
            }
        },
        // Sets focus on the name field and returns the correct title text
        getTitle: function () {
            this.$('[name="name"]').focus();
            var editLabel = Utils.translate('Edit your list');
            var newLabel = Utils.translate('Edit your list');
            return this.isEdit ? editLabel : newLabel;
        },
        // Handles the form submit on save
        onSaveComplete: function () {
            var self = this;
            if (_.isArray(self.model.get('items'))) {
                self.model.set('items', new ProductListItemCollection(self.model.get('items')));
            }
            self.$containerModal &&
                self.$containerModal
                    .removeClass('fade')
                    .modal('hide')
                    .data('bs.modal', null);
            if (self.isEdit) {
                self.application.ProductListModule.Utils.getProductLists().add(self.model, {
                    merge: true
                });
                self.parentView.render();
                if (self.parentView.$el.hasClass('ProductListDetailsView')) {
                    self.parentView.showConfirmationMessage(Utils.translate('Good! The list was successfully updated. '));
                }
                else {
                    self.parentView.showConfirmationMessage(Utils.translate('Good! Your <a href="/wishlist/$(0)">$(1)</a> list was successfully updated. ', self.model.get('internalid'), self.model.get('name')));
                }
            }
            else {
                self.application.ProductListModule.Utils.getProductLists().add(self.model);
                self.parentView.render();
                self.parentView.showConfirmationMessage(Utils.translate('Good! Your <a href="/wishlist/$(0)">$(1)</a> list was successfully created. ', self.model.get('internalid'), self.model.get('name')));
            }
            self.parentView.highlightList &&
                self.parentView.highlightList(self.model.get('internalid'));
        },
        // @method getName Get new list name
        getName: function () {
            return this.$('.product-list-new-name-input input').val();
        },
        // @method getNotes Get new list notes
        getNotes: function () {
            return this.$('.product-list-new-notes-input textarea').val();
        },
        // @method getContext @return {ProductList.Edit.View.Context}
        getContext: function () {
            var model = this.model;
            // @class ProductList.Edit.View.Context
            return {
                // @property {Boolean} inModal
                inModal: !!this.inModal,
                // @property {Boolean} isEdit
                isEdit: !!this.isEdit,
                // @property {String} name
                name: model.get('name'),
                // @property {String} description
                description: model.get('description')
            };
        }
    });
});

//# sourceMappingURL=ProductList.Edit.View.js.map
