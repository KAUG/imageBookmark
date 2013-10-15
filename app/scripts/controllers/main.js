'use strict';

function initImages($scope) {
  $scope.images = [
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

  for (var index in $scope.images) {
    $scope.images[index].id = index;
  }
}

angular.module('imageBookmarkApp')
  .controller('MainCtrl', function ($scope) {
    initImages($scope);

    $scope.deleteImage = function(image) {
      delete $scope.images[image.id];
      $scope.images = _.compact($scope.images);
      //$scope.images.remove(image.id, image.id);
    };
  });
