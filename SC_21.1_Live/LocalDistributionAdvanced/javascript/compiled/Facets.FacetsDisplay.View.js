/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("Facets.FacetsDisplay.View", ["require", "exports", "underscore", "facets_facets_display.tpl", "Backbone.View"], function (require, exports, _, facets_facets_display_tpl, BackboneView) {
    "use strict";
    return BackboneView.extend({
        template: facets_facets_display_tpl,
        // @method getContext @return {Facets.FacetsDisplay.View.Context}
        getContext: function () {
            var facets = this.options.facets;
            var translator = this.options.translator;
            _.each(facets, function (facet) {
                facet.value = _.isArray(facet.value) ? facet.value : [facet.value];
            });
            var facet_values = [];
            _.each(facets, function (facet) {
                var parser = facet.config.parser;
                _.each(facet.value, function (value) {
                    var from = _.isObject(value) ? value.from : '';
                    var to = _.isObject(value) ? value.to : '';
                    var value_data = {
                        facetValueIsObject: _.isObject(value),
                        from: from && parser ? parser(from) : from,
                        to: to && parser ? parser(to) : to,
                        valueLabel: translator.getLabelForValue(facet.id, value),
                        facetValueUrl: translator.cloneForFacetId(facet.id, value).getUrl(),
                        facetValue: facet.value
                    };
                    facet_values.push(value_data);
                });
            });
            // @class Facets.FacetsDisplay.View.Context
            return {
                // @property {Boolean} hasFacets
                hasFacets: facets.length > 0,
                // @property {String} clearAllFacetsLink
                clearAllFacetsLink: translator.cloneWithoutFacets().getUrl(),
                // @property {Array} values
                values: facet_values
            };
            // @class Facets.FacetsDisplay.View
        }
    });
});

//# sourceMappingURL=Facets.FacetsDisplay.View.js.map
