/**
 * Created with JetBrains WebStorm.
 * User: saychinu
 * Date: 6/5/13
 * Time: 3:50 AM
 * To change this template use File | Settings | File Templates.
 */

serviceModule.factory('tempList',function(){
    var tempNewsArray = [
    						{
    						"title":"Test1",
    						"pubDate":"",
    						"imgSrc":""
    						},
    						{
    						"title":"Test2",
    						"pubDate":"",
    						"imgSrc":""
    						},
    						,
    						{
    						"title":"Test3",
    						"pubDate":"",
    						"imgSrc":""
    						},
    						,
    						{
    						"title":"Test4",
    						"pubDate":"",
    						"imgSrc":""
    						}
    						
                   ];

    var tempNews =  {
        getData:function(){
            return tempNewsArray;
        }
    }
    return tempNews;
});


serviceModule.factory('newsListService',function(){
    console.log('In news list  service');
    var newsList ={
        getNewsData:function(){
            var newsdata = new Array();
            console.log('Getting projects....');
            $.ajax({
                url: 'http://localhost:8009/feed/date/20131111',
                type: 'get',
                dataType: 'json',
                async: false,
                beforeSend: function( xhr ) {
                    xhr.setRequestHeader('X-Requested-With', {toString: function(){ return ''; }});
                },
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

serviceModule.factory('draftService',function(){
    console.log('In draftService');
    var draftArray = new Object();
    var drafts ={
        getDraft:function(draftName){
            return draftArray[draftName];
        },
        setDraft:function(draftName,contents){
            draftArray[draftName] = contents;
        }
    }
    return drafts;
});

serviceModule.factory('publishStory',function(){
    console.log('Publishing..');
    var publishService ={
        publish:function(feed){
            var response;
            console.log('calling service....');
            $.ajax({
                url: 'http://localhost:8009/feed/internal/save',
                type: 'POST',
                data: JSON.stringify(feed),
                dataType: 'json',
                contentType: "application/json",
                async: false,
                success: function(data) {
                    console.log('projectData::'+data);
                    response=data;
                    return data;
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log('errorThrown::'+errorThrown);
                    return errorThrown;
                }
            });
            return response;
        }
    }
    return publishService;

});


