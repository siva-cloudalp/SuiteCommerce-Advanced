/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("ErrorManagement.PageNotFound.View", ["require", "exports", "error_management_page_not_found.tpl", "Utils", "ErrorManagement.View"], function (require, exports, error_management_page_not_found_tpl, Utils, ErrorManagementView) {
    "use strict";
    var ErrorManagementPageNotFoundView = ErrorManagementView.extend({
        template: error_management_page_not_found_tpl,
        attributes: {
            id: 'page-not-found',
            class: 'page-not-found'
        },
        title: Utils.translate('Page not found'),
        page_header: Utils.translate('Page not found'),
        initialize: function () {
            if (SC.ENVIRONMENT.jsEnvironment === 'server') {
                nsglobal.statusCode = 404;
            }
        },
        // @method getContext @returns {ErrorManagement.PageNotFound.View.Context}
        getContext: function () {
            // @class ErrorManagement.PageNotFound.View.Context
            return {
                // @property {String} title
                title: this.title,
                // @property {String} pageHeader
                pageHeader: this.page_header
            };
        }
    });
    return ErrorManagementPageNotFoundView;
});

//# sourceMappingURL=ErrorManagement.PageNotFound.View.js.map
