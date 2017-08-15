app.directive('eventsList', function (
    Events
) {
    return {
        restrict: 'E',
        templateUrl: 'app/directives/events-list/view.html',
        scope: {},
        link: function (scope) {
            scope.events = Events.list;
            scope.remove = Events.remove;
        }
    };
});