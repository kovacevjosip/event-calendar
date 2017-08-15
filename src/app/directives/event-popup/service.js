app.factory('EventPopup', function () {
    var selectedDate = [];

    return {
        selectedDate: selectedDate,
        saveDate: function (date) {
            selectedDate.push(new Date(date));
        },
        removeDate: function () {
            selectedDate.length = 0;
        }
    };
});