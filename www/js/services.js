'use strict';

angular.module('conFusion.services', ['ngResource'])
  .constant("baseURL","http://127.0.0.1:3000/")

  .factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    return $resource(baseURL + "dishes/:id", null, {
      'update': {
        method: 'PUT'
      }
    });

  }])


  .factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    return $resource(baseURL + "promotions/:id");

  }])


  .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    return $resource(baseURL+"leadership/:id");

  }])

  .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    return $resource(baseURL+"feedback/:id");

  }])

  .factory('favoriteFactory', ['$resource', 'baseURL','$localStorage', function ($resource, baseURL, $localStorage) {
    var favFac = {};
    var favorites = $localStorage.getObject("myfavorites", "[]");

    favFac.addToFavorites = function (index) {
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].id == index)
          return;                               //this step is to make sure there are no duplicates in the list
      }
      favorites.push({id: index});   //is a js object

      $localStorage.storeObject("myfavorites", favorites);
    };

    favFac.deleteFromFavorites = function (index) {
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].id == index) {
          favorites.splice(i, 1);
        }
      }

      $localStorage.storeObject("myfavorites", favorites);
    }

    favFac.getFavorites = function () {
      return favorites;
    };

    return favFac;
  }])


  .factory('$localStorage', ['$window', function($window) {
    return {
      store: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      storeObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key,defaultValue) {
        return JSON.parse($window.localStorage[key] || defaultValue);
      }
    }
  }])


;
