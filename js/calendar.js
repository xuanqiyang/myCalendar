var Calendar = function(ele) {
    var eleCalendar = document.querySelector(ele);
    var date = new Date();
    var Now = function() {
        this.dayOnWeek = date.getDay(), //获取当日星期
        this.month = date.getMonth() + 1, //获取当日月份
        this.dayOnMonth = date.getDate(), //获取当日月份
        this.year = date.getFullYear(), //获取当日年份
        this.daysOnThisMonth = new Date(this.year, this.month, 0).getDate() //获取当月总天数
    };

    var _now = new Now();
    var firstDayOfMonthOfWeek = new Date(_now.year, _now.month - 1, 1).getDay(); //这个月第一天是星期几

    var renderCalendar = function() {
        var fragCalendar = document.createDocumentFragment();
        var eleWeekdays = document.createElement('ul');
        var eleMonthdays = document.createElement('ul');
        var indexofDayOfMonth = firstDayOfMonthOfWeek;
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
        // 填充日历中的天数
        var day = 1
        for(var liNumOfDays = 0, day=1; elMonthdays.children.length > liNumOfDays; liNumOfDays++){
            if(liNumOfDays >= firstDayOfMonthOfWeek && day <= _now.daysOnThisMonth){ //如果填充的目标li在某一个月之内
                eleMonthdays.children[liNumOfDays].innerText = day++;
            }else{

            }
        }
    }()
    for (var i = firstDayOfMonthOfWeek; i <= _now.daysOnThisMonth; i++) {

    }
    console.log(_now.daysOnThisMonth);
};