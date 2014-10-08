app = angular.module('akkadian',[]);

app.controller('ctrl', ['$scope', 'dataFactory', function($scope, dataFactory){
  $scope.root_search = '';
  $scope.gloss_search = '';
  $scope.class_search = '';
  
  dataFactory.getData()
    .success(function(data){
      $scope.data = data;
    });

  $scope.clear = function(){
    $scope.root_search = '';
    $scope.gloss_search = '';
  }
}]);
app.filter('rootFilter', function(){
  return function (items, param) {
    if(!param){return items}
    var options = {
      caseSensitive: true,
      keys: ['ascii', 'root'],
      threshold: 0.5
    }
    var f = new Fuse(items, options);
    var out = f.search(param);
    return out;
  }
});
app.filter('glossFilter', function(){
  return function (items, param) {
    if(!param){return items}
    var options = {
      keys: ['gloss'],
      threshold: 0.5
    }
    var f = new Fuse(items, options);
    var out = f.search(param);
    return out;
  }
});
app.factory('dataFactory', ['$http', function($http){
  return {
    getData: function(){
      return $http.get('data.json');
    }
  }
}]);