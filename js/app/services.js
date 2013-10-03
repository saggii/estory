/**
 * Created with JetBrains WebStorm.
 * User: saychinu
 * Date: 6/5/13
 * Time: 3:50 AM
 * To change this template use File | Settings | File Templates.
 */

serviceModule.factory('locationList',function(){
    var locationsArray = [{"name":"Aundh"},
                          {"name":"Karve Nagar"},
                          {"name":"Hadapsar"},
                          {"name":"Chinchwad"},
                          {"name":"Kothrud"},
                          {"name":"Magarpatta"},
                          {"name":"Baner"},
                          {"name":"Hinjewadi"},
                          {"name":"Katraj"},
                          {"name":"Wakad"},
                          {"name":"Khardi"},
                          {"name":"PCMC"},
                          {"name":"Kumthekar Road"}
                        ];

    var locations =  {
        getData:function(){
            return locationsArray;
        }
    }
    return locations;
});


serviceModule.factory('newsListService',function(){
    console.log('In news list  service');
    var newsList ={
        getNewsData:function(){
            var newsdata = new Array();
            console.log('Getting projects....');
            $.ajax({
                url: 'http://198.46.152.24:8889/rest/data/news',
                type: 'get',
                dataType: 'json',
                async: false,
                success: function(data) {
                    console.log('projectData::'+data);
                    newsdata=data;
                    return data;
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log('errorThrown::'+errorThrown);
                return errorThrown;
               }
            });
        return newsdata;
        }
    }
    return newsList;

});

serviceModule.factory('poiService',function(){
    console.log('In poiService');
    var poiList ={
        getPoiData:function(locationName){
            var poiData = new Array();
            $.ajax({
                url: 'http://198.46.152.24:8888/rest/data/school',
                type: 'get',
                dataType: 'json',
                async: false,
                success: function(data) {
                    poiData = data;
                    console.log('schoolData::'+poiData);
                    return poiData;
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log('errorThrown::'+errorThrown);
                    return errorThrown;
                }
            });
            return poiData;
        }
    }
    return poiList;
});



