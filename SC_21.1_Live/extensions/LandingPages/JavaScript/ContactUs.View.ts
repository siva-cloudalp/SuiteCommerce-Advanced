/// <amd-module name="ContactUs.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts" />
/// <reference path="../../../Commons/Utilities/JavaScript/GlobalDeclarations.d.ts" />

import * as _ from 'underscore';
import * as login_register_tpl from 'login_register.tpl';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';


import { GlobalViewsMessageView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.Message.View';
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');


const ContactUsView:any = BackboneView.extend({
    template: login_register_tpl,

    attributes: {
        id: 'ContactUs.View',
        'data-root-component-id': 'ContactUs.View'
    },
 title:Utils.translate('ContactUs')

})












export = ContactUsView;