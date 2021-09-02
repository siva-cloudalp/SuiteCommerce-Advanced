/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("Footer.View", ["require", "exports", "footer.tpl", "jQuery", "View", "GlobalViews.BackToTop.View", "Configuration"], function (require, exports, footer_tpl, jQuery, View_1, GlobalViews_BackToTop_View_1, Configuration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FooterView = /** @class */ (function (_super) {
        __extends(FooterView, _super);
        function FooterView(options) {
            var _this = _super.call(this) || this;
            _this.template = footer_tpl;
            _this.childViews = {
                'Global.BackToTop': function () {
                    return new GlobalViews_BackToTop_View_1.GlobalViewsBackToTopView();
                    // this.initialize();
                }
            };
            _this.application = options.application;
            /* after appended to DOM, we add the footer height as the content bottom padding,
            so the footer doesn't go on top of the content wrap it in a setTimeout because
            if not, calling height() can take >150 ms in slow devices - forces the browser
            to re-compute the layout.
            */
            _this.application.getLayout().on('afterAppendToDom', function () {
                var headerMargin = 25;
                setTimeout(function () {
                    var contentHeight = jQuery(window).innerHeight() -
                        jQuery('#site-header')[0].offsetHeight -
                        headerMargin -
                        jQuery('#site-footer')[0].offsetHeight;
                    jQuery('#main-container').css('min-height', contentHeight);
                }, 10);
            });
            return _this;
        }
        FooterView.prototype.getContext = function () {
            var footerNavigationLinks = Configuration_1.Configuration.get('footer.navigationLinks', []);
            // console.log(footerNavigationLinks);
            // console.log("hello world");
            // console.log("cloudalp");
            // console.log("boom");
            var footerContent1 = Configuration_1.Configuration.get('footer.contentOne', []);
            var footerContent2 = Configuration_1.Configuration.get('footer.contentTwo', []);
            var footerContent3 = Configuration_1.Configuration.get('footer.contentThree', []);
            var logourl = Configuration_1.Configuration.get('footer.logoUrl');
            // console.log(logourl);
            return {
                // isStandalone: this.application.isStandalone(),
                footergetContent1: !!footerContent1.length,
                footergetContent2: !!footerContent2.length,
                footergetContent3: !!footerContent3.length,
                footerContent1: footerContent1,
                footerContent2: footerContent2,
                footerContent3: footerContent3,
                showFooterNavigationLinks: !!footerNavigationLinks.length,
                // showFooterimage: logourl,
                logourl: logourl,
                footerNavigationLinks: footerNavigationLinks,
            };
        };
        return FooterView;
    }(View_1.View));
    exports.FooterView = FooterView;
});

//# sourceMappingURL=Footer.View.js.map
