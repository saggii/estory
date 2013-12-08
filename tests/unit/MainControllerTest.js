describe('Main Controller Tests', function() {

    var tempNewsArray = [
        {
            "userId" : "chinmay",
            "title" : "testTitle",
            "description" : "test description",
            "sourceId" : "eStory",
            "publishedDate" : "20131110",
            "category" : "general",
            "section" : "general",
            "link" : "htpp://test.com",
            "uri" : "testURL",
            "author" : "chinmay",
            "feedURL" :"feedURL",
            "image" :{ "imageURL":"test"}
        },
        {
            "userId" : "chinmay",
            "title" : "testTitle1234",
            "description" : "test description 123",
            "sourceId" : "eStory",
            "publishedDate" : "20131115",
            "category" : "general",
            "section" : "general",
            "link" : "htpp://test.com",
            "uri" : "testURL",
            "author" : "chinmay",
            "feedURL" :"feedURL",
            "image" :{ "imageURL":"test"}
        },
        {
            "title":"Test2",
            "pubDate":"",
            "imgSrc":""
        }
    ];

    var $scope;
    var mockNewsListService = {
            getNewsData:function(){
                return tempNewsArray;
            }
    };
    var mainCtr;
    var getStoryItem;
    beforeEach(angular.mock.module('estory'));

    beforeEach(inject(function ($rootScope,$controller,_getStoryItem_) {
        $scope = $rootScope.$new();
        getStoryItem = _getStoryItem_;
        mainCtr= $controller('mainController',{$scope:$scope,newsListService:mockNewsListService,getStoryItem:getStoryItem});
    }));

    it('should return the array of valid news returned by service',function(){
            expect($scope.newsList.length).toEqual(2);
    });

});