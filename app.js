app = angular.module('akkadian', []);

app.controller('ctrl', ['$scope', 'dataFactory', function($scope, dataFactory){
  $scope.root_search = '';
  $scope.gloss_search = '';
  $scope.data = dataFactory.getData();
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
app.factory('dataFactory', function($http){
  getData: function(){
    return $http.get('https://raw.githubusercontent.com/jackweinbender/akkadian-verbs/master/data.json');
  }
});