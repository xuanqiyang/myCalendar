var Calendar = function(ele) {
    var eleCalendar = document.querySelector(ele);
    var Now = function() {
        var date = new Date();
        this.dayOnWeek = date.getDay(), //获取当日星期
        this.month = date.getMonth() + 1, //获取当日月份
        this.dayOnMonth = date.getDate(), //获取当日月份
        this.year = date.getFullYear(), //获取当日年份
        this.daysOnThisMonth = new Date(this.year, this.month, 0).getDate() //获取当月总天数
    };

    var _now = new Now();
    var weekIsfirstDayOfMonth = new Date(_now.year, _now.month - 1, 1).getDay(); //这个月第一天是星期几
    var IndexOflastday = weekIsfirstDayOfMonth + _now.daysOnThisMonth //这个月最后一天的在日历表格中的索引
    var renderCalendar = function() {
        var fragCalendar = document.createDocumentFragment();
        var eleWeekdays = document.createElement('ul');
        var eleMonthdays = document.createElement('ul');
        var indexofDayOfMonth = weekIsfirstDayOfMonth;
        var day = 1;
        var dayOfNextMonth=1;
        var dayOfPreMonth = new Date(_now.year, _now.month-2, 0).getDate() //获取上个月的天数

        eleWeekdays.className = 'weekdays';
        eleMonthdays.className = 'monthdays';

        var weekdaysText = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

        // 渲染日历UI
        for (var i = 0; i < weekdaysText.length; i++) {
            var liWeekday = document.createElement('li');

            liWeekday.innerText = weekdaysText[i];

            eleWeekdays.appendChild(liWeekday);

            for (var j = 5; j > 0; j--) {
                var liMonthday = document.createElement('li');
                eleMonthdays.appendChild(liMonthday);
            }
        }
        fragCalendar.appendChild(eleWeekdays);
        fragCalendar.appendChild(eleMonthdays);
        eleCalendar.appendChild(fragCalendar);

        var elMonthdays= eleCalendar.querySelector('.monthdays');
        console.log(elMonthdays.children.length)
        // 填充日历中的天数
        for(var liNumOfDays = 0; elMonthdays.children.length >= liNumOfDays; liNumOfDays++){
            if(liNumOfDays >= weekIsfirstDayOfMonth && day <= _now.daysOnThisMonth){ //如果填充的格子在某一个月之内
                eleMonthdays.children[liNumOfDays].innerText = day++;
            }else if(liNumOfDays >= IndexOflastday && day <= elMonthdays.children.length){ //如果这个月的天数没有填满日历表格,填充下个月的格子
                eleMonthdays.children[liNumOfDays].innerText = dayOfNextMonth++;
            }else if(liNumOfDays < weekIsfirstDayOfMonth) {
                eleMonthdays.children[liNumOfDays].innerText=dayOfPreMonth--;
            }
        }
    }();
    for (var i = weekIsfirstDayOfMonth; i <= _now.daysOnThisMonth; i++) {

    }
    console.log(_now.daysOnThisMonth);
};