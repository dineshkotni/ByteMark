var artistControllers = angular.module('artistControllers', ['ngAnimate']);

artistControllers.controller('ListController', ['$scope', '$http', function($scope, $http) {
  
  
  load();
  function load(){
    var url = 'https://interview-api-staging.bytemark.co/books';
    $http.get('js/data.json').success(function(data) {
      console.log("DATA",data);
      $scope.artists = data;
      $scope.artistOrder = 'name';
    });
  }
  $scope.delete = function(id){
    var r = confirm("Are you sure want to delete the book ?");
    if (r == true) {
      var url = 'https://interview-api-staging.bytemark.co/books/'+id;
      $http.delete(url).success(function(data) {
        load();
      });                
    }
  }
  $scope.deleteAll = function(){
     var r = confirm("Are you sure want to delete All the books ?");
    if (r == true) {
      var url = 'https://interview-api-staging.bytemark.co/clean';
      $http.delete(url).success(function(data) {
        load();
      });                
    }

  }

}]);

artistControllers.controller('DetailsController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
       
  $http.get('js/data.json').success(function(data) {
    $scope.artists = data;
    $scope.whichItem = $routeParams.itemId;
    console.log("item",$scope.whichItem);
    if ($routeParams.itemId > 0) {
      $scope.prevItem = Number($routeParams.itemId)-1;
    } else {
      $scope.prevItem = $scope.artists.length-1;
    }

    if ($routeParams.itemId < $scope.artists.length-1) {
      $scope.nextItem = Number($routeParams.itemId)+1;
    } else {
      $scope.nextItem = 0;
    }

  });
}]);
artistControllers.controller('EditController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
    $scope.handleSubmit = function(){
      console.log("data",$scope.book);
       var config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            }
        var url = 'https://interview-api-staging.bytemark.co/books/'+$scope.whichItem;   
        console.log("url",url);
     $http.put(url, $scope.book, config)
            .success(function (data, status, headers, config) {
              console.log("data",data);
            })
            .error(function (data, status, header, config) {
            });    

  

    } 
    $scope.reset = function(){
      $scope.book={}
    }
  $http.get('js/data.json').success(function(data) {
    $scope.book = data[0];
    $scope.whichItem = $routeParams.itemId;    
  });
}]);

