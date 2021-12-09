const dateFormat = require('dateformat');
const moment = require('moment-timezone');
// const stringUtil = require('./stringUtil');


module.exports = {

    // getCurrentTimeStamp: function(){
    // 	 return dateFormat(new Date(), "UTC:mmddyyyy.HHMMss");
    // },

    getCurrentYear: function(){
        return this.getTimeStampObj().yy;
    },

    getTime: function(){
        return this.getCurrentTimeStampObj().hhmmssms;
    },

    // getFileNameStamp: function(name){
    //     return name + '_' + this.getFileStamp();
    // },

    getFileStamp: function(){
        return  this.getCurrentTimeStampObj().hhmmssms;
    },

    getISODate: function(){
        let date = new Date();

        let isoDate = date.getUTCFullYear() + '-' +
            this.addZ((date.getUTCMonth()) + 1) + '-' +
            this.addZ(date.getUTCDate()) + 'T' +
            this.addZ(date.getUTCHours()) + ':' +
            this.addZ(date.getUTCMinutes()) + ':' +
            this.addZ(date.getUTCSeconds()) + '.' +
            this.addZ(date.getUTCMilliseconds()) + 'Z';
        return isoDate;
    },

    addZ:function(n) {
        return (n<10? '0' : '') + n;
    },

    getTimeStampObj: function( date ){
        let datetime = date;

        return {
            id: dateFormat(datetime, "UTC:yyyymmdd_HHMMss"),
            dd:  dateFormat(datetime, "UTC:yyyymmdd"),
            ddonly:  dateFormat(datetime, "UTC:dd"),
            dayOfWeek: dateFormat(datetime, "UTC:dddd"),
            mm:  dateFormat(datetime, "UTC:yyyymm"),
            mmonly:  dateFormat(datetime, "UTC:mm"),
            yy:  dateFormat(datetime, "UTC:yyyy"),
            hh:  dateFormat(datetime, "UTC:yyyymmdd.HH"),
            hhonly:  dateFormat(datetime, "UTC:HH"),
            hhmm:  dateFormat(datetime, "UTC:yyyymmdd.HHMM"),
            hhmmss: dateFormat(datetime, "UTC:yyyymmdd.HHMMss"),
            hhmmssms: dateFormat(datetime, "UTC:yyyymmdd.HHMMssL"),
            formatted: this.getDateFormatted( datetime ),
            formattedShort: this.getDateFormattedShort( datetime ),
            date: datetime
        }
    },

    getCurrentTimeStampObj: function(){
        var datetime = new Date();
        return {
            id: dateFormat(datetime, "UTC:yyyymmdd_HHMMss"),
            dd:  dateFormat(datetime, "UTC:yyyymmdd"),
            ddonly:  dateFormat(datetime, "UTC:dd"),
            dayOfWeek: dateFormat(datetime, "UTC:dddd"),
            mm:  dateFormat(datetime, "UTC:yyyymm"),
            mmonly:  dateFormat(datetime, "UTC:mm"),
            yy:  dateFormat(datetime, "UTC:yyyy"),
            hh:  dateFormat(datetime, "UTC:yyyymmdd.HH"),
            hhonly:  dateFormat(datetime, "UTC:HH"),
            hhmm:  dateFormat(datetime, "UTC:yyyymmdd.HHMM"),
            hhmmss: dateFormat(datetime, "UTC:yyyymmdd.HHMMss"),
            hhmmssms: dateFormat(datetime, "UTC:yyyymmdd.HHMMssL"),
            formatted: this.getDateFormatted( datetime ),
            formattedShort: this.getDateFormattedShort( datetime ),
            formattedShort2: this.getDateFormattedShort4( datetime ),
            formattedShort3: this.getDateFormattedShort2( datetime ),
            date: datetime
        }
    },



    getDateFormattedShort: function( date ){
        let b = moment.tz(date, "MMM Do YYYY hA", "America/New_York");
        return ( b.format('l, h:mm a') + ' ' + b.format('z'));
    },


    dateFormat2: function (dateStr){
        return this.getDateFormattedShort2( this.getLocaleTimeFromString( dateStr ) );
    },

    dateFormat4: function (dateStr){
        return this.getDateFormattedShort4( this.getLocaleTimeFromString( dateStr ) );
    },

    getDateFormattedShort2: function( date ){
        let b = moment.tz(date, "MMM Do YYYY hA", "America/New_York");
        return ( b.format('MMM Do - hA z'));
    },


    getDateFormattedShort3: function( date ){
        let b = moment.tz(date, "MMM Do YYYY hA", "America/New_York");
        return ( b.format('MMM Do - h:mm A'));
    },

    getDateFormattedShort4: function( date ){
        var b = moment.tz(date, "MMM Do YYYY hA", "America/New_York");
        return ( b.format('MMMM Do YYYY') );
    },

    getDateFormatted: function( date ){
        var b = moment.tz(date, "MMM Do YYYY hA", "America/New_York");
        return ( b.format('MMMM Do YYYY, h:mm:ss a') + ' ' + b.format('z'));

        // var dateformat = dateFormat(date, "UTC:dddd - mmmm dd, yyyy");
        // var timeformat = dateFormat(date, "UTC:h:MM TT Z");
        // var dateformat = moment().tz("America/New_York").format("dddd - mmmm dd, yyyy")
        // var format = moment().tz("America/New_York").format("LLLL")
        // return format;
    },

    addMonthOld: function(date, addMonths){
        var newDate = new Date(date.getTime())
        var add = parseInt( addMonths );
        newDate.setMonth((newDate.getMonth())+add);
        return newDate;
    },

    addDayOld: function(date, addDays){
        let newDate=new Date();
        if (date!==undefined){
            newDate = new Date(date.date)
        }

        let add = parseInt( addDays );
        newDate.setDate(newDate.getDate()+add);
        return newDate;
    },

    determineDate( date ){
        let newDate;
        if (typeof date === 'string' || date instanceof String){
            date = this.getLocaleTimeFromString(date);
            newDate = new Date(date.date);
        } else if (date instanceof Date){
            newDate=date;
        } else {
            newDate = new Date(date.date);
        }
        return newDate;
    },

    addYear: function(date, addYears){
        let newDate = this.determineDate(date);
        let add = parseInt( addYears );
        newDate.setUTCFullYear(newDate.getUTCFullYear()+add);
        newDate.setUTCMilliseconds(0);
        return newDate;
    },

    addMonth: function(date, addMonths){
        let newDate = this.determineDate(date);
        let add = parseInt( addMonths );
        newDate.setUTCMonth(newDate.getUTCMonth()+add);
        newDate.setUTCMilliseconds(0);
        return newDate;
    },

    addDay: function(date, addDays){
        let newDate = this.determineDate(date);
        let add = parseInt( addDays );
        newDate.setUTCDate(newDate.getUTCDate()+add);
        newDate.setUTCMilliseconds(0);
        return newDate;
    },

    addHour: function(date, addHours){
        let newDate = this.determineDate(date);
        let add = parseInt( addHours );
        newDate.setUTCHours(newDate.getUTCHours()+add);
        newDate.setUTCMilliseconds(0);
        return newDate;
    },

    addMinute: function(date, addMinutes){
        let newDate = this.determineDate(date);
        let add = parseInt( addMinutes );
        newDate.setUTCMinutes(newDate.getUTCMinutes()+add);
        newDate.setUTCMilliseconds(0);
        return newDate;
    },

    addSecond: function(date, addSeconds){
        let newDate = this.determineDate(date);
        let add = parseInt( addSeconds );
        newDate.setUTCSeconds(newDate.getUTCSeconds()+add);
        newDate.setUTCMilliseconds(0);
        return newDate;
    },

    addMinutesToCurrentTime: function(addMinutes){
        let newDate = new Date();
        let add = parseInt( addMinutes );
        newDate.setMinutes(newDate.getMinutes()+add);
        newDate.setMilliseconds(0);
        return  newDate;
    },

    addHourToCurrentTime: function(addHours){
        let newDate = new Date();
        let add = parseInt( addHours );
        newDate.setHours(newDate.getHours()+add);
        newDate.setMilliseconds(0);
        return  newDate;
    },

    formatScheduledDate: function(date){
        return dateFormat(date, "UTC:HHMM");
    },

    getCurrentHourlyTimeStamp: function( date ){
        return (date===undefined) ? dateFormat(new Date(), "UTC:yyyymmdd.HH") : dateFormat(date, "UTC:yyyymmdd.HH");
    },

    getCurrentHourMinuteTimeStamp: function(){
        return dateFormat(new Date(), "UTC:yyyymmdd.HHMM");
    },

    getLocaleTimeStringEndOfDay: function(val){
        var year = val.substring(0,4);
        var month = val.substring(4,6);
        var day = val.substring(6,8);
        var hour = '23';
        var min = '59';
        var sec = '59';

        var date = new Date();
        date.setUTCFullYear( year );
        date.setUTCMonth( month-1 );
        date.setUTCDate(day);

        date.setUTCHours(hour);
        date.setUTCMinutes(min);
        date.setUTCSeconds(sec);

        return date;
    },

    getLocaleTimeStringEndOfHour: function(val){
        var year = val.substring(0,4);
        var month = val.substring(4,6);
        var day = val.substring(6,8);
        var hour = val.substring(9,11);
        var min = '59';
        var sec = '59';

        var date = new Date();
        date.setUTCFullYear( year );
        date.setUTCMonth( month-1 );
        date.setUTCDate(day);

        date.setUTCHours(hour);
        date.setUTCMinutes(min);
        date.setUTCSeconds(sec);

        return date;
    },

    getLocaleTimeStringStartOfHour: function(val){
        var year = val.substring(0,4);
        var month = val.substring(4,6);
        var day = val.substring(6,8);
        var hour = val.substring(9,11);
        var min = '00';
        var sec = '00';

        var date = new Date();
        date.setUTCFullYear( year );
        date.setUTCMonth( month-1 );
        date.setUTCDate(day);

        date.setUTCHours(hour);
        date.setUTCMinutes(min);
        date.setUTCSeconds(sec);

        return date;
    },

    getLocaleTimeDataObj: function( val ){
        return this.getTimeStampObj( this.getLocaleTimeFromString( val ) )
    },


    localeTimeParts: function(val){
        let year = val.substring(0,4);
        let month = val.substring(4,6);
        let day = val.substring(6,8);
        let hour = val.substring(9,11);
        let min = val.substring(11,13);
        let sec = val.substring(13,15);

        return { yy:year, mmonly: month, ddonly: day, dd: year+month+day, mm:year+month, hhonly: hour, hh:year+month+day+'.'+hour, min: min, sec: sec }

    },

    getLocaleTimeFromString: function(val){
        var year = val.substring(0,4);
        var month = val.substring(4,6);
        var day = val.substring(6,8);
        var hour = val.substring(9,11);
        var min = val.substring(11,13);
        var sec = val.substring(13,15);
        if (month===undefined  || isNaN(parseInt(month))){ month = '00'; }
        if (day===undefined    || isNaN(parseInt(day))){ day = '01'; }
        if (hour===undefined   || isNaN(parseInt(hour))){ hour = '00'; }
        if (min===undefined    || isNaN(parseInt(min))){ min = '00'; }
        if (sec===undefined    || isNaN(parseInt(sec))){ sec = '00'; }

        var date = new Date();

        date.setUTCFullYear( parseInt(year) );
        date.setUTCMonth( parseInt(month)-1 );
        date.setUTCDate( parseInt(day));

        date.setUTCHours(parseInt(hour));
        date.setUTCMinutes(parseInt(min));
        date.setUTCSeconds(parseInt(sec));

        var ms = val.substring(15,18);
        (ms===undefined  || isNaN(parseInt(ms))) ? date.setUTCMilliseconds( ms ) :  date.setUTCMilliseconds( 0 );

        if (date.getUTCFullYear()<1999) return undefined;

        return date;
    },

    isDateValid: function (val){
        if (val.length<8) return false;

        return (this.getLocaleTimeFromString( val ) !== undefined);
    },

    getCurrentHourFormatted: function( date ){
        let b = moment.utc(date, "MMM Do YYYY hA", "America/New_York");
        return ( b.format('YYYYMMDD.HH'));
    },

    getCurrentDayFormatted: function( date ){
        let b = moment.utc(date, "MMM Do YYYY hA", "America/New_York");
        return ( b.format('YYYYMMDD'));
    },

    getCurrentMonthFormatted: function( date ){
        let b = moment.utc(date, "MMM Do YYYY hA", "America/New_York");
        return ( b.format('YYYYMM'));
    },

    getCurrentMonth: function(){
        let currentMonth = new Date();
        currentMonth.setUTCDate(1);
        currentMonth.setUTCHours(0);
        currentMonth.setUTCMinutes(0);
        currentMonth.setUTCSeconds(0);
        currentMonth.setUTCMilliseconds(0);

        return currentMonth;
    },

    getPreviousMonth: function(){
        let month = new Date();
        month.setUTCDate(0);
        month.setUTCHours(0);
        month.setUTCMinutes(0);
        month.setUTCSeconds(0);
        month.setUTCMilliseconds(0);
        month.setMonth( month.getMonth()-1 );

        return ( month );
    },

    setCurrentDay: function( currentDay) {
        currentDay.setUTCHours(0);
        currentDay.setUTCMinutes(0);
        currentDay.setUTCSeconds(0);
        currentDay.setUTCMilliseconds(0);
        return currentDay;
    },

    getCurrentDay: function(){
        var currentDay = new Date();
        currentDay.setUTCHours(0);
        currentDay.setUTCMinutes(0);
        currentDay.setUTCSeconds(0);
        currentDay.setUTCMilliseconds(0);
        return currentDay;
    },

    getPreviousDay: function(){
        let day = new Date();
        day.setUTCHours(0);
        day.setUTCMinutes(0);
        day.setUTCSeconds(0);
        day.setUTCMilliseconds(0);
        day.setDate( day.getDate()-1 );
        return ( day );
    },

    getCurrentHour: function(){
        var currentHour = new Date();
        currentHour.setUTCMinutes(0);
        currentHour.setUTCSeconds(0);
        currentHour.setUTCMilliseconds(0);

        return currentHour;
    },

    getPrevioustHour: function(){
        let hour = new Date();
        hour.setUTCMinutes(0);
        hour.setUTCSeconds(0);
        hour.setUTCMilliseconds(0);
        hour.setHours(hour.getHours()-1);
        return (hour);
    },



    isEqual: function(date, compareTo){
        var dateString = this.getCurrentHourlyTimeStamp(date);
        var compareDateString = this.getCurrentHourlyTimeStamp(compareTo);
        return dateString == compareDateString;
    },


    differenceInDays: function(date1, reverse){
        let a = moment(date1);
        let b = moment(new Date());

        return (reverse) ? b.diff(a, 'days') : a.diff(b, 'days');
    },

    differenceInHours: function(date1, reverse){
        let a = moment(date1);
        let b   = moment(new Date());

        return (reverse) ? b.diff(a, 'hours') : a.diff(b, 'hours');
    },

    differenceInMinutes: function(date1, reverse){
        let a = moment(date1);
        let b = moment(new Date());
        return (reverse) ? b.diff(a, 'minutes') : a.diff(b, 'minutes');
    },

    differenceBetweenInMinutes: function(date1, date2, reverse){
        let a = moment(this.getLocaleTimeFromString(date1));
        let b = moment(this.getLocaleTimeFromString(date2));

        return (reverse) ? b.diff(a, 'minutes') : a.diff(b, 'minutes');
    },


    /**
     * Determine if the hour and minute is close to the current time. The current
     * time is between 5 minutes.
     *
     * @param error
     * @param stderr
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
     * Determine if the set day falls on the current day.
     *
     * @param error
     * @param stderr
     * @returns Boolean
     */
    // isIntervalOnDay:function( intervalOn ){
    //     let isOnTime=false;
    //     for (let i in intervalOn) {
    //         let onDay = intervalOn[i];
    //         let onMinute = intervalOn[i].substring(2, 4)
    //
    //         let onTime = new Date();
    //         onTime.setUTCHours(onHour);
    //         onTime.setUTCMinutes(onMinute);
    //         onTime.setUTCSeconds(0);
    //         onTime.setUTCMilliseconds(0);
    //
    //         let difference = this.differenceInMinutes(onTime);
    //         if (difference >= -1 && difference <= 1){
    //             isOnTime=true;
    //         }
    //     }
    //     return isOnTime;
    // },

    runWithinInterval: function( type, lastRunDate, intervalTimer, intervalOn ){
        if (lastRunDate===undefined) {
            if (isNotEmpty( intervalOn ) && type==='hour'){
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

        if (currentTime >= timer && stringUtil.isNotEmpty( intervalOn ) && type==='hour'){
            return this.isIntervalOnTime(intervalOn);
        } else {
            return (currentTime >= timer);
        }
    },

    isEmpty: function( value ){
        let flag=false;

        if (value===undefined || value===null ||  value==='null' || value==='' && value.length===0){
            flag=true;
        }

        return flag;
    },

    isNotEmpty: function( value ){
        return !this.isEmpty(value);
    }

}








