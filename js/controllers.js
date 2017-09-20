var artistControllers = angular.module('artistControllers', ['ngAnimate','ngRoute']);

artistControllers.controller('ListController', ['$scope', '$http','$location',function($scope, $http,$location) {
  load();
  function load(){
    var url = 'https://interview-api-staging.bytemark.co/books';
    $http.get(url).success(function(data) {      
      $scope.books = data;
    });
  }
  $scope.delete = function(id,indexId){
    var r = confirm("Are you sure want to delete the book ?");
    if (r == true) {
      var url = 'https://interview-api-staging.bytemark.co/books/'+id;
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

artistControllers.controller('DetailsController', ['$scope', '$http','$routeParams','$location', function($scope, $http, $routeParams,$location) {
      $scope.whichItem = $routeParams.itemId;
       var url = 'https://interview-api-staging.bytemark.co/books/'+$scope.whichItem;
  $http.get(url).success(function(data) {
    $scope.book = data;   
  });
}]);
artistControllers.controller('EditController', ['$scope', '$http','$routeParams','$location', function($scope, $http, $routeParams,$location) {
    $scope.whichItem = $routeParams.itemId;  
    $scope.handleSubmit = function(){
      
       var config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            }
         if($scope.whichItem){
            var url = 'https://interview-api-staging.bytemark.co/books/'+$scope.whichItem;  
           $http.put(url, $scope.book, config)
            .success(function (data, status, headers, config) {
              alert("Book Edited successfully !!!");
              $location.path("/list" );
            })
            .error(function (data, status, header, config) {
            }); 
         }else{
           var url = 'https://interview-api-staging.bytemark.co/books'; 
           $http.post(url, $scope.book, config)
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
      var url = 'https://interview-api-staging.bytemark.co/books/'+$scope.whichItem; 
      $http.get(url).success(function(data) {
      $scope.book = data;        
      });    
    }
  

}]);



