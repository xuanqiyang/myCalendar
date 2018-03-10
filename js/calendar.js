var Calendar = function(ele) {
    var eleCalendar = document.querySelector(ele);
    var _Date = function() {
        var date;
        if (arguments.length) { //如果自定义参数的话就设置日期
            date = new Date(Array.prototype.slice.apply(arguments,[0,3]));
        }else{
            date = new Date();
        }
        this.dayOfWeek = date.getDay(); //获取当日星期
        this.month = date.getMonth() + 1; //获取当日月份
        this.dayOfMonth = date.getDate(); //获取当月日期
        this.year = date.getFullYear(); //获取当日年份
        this.daysInThisMonth = new Date(this.year, this.month, 0).getDate();//获取当月总天数
    };
    var _now = new _Date(2018,4,4); // 设置日期

    var weekIsfirstDayOfMonth = new Date(_now.year, _now.month - 1, 1).getDay(); //这个月第一天是星期几
    var IndexOflastday = weekIsfirstDayOfMonth + _now.daysInThisMonth - 1 //这个月最后一天的在日历表格中的索引
    var renderCalendar = function() {
        var dayInAMonth = 1,
            dayOfNextMonth = 1,
            dayOfPreMonth = new Date(_now.year, _now.month - 1, 0).getDate(), //获取上个月的天数
            elMonthdays,
            indexofDayOfMonth = weekIsfirstDayOfMonth-1,
            weekdaysText = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            fragCalendar = document.createDocumentFragment(),
            eleWeekdays = document.createElement('ul'),
            eleMonthdays = document.createElement('ul');

            eleWeekdays.className = 'weekdays';
            eleMonthdays.className = 'monthdays';
            
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

        var monthdays = eleCalendar.querySelector('.monthdays');

        // 填充日历中的天数
        for (var liNum = 0; liNum <= monthdays.children.length ; liNum++) {
            if (liNum >= weekIsfirstDayOfMonth && dayInAMonth <= _now.daysInThisMonth) { //如果填充的格子在某一个月之内
                monthdays.children[liNum].innerText = dayInAMonth++;

            } else if (liNum > IndexOflastday && liNum < monthdays.children.length) { //如果这个月的天数没有填满日历表格,填充下个月的格子
                monthdays.children[liNum].innerText = dayOfNextMonth++;

            } else if (liNum < weekIsfirstDayOfMonth && indexofDayOfMonth>=0) { //补充上个月的格子
                monthdays.children[liNum].innerText = dayOfPreMonth-indexofDayOfMonth;
                indexofDayOfMonth--;
            }
        }
    }();
};