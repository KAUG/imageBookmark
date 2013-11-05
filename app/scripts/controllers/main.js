'use strict';

// http://developer.chrome.com/apps/app_codelab8_webresources.html
var loadImage = function(uri, callback) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function() {
    callback(window.webkitURL.createObjectURL(xhr.response), uri);
  }
  xhr.open('GET', uri, true);
  xhr.send();
}

function getNewImageId(images) {
  if (images.length) {
    var latestImage = _.max(images, function(image) {
      return image.id;
    });
    return latestImage.id + 1;
  } else {
    return 1;
  }
}

angular.module('imageBookmarkApp')
  .controller('MainCtrl', function ($scope) {
    $scope.images = [];
    chrome.storage.sync.get(['images'], function(items) {
      var images = items.images || [];
      _.each(images, function(image) {
        image.uri = null;
        loadImage(image.url, function(blob_uri, requested_uri) {
          image.uri = blob_uri;
        });
      });
      $scope.$apply(function() {
        $scope.images = images;
      });
    });

    $scope.addImage = function() {
      var url = 'http://hooney.net/wp/wp-content/uploads/2007/05/google-kr.png';
      var title = 'Google Screenshot';
      var image = {
        id: getNewImageId($scope.images),
        title: title,
        url: url
      };
      $scope.images.push(image);
      chrome.storage.sync.set({
        images: $scope.images
      }, function() {
        // do nothing...
      });
      loadImage(image.url, function(blob_uri, requested_uri) {
        image.uri = blob_uri;
      });
    };

    $scope.deleteImage = function(targetImage) {
      $scope.images = _.reject($scope.images, function(image) {
        return image.id === targetImage.id;
      });
    };
  });

// for Development environment

if (chrome.storage == undefined) {
  chrome.storage = {
    sync: {
      set: function(items, callback) {
        setTimeout(function() {
          callback();
        }, 1);
      },
      get: function(keys, callback) {
        setTimeout(function() {
          callback(keys, {});
        }, 1);
      }
    }
  };
  loadImage = function(uri, callback) {
    setTimeout(function() {
      callback(uri, uri);
    }, 1);
  };
}
