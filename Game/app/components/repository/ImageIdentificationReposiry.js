var ImageIdentificationReposiry = function (options) {

  this.construct = function () {
  };
  var imageCategoryList = new Array();
  var randomImagesToGuess = new Array();
  var categoriesCount = 4;
  var noOfImagesToGuess = 6;

  this.getImageCategories = function () {
    $.ajaxSetup({
      async: false
    });
    $.getJSON('/app/components/repository/dataSource.json', loadImageCategories);
    return imageCategoryList;
  }

  this.getRandomImagesToGuess = function () {
    $.ajaxSetup({
      async: false
    });
    $.getJSON('/app/components/repository/dataSource.json', loadImages);
    return randomImagesToGuess;
  }

  var loadImageCategories = function (jsonDataSource) {
    var imageCategories = jsonDataSource.imageCategories;
    for (var i = 0; i < categoriesCount; i++) {
      imageCategoryList.push(new ImageCategory(imageCategories[i].name, imageCategories[i].id));
    }
  };

  var loadImages = function (jsonDataSource) {
    var imageList = jsonDataSource.images;
   var images = new Array();
    for (var i = 0; i < imageList.length; i++) {
      images.push(new GameImage(imageList[i].id, imageList[i].name, imageList[i].categoryId));
    }
    randomImagesToGuess = getRandomElements(images, noOfImagesToGuess);
  };

  var getRandomElements = function (sourceArray, neededElements) {
    var result = [];
    for (var i = 0; i < neededElements; i++) {
      var randomNumber = sourceArray[Math.floor(Math.random() * sourceArray.length)];
      if (!result.includes(randomNumber))
        result.push(randomNumber);
      else i--;
    }
    return result;
  };
  this.construct();
}





