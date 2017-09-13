app.factory('EventPopup', function () {
    var selectedDate = [];

    return {
        selectedDate: selectedDate,
        saveDate: function (date) {
            selectedDate.push(date.format('YYYY-MM-DD'));
        },
        removeDate: function () {
            selectedDate.length = 0;
        }
    };
});