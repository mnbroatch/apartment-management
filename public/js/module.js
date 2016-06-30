"use strict;"

var app = angular.module('appName', ['ui.bootstrap','ui.router']); 
app.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('main', {url: '/', templateUrl: 'html/main.html'})

    $urlRouterProvider.otherwise('/');

});

