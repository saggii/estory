/**
 *
 * Author: chinmay.sagade@gmail.com
 * Date: 12/28/12
 * Time: 1:11 PM
 *
 */
describe('on Track Test Suite',function(){


    beforeEach(function() {
        browser().navigateTo('../../views/index.html');
    });

    it('should automatically redirect to /list when location hash /fragment is empty', function() {
        expect(browser().location().url()).toBe("/listView");
    });

    it('should render list when user navigates to /listView', function() {
        browser().navigateTo('#/listView');
        expect(element('[ng-view] div:first').text()).
            toMatch(/partial for view 1/);
    });


    it('should show 3 elements for user chinmay', function() {
        browser().navigateTo('#/listView');
        expect(repeater('ul li').count()).toEqual(5);
    });


})





