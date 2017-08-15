app.directive('eventPopup', function (
    $timeout,
    EventPopup,
    Events
) {
    var Event = function (options) {
        this.name = options.name;
        this.time = options.time;
        this.date = options.date;
        this.isFuture = true;
        
        this.setRandomColor();
    };

    Event.prototype.setRandomColor = function () {
        var charSet = '0123456789abcdef';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += charSet.charAt(Math.floor(Math.random() * charSet.length));
        }

        this.color = color;
    };

    return {
        restrict: 'E',
        templateUrl: 'app/directives/event-popup/view.html',
        controller: function ($scope) {
            $scope.timeOptions = ['ALL DAY', 'MORNING', 'MIDDAY', 'EVENING'];
            $scope.selectedDate = EventPopup.selectedDate;
        },
        link: function (scope) {
            scope.save = function (form) {
                if (!form.$valid) return;

                Events.add(new Event({
                    name: scope.event.name,
                    time: scope.event.time,
                    date: scope.selectedDate[0]
                }));

                scope.reset(form);
            };

            scope.reset = function (form) {
                EventPopup.removeDate();
                scope.event = {
                    name: undefined,
                    time: scope.timeOptions[0]
                };

                $timeout(function () {
                    form.$setUntouched();
                    form.$setPristine();
                });
            };
        }
    };
});