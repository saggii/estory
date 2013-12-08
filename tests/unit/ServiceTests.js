/**
 * Created by saychinu on 11/30/13.
 */
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
    var getStoryItem;
    beforeEach(module('estory'));

    beforeEach(inject(function (_getStoryItem_) {
        getStoryItem = _getStoryItem_;
    }));

    it('should give access to the archived items', function () {
        console.log('Testing');
        spyOn(getStoryItem, 'fetch').andReturn(tempNewsArray);
    });
});