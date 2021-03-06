/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("GlobalViews.RatingByStar.View", ["require", "exports", "global_views_rating_by_star.tpl", "jQuery", "Configuration", "Backbone.View"], function (require, exports, global_views_rating_by_star_tpl, jQuery, Configuration_1, BackboneView) {
    "use strict";
    // @class GlobalViews.RatingByStar.View @extends Backbone.View
    var GlobalViewsRatingByStarView = BackboneView.extend({
        template: global_views_rating_by_star_tpl,
        initialize: function (options) {
            this.showPercentage = options.showPercentage;
            this.showCount = options.showCount;
            this.queryOptions = options.queryOptions;
            this.baseUrl = options.baseUrl;
        },
        // @method getContext @returns {GlobalViews.RatingByStar.View.Context}
        getContext: function () {
            var maxRate = Configuration_1.Configuration.get('productReviews.maxRate');
            var ratingsCountsByRate = this.model.get('_ratingsCountsByRate');
            var count;
            var percentage;
            var rates = [];
            for (var i = maxRate; i > 0; i--) {
                count = ratingsCountsByRate[i] ? parseInt(ratingsCountsByRate[i]) : 0;
                percentage = (count * 100) / this.model.get('_ratingsCount');
                rates.push({
                    count: count,
                    percentage: percentage,
                    percentageRound: Math.round(percentage),
                    index: i,
                    showLink: !!count,
                    url: this.getUrlForOption({ filter: i + 'star' }),
                    isOneReview: count === '1'
                });
            }
            // @class GlobalViews.RatingByStar.View.Context
            return {
                // @property {Boolean} showCount
                showCount: this.showCount,
                // @property {Boolean} showPercentage
                showPercentage: this.showPercentage,
                // @property {Array} rates
                rates: rates
            };
        },
        // creates a new url based on a new filter or sorting options
        getUrlForOption: function (option) {
            var options = {};
            var sort = (option && option.sort) || this.queryOptions.sort;
            var filter = (option && option.filter) || this.queryOptions.filter;
            if (filter) {
                options.filter = filter;
            }
            if (sort) {
                options.sort = sort;
            }
            return this.baseUrl + '?' + jQuery.param(options);
        }
    });
    return GlobalViewsRatingByStarView;
});

//# sourceMappingURL=GlobalViews.RatingByStar.View.js.map
