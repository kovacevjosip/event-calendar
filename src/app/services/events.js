app.factory('Events', function (
    $log,
    locker,
    api
) {
    var events = [];
    var getEvents = function () {
        events.length = 0;

        api.get().then(function (result) {
            if (result.data && result.data.length > 0) {
                result.data.forEach(function (event) {
                    events.push(event);
                });
            }
        });
    };
    getEvents();

    return {
        list: events,
        add: function (event) {
            api.create(event).then(function () {
                getEvents();
                $log.debug('Add event: ', event);
            });
        },
        remove: function (event) {
            api.remove({ id: event.id }).then(function () {
                getEvents();
                $log.debug('Event removed: ', event);
            });
        }
    };
});