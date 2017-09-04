app.factory('Events', function (
    $log,
    locker
) {
    var events = locker.get('list') || [];

    return {
        list: events,
        add: function (event) {
            $log.debug('Add event: ', event);
            events.push(event);
            locker.put('list', events);
        },
        remove: function (event) {
            var e;
            for (var i = 0; i < events.length; i++) {
                e = events[i];
                if (e.name === event.name && e.color === event.color && e.time === event.time) {
                    $log.debug('Remove event: ', event);
                    events.splice(i, 1);
                    break;
                }
            }
            locker.put('list', events);
        }
    };
});