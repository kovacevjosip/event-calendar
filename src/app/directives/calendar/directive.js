app.directive('calendar', function (
    EventPopupSvc
) {
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

                    var date;
                    for (var i = 1; i <= daysInMonth; i++) {
                        date = moment([month.date.year(), month.date.month(), i]);
                        month.days.push({
                            active: date.isSame(new Date(), 'day'),
                            isCurrent: date.isSame(new Date(), 'day'),
                            isFuture: date.diff(new Date()) > 0 ? true : false,
                            value: date.date(),
                            weekValue: date.day(),
                            name: date.format('dddd'),
                            nameShort: date.format('ddd'),
                            date: date
                        });
                    }
                });
            };

            scope.setActiveMonth = function (index) {
                scope.months.forEach(function (month, i) {
                    month.active = i === index ? true : false;
                });
            };

            scope.selectDate = function (day) {
                if (day.isCurrent || day.isFuture) {
                    EventPopupSvc.saveDate(day.date);
                }
            };

            init();
        }
    };
});