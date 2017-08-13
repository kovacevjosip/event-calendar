var app = angular.module('EventCalendar', [
    'ui.router'
]);

app.config(function (
    $locationProvider,
    $stateProvider,
    $urlRouterProvider
) {
    // Remove hash prefix
    $locationProvider.hashPrefix('');

    // Default route
    $urlRouterProvider.otherwise('/');

    // Routes
    $stateProvider
        .state('base', {
            controller: 'BaseCtrl',
            controllerAs: 'base',
            templateUrl: 'app/components/base/view.html',
            abstract: true
        })
        .state('home', {
            url: '/',
            parent: 'base',
            controller: 'HomeCtrl',
            controllerAs: 'home',
            templateUrl: 'app/components/home/view.html',
        })
        .state('othervise', {
            url: '/'
        });
});

// Document ready event
angular.element(document).ready(function () {
    // Bootstrap app
    angular.bootstrap(document, ['EventCalendar'], {});
});