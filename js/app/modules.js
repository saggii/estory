/**
 * Created with JetBrains WebStorm.
 * User: chinmay sagade
 * Date: 5/28/13
 * Time: 10:02 PM
 * To change this template use File | Settings | File Templates.
 */
/*Creating modules for different aspects*/
var serviceModule = angular.module('services', []);

var directiveModule = angular.module('directives', []);

var filterModule = angular.module('filters', []);

var mentorApplicationModule = angular.module('estory', ['services', 'directives', 'filters']);

mentorApplicationModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {templateUrl:'Dashboard.html',controller:"mainController"}).
        when('/add', {templateUrl:'AddStory.html',controller:"addPostController"}).
        when('/preview', {templateUrl:'Preview.html',controller:"previewController"}).
        otherwise({redirectTo:'/'});
}]);


var mainController = function($scope,$location,tempList) {
    console.log('Express Story Started .. ');
    var data =tempList.getData();
    console.log('data '+data);
    $scope.newsList=data;
}


var addPostController = function($scope,$location,newsListService,draftService) {
    console.log('estoryAddPostController .. ');

    $scope.preview = function(){
        console.log('publish ');

        var value = CKEDITOR.instances['contentEditor'].getData();
        console.debug('val:'+value);
        var title = $scope.title;
        console.log('title: '+title);
        $('form[name="uploadImages"]').submit();
        var images = new Array();
        var imageNames = document.getElementById('files');
        for (var i = 0; i < imageNames.files.length; ++i) {
            images.push(imageNames.files.item(i).name);
        }
        console.log(new feed(title,value,images));
        draftService.setDraft("D123",new feed(title,value,images));
        $location.path('/preview')
    }
}

var previewController = function($scope,$location,newsListService,draftService,publishStory) {
    console.log('preview .. ');
    var feed = draftService.getDraft("D123");

    if(feed!=undefined){
    console.log('feed .. '+feed.author);
    $scope.title= feed.title;
    $scope.description= feed.description;

    $scope.publish = function(){
        console.log('Publishing..');
        publishStory.publish(feed);
    }
    }
}

  function feed (title,description,images){
    this.userId = 'chinmay';
    this.title=title;
    this.description = description;
    this.sourceId = 'eStory';
    this.publishedDate='20131111';
    this.section='general';
    this.link='';
    this.uri='';
    this.author='chinmay';
    this.feedURL='chinmay';
    this.images = images;
}