
define( 'LandingPages.ServiceController',['ServiceController','LandingPages.Model'], function(
    ServiceController,
    LandingPagesModel
) {
   
    return ServiceController.extend({
       
        name: 'LandingPages.ServiceController',
            
        get:function(){

        },
      
        post: function() {
            return LandingPagesModel.register(this.data);
        }
    });
});