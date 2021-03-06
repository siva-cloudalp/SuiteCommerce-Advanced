/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("Content", ["require", "exports", "underscore", "jQuery", "Configuration", "Content.DataModels", "Content.EnhancedViews", "Content.LandingPages.View", "Backbone", "Tracker", "Utils"], function (require, exports, _, jQuery, Configuration_1, DataModels, EnhancedViews, LandingPagesView, Backbone) {
    "use strict";
    // Integration to the Content Delivery Service Bundle
    // @class Content Overrides ```Layout:showContent``` and ```Layout:showInModal``` so it first fetch
    // content if any and then show views enhanced with content if any.
    // It also listen for any change in the url hash
    // and fetch for content if any correspond to the new url.
    // It also handles content of type 'merchandising'
    // and instantiate the LandingPages router @extends ApplicationModule
    var Content = {
        mountToApp: function (Application) {
            if (!Configuration_1.Configuration.get('cms.useCMS')) {
                // Loads the URLs of the different pages in the content service,
                // this needs to happened before the application starts, so some routes are registered
                if (SC.ENVIRONMENT.CONTENT) {
                    DataModels.Urls.Collection.getInstance().reset(SC.ENVIRONMENT.CONTENT);
                    delete SC.ENVIRONMENT.CONTENT;
                    if (SC.ENVIRONMENT.DEFAULT_PAGE) {
                        DataModels.Pages.Collection.getInstance().reset(SC.ENVIRONMENT.DEFAULT_PAGE);
                        delete SC.ENVIRONMENT.DEFAULT_PAGE;
                    }
                }
                DataModels.Application = Application;
                var Layout_1 = Application.getLayout();
                var show_content_wrapper = function (fn, view) {
                    var promise = jQuery.Deferred();
                    var args = arguments;
                    // Check the URL and loads the page definition if needed
                    DataModels.loadPage('/' + Backbone.history.fragment, function (page) {
                        // override the title and page header of the view with the page returned
                        EnhancedViews.overrideViewSettings(view, page);
                        view.enhancedPage = true;
                        // Calls the original function with all the parameters (slice to exclude fn)
                        fn.apply(Layout_1, Array.prototype.slice.call(args, 1)).done(function () {
                            // once the original function is done this reads the attributes of the view and
                            // sets title, metas and adds banners
                            EnhancedViews.enhancePage(view, Layout_1);
                            // only after enhancing the view we resolve the promise
                            promise.resolveWith(this, arguments);
                        });
                    });
                    return promise;
                };
                // Wraps the layout.showContent and Layout.showInModal methods
                // This make sure that every time you try to show content in the
                // application the page will be enhanced by setting title, header, meta tags and banners
                Layout_1.showContent = _.wrap(Layout_1.showContent, show_content_wrapper);
                Layout_1.showInModal = _.wrap(Layout_1.showInModal, show_content_wrapper);
                Layout_1.on('renderEnhancedPageContent', function (view, content_zone) {
                    if (content_zone.contenttype === 'html') {
                        EnhancedViews.renderHTMLContent(view, content_zone);
                    }
                    else if (content_zone.contenttype === 'merchandising') {
                        EnhancedViews.previousPlaceholders.push(content_zone.target);
                    }
                });
                Application.on('afterModulesLoaded', function () {
                    var query = '';
                    var pageType = Application.getComponent('PageType');
                    pageType.registerPageType({
                        name: 'landing-page',
                        defaultTemplate: {
                            name: 'landing_page.tpl',
                            displayName: 'Landing Page Default',
                            thumbnail: '/path/to/landing_page_tpl.png'
                        }
                    });
                    _.each(DataModels.Urls.Collection.getInstance().landingPages, function (landing_page) {
                        query =
                            landing_page.get('query')[0] === '/'
                                ? landing_page.get('query').substring(1)
                                : landing_page.get('query');
                        pageType.registerPageType({
                            name: 'landing-page',
                            routes: [query, query + '?*options'],
                            view: LandingPagesView
                        });
                    });
                });
                Application.on('afterStart', function () {
                    // Every time the URL changes we call the DataModels.loadPage,
                    // so if we need to load content from the server, the request starts as soon as possible,
                    // Probably while other Ajax request are being made
                    Backbone.history &&
                        Backbone.history.on('all', function () {
                            DataModels.loadPage('/' + Backbone.history.fragment);
                        });
                    // After the application Starts we will do the same, since the URL have not changed yet
                    Backbone.history && DataModels.loadPage('/' + Backbone.history.fragment);
                });
            }
        }
    };
    return Content;
});

//# sourceMappingURL=Content.js.map
