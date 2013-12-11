/**
 * User: chinmay sagade
 * Date: 5/28/13
 * Time: 10:02 PM
 */

/*Creating modules for different aspects*/


var serviceModule = angular.module('services', []);

var directiveModule = angular.module('directives', []);

var filterModule = angular.module('filters', []);

var mentorApplicationModule = angular.module('estory', ['ngRoute','services', 'directives', 'filters','ui.select2','ui.bootstrap']);

var CategoryArray = [
    {"name":"GENERAL"},
    {"name":"POLITICS"},
    {"name":"SPORTS"},
    {"name":"ECONOMY"},
    {"name":"TECHNOLOGY"},
    {"name":"ENTERTAINMENT"},
    {"name":"RELIGION"}
];

var SectionArray = [
    {"name":"GENERAL"},
    {"name":"Editorial"},
    {"name":"KnowYourCandidate"},
    {"name":"SpeakingTree"},
    {"name":"TodayInHistory"}
];

mentorApplicationModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {templateUrl:'Dashboard.html',controller:"mainController"}).
        when('/add', {templateUrl:'AddStory.html',controller:"addPostController"}).
        when('/preview', {templateUrl:'Preview.html',controller:"previewController"}).
        when('/display', {templateUrl:'DisplayNews.html',controller:"displayNewsController"}).
        otherwise({redirectTo:'/'});
}]);


var mainController = function($scope,$location,$sce,newsListService,getStoryItem) {

    var data =newsListService.getNewsData();
    $scope.isCollapsed = false;
    $scope.newsList=transformNewsData(data);
    var feedTitle = "";


    $scope.openFeed=function (pubDate,category,section,sourceId,feedId){
        var feedData = getStoryItem.fetch(pubDate,category,section,sourceId,feedId);
        console.log(feedData.title);
        $scope.feedTitle = $sce.trustAsHtml(feedData.title);
        $scope.feedDescription = $sce.trustAsHtml(feedData.description);
    }

    //$scope.feedTitle=$sce.trustAsHtml(feedTitle);
}

var displayNewsController = function($scope) {
 console.log('displayNewsController');

}


var addPostController = function($scope,$location,newsListService,draftService) {

    CKEDITOR.replace( 'contentEditor',
        {
            toolbar : 'Basic',
            extraPlugins:'timestamp,restfileupload',
            height: 500,
            width: 1000

        });

    $scope.catagories=CategoryArray;

    $scope.sections=SectionArray;

    $scope.preview = function(){
        var value = CKEDITOR.instances['contentEditor'].getData();
        console.log(value);
        var title = $scope.title;
        var category = $scope.selectedCategory;
        var section = $scope.selectedSection;
        draftService.setDraft("D123",new feed(title,value,category,section));
        $location.path('/preview')
    }
}

var userController = function($scope,$location,$modal,$rootScope,userInfoService,$route) {



    $scope.isUserLoggedIn = false;

    var user = userInfoService.getUserInfo();

    if(user!=undefined){
        $scope.isUserLoggedIn = true;
        $scope.user=user.userInfo;
    }

    $scope.setDirectiveFn = function(fn) {
        console.log('setDirectiveFn modal'+fn);
        $scope.showFn = fn;
    };

    $scope.open = function(){
        var modalInstance = $modal.open({
            templateUrl: 'Login.html',
            controller: 'loginController',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    };

    $scope.$on('currentUser',function(){
        console.log('currentUser Changed in root scope ');
        user = userInfoService.getUserInfo();
        if(user!=undefined){

                $scope.isUserLoggedIn = true;
                $scope.user=user.userInfo;
                $route.reload();
        }
    });

}


var loginController = function($scope,$route,$rootScope,userInfoService,$location,$modalInstance) {

    OAuth.initialize('5vEwG97mciR3-UMGZj8U063pP6E');

    console.debug('In Login Controller');
    /* Method to call oAuth api*/
    $scope.performLogin=function(provider){

        setTimeout(function() {
        $scope.$apply(function() {

        console.debug('Provider passed is:'+provider);

        if(provider=='facebook'){
         OAuth.popup('facebook', function(err, result) {
                console.log(result);
                if(isValid(result)){
                    console.debug('Reloading the view:');
                }
            });

            OAuth.popup('facebook', function(err, result) {
                result.get('/me').done(function(data) {

                    var user=new User(data.username,'http://graph.facebook.com/'+data.username+'/picture',data.email,data.location.name);
                    userInfoService.setUserInfo(user);
                    console.debug('closing the view:');
                    $modalInstance.close();
                    $rootScope.$broadcast('currentUser');
                });
            });
           }
        })



        if(provider=='github'){

            console.debug('Preparing to call GitHub:');

            OAuth.popup('github', function(err, result) {
                console.log(result);
                if(isValid(result)){
                    console.debug('Reloading the view:');
                }
            });

            OAuth.popup('github', function(err, result) {
                result.get('/user').done(function(data) {
                    var user=new User(data.name,data.avatar_url,data.email,data.location);
                    userInfoService.setUserInfo(user);
                    $modalInstance.close();
                    $rootScope.$broadcast('currentUser');
                });
            });
        }

        if(provider=='google'){

            OAuth.popup('google', function(error, result) {
                console.log(result);
                result.get('/auth/plus.login').done(function(data) {
                    console.log(data);
                    //var user=new User(data.displayName,data.image.url,data.email,data.currentLocation);
                    //userInfoService.setUserInfo(user);
                });
            });
        }
    });
        $route.reload();
    }
}

var previewController = function($scope,$sce,$location,newsListService,draftService,publishStory) {

    var feed = draftService.getDraft("D123");

    if(feed!=undefined){
    $scope.title= feed.title;
        console.log(feed.description);
    $scope.description= $sce.trustAsHtml(feed.description);

    $scope.publish = function(){
        publishStory.publish(feed);
    }
    }
}

/*var redirectController = function($scope,$location) {
    console.log('Redirect Controller');
    $location.path("/");
}*/

  function feed (title,description,category,section){
    this.userId = 'chinmay';
    this.title=title;
    this.description = description;
    this.sourceId = 'eStory';
    this.publishedDate=getCurrentDate();
    this.category=category;
    this.section=section;
    this.link='';
    this.uri='';
    this.author='chinmay';
    this.feedURL='chinmay';
    this.image = getImageObject(description);

}


function User (name,imageURL,email,userLocation){
    this.name = name;
    this.imageURL=imageURL;
    this.email = email;
    this.userLocation = userLocation;
}

function getCurrentDate(){
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    curr_month++;
    var curr_year = d.getFullYear();
    return curr_year+''+curr_month+''+curr_date;

}


function getImageObject(htmlString){
    var image = new Object();
    var htmlContent = $(htmlString);
    var imageElement = htmlContent.find("img").get(0);
    console.debug('imageElement:'+imageElement);
    if(imageElement){
        image.src=$(imageElement).attr('src');
        var dimension=getImageDimensions(image.src);
        image.width=dimension.width;
        image.height=dimension.height;
    }
    return image;
}

function getImageDimensions(imgElementSrc){
var dimension = new Object;
var t = new Image();
t.src = imgElementSrc;
dimension.width= t.width;
dimension.height = t.height;
return dimension;
}

/*
* The function takes a JSON array and creates a root level property called Style which denotes if the
* news item contains a valid image source or not.
* @return A JSON array with elements extended with Style property.
*
**/
function transformNewsData(data){
    var transformedData = new Array();
    angular.forEach(data, function(value, key){
       if(!isValidNewsItem(value)){
           /*Post it as critical error.*/
           console.log("Invalid News Entry Found.");
       }else{
        if(value.image.src === null){
            value.Style='false';
        }else{
            value.Style='true';
        }
        transformedData.push(value);
       }
    });
    return transformedData;
}

function isValid(variant){
    if (typeof variant === "undefined") {
        return false;
    }else{
        return true;
    }
}

function isValidNewsItem(variant){

    if(!isValid(variant))
    {
        return false;
    }
    if((typeof(variant.category) === 'undefined') ||
       (typeof(variant.title) === 'undefined')||
       (typeof(variant.description) === 'undefined')||
       (typeof(variant.publishedDate) === 'undefined')||
       (typeof(variant.image) === 'undefined')||
       (typeof(variant.author) === 'undefined')
      ){
        return false;
    }

    return true;

}

function getStoryItem(pubDate,category,section,sourceId,feedId){
    return getStoryItem.fetch(pubDate,category,section,sourceId,feedId);
}




