define('LocationQuantity.Model',[
    'SC.Model',
    'Models.Init',
    'underscore'
     
], function(SCModel,ModelInit,_) {
     
    return SCModel.extend({
        name:'LocationQuantity',
        list: function()
        {  var Data =[
            
            {internalid:1,name:'Midwest Warehouse'},
            {internalid:2,name:'Los Angeles Warehouse'},
            {internalid:3,name:'Chicago Warehouse'},
            {internalid:4,name:'New York Warehouse'},
            {internalid:5,name:'Miami Warehouse'},
            {internalid:6,name:'Wyoming'},
            {internalid:7,name:'California Warehouse'},
            {internalid:8,name:'Bristol'},
            {internalid:9,name:'Australia'}
          
        ];
            console.warn(JSON.stringify(Data),"mydata");
            return Data;
        }
        
    })
    
});