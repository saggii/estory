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

var mentorApplicationModule = angular.module('estory', ['services', 'directives', 'filters','ui.select2']);

var CategoryArray = [
    {"name":"General"},
    {"name":"Politics"},
    {"name":"Technology"},
    {"name":"Entertainment"},
    {"name":"Religion"}
];

var SectionArray = [
    {"name":"General"},
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
        otherwise({redirectTo:'/'});
}]);


var mainController = function($scope,$location,newsListService) {
    console.log('Express Story Started .. ');
    var data =newsListService.getNewsData();
    console.log('data '+data);
    $scope.newsList=data;
}


var addPostController = function($scope,$location,newsListService,draftService) {
    console.log('estoryAddPostController .. ');

    CKEDITOR.replace( 'contentEditor',
        {
            toolbar : 'Basic',
            extraPlugins:'timestamp,restfileupload',
            filebrowserUploadUrl : 'http://localhost:8009/feed/fileupload',
            height: 500,
            width: 1000

        });
    $scope.catagories=CategoryArray;
    $scope.sections=SectionArray;
    $scope.preview = function(){
        var value = CKEDITOR.instances['contentEditor'].getData();
        var title = $scope.title;
        var category = $scope.selectedCategory;
        var section = $scope.selectedSection;
        console.log(new feed(title,value,category,section));
        draftService.setDraft("D123",new feed(title,value,category,section));
        $location.path('/preview')
    }
}

var previewController = function($scope,$location,newsListService,draftService,publishStory) {
    console.log('preview .. ');
    var feed = draftService.getDraft("D123");

    if(feed!=undefined){
    console.log('feed author.. '+feed.author);
    $scope.title= feed.title;
    $scope.description= feed.description;

    $scope.publish = function(){
        console.log('Publishing..');
        publishStory.publish(feed);
    }
    }
}

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
console.log('dimension:'+JSON.stringify(dimension));
return dimension;
}