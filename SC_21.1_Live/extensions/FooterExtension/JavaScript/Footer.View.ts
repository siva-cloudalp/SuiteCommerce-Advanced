/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="Footer.View"/>

// @Typescript-partial
/*
 * It's partially migrated because configuration import is not right
 * */
import * as footer_tpl from 'footer.tpl';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';
import { View } from '../../../Commons/Core/JavaScript/View';
import { GlobalViewsBackToTopView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.BackToTop.View';
// import { Configuration } from '../../SCA/JavaScript/Configuration';
import { Configuration } from '../../../Advanced/SCA/JavaScript/Configuration';
// import { ApplicationOnline } from '../../SCA/JavaScript/ApplicationOnline';
import { ApplicationOnline } from '../../../Advanced/SCA/JavaScript/ApplicationOnline';
import { LogLevels } from '../../../Commons/Loggers/JavaScript/Loggers.Configuration';
import { UrlHelper } from '../../../Commons/UrlHelper/JavaScript/UrlHelper';
import _ = require('underscore');
interface FooterViewContext {
    showFooterNavigationLinks: boolean;
    footerNavigationLinks: string[];
    footergetContent1:boolean;
    footergetContent2:boolean;
    footergetContent3:boolean;
    footerContent1:string[];
    footerContent2:string[];
    footerContent3:string[];
    // showFooterimage:boolean;
    logourl:string;
}
export class FooterView extends View<FooterViewContext> {
    protected template = footer_tpl;

    private application: ApplicationOnline;

    public childViews = {
        'Global.BackToTop': () => {
            return new GlobalViewsBackToTopView();
            // this.initialize();
        }
    };
    


    public constructor(options: { application: ApplicationOnline }) {
        super();
        this.application = options.application;

        /* after appended to DOM, we add the footer height as the content bottom padding,
        so the footer doesn't go on top of the content wrap it in a setTimeout because
        if not, calling height() can take >150 ms in slow devices - forces the browser
        to re-compute the layout.
        */
        this.application.getLayout().on('afterAppendToDom', function(): void {
            const headerMargin = 25;

            setTimeout(function() {
                const contentHeight: number =
                    jQuery(window).innerHeight() -
                    jQuery('#site-header')[0].offsetHeight -
                    headerMargin -
                    jQuery('#site-footer')[0].offsetHeight;
                jQuery('#main-container').css('min-height', contentHeight);
            }, 10);
        });
    }

    public getContext(): FooterViewContext {
        const footerNavigationLinks = Configuration.get('footer.navigationLinks', []);
        // console.log(footerNavigationLinks);
        // console.log("hello world");
        // console.log("cloudalp");
        // console.log("boom");
        const footerContent1 = Configuration.get('footer.contentOne', []);
        const footerContent2 = Configuration.get('footer.contentTwo', []);
        const footerContent3 = Configuration.get('footer.contentThree', []);
        const logourl = Configuration.get('footer.logoUrl')
        // console.log(logourl);
       
        
        
        
        return {
            // isStandalone: this.application.isStandalone(),
            footergetContent1: !!footerContent1.length,
            footergetContent2: !!footerContent2.length,
            footergetContent3: !!footerContent3.length,
            footerContent1:footerContent1,
            footerContent2: footerContent2,
            footerContent3: footerContent3,
            showFooterNavigationLinks: !!footerNavigationLinks.length,
            // showFooterimage: logourl,
            logourl:logourl,
            footerNavigationLinks: footerNavigationLinks,
            // showfooterContent1: !!footerContent1.length,
             
        
        };
    }
}
