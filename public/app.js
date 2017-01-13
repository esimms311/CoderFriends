angular.app('coderFriends', ['ui.router']).config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/')


$stateProvider
.state('home', {
  url: '/',
  templateUrl: '.public/templates/home.html',
  controller: 'homeCtrl'
})
.state('friend', {
  url:'/friend',
  templateUrl: '.public/templates/friend.html',
  controller: 'homtCtrl'
})



});
