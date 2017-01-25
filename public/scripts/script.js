console.log('js');

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'profileController'
  })
  .otherwise({
    redirectTo: '/'
  });
}]); //end routeProvider

myApp.filter('youtubeEmbedUrl', function ($sce) {
    return function(videoId) {
      return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoId);
    };
  });

myApp.controller('indexController',['$scope', '$http', function($scope, $http){
console.log('in indexController');

$scope.songSearch = function(){

  var songSearch = $scope.search;
  var self = this;
  var apiKey = 'AIzaSyBTvvYsO87BPcSWBvLGn-jH20pMytm9kRU';
  self.video = {};
  self.videoid = '';

  self.songSearch = function(){

  myApp.filter('youtubeEmbedUrl', function ($sce) {
      return function(videoId) {
        return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoId);
      };
    });

  console.log(songSearch);
  var query = 'https://www.googleapis.com/youtube/v3/search';
            query += '?part=snippet';
            query += '&q=' + songSearch + 'guitar lesson';
            query += '&maxResults=6';
            query += '&key=' + apiKey;

  // var request = encodeURI(query) + '&callback=JSON_CALLBACK';

  $http({
      method: 'GET',
      url: query,
    }).then( function( response ){
      console.log( 'response:', response );
      $scope.searchResults = response.data.items.filter(function(item){
        if (item.id.kind === "youtube#video"){
          return true;
        }
        else {
          return false;
        }
      console.log($scope.searchResults);

      $scope.save = function (vid) {
        console.log('saved');

        $http.post('/routers', pet)
    .then(function(response){
      console.log('POST Hit!');
    });
      }; // POST to DB

    }); // end filter
  }); // end then
}; // end search function
};
}]); // end indexController

myApp.controller('profileController', ['$scope', '$http', function($scope, $http){
  $scope.display = function(){
      console.log('GET');
        $http({
          method:'GET',
          url: '/routes'
        }).then(function(response){
          console.log('GET Response', response.data);
          $scope.favorites = response.data;
        });
    }; //end GET
}]);
