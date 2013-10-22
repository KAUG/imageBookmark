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

angular.module('imageBookmarkApp')
  .controller('MainCtrl', function ($scope) {
    $scope.images = initImages();
    var image_id = $scope.images.length;

    $scope.addImage = function() {
      var url = prompt('Input Image URL');
      var title = prompt('Input Title');
      image_id++;
      $scope.images.push({id:image_id, title:title, url:url});
    };

    $scope.deleteImage = function(targetImage) {
      $scope.images = _.reject($scope.images, function(image) {
        return image.id === targetImage.id;
      });
    };
  });
