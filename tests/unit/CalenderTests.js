/**
 * Unit Test for Calender function.
 * Code By : chinmay.sagade@gmail.com  for apperslab.
 *
 */
describe('Calendar Test Suite',function(){


    describe('Calendar Month Tests',function(){

    it('should return 6 arrays for month of March(index=2)', function() {
       var calender = new Calender('2','2013');
       expect(calender.weeks.length).toBe(6);
    });

    it('should return 5 array for month of January(index=0)', function() {
            var calender = new Calender('0','2013');
            expect(calender.weeks.length).toBe(5);
    });

    });

    describe('Leap Year Test',function(){

        it('should return 29 days for Feb 2012', function() {
            var calender = new Calender('1','2012');
            expect(_.last(calender.weeks[4])).toBe(29);
        });

    });

});
