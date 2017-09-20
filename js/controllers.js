var bookControllers = angular.module('bookControllers', ['ngAnimate','ngRoute']);
    bookControllers.constant('apiUrl', 'https://interview-api-staging.bytemark.co/books');
bookControllers.controller('ListController', ['$scope', '$http','$location','apiUrl',function($scope, $http,$location,apiUrl) {
  load();
  function load(){
    $http.get(apiUrl).success(function(data) {      
      $scope.books = data;
    });
  }
  $scope.delete = function(id,indexId){
    var r = confirm("Are you sure want to delete the book ?");
    if (r == true) {
      var url = apiUrl+'/'+id;
      $http.delete(url).success(function(data) {
        $scope.books.splice(indexId,1);
        alert("Book deleted successfully !!!")
      });                
    }
  }
  $scope.deleteAll = function(){
     var r = confirm("Are you sure want to delete All the books ?");
    if (r == true) {
      var url = 'https://interview-api-staging.bytemark.co/clean';
      $http.delete(url).success(function(data) {
        $scope.books = [];
      });                
    }

  }

}]);

bookControllers.controller('DetailsController', ['$scope', '$http','$routeParams','$location','apiUrl', function($scope, $http, $routeParams,$location,apiUrl) {
  $scope.whichItem = $routeParams.itemId;
       var url = apiUrl+'/'+$scope.whichItem;
  $http.get(url).success(function(data) {
    $scope.book = data;   
  });
}]);
bookControllers.controller('EditController', ['$scope', '$http','$routeParams','$location','apiUrl', function($scope, $http, $routeParams,$location,apiUrl) {
    $scope.whichItem = $routeParams.itemId;  
    $scope.handleSubmit = function(){
      
       var config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            }
         if($scope.whichItem){
            var url = apiUrl+'/'+$scope.whichItem;  
           $http.put(url, $scope.book, config)
            .success(function (data, status, headers, config) {
              alert("Book Edited successfully !!!");
              $location.path("/list" );
            })
            .error(function (data, status, header, config) {
            }); 
         }else{
           $http.post(apiUrl, $scope.book, config)
            .success(function (data, status, headers, config) {
              alert("Book Added successfully !!!");
                $location.path("/list" );
            })
            .error(function (data, status, header, config) {
            }); 
         }        
    } 
    $scope.reset = function(){
      $scope.book={}
    }
    if($scope.whichItem){
      var url = apiUrl+'/'+$scope.whichItem; 
      $http.get(url).success(function(data) {
      $scope.book = data;        
      });    
    } 

}]);



