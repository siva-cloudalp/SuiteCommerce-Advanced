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