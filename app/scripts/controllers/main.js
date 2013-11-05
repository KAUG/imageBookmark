'use strict';

function initImages() {
  var imageDatas = [
    {
      title: 'Google Logo',
      url: "http://allaboutetp.files.wordpress.com/2012/07/google-logo2.jpeg"
    },
    {
      title: 'Google Letter',
      url: "http://cfs7.blog.daum.net/original/27/blog/2007/11/16/13/57/473d2334a5973"
    },
    {
      title: 'Google Screenshot',
      url: "http://hooney.net/wp/wp-content/uploads/2007/05/google-kr.png"
    },
  ];

  return _.map(_.range(4), function(index) {
    var imageData = imageDatas[index % imageDatas.length];
    return {
      id: index,
      title: imageData.title,
      url: imageData.url
    };
  });
}

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

angular.module('imageBookmarkApp')
  .controller('MainCtrl', function ($scope) {
    $scope.images = [];
    chrome.storage.sync.get(['images'], function(items) {
      var images = items.images || [];
      _.each(images, function(image) {
        loadImage(image.url, function(blob_uri, requested_uri) {
          image.uri = blob_uri;
        });
      });
      $scope.images = images;
    });
    var image_id = $scope.images.length;

    $scope.addImage = function() {
      var url = 'http://hooney.net/wp/wp-content/uploads/2007/05/google-kr.png';
      var title = 'Google Screenshot';
      image_id++;
      var image = {
        id: image_id,
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
