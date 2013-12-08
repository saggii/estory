/**
 * User: chinmay sagade
 * Date: 6/5/13
 * Time: 3:50 AM
 */

serviceModule.factory('newsListService',function(){

    var newsList ={
        getNewsData:function(){
            var newsdata = new Array();
            $.ajax({
                //url: 'http://localhost:8009/feed/date/20131103',
                url:'http://localhost/ExpressStory/Response.json',
                type: 'get',
                dataType: 'json',
                async: false,
                beforeSend: function( xhr ) {
                    xhr.setRequestHeader('X-Requested-With', {toString: function(){ return ''; }});
                    xhr.setRequestHeader('X-Requested-Service', 'testing');
                },
                success: function(data) {
                    newsdata=data;
                    return data;
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                return errorThrown;
               }
            });
        return newsdata;
        }
    }
    return newsList;

});

serviceModule.factory('draftService',function(){
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
    var publishService ={
        publish:function(feed){
            var response;
            $.ajax({
                //url: 'http://localhost:8009/feed/internal/save',
                url: 'http://localhost/ExpressStory/EStoryServices.php?service=publishStory',
                type: 'POST',
                data: JSON.stringify(feed),
                dataType: 'json',
                contentType: "application/json",
                async: false,
                success: function(data) {
                    response=data;
                    return data;
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    return errorThrown;
                }
            });
            return response;
        }
    }
    return publishService;

});

serviceModule.factory('getStoryItem',function(){
    var getFeedService ={
        fetch:function(pubDate,category,section,sourceId,feedId){
            var response;
            $.ajax({
                url: 'http://localhost:8009/feed/'+pubDate+'/'+category+'/'+section+'/'+sourceId+'/'+feedId,
                type: 'GET',
                data: JSON.stringify(feed),
                dataType: 'json',
                contentType: "application/json",
                async: false,
                success: function(data) {
                    response=data;
                    return data;
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    return errorThrown;
                }
            });
            return response;
        }
    }
    return getFeedService;

});

serviceModule.factory('userInfoService',function(){
    var userDetails = new Object();
    userDetails.getUserInfo=function(){
        var userDetails=angular.fromJson(sessionStorage.userService);
        if(userDetails==undefined){
            userDetails = new Object();
            userDetails.isUserLoggedIn=false;
            return userDetails;
        }
        return userDetails;
    };
    userDetails.setUserInfo=function(user){
        userDetails = new Object();
        userDetails.isUserLoggedIn = true;
        userDetails.userInfo=user;
        sessionStorage.userService=angular.toJson(userDetails);
    };
    return userDetails;
});


