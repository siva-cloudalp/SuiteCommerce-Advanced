/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("ReorderItems.Collection", ["require", "exports", "ReorderItems.Model", "Transaction.Line.Collection"], function (require, exports, ReorderItems_Model_1, TransactionLineCollection) {
    "use strict";
    var ReorderItemsCollection = TransactionLineCollection.extend({
        url: 'services/ReorderItems.Service.ss',
        model: ReorderItems_Model_1.ReorderItemsModel,
        parse: function (response) {
            this.totalRecordsFound = response.totalRecordsFound;
            this.recordsPerPage = response.recordsPerPage;
            return response.records;
        },
        update: function (options, list_header) {
            var data_filters = {
                sort: options.sort.value,
                order_id: this.order_id,
                order: options.order,
                page: options.page
            };
            if (!this.order_id) {
                var date_string = options.filter.value.apply(list_header.view);
                date_string = date_string && date_string.split('T');
                data_filters.from = date_string[0];
                data_filters.to = date_string[1];
            }
            this.fetch({
                data: data_filters,
                reset: true,
                killerId: options.killerId
            });
        }
    });
    return ReorderItemsCollection;
});

//# sourceMappingURL=ReorderItems.Collection.js.map
