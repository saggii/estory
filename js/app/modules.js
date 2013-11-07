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
        when('/', {templateUrl:'Dashboard.html',controller:"estoryMainController"}).
        when('/add', {templateUrl:'AddStory.html',controller:"estoryAddPostController"}).
        otherwise({redirectTo:'/'});
}]);


var estoryMainController = function($scope,$location,newsListService) {
    console.log('Express Story Started .. ');
    var data =newsListService.getNewsData();
    console.log('data '+data);
    $scope.newsList=data;
}


var estoryAddPostController = function($scope,$location,newsListService) {
    console.log('estoryAddPostController .. ');

    $scope.publish = function(){

        console.log('publish ');
        console.debug(tinyMCE.get('elm1').getContent());
        var body=tinyMCE.get('elm1').getContent();
        var title = $scope.title;
        console.log('title: '+title);
        console.log(new feed(title,body));

   }
}

  function feed (title,content){
    this.user = 'chinmay';
    this.title=title;
    this.content = content;
    this.source = 'eStory';
}