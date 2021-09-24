define('LocationQuantity.ServiceController',[
    'ServiceController',
    'LocationQuantity.Model',
    'underscore'
], function(ServiceController,LocationQuantityModel,_) {
    return ServiceController.extend({
        name:'LocationQuantity.ServiceController',
        get:function()
        {
            // var id = this.request.getParameter('internalid');
            // return id ? LocationQuantityModel.get(id):LocationQuantityModel.list()
             return LocationQuantityModel.list()

        }
    })
    
});

// post: function() {
//     return ContactModel.register(this.data);
// }