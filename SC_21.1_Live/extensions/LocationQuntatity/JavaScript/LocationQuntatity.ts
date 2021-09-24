/// <amd-module name="LocationQuntatity"/>
import * as location_quntatity_tpl from 'location_quntatity.tpl';
import LocationQuntatityView =require( './LocationQuntatity.View');

// export function mountToApp(application){
//     const location_quntatity = location_quntatity_tpl;
//     const PageType = application.getComponent('PageType');

//     PageType.registerPageType({
//         name: 'LocationAvailabelquntatity',
//         routes: ['location-quntatity'],
//         view: LocationQuntatityView,
//         // module:ContactUsModules
//         // defaultTemplate: {
//         //     name:'product_details_full.tpl',
//         //     displayName: 'ContactUs Default',
//         // // thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources('img/default-layout-PDP.png')
//         // }
//     });
    
    

// }


// @class Home @extends ApplicationModule
export = {
    mountToApp: function(application) {
        //const homeCMSTemplate = home_cms_tpl;
        const pageType = application.getComponent('PageType');

        pageType.registerPageType({
            name: 'LocationAvailabelquntatity',
            routes: ['location-quntatity'],
            view: LocationQuntatityView,
        });

    }
};
