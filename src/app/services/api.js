app.factory('api', function (
    $http
) {
    var get = function () {
        return $http.get('http://127.0.0.1:8000/list');
    };

    var create = function (data) {
        return $http.post('http://127.0.0.1:8000/create', data);
    };

    var remove = function (data) {
        return $http.delete('http://127.0.0.1:8000/remove', {
            params: data
        });
    };

    return {
        get: get,
        create: create,
        remove: remove
    };
});