/**
 * Created with JetBrains WebStorm.
 * User: saychinu
 * Date: 12/28/12
 * Time: 1:16 PM
 * To change this template use File | Settings | File Templates.
 */
/*describe('taskSyncService Test Suite',function(){
    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });


     describe('injector', function(){
        var scope, ctrl, $httpBackend;
        beforeEach(module('kmot'));

         beforeEach(inject(function(_$httpBackend_,$rootScope,$controller){
            $httpBackend = _$httpBackend_;
            $httpBackend.expectJSONP('http://localhost:8888/rest/kmot/list?alt=json&callback=JSON_CALLBACK&username=chinmay').
                respond([{name: 'Nexus S' }]);

            scope = $rootScope.$new();
            ctrl = $controller(listController, {$scope: scope});
        }));

         it('should create "tasklist" model with 2 task fetched from xhr', function() {

             scope.taskList=taskSyncService.getTaskList();
             expect(scope.tasklist).toEqualData(undefined);
             $httpBackend.flush();


         });
    })


})*/