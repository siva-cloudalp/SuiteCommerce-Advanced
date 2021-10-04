 
//----------------------------------------------------------------------------------------------------
/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="Downloads"/>
 
import DownloadView = require('./Downloads.Item.View');
import { MyAccountMenu } from '../../../Advanced/Header/JavaScript/MyAccountMenu';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
export = {
    mountToApp: function(application) {
        //const homeCMSTemplate = home_cms_tpl;
        const myAccountMenu = MyAccountMenu.getInstance();

        myAccountMenu.addSubEntry({
            entryId: 'orders',
            id: 'Downloads',
            name: Utils.translate('Downloads Item'),
            url: 'Downloads',
            index: 7,
            permission: 'transactions.tranFind.1,transactions.tranEstimate.1'
        });

        const pageType = application.getComponent('PageType');
       
        pageType.registerPageType({
            name: 'Downloads',
            routes: ['Downloads'],
             view: DownloadView,
             defaultTemplate: {
                name: 'downloads_item.tpl',
                displayName: 'downloadableitem',
                
            }
        });

        

    }
        

    
};