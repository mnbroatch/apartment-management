"use strict;"

var app = angular.module('appName', ['ui.bootstrap','ui.router','xeditable']); 
app.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('main', {url: '/', templateUrl: 'html/main.html'})
      .state('propertyManagement', {url: '/', templateUrl: 'html/propertyManagement.html', controller:'propertyController'})
      .state('propertyShow', {url: '/', templateUrl: 'html/propertyShow.html', controller:'propertyShowController'})
      .state('tenantManagement', {url: '/', templateUrl: 'html/tenantManagement.html', controller:'tenantController'})
      .state('tenantShow', {url: '/', templateUrl: 'html/tenantShow.html', controller:'tenantShowController'})

    $urlRouterProvider.otherwise('/');

});

