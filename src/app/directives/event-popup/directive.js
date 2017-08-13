app.directive('eventPopup', function (
    EventPopupSvc
) {
    return {
        restrict: 'E',
        templateUrl: 'app/directives/event-popup/view.html',
        link: function (scope) {
            scope.selectedDate = EventPopupSvc.selectedDate;

            scope.close = EventPopupSvc.removeDate;
        }
    };
});