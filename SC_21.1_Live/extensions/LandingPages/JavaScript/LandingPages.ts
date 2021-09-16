<<<<<<< HEAD
/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="LandingPages"/>

// @Typescript-partial
/*
 * It's partially migrated because configuration import is not right
 * */

// import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';
// import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
// import { View } from '../../../Commons/Core/JavaScript/View';
// import { GlobalViewsBackToTopView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.BackToTop.View';
// import { Configuration } from '../../SCA/JavaScript/Configuration';
// import { Configuration } from '../../../Advanced/SCA/JavaScript/Configuration';
// import { ApplicationOnline } from '../../SCA/JavaScript/ApplicationOnline';
// import { ApplicationOnline } from '../../../Advanced/SCA/JavaScript/ApplicationOnline';
// import { LogLevels } from '../../../Commons/Loggers/JavaScript/Loggers.Configuration';
// import { UrlHelper } from '../../../Commons/UrlHelper/JavaScript/UrlHelper';
import ContactUsView =require('./ContactUs.View');
// import ContactUsModules =require('./ContactUs.Model');
import * as contact_us_tpl from 'contact_us.tpl';
// import _ = require('underscore');
// export const excludeFromMyAccount = true;


export function mountToApp(application) {
        const contact=contact_us_tpl;
        const PageType = application.getComponent('PageType');
        PageType.registerPageType({
            name: 'contact-us',
            routes: ['contact-us'],
            view: ContactUsView,
            // module:ContactUsModules
            defaultTemplate: {
                name:'contact_us.tpl',
                displayName: 'ContactUs Default',
            // thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources('img/default-layout-PDP.png')
            }
        });

      

    }
=======
/// <amd-module name="LandingPages"/>
// start up file 
import ContactUsView = require('./ContactUs.View');
export ={
    mountTop: function(application){
const pageType = application.getComponent('pageType');

pageType.registerPageType({
    name: 'contactUs',
    routes: ['contact-Us'],
    view: ContactUsView,
    defaultTemplate: {
        name: 'boot_anatomy.tpl',
        displayName: 'Anatomy Default'
    }
});

    }
}
>>>>>>> 82dfd574152e92bfd84da48b63bede767e841da5
