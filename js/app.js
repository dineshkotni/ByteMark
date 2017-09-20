var myApp = angular.module('myApp', [
  'ngRoute',
  'artistControllers'
])
.filter( 'onlyNumber', function() {
return function( input ) {
return input.replace( /^\D+/g, '');
}
});
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/list', {
    templateUrl: 'partials/list.html',
    controller: 'ListController'
  }).
  when('/book/:itemId', {
    templateUrl: 'partials/details.html',
    controller: 'DetailsController'
  }).
  when('/book/edit/:itemId', {
    templateUrl: 'partials/edit.html',
    controller: 'EditController'
  }).
   when('/books/add', {
    templateUrl: 'partials/edit.html',
    controller: 'EditController'
  }).
  otherwise({
    redirectTo: '/list'
  });
}]);