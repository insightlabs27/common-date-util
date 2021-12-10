/*
 * Copyright 2021 InsightLabs27
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const moment = require('moment-timezone');

/**
 * This common util module is used on the server, app and browser to reuse code and keep the formatting consistent
 * across the server and clients.
 *
 * Moment-Timezone is bundled into the standalone javascript file created by browserify.
 *    BROWSERIFYSHIM_DIAGNOSTICS=1 browserify -s dateUtil src/common-date-util.js -o ../dist/common-date-util.js
 *
 * I used the following format when creating a file timestamp and log file stamp
 *   YYYYMMDD.HHmmssSS - UTC
 *
 * The approach makes the format consistent across the board when loading date from a file timestamp or log files) and converting
 * it back to a date object. Dates are ALWAYS stored in UTC format.
 *
 * Considerations
 *
 * Thought about refactoring the date format to be ISO8601 (YYYY-MM-DDTHH:mm:ssZ)
 *    - Was thinking about storing in files the ISO 8601 format, but then I would have to have logic
 *      to determine if the format 8601 or hhmmssms (below). colones/periods can not be used as file
 *      names. To be consistent everything uses hhmmssms.
 *
 *
 *     - YYYYMMDD.HHmmssSS:
 *
 *
 *  Everything on the server is stored using (getTimeStamp) UTC hhmmssms, then converted back to getTimeStampObj using this format
 *
 *
 *
 * @type {{getCurrentHourFormatted: (function(*=, *=): string), getCurrentMonthFormatted: (function(*=, *=): string), isDateValid: isDateValid, getTimeStampObj: (function(*=, *=): {dd: *, mm: *, yy: *, hh: *, date: *, hhmmss: *, formattedShort: *, iso8601: *, formatted: *, formattedShort2: *, hhonly: *, formattedShort3: *, formattedShort6: *, formattedShort4: *, formattedShort5: *, hhmm: *, dayOfWeek: *, ddonly: *, mmonly: *, hhmmssms: *}), getCurrentTimeStampObj: (function(*=): (*|{dd: *, mm: *, yy: *, hh: *, date: *, hhmmss: *, formattedShort: *, iso8601: *, formatted: *, formattedShort2: *, hhonly: *, formattedShort3: *, formattedShort6: *, formattedShort4: *, formattedShort5: *, hhmm: *, dayOfWeek: *, ddonly: *, mmonly: *, hhmmssms: *})), runWithinInterval: runWithinInterval, addSecond: (function(*=, *=): Date), dateFormat7: (function(*=, *=): string), differenceInHours: (function(*=, *): number), addMonth: (function(*=, *=): Date), getISODate: (function(): string), dateFormat5: (function(*=, *=): string), dateFormat6: (function(*=, *=): string), getCurrentYear: (function(*=): (string | moment.RelativeTimeSpecVal | any)), getCurrentDay: (function(): Date), getPreviousDay: (function(): Date), addDay: (function(*=, *=): Date), getLocaleTimeDataObj: (function(*=, *=): (*|{dd: *, mm: *, yy: *, hh: *, date: *, hhmmss: *, formattedShort: *, iso8601: *, formatted: *, formattedShort2: *, hhonly: *, formattedShort3: *, formattedShort6: *, formattedShort4: *, formattedShort5: *, hhmm: *, dayOfWeek: *, ddonly: *, mmonly: *, hhmmssms: *})), getLocaleTimeFromString: (function(*=): Date), differenceInMinutes: (function(*=, *): number), dateFormat4: (function(*=, *=): string), differenceInDate: (function(*=): string), dateFormat1: (function(*=, *=): string), dateFormat2: (function(*=, *=): string), setCurrentDay: (function(*=): Date), isIntervalOnTime: (function(*): boolean), formatScheduledDate: (function(*=): string), getCurrentHour: (function(): Date), addHour: (function(*=, *=): Date), getPreviousHour: (function(): Date), addMinute: (function(*=, *=): Date), localeTimeParts: (function(*): {yy: *, dd: string, mm: string, hh: string, sec: *, min: *, ddonly: *, mmonly: *, hhonly: *}), isEmpty: (function(*=): boolean), determineDate(*=): *, getPreviousMonth: (function(): Date), differenceBetweenInMinutes: (function(*=, *=, *): number), getCurrentDayFormatted: (function(*=, *=): string), addYear: (function(*=, *=): Date), getTimeStamp: (function(): string), addHourToCurrentTime: (function(*=): *), addMinutesToCurrentTime: (function(*=): *), isNotEmpty: (function(*=): boolean), differenceInDays: (function(*=, *): number), getCurrentMonth: (function(): Date)}}
 */



module.exports = {

    /**
     * The method should be used across the application to ensure the formatting is consistent.
     *
     *
     * @param date - The javascript date object passed-in
     * @param timezone - timezone formatted using moment-timezone list.
     * @returns {{dd: *, mm: *, yy: *, hh: *, date: *, hhmmss: *, formattedShort: *, iso8601: *, formatted: *, formattedShort2: *, hhonly: *, formattedShort3: *, formattedShort6: *, formattedShort4: *, formattedShort5: *, hhmm: *, dayOfWeek: *, ddonly: *, mmonly: *, hhmmssms: *}}
     */
    getTimeStampObj: function( date, timezone ){
        let datetime = (timezone) ? moment.tz(date, timezone) : moment.utc(date);

        return {
            dd:  datetime.format('YYYYMMDD'), //dateFormat(datetime, "UTC:yyyymmdd"),
            ddonly: datetime.format('DD'), // dateFormat(datetime, "UTC:dd"),
            dayOfWeek: datetime.format('dddd'), // dateFormat(datetime, "UTC:dddd"),
            mm: datetime.format('YYYYMM'), // dateFormat(datetime, "UTC:yyyymm"),
            mmonly: datetime.format('MM'), // dateFormat(datetime, "UTC:mm"),
            mmmonly: datetime.format('MMM'), // dateFormat(datetime, "UTC:mm"),
            yy: datetime.format('YYYY'), // dateFormat(datetime, "UTC:yyyy"),
            hh: datetime.format('YYYYMMDD.HH'), // dateFormat(datetime, "UTC:yyyymmdd.HH"),
            min: datetime.format('mm'), // dateFormat(datetime, "UTC:mm"),
            sec: datetime.format('ss'), // dateFormat(datetime, "UTC:ss"),
            hhonly: datetime.format('HH'), // dateFormat(datetime, "UTC:HH"),
            hhmm: datetime.format('YYYYMMDD.HHmm'), // dateFormat(datetime, "UTC:yyyymmdd.HHMM"),
            hhmmss: datetime.format('YYYYMMDD.HHmmss'), //dateFormat(datetime, "UTC:yyyymmdd.HHMMss"),
            hhmmssmss: datetime.format('YYYYMMDD.HHmmssSSS'), // dateFormat(datetime, "UTC:yyyymmdd.HHMMssL"),
            formatted: datetime.format('MMMM Do YYYY, h:mm:ss a z'), //  this.getDateFormatted( datetime ),
            formattedShort:datetime.format('M/D/YYYY, h:mm a z'), // this.getDateFormattedShort( datetime ),
            formattedShort2: datetime.format('MMMM Do YYYY'), //this.getDateFormattedShort4( datetime ),
            formattedShort3: datetime.format('MMM Do - hA z'), //this.getDateFormattedShort2( datetime )
            formattedShort4: datetime.format('MMM Do - h:mm A z'), //this.getDateFormattedShort2( datetime )
            formattedShort5: datetime.format('MM/DD/YYYY'), //this.getDateFormattedShort2( datetime )
            formattedShort6: datetime.format('MMMM Do YYYY, h:mm a z'), //  this.getDateFormatted( datetime ),
            formattedShort7: datetime.format('MMM D YYYY'), // this.getDateFormattedShort( datetime )
            formattedShort8: datetime.format('h:mm a z'), // this.getDateFormattedShort( datetime )
            formattedShort9: datetime.format('h:mm a'), // this.getDateFormattedShort( datetime )
            dbFormatted: datetime.format('YYYY-MM-DD HH:mm:ss.SSS'), // this.getDateFormattedShort( datetime )
            date: datetime
        }
    },

    /**
     * Gets the getTimeStampObj based on the current date and timezone passed in. If not timezone is passed in
     * then the UTC is used.
     *
     * @param timezone - timezone passed in.
     * @returns {*|{dd: *, mm: *, yy: *, hh: *, date: *, hhmmss: *, formattedShort: *, iso8601: *, formatted: *, formattedShort2: *, hhonly: *, formattedShort3: *, formattedShort6: *, formattedShort4: *, formattedShort5: *, hhmm: *, dayOfWeek: *, ddonly: *, mmonly: *, hhmmssms: *}}
     */
    getCurrentTimeStampObj: function(timezone){ return this.getTimeStampObj(new Date(), timezone) },

    /**
     * Get the getTimeStampObj based on string value of the date. The log file and name return a formatted value
     * of the date, this passed in that string value and returns getTimeStampObj object
     *
     * @param val - string value of date in YYYYMMDD.HHmmssSS
     * @param timezone
     * @returns {*|{dd: *, mm: *, yy: *, hh: *, date: *, hhmmss: *, formattedShort: *, iso8601: *, formatted: *, formattedShort2: *, hhonly: *, formattedShort3: *, formattedShort6: *, formattedShort4: *, formattedShort5: *, hhmm: *, dayOfWeek: *, ddonly: *, mmonly: *, hhmmssms: *}}
     */
    getLocaleTimeDataObj: function( val, timezone ){ return this.getTimeStampObj( this.getLocaleTimeFromString( val ), timezone )},

    /**
     * Gets the current year with the timezone passed in or UTC mode if timezone is undefined
     *
     * @param timezone - moment timezone format
     * @returns {*}
     */
    getCurrentYear: function(timezone)     { return (this.getCurrentTimeStampObj(timezone)).yy },

    /**
     *  The method is used for storing dates in files and the file name. The format is
     *  "YYYYMMDD.HHmmssSS" using UTC format.
     *
     * @returns {*}
     */
    getTimeStamp:   function()             { return (this.getCurrentTimeStampObj()).hhmmssmss    },


    /**
     * The method is used to get the current UTC time formatted for SQL database. the format is
     * YYYY-MM-DD HH:mm:ss.SSS = getTimeStampObj.dbFormatted
     *
     * @returns {string}
     */
    getDBTimeStamp:   function()             { return (this.getCurrentTimeStampObj()).dbFormatted },


    getDBTimeStampByDate : function(val, timezone){
        return (this.getLocaleTimeDataObj(val, timezone)).dbFormatted
    },


    /**
     * This method will build the current and previous log file based on the current date.
     *
     * @returns {{current: string, previous: string}}
     */
    getHourlyLogFormatTimeStamps: function(){
        let dateObj = this.getCurrentTimeStampObj();
        let prevDateObj = this.getTimeStampObj(this.getPreviousHour());
        return {
            current: dateObj.yy + '/' + dateObj.mmonly + '/' + dateObj.ddonly + '/' + dateObj.hh + '.log',
            previous: prevDateObj.yy + '/' + prevDateObj.mmonly + '/' + prevDateObj.ddonly + '/' + prevDateObj.hh + '.log'
        }
    },

    /**
     * This is used for creating the database time range. for ex, date_created > 7 days or date_created is between ...
     *
     * @param type
     * @param period
     * @param start
     * @param end
     * @returns {string}
     */
    getDBTimePeriodByType: function( type, period, start, end ){
        if (!period) return '';
        switch (period){
            case '60min':  return (type + ' > \'' + this.getTimeStampObj(this.addHour(new Date(), -1)).dbFormatted) + '\'';
            case '24h': return (type + ' > \'' + this.getTimeStampObj(this.addDay(new Date(), -1)).dbFormatted) + '\'';
            case '7d': return (type +' > \'' + this.getTimeStampObj(this.addDay(new Date(), -7)).dbFormatted) + '\'';
            case '30d': return (type + ' > \'' + this.getTimeStampObj(this.addDay(new Date(), -30)).dbFormatted) + '\'';
            case '3m': return (type +' > \'' + this.getTimeStampObj(this.addMonth(new Date(), -3)).dbFormatted) + '\'';
            case 'custom': return (type + ' between \'' + this.getTimeStampObj(start).dbFormatted) + '\' and \'' + this.getTimeStampObj(end).dbFormatted + '\'';
            default: console.log('time period not defined :: ' + period); return '';
        }
    },

    /**
     *  The method converts the string value "YYYYMMDD.HHmmssSS" in UTC to a javascript date.
     *
     * @param value
     * @returns {Date}
     */
    getLocaleTimeFromString: function( value ){
        let time = moment.utc(value,'YYYYMMDD.HHmmssSS');
        return (time.isValid() && !this.isDateInDBFormat(value)) ? time.toDate() : this.getUTCTimeFromDBString(value);
    },

    isDateInDBFormat: function( value ){
        let re = new RegExp( /^(\d){4}-(\d){2}-(\d){2}\s\d{2}:\d{2}.*/ );
        return re.test( value );
    },

    /**
     *  The method converts the string value "YYYY-MM-DD HH:mm:ss.SSS" in UTC to a javascript date.
     *
     * @param value
     * @returns {Date}
     */
    getUTCTimeFromDBString: function( value ){ return moment.utc(value,'YYYY-MM-DD HH:mm:ss.SSS').toDate() },

    /**
     * The method is used to determine if the string value is in a valid "Date" format.
     *
     * @param val
     * @returns {boolean}
     */
    isDateValid: function( val ){
        if (val.length<8) return false;
        let dateObject = this.getLocaleTimeFromString( val ).toString();
        return (dateObject.indexOf("Invalid Date")===-1);
    },

    /**
     * This method returns the hour minute format used for scheduling reports.
     *
     * @param date
     * @returns {string}
     */
    formatScheduledDate: function(date){ return moment.utc(date).format('HHmm'); },

    /**
     *  Returns the time-zone formatted value representing a UTC date based on the date string and timezone params. Method is used on the client
     *
     *  Formatted value = M/D/YYYY, h:mm a (z)
     *
     * @param dateStr - Date string value in YYYYMMDD.HHmmssSS format
     * @param timezone - Moment time-zone value
     * @returns {*}
     */
    dateFormat1: function (dateStr, timezone){ return this.getTimeStampObj( this.getLocaleTimeFromString( dateStr ), timezone ).formattedShort  },


    /**
     *  Returns the time-zone formatted value representing a UTC date based on the date string and timezone params. Method is used on the client
     *
     *  Formatted value = MMM Do - hA (z) :: For ex, Sep 2nd - 4AM (EST)
     *
     * @param dateStr - Date string value in YYYYMMDD.HHmmssSS format
     * @param timezone - Moment time-zone value
     * @returns {*}
     */
    dateFormat2: function (dateStr, timezone){ return this.getTimeStampObj( this.getLocaleTimeFromString( dateStr ), timezone ).formattedShort3  },

    /**
     *  Returns the time-zone formatted value representing a UTC date based on the date string and timezone params. Method is used on the client
     *
     *  Formatted value = MMMM Do YYYY :: January 2nd 2020
     *
     * @param dateStr - Date string value in YYYYMMDD.HHmmssSS format
     * @param timezone - Moment time-zone value
     * @returns {*}
     */
    dateFormat4: function (dateStr, timezone){ return this.getTimeStampObj( this.getLocaleTimeFromString( dateStr ), timezone ).formattedShort2 },

    /**
     *  Returns the time-zone formatted value representing a UTC date based on the date string and timezone params. Method is used on the client
     *
     *  Formatted value = MMM Do - h:mm A (z) :: Jan 2nd - 2:30 PM (EST)
     *
     * @param dateStr - Date string value in YYYYMMDD.HHmmssSS format
     * @param timezone - Moment time-zone value
     * @returns {*}
     */
    dateFormat5: function (dateStr, timezone){ return this.getTimeStampObj( this.getLocaleTimeFromString( dateStr ), timezone ).formattedShort4 },

    /**
     *  Returns the time-zone formatted value representing a UTC date based on the date string and timezone params. Method is used on the client
     *
     *  Formatted value = MM/DD/YYYY :: 01/02/2020 (EST)
     *
     * @param dateStr - Date string value in YYYYMMDD.HHmmssSS format
     * @param timezone - Moment time-zone value
     * @returns {*}
     */
    dateFormat6: function (dateStr, timezone){ return this.getTimeStampObj( this.getLocaleTimeFromString( dateStr ), timezone ).formattedShort5 },

    /**
     *  Returns the time-zone formatted value representing a UTC date based on the date string and timezone params. Method is used on the client
     *
     *  Formatted value = MMMM Do YYYY, h:mm a (z) :: January 2nd 2020, 2:30 AM (EST)
     *
     * @param dateStr - Date string value in YYYYMMDD.HHmmssSS format
     * @param timezone - Moment time-zone value
     * @returns {*}
     */
    dateFormat7: function (dateStr, timezone){ return this.getTimeStampObj( this.getLocaleTimeFromString( dateStr ), timezone ).formattedShort6 },

    /**
     *  Returns the time-zone formatted value representing a UTC date based on the date string and timezone params. Method is used on the client
     *
     *  Formatted value = MMM DD YYYY, h:mm a (z) :: Jan 2 2020
     *
     * @param dateStr - Date string value in YYYYMMDD.HHmmssSS format
     * @param timezone - Moment time-zone value
     * @returns {*}
     */
    dateFormat8: function (dateStr, timezone){ return this.getTimeStampObj( this.getLocaleTimeFromString( dateStr ), timezone ).formattedShort7 },

    /**
     *  Returns the time-zone formatted value representing a UTC date based on the date string and timezone params. Method is used on the client
     *
     *  Formatted value = h:mm a (z) :: 2:30 AM (EST)
     *
     * @param dateStr - Date string value in YYYYMMDD.HHmmssSS format
     * @param timezone - Moment time-zone value
     * @returns {*}
     */
    dateFormat9: function (dateStr, timezone){ return this.getTimeStampObj( this.getLocaleTimeFromString( dateStr ), timezone ).formattedShort8 },

    /**
     *  Returns the time-zone formatted value (YYYYMMDD.HH) based on the Date passed-in.
     *
     * @param date - Date Object
     * @param timezone - Moment time-zone value
     * @returns {*}
     */
    getCurrentHourFormatted: function( date, timezone ){ return (this.getTimeStampObj(date, timezone)).hh },

    /**
     *  Returns the time-zone formatted value (YYYYMMDD) based on the Date passed-in.
     *
     * @param date - Date Object
     * @param timezone - Moment time-zone value
     * @returns {*}
     */
    getCurrentDayFormatted:  function( date, timezone ){ return (this.getTimeStampObj(date, timezone)).dd },

    /**
     *  Returns the time-zone formatted value (YYYYMM) based on the Date passed-in.
     *
     * @param date - Date Object
     * @param timezone - Moment time-zone value
     * @returns {*}
     */
    getCurrentMonthFormatted:function( date, timezone ){ return (this.getTimeStampObj(date, timezone)).mm },

    /**
     * Returns the beginning of the current month
     *
     * @param date - Date Object
     * @param timezone - Moment time-zone value
     * @returns {*}
     */
    getCurrentMonth: function(){ return  moment.utc().startOf('month').toDate() },

    /**
     * Returns the beginning of the previous month
     *
     * @returns {*}
     */
    getPreviousMonth: function(){ return moment.utc().subtract(1, 'months').startOf('month').toDate() },

    /**
     * Returns the beginning of the current day
     *
     * @returns {*}
     */
    getCurrentDay: function(){ return moment.utc().startOf('day').toDate() },

    /**
     * Returns the beginning of the day based on the day passed in
     *
     * @returns {*}
     */
    setCurrentDay: function( day ) { return moment.utc( this.determineDate(day) ).startOf('day').toDate() },

    /**
     * Returns the previous of the day based on the currentDay
     *
     * @returns {*}
     */
    getPreviousDay: function(){ return  moment.utc().subtract(1, 'days').startOf('day').toDate() },

    /**
     * Returns the current hour of the date.
     *
     * @returns {*}
     */
    getCurrentHour: function(){ return moment.utc().startOf('hour').toDate() },

    /**
     * Returns the previous hour of the date.
     *
     * @returns {*}
     */
    getPreviousHour: function(){ return  moment.utc().subtract(1, 'hours').startOf('hour').toDate() },

    /**
     * Returns the difference in days between the date passed-in and the current date.
     *
     * @param date1 - Date Object
     * @param reverse - compares the current date with the passed-in value.
     * @returns {number}
     */
    differenceInDays: function(date1, reverse){
        let a = moment(this.determineDate(date1));
        let b = moment(new Date());
        return (reverse) ? b.diff(a, 'days') : a.diff(b, 'days');
    },

    /**
     * Returns the difference in hours between the date passed-in and the current date.
     *
     * @param date1 - Date Object
     * @param reverse - compares the current date with the passed-in value.
     * @returns {number}
     */
    differenceInHours: function(date1, reverse){
        let a = moment(this.determineDate(date1));
        let b   = moment(new Date());
        return (reverse) ? b.diff(a, 'hours') : a.diff(b, 'hours');
    },

    /**
     * Returns the difference in minutes between the date passed-in and the current date.
     *
     * @param date1 - Date Object
     * @param reverse - compares the current date with the passed-in value.
     * @returns {number}
     */
    differenceInMinutes: function(date1, reverse){
        let a = moment(this.determineDate(date1));
        let b = moment(new Date());
        return (reverse) ? b.diff(a, 'minutes') : a.diff(b, 'minutes');
    },

    /**
     * Returns the difference in seconds between the date passed-in and the current date.
     *
     * @param date1 - Date Object
     * @param reverse - compares the current date with the passed-in value.
     * @returns {number}
     */
    differenceInSeconds: function(date1, reverse){
        let a = moment(this.determineDate(date1));
        let b = moment(new Date());
        return (reverse) ? b.diff(a, 'seconds') : a.diff(b, 'seconds');
    },


    /**
     * Returns the difference in days, hours or minutes based how much time is between the current
     * date and the date passed-in.
     *
     * @param date1 - Date Object
     * @param abbr - abbreviates time labels (for ex, d or days). defaults to true.
     * @param reverse - compares the current date with the passed-in value. defaults to true;
     * @returns {number}
     */
    differenceInDate: function(date, abbr=true, reverse=true){
        let desc = '';
        let diffMin = this.differenceInMinutes(date, reverse);
        let diffHours = this.differenceInHours(date, reverse);
        let diffDays= this.differenceInDays(date, reverse);

        if (diffDays>0){
            desc = (abbr) ? diffDays + 'd ' : (diffDays===1) ? diffDays +' day ' : diffDays + ' days ';
            diffHours = diffHours - (diffDays*24);
            diffMin = diffMin - (diffDays*24*60);
        }

        if (diffHours > 0){
            desc += (abbr) ? diffHours + 'h ' : (diffHours===1) ? diffHours +' hour ' : diffHours + ' hours ';
            diffMin = diffMin - diffHours*60;
        }

        if (diffMin>0){
            desc += (abbr) ? diffMin + 'm ' : (diffMin===1) ? diffHours +' minute ' : diffMin + ' minutes ';
        }

        if (desc==='') desc=(abbr) ? "< 1m" : "< 1 minute";

        return desc;
    },


    /**
     * Returns the difference between two dates
     *
     * @param startDate - Date Object
     * @param endDate - Date Object
     * @param abbr - abbreviates time labels (for ex, d or days). defaults to true.
     * @param reverse - compares the current date with the passed-in value. defaults to true;
     * @returns {number}
     */
    differenceBetweenInDate: function(startDate, endDate, abbr=true, reverse=true){
        let desc = '';
        let diffMin = this.differenceBetweenInMinutes(startDate, endDate, reverse);
        let diffHours = this.differenceBetweenInHours(startDate, endDate, reverse);
        let diffDays= this.differenceBetweenInDays(startDate, endDate, reverse);

        if (diffDays>0){
            desc = (abbr) ? diffDays + 'd ' : (diffDays===1) ? diffDays +' day ' : diffDays + ' days ';
            diffHours = diffHours - (diffDays*24);
            diffMin = diffMin - (diffDays*24*60);
        }

        if (diffHours > 0){
            desc += (abbr) ? diffHours + 'h ' : (diffHours===1) ? diffHours +' hour ' : diffHours + ' hours ';
            diffMin = diffMin - diffHours*60;
        }

        if (diffMin>0){
            desc += (abbr) ? diffMin + 'm ' : (diffMin===1) ? diffHours +' minute ' : diffMin + ' minutes ';
        }

        return desc;
    },


    /**
     * Returns the difference in milliseconds between two dates
     *
     * @param date1 - Date Object
     * @param reverse - compares the current date with the passed-in value.
     * @returns {number}
     */
    differenceBetweenInMilliSeconds: function(date1, date2, reverse){
        let a = moment(this.getLocaleTimeFromString(date1));
        let b = moment(this.getLocaleTimeFromString(date2));
        return (reverse) ? b.diff(a) : a.diff(b);
    },

    /**
     * Returns the difference in seconds between two dates
     *
     * @param date1 - Date Object
     * @param reverse - compares the current date with the passed-in value.
     * @returns {number}
     */
    differenceBetweenInSeconds: function(date1, date2, reverse){
        let a = moment(this.getLocaleTimeFromString(date1));
        let b = moment(this.getLocaleTimeFromString(date2));
        return (reverse) ? b.diff(a, 'seconds') : a.diff(b, 'seconds');
    },

    /**
     * Returns the difference in minutes between two dates
     *
     * @param date1 - Date Object
     * @param reverse - compares the current date with the passed-in value.
     * @returns {number}
     */
    differenceBetweenInMinutes: function(date1, date2, reverse){
        let a = moment(this.getLocaleTimeFromString(date1));
        let b = moment(this.getLocaleTimeFromString(date2));
        return (reverse) ? b.diff(a, 'minutes') : a.diff(b, 'minutes');
    },

    /**
     * Returns the difference in hours between two dates
     *
     * @param date1 - Date Object
     * @param reverse - compares the current date with the passed-in value.
     * @returns {number}
     */
    differenceBetweenInHours: function(date1, date2, reverse){
        let a = moment(this.getLocaleTimeFromString(date1));
        let b = moment(this.getLocaleTimeFromString(date2));
        return (reverse) ? b.diff(a, 'hours') : a.diff(b, 'hours');
    },

    /**
     * Returns the difference in days between two dates
     *
     * @param date1 - Date Object
     * @param reverse - compares the current date with the passed-in value.
     * @returns {number}
     */
    differenceBetweenInDays: function(date1, date2, reverse){
        let a = moment(this.getLocaleTimeFromString(date1));
        let b = moment(this.getLocaleTimeFromString(date2));
        return (reverse) ? b.diff(a, 'days') : a.diff(b, 'days');
    },

    /**
     * This method determines the date object based on the value passed in.
     *
     * @param date -  Value representing the date
     * @returns {*} - The Date object
     */
    determineDate( date ){
        let newDate;
        if (typeof date === 'string' || date instanceof String){
            newDate = this.getLocaleTimeFromString(date);
        } else if (date instanceof Date){
            newDate=date;
        } else {
            newDate = new Date(date.date);
        }
        return newDate;
    },

    /**
     * This method adds the number of years to the date passed-in
     *
     * @param date - date value (string | date object)
     * @param addYears - The number of years to add onto the date
     * @returns {Date} - The new date with the years added
     */
    addYear: function(date, addYears){
        return  moment.utc( this.determineDate(date) ).add(parseInt(addYears), 'years').set({millisecond:0}).toDate();
    },

    /**
     * This method adds the number of months to the date passed-in
     *
     * @param date - date value (string | date object)
     * @param addMonths - The number of months to add onto the date
     * @returns {Date} - The new date with the months added
     */
    addMonth: function(date, addMonths){
        return moment.utc( this.determineDate(date) ).add(parseInt(addMonths), 'months').set({millisecond:0}).toDate();
    },

    /**
     * This method adds the number of days to the date passed-in
     *
     * @param date - date value (string | date object)
     * @param addDays - The number of days to add onto the date
     * @returns {Date} - The new date with the days added
     */
    addDay: function(date, addDays){
        return  moment.utc( this.determineDate(date) ).add(parseInt(addDays), 'days').set({millisecond:0}).toDate();
    },

    /**
     * This method adds the number of hours to the date passed-in
     *
     * @param date - date value (string | date object)
     * @param addHours - The number of hours to add onto the date
     * @returns {Date} - The new date with the hours added
     */
    addHour: function(date, addHours){
        return  moment.utc( this.determineDate(date) ).add(parseInt(addHours), 'hours').set({millisecond:0}).toDate();
    },

    /**
     * This method adds the number of minutes to the date passed-in
     *
     * @param date - date value (string | date object)
     * @param addMinutes - The number of minutes to add onto the date
     * @returns {Date} - The new date with the minutes added
     */
    addMinute: function(date, addMinutes){
        return  moment.utc( this.determineDate(date) ).add(parseInt(addMinutes), 'minutes').set({millisecond:0}).toDate();
    },

    /**
     * This method adds the number of seconds to the date passed-in
     *
     * @param date - date value (string | date object)
     * @param addSeconds - The number of seconds to add onto the date
     * @returns {Date} - The new date with the seconds added
     */
    addSecond: function(date, addSeconds){
        return  moment.utc( this.determineDate(date) ).add(parseInt(addSeconds), 'seconds').set({millisecond:0}).toDate();
    },

    /**
     * This method adds the number of minutes to the current date
     *
     * @param addMinutes - The number of seconds to add onto the date
     * @returns {Date} - The new date with the seconds added
     */
    addMinutesToCurrentTime: function(addMinutes){ return this.addMinute(new Date(), addMinutes) },


    /**
     * This method adds the number of hours to the current date
     *
     * @param addHours - The number of hours to add onto the date
     * @returns {Date} - The new date with the hours added
     */
    addHourToCurrentTime: function(addHours){ return this.addHour(new Date(), addHours) },


    /**
     * Determine if the hour and minute is close to the current time. The current
     * time is between 5 minutes.
     *
     * @param intervalOn
     * @returns Boolean
     */
    isIntervalOnTime:function( intervalOn ){
        let isOnTime=false, onHour, onMinute;
        for (let i in intervalOn) {
            if (intervalOn[i].time!==undefined) {
                onHour = intervalOn[i].time.substring(0, 2)
                onMinute = intervalOn[i].time.substring(2, 4)
            } else {
                onHour = intervalOn[i].substring(0, 2)
                onMinute = intervalOn[i].substring(2, 4)
            }

            let onTime = new Date();
            onTime.setUTCHours(onHour);
            onTime.setUTCMinutes(onMinute);
            onTime.setUTCSeconds(0);
            onTime.setUTCMilliseconds(0);

            let difference = this.differenceInMinutes(onTime);

            if (difference >= -1 && difference <= 1){
                isOnTime=true;
            }
        }
        return isOnTime;
    },

    /**
     * This determines if the task is within it's interval to run based on the previous
     * run date and the settings for the task.
     *
     * @param type - the interval type (day/minute/hour/etc...)
     * @param lastRunDate - The last run date of the task
     * @param intervalTimer - The number value of the interval
     * @param intervalOn - If the interval if supposed to run a specific time.
     * @returns {boolean|*|Boolean}
     */
    runWithinInterval: function( type, lastRunDate, intervalTimer, intervalOn ){
        if (lastRunDate===undefined) {
            if (this.isNotEmpty( intervalOn ) && type==='hour'){
                return this.isIntervalOnTime(intervalOn);
            } else {
                return true;
            }
        }

        let timer;
        switch ( type.toLowerCase() ){
            case 'month' :  timer = this.addMonth(lastRunDate, intervalTimer); timer = this.addDay(timer, -1); break;
            case 'week'  :  timer = this.addDay(lastRunDate, 7);  timer = this.addHour(timer, -1); break;
            case 'day'   :  timer = this.addDay(lastRunDate, intervalTimer); timer = this.addHour(timer, -1); break;
            case 'hour'  :  timer = this.addHour(lastRunDate, intervalTimer); timer = this.addMinute(timer, -1); break;
            case 'minute':  timer = this.addMinute(lastRunDate, intervalTimer);  timer = this.addSecond(timer, -3); break;
            default: break;
        }

        let currentTime = new Date();
        currentTime.setUTCSeconds(0);
        currentTime.setUTCMilliseconds(0);

        if (currentTime >= timer && this.isNotEmpty( intervalOn ) && type==='hour'){
            return this.isIntervalOnTime(intervalOn);
        } else {
            return (currentTime >= timer);
        }
    },
    isEmpty: function( value ){ return (value===undefined || value===null ||  value==='null' || value==='' && value.length===0) },
    isNotEmpty: function( value ){ return !this.isEmpty(value) }

}