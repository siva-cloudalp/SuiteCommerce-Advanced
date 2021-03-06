/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("Facets.Router", ["require", "exports", "underscore", "Utils", "Configuration", "Facets.Browse.View"], function (require, exports, _, Utils, Configuration_1, BrowseView) {
    "use strict";
    // @class Facets.Router Mixes the Translator, Model and View
    var FacetsRouter = function (application) {
        this.application = application;
        this.translatorConfig = application.translatorConfig;
        var pageType = this.application.getComponent('PageType');
        pageType.registerPageType({
            name: 'facet-browse',
            defaultTemplate: {
                name: 'facets_facet_browse.tpl',
                displayName: 'Facets Default',
                thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources('img/default-layout-facet-browse.png')
            }
        });
        BrowseView.router = this;
    };
    FacetsRouter.prototype.addUrl = function (urls, functionToCall) {
        if (urls.length) {
            urls = _.map(urls, function (url) {
                return url.replace(/^\//, '');
            });
            var rootRegex = '^\\b(' + urls.join('|') + ')\\b$';
            var regex = '^\\b(' +
                urls.join('|') +
                ')\\b[\\' +
                Configuration_1.Configuration.get('facetDelimiters.betweenFacetNameAndValue') +
                '\\?].*$';
            var pageType = this.application.getComponent('PageType');
            pageType.registerPageType({
                name: 'facet-browse',
                routes: [new RegExp(rootRegex), new RegExp(regex)],
                view: BrowseView
            });
        }
    };
    // @method getFacetsAliasesMapping @param {Array<Object>} corrections
    FacetsRouter.prototype.getFacetsAliasesMapping = function (corrections) {
        var facets_aliases_mapping = {};
        _.each(corrections, function (correction) {
            facets_aliases_mapping[correction.usedAlias] = {
                url: correction.url,
                type: correction.type ? correction.type : ''
            };
        });
        return facets_aliases_mapping;
    };
    FacetsRouter.prototype.unaliasUrlHelper = function (facet_tokens, facets_aliases_mapping, separator_between_facets, separator_between_facet_name_and_value) {
        var translated_facets = '';
        while (facet_tokens.length > 0) {
            var facet_name = facet_tokens.shift();
            var facet_value = facet_tokens.shift();
            if (_.isUndefined(facet_name) || _.isUndefined(facet_value)) {
                continue;
            }
            var facet_name_correction = facets_aliases_mapping[facet_name];
            var facet_value_correction = facets_aliases_mapping[facet_value];
            // Just double check if unalias is correct... not undefined and unalias type matches with the url component being analyzed!
            var facet_name_correction_url = facet_name_correction && facet_name_correction.type.toUpperCase() === 'FACET'
                ? facet_name_correction.url
                : null;
            var facet_value_correction_url = facet_value_correction && facet_value_correction.type.toUpperCase() === 'FACET_VALUE'
                ? facet_value_correction.url
                : null;
            if (facet_name_correction_url && facet_value_correction_url) {
                translated_facets +=
                    facet_name_correction_url +
                        separator_between_facet_name_and_value +
                        facet_value_correction_url;
            }
            else if (facet_name_correction_url && !facet_value_correction_url) {
                translated_facets +=
                    facet_name_correction_url + separator_between_facet_name_and_value + facet_value;
            }
            else if (!facet_name_correction_url && facet_value_correction_url) {
                translated_facets +=
                    facet_name + separator_between_facet_name_and_value + facet_value_correction_url;
            }
            else {
                translated_facets += facet_name + separator_between_facet_name_and_value + facet_value;
            }
            if (facet_tokens.length > 0) {
                translated_facets += separator_between_facets;
            }
        }
        return translated_facets;
    };
    // @method unaliasUrl @param {String} aliased_url @param {Array<Object>} corrections
    FacetsRouter.prototype.unaliasUrl = function (aliased_url, corrections) {
        if (aliased_url.indexOf('http://') === 0 || aliased_url.indexOf('https://') === 0) {
            throw new Error('URL must be relative');
        }
        aliased_url = aliased_url[0] === '/' ? aliased_url.substr(1) : aliased_url;
        var facet_delimiters = this.translatorConfig.facetDelimiters;
        var facets_n_options = aliased_url.split(facet_delimiters.betweenFacetsAndOptions);
        var facets = facets_n_options[0] && facets_n_options[0] !== this.translatorConfig.fallbackUrl
            ? facets_n_options[0]
            : '';
        var options = facets_n_options[1] || '';
        var facet_tokens = facets.split(new RegExp('[\\' +
            facet_delimiters.betweenDifferentFacets +
            '\\' +
            facet_delimiters.betweenFacetNameAndValue +
            ']+', 'ig'));
        var facets_aliases_mapping = this.getFacetsAliasesMapping(corrections);
        var unaliased_url = this.unaliasUrlHelper(facet_tokens, facets_aliases_mapping, facet_delimiters.betweenDifferentFacets, facet_delimiters.betweenFacetNameAndValue);
        if (options) {
            var option_tokens_1 = [];
            options.replace(new RegExp('([^' +
                facet_delimiters.betweenFacetsAndOptions +
                facet_delimiters.betweenOptionNameAndValue +
                facet_delimiters.betweenDifferentOptions +
                ']+)(' +
                facet_delimiters.betweenOptionNameAndValue +
                '([^' +
                facet_delimiters.betweenDifferentOptions +
                ']*))?', 'ig'), function ($0, $1, $2, $3) {
                option_tokens_1.push($1);
                option_tokens_1.push($3);
            });
            var unaliased_options = this.unaliasUrlHelper(option_tokens_1, facets_aliases_mapping, facet_delimiters.betweenDifferentOptions, facet_delimiters.betweenOptionNameAndValue);
            unaliased_url = unaliased_url !== '' ? unaliased_url : this.translatorConfig.fallbackUrl;
            unaliased_url += facet_delimiters.betweenFacetsAndOptions + unaliased_options;
        }
        return unaliased_url;
    };
    return FacetsRouter;
});

//# sourceMappingURL=Facets.Router.js.map
