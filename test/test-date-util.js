/*
 * Copyright 2021 InsightLabs27
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const dateUtil      = require('../src/common-date-util.js');
const dateUtilOld   = require('./util/date-util-old.js');
const assert        = require('assert');


describe('Test methods', function () {

    it('Test convert datetime string to database string', function () {
        let dateStr = dateUtil.getDBTimeStampByDate('20210412.222600106');
        assert.strictEqual(dateStr, '2021-04-12 22:26:00.106');
    });

    it('Test run getLocaleTimeFromString', function () {
        let date = dateUtil.getLocaleTimeFromString('2020-04-15 21:43:38.770');
        assert.strictEqual(date.toISOString(), '2020-04-15T21:43:38.770Z');
    });


    it('Test run getTimeStampObj', function () {
        let date = dateUtil.getTimeStampObj(new Date());
        let dateOld = dateUtilOld.getTimeStampObj(new Date());

        assert.strictEqual(date.dd, dateOld.dd);
        assert.strictEqual(date.ddonly, dateOld.ddonly);
        assert.strictEqual(date.dayOfWeek, dateOld.dayOfWeek);
        assert.strictEqual(date.mm, dateOld.mm);
        assert.strictEqual(date.mmonly, dateOld.mmonly);
        assert.strictEqual(date.yy, dateOld.yy);
        assert.strictEqual(date.hh, dateOld.hh);
        assert.strictEqual(date.hhonly, dateOld.hhonly);
        assert.strictEqual(date.hhmm, dateOld.hhmm);
        assert.strictEqual(date.hhmmss, dateOld.hhmmss);
    });

    it('Test run getTimeStampObj with Timezone', function () {
        let date = dateUtil.getTimeStampObj(new Date(), "America/New_York");
        let dateOld = dateUtilOld.getCurrentTimeStampObj();
        assert.strictEqual(date.formatted, dateOld.formatted);
        assert.strictEqual(date.formattedShort, dateOld.formattedShort);
        assert.strictEqual(date.formattedShort2, dateOld.formattedShort2);
        assert.strictEqual(date.formattedShort3, dateOld.formattedShort3);
    });

    it('Test run getCurrentTimeStampObj', function () {
        let date = dateUtil.getCurrentTimeStampObj();
        let dateOld = dateUtilOld.getCurrentTimeStampObj();

        assert.strictEqual(date.dd, dateOld.dd);
        assert.strictEqual(date.ddonly, dateOld.ddonly);
        assert.strictEqual(date.dayOfWeek, dateOld.dayOfWeek);
        assert.strictEqual(date.mm, dateOld.mm);
        assert.strictEqual(date.mmonly, dateOld.mmonly);
        assert.strictEqual(date.yy, dateOld.yy);
        assert.strictEqual(date.hh, dateOld.hh);
        assert.strictEqual(date.hhonly, dateOld.hhonly);
        assert.strictEqual(date.hhmm, dateOld.hhmm);
        assert.strictEqual(date.hhmmss, dateOld.hhmmss);
    });

    it('Test run getCurrentYear', function () {
        let date = dateUtil.getCurrentYear();
        let dateOld = dateUtilOld.getCurrentYear();

        assert.strictEqual(date, dateOld);
    });

    it('Test run getFileStamp renamed to FileTimeStamp', function () {
        let date = dateUtil.getTimeStamp();
        let dateOld = dateUtilOld.getFileStamp();

        assert.strictEqual(date.substring(0, date.length-2), dateOld.substring(0, date.length-2));
    });

    it.skip('Test run getISODate', function () {
        let date = dateUtil.getISODate();
        let dateOld = dateUtilOld.getISODate();
        assert.strictEqual(date.substring(0,date.length-4), dateOld.substring(0,dateOld.length-5));
    });

    it('Test run getLocaleTimeFromString', function () {
        let date = dateUtil.getLocaleTimeFromString('20191208.0031000');
        let dateOld = dateUtilOld.getLocaleTimeFromString('20191208.0031000');

        assert.strictEqual(date.toISOString(), dateOld.toISOString());
    });

    it('Test run isDateValid', function () {
        let dateIsValidTest1 = dateUtil.isDateValid('X0191208.0031000'); //not valid - return false
        let dateIsValidTest2 = dateUtil.isDateValid('20191208.0031000'); //valid - return false
        assert.strictEqual(dateIsValidTest1, false);
        assert.strictEqual(dateIsValidTest2, true);
    });

    it('Test run getCurrent [ Hour | day | month] Formatted', function () {
        let testCurrentHour = dateUtil.getCurrentHourFormatted(new Date());
        let testCurrentHourOld = dateUtilOld.getCurrentHourFormatted(new Date());

        let testCurrentDay = dateUtil.getCurrentDayFormatted(new Date());
        let testCurrentDayOld = dateUtilOld.getCurrentDayFormatted(new Date());

        let testCurrentMonth = dateUtil.getCurrentMonthFormatted(new Date());
        let testCurrentMonthOld = dateUtilOld.getCurrentMonthFormatted(new Date());

        assert.strictEqual(testCurrentHour, testCurrentHourOld);
        assert.strictEqual(testCurrentDay, testCurrentDayOld);
        assert.strictEqual(testCurrentMonth, testCurrentMonthOld);
    });


    it('Test run getCurrentMonth and getPreviousMonth', function () {
        let currentMonth = dateUtil.getCurrentMonth();
        let currentMonthOld = dateUtilOld.getCurrentMonth();

        assert.strictEqual(currentMonth.toISOString(), currentMonthOld.toISOString());
        let previousMonth = dateUtil.getPreviousMonth();
        let currentMonthFormatted = dateUtil.getTimeStampObj(currentMonth).mmonly;
        let previousMonthPlusOneFormatted = dateUtil.getTimeStampObj(dateUtil.addMonth(previousMonth, 1)).mmonly;

        assert.strictEqual(parseInt(previousMonthPlusOneFormatted), parseInt(currentMonthFormatted));

    });

    it('Test run getCurrentDay and getPreviousDay', function () {
        let currentDay = dateUtil.getCurrentDay();
        let currentDayOld = dateUtilOld.getCurrentDay();

        assert.strictEqual(currentDay.toISOString(), currentDayOld.toISOString());

        let date = dateUtilOld.addDay(new Date(), -2);
        let setDay = dateUtil.setCurrentDay( date );
        let setDayOld = dateUtilOld.setCurrentDay( date );

        assert.strictEqual(setDay.toISOString(), setDayOld.toISOString());

        let previousDay = dateUtil.getPreviousDay();

        let currentDayFormatted = dateUtil.getTimeStampObj(currentDay).ddonly;
        let previousDayPlusOneFormatted = dateUtil.getTimeStampObj(dateUtil.addDay(previousDay, 1)).ddonly;


        assert.strictEqual(parseInt(previousDayPlusOneFormatted), parseInt(currentDayFormatted));

    });

    it('Test run getCurrentHour and getPreviousHour', function () {
        let currentHour = dateUtil.getCurrentHour();
        let currentHourOld = dateUtilOld.getCurrentHour();

        assert.strictEqual(currentHour.toISOString(), currentHourOld.toISOString());

        let previousHour = dateUtil.getPreviousHour();
        let currentHourFormatted = dateUtil.getTimeStampObj(currentHour).hhonly;
        let previousHourFormatted = dateUtil.getTimeStampObj(previousHour).hhonly;

        assert.strictEqual(previousHourFormatted, dateUtil.getTimeStampObj(dateUtil.addHour(currentHour,-1)).hhonly);
    });

    it('Test addYear', function () {
        let yearPlusOne = dateUtil.addYear( new Date(), 1);
        let yearPlusOneOld = dateUtilOld.addYear( new Date(), 1);
        assert.strictEqual(yearPlusOne.toISOString(), yearPlusOneOld.toISOString());
    });

    it('Test addMonth', function () {
        let monthPlusOne = dateUtil.addMonth( new Date(), 3);
        let monthPlusOneOld = dateUtilOld.addMonth( new Date(), 3);
        assert.strictEqual(monthPlusOne.toISOString(), monthPlusOneOld.toISOString());
    });

    it('Test addDay', function () {
        let dayPlusOne = dateUtil.addDay( new Date(), 3);
        let dayPlusOneOld = dateUtilOld.addDay( new Date(), 3);
        assert.strictEqual(dayPlusOne.toISOString(), dayPlusOneOld.toISOString());
    });

    it('Test addHour', function () {
        let hourPlusOne = dateUtil.addHour( new Date(), 3);
        let hourPlusOneOld = dateUtilOld.addHour( new Date(), 3);
        assert.strictEqual(hourPlusOne.toISOString(), hourPlusOneOld.toISOString());
    });

    it('Test addMinute', function () {
        let minPlusOne = dateUtil.addMinute( new Date(), 3);
        let minPlusOneOld = dateUtilOld.addMinute( new Date(), 3);
        assert.strictEqual(minPlusOne.toISOString(), minPlusOneOld.toISOString());
    });

    it('Test addSecond', function () {
        let secPlusOne = dateUtil.addSecond( new Date(), -13);
        let secPlusOneOld = dateUtilOld.addSecond( new Date(), -13);
        assert.strictEqual(secPlusOne.toISOString(), secPlusOneOld.toISOString());
    });

    it('Test addMinutesToCurrentTime', function () {
        let addToCurrentTime = dateUtil.addMinutesToCurrentTime( 15 );
        let addToCurrentTimeOld = dateUtilOld.addMinutesToCurrentTime( 15 );
        assert.strictEqual(addToCurrentTime.toISOString(), addToCurrentTimeOld.toISOString());
    });

    it('Test addHourToCurrentTime', function () {
        let addToCurrentTime = dateUtil.addHourToCurrentTime( -2 );
        let addToCurrentTimeOld = dateUtilOld.addHourToCurrentTime( -2 );
        assert.strictEqual(addToCurrentTime.toISOString(), addToCurrentTimeOld.toISOString());
    });

    it('Test getLocaleTimeDataObj', function () {
        let localTimeObj = dateUtil.getLocaleTimeDataObj( '20191208.0031000' );
        let localTimeObjOld = dateUtilOld.getLocaleTimeDataObj( '20191208.0031000' );

        assert.strictEqual(localTimeObj.hhmmssmss.substring(0,17), localTimeObjOld.hhmmssms.substring(0,17));
    });

    it('Test localeTimeParts', function () {
        let currentTimeObj = dateUtil.getCurrentTimeStampObj();
        let localTimeObj = dateUtilOld.localeTimeParts(currentTimeObj.hhmmssmss);

        assert.strictEqual(localTimeObj.yy, currentTimeObj.yy);
        assert.strictEqual(localTimeObj.mmonly, currentTimeObj.mmonly);
        assert.strictEqual(localTimeObj.ddonly, currentTimeObj.ddonly);
        assert.strictEqual(localTimeObj.dd, currentTimeObj.dd);

        assert.strictEqual(localTimeObj.mm, currentTimeObj.mm);
        assert.strictEqual(localTimeObj.hhonly, currentTimeObj.hhonly);
        assert.strictEqual(localTimeObj.hh, currentTimeObj.hh);
        assert.strictEqual(localTimeObj.min, currentTimeObj.min);

        assert.strictEqual(localTimeObj.sec, currentTimeObj.sec);
    });


    it('Test isDateInDBFormat', function () {
        let timeStr = '2020-08-24 14:29:00.081';
        assert.strictEqual(dateUtil.isDateInDBFormat( timeStr ), true);

        let timeStr2 = '20191208.0031000';
        assert.strictEqual(dateUtil.isDateInDBFormat( timeStr2 ), false);
    });


    it.skip('Test time diff', function () {
        let timeStr = '2020-08-23 13:29:00.081';
        let diffMin = dateUtil.differenceInMinutes(timeStr, true);
        let diffHours = dateUtil.differenceInHours(timeStr, true);
        let diffDays= dateUtil.differenceInDays(timeStr, true);

        assert.strictEqual(diffMin, 1616);
        assert.strictEqual(diffHours, 26);
        assert.strictEqual(diffDays, 1);

        let diff= dateUtil.differenceInDate(timeStr, false);
        console.log(diff);
        assert.strictEqual(diff, '1 day 2 hours 56 minutes');

        let diff2= dateUtil.differenceInDate(timeStr, true);
        console.log(diff2);
        assert.strictEqual(diff2, '1d 2h 56m');

    });


    it('test differenceBetweenInDate', function() {
        let startDate = '2020-08-23 12:29:00.081';
        let endDate = '2020-08-24 15:05:00.032';

       let diff = dateUtil.differenceBetweenInDate(startDate, endDate);
       assert.strictEqual(diff,'1d 2h 35m ');

       let diff2 = dateUtil.differenceBetweenInDate(startDate, endDate, false);
       assert.strictEqual(diff2,'1 day 2 hours 35 minutes ');


    });

    // it.only('Test differenceInDays', function () {
    //     let diffMins = dateUtil.differenceInMinutes('20200103.23273335', true);
    //     let diffDays = dateUtil.differenceInDays('20200103.23273335', true);
    //
    //     console.log('diffMins :: ', diffMins)
    //     console.log('diffDays :: ', diffDays)
    //
    //     let alertDate = dateUtil.setCurrentDay( '20200103.23273335' );
    //     let diff2 = dateUtil.differenceInDays( alertDate, true );
    //     let diffMin2 = dateUtil.differenceInMinutes( '20200103.23273335', true );
    //
    //     console.log('diff2 :: ', diff2);
    //     console.log('diffMin2 :: ', diffMin2);
    //
    // });




});


