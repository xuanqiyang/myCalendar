var Calendar = function(eleCalendar, yearArg, monthArg,dateArg) {
    var _Date = function() {
        var date;
        if (arguments[0] && arguments[1] && arguments[2]) { //如果自定义参数的话就设置日期
            date = new Date(Array.prototype.slice.apply(arguments,[0,3]));
        }else{
            date = new Date();
        }
        this.dayOfWeek = date.getDay(); //获取当日星期
        this.month = date.getMonth() + 1; //获取当日月份
        this.dayOfMonth = date.getDate(); //获取当月日期
        this.year = date.getFullYear(); //获取当日年份
        this.daysInThisMonth = new Date(this.year, this.month, 0).getDate();//获取当月总天数
        this.weekIsfirstDayOfMonth = new Date(this.year, this.month - 1, 1).getDay(); //这个月第一天是星期几
        this.IndexOflastday = this.weekIsfirstDayOfMonth + this.daysInThisMonth - 1; //这个月最后一天的在日历表格中的索引
    };
    var _now = new _Date(yearArg,monthArg,dateArg); // 设置日期

    function renderCalendar() {// 渲染日历UI
        var weekdaysText = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            fragCalendar = document.createDocumentFragment(),
            fragMonthdays = document.createDocumentFragment(),
            fragWeekdays = document.createDocumentFragment(),
            eleWeekdays = document.createElement('ul'),
            eleMonthdays = document.createElement('ul'),
            liWeekday,
            liMonthday;

            //设置样式
            eleWeekdays.className = 'weekdays';
            eleMonthdays.className = 'monthdays';

        // 渲染日历UI
        for (var i = 0; i < weekdaysText.length; i++) {
            liWeekday = document.createElement('li');

            liWeekday.innerText = weekdaysText[i];

            fragWeekdays.appendChild(liWeekday);

            for (var j = 5; j > 0; j--) {
                liMonthday = document.createElement('li');
                fragMonthdays.appendChild(liMonthday);
            }
        }
        eleWeekdays.appendChild(fragWeekdays);
        eleMonthdays.appendChild(fragMonthdays);
        fragCalendar.appendChild(eleWeekdays);
        fragCalendar.appendChild(eleMonthdays);
        eleCalendar.appendChild(fragCalendar);
    };

    function changeYear(){}
    function changeMonth(){}
    function changeDate(){}
    function setNow(){}

    renderCalendar()
    var monthdays = eleCalendar.querySelector('.monthdays');
    function fillDaysInMonth(){ //填充天数到日历
        var dayInAMonth = 1,
        dayOfNextMonth = 1,
        dayOfPreMonth = new Date(_now.year, _now.month - 1, 0).getDate(), //获取上个月的天数
        elMonthdays,
        indexofDayOfMonth = _now.weekIsfirstDayOfMonth-1;
        // 填充日历中的天数
        for (var liNum = 0; liNum <= monthdays.children.length ; liNum++) {
            if (liNum >= _now.weekIsfirstDayOfMonth && dayInAMonth <= _now.daysInThisMonth) { //如果填充的格子在某一个月之内
                monthdays.children[liNum].innerText = dayInAMonth++;

            } else if (liNum > _now.IndexOflastday && liNum < monthdays.children.length) { //如果这个月的天数没有填满日历表格,填充下个月的格子
                monthdays.children[liNum].innerText = dayOfNextMonth++;

            } else if (liNum < _now.weekIsfirstDayOfMonth && indexofDayOfMonth>=0) { //补充上个月的格子
                monthdays.children[liNum].innerText = dayOfPreMonth-indexofDayOfMonth;
                indexofDayOfMonth--;
            }
        }
    };
    fillDaysInMonth()

    return {
        year: _now.year,
        month: _now.month,
        dayOfMonth: _now.dayOfMonth
    }

};