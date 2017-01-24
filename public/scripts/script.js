console.log('js');

var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider
    .when("/", {
      templateUrl : "/public/views/index.html",
      controller: "indexController"
    })
    .when("/register", {
      templateUrl : "/public/views/register.html",
      controller: "registerController"
    })
    .when("/login", {
      templateUrl : "/public/views/login.html",
      controller: "loginController"
    })
    .when("/profile", {
      templateUrl: "/public/views/profile.html",
      controller: "profileController"
    })
    .otherwise({
      redirectTo: "/"
    });
}]);

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

  console.log( 'query:', query );

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

    });
  });
}; // end search function
};
}]); // end indexController

myApp.controller('registerController',['$scope', '$http', '$window', '$location',
  function($scope, $http, $window, $location) {
  console.log('inside register controller');

  $scope.go = function ( path ) {
    $location.path( path );
  };

  // $scope.register = function() {
  //   var userInfo = {
  //     username: $scope.username,
  //     password: $scope.password,
  //   };

  //   $http({
  //     method: 'POST',
  //     url: '/register',
  //     data: userInfo
  //   }).then(function successCallback(response) {
  //     console.log('success', response);
  //     $window.location.href = '/';
  //   }, function errorCallback(error) {
  //     console.log('error occurred!');
  //   }); // end then function
  //
  //   if( checkInput(userInfo.username, userInfo.password, $scope.rePassword) ){
  //         console.log('headed to post');
  //         $http({
  //           method: 'POST',
  //           url: '/register',
  //           data: userInfo
  //         }).then(function successCallback(response) {
  //           console.log('success', response);
  //           goToHome(userInfo);
  //         }, function errorCallback(error) {
  //           console.log('error occurred!');
  //         });
  //       } else {
  //         alert("password incorrect");
  //       }
  //     }; // end $scope.register
  //
  //     var goToHome = function( userInfo ){
  //         $http({
  //           method: 'POST',
  //           url: '/',
  //           data: userInfo
  //         }).then(function successCallback(response) {
  //           console.log(response);
  //           $window.location.href = '/profile';
  //         }, function errorCallback(error) {
  //           console.log('error', error);
  //           $window.location.href = '/';
  //         });
  //       }; // end goToHome()
  //
  //   var checkInput = function(name, password, checkPassword){
  //   console.log('in checkInput', name, password, checkPassword );
  //   if ( !name || !password || !checkPassword)return false;
  //   if ( password !== checkPassword )return false;
  //   return true;
  // };// end checkInput()

}]); // end registerController
