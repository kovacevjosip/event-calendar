app.directive('calendar', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/directives/calendar/view.html',
        scope: {},
        link: function (scope) {
            var init = function () {
                scope.weekDays = moment.weekdaysShort();
                scope.months = [];

                buildMonths();
                console.log('months: ', scope.months);
            };

            var buildMonths = function () {
                scope.months = moment.months().map(function (month, index) {
                    return {
                        active: moment(new Date()).month() === index ? true : false,
                        isCurrent: moment(new Date()).month() === index ? true : false,
                        name: month,
                        year: moment().year(),
                        // date: moment([moment().year(), index]).format('YYYY-MM'),
                        date: moment([moment().year(), index]),
                        days: []
                    };
                });

                // Build month days
                scope.months.forEach(function (month) {
                    var daysInMonth = month.date.daysInMonth();

                    var day;
                    for (var i = 1; i <= daysInMonth; i++) {
                        day = moment([month.date.year(), month.date.month(), i]);
                        month.days.push({
                            active: day.isSame(new Date(), 'day'),
                            isCurrent: day.isSame(new Date(), 'day'),
                            value: day.date(),
                            weekValue: day.day(),
                            name: day.format('dddd'),
                            nameShort: day.format('ddd'),
                            date: day
                        });
                    }
                });
            };

            scope.setActiveMonth = function (index) {
                scope.months.forEach(function (month, i) {
                    month.active = i === index ? true : false;
                });
            };

            init();
        }
    };
});