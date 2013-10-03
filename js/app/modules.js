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
        when('/fundamentals', {templateUrl:'widgets/Fundamentals.html',controller:"fundamentalsController"}).
        otherwise({redirectTo:'/'});
}]);


var estoryMainController = function($scope,$location,newsListService) {
    console.log('Express Story Started .. ');
    var data =newsListService.getNewsData();
    console.log('data '+data);
    $scope.newsList=data;
}