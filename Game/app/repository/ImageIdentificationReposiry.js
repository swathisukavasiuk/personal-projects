class ImageIdentificationReposiry {
  constructor(dataSourceUrl) {
  this.dataSourceUrl = dataSourceUrl;
  }
  //To get the Image Categories (Countries) from db(Json in this case) based on the configured value
  getImageCategories(imageCategoriesCount) {
    $.ajaxSetup({
      async: false
    });
    var imageCategoriesJson = $.getJSON(this.dataSourceUrl + 'imageCategories.json').responseJSON.imageCategories;

    if (imageCategoriesJson.length >= imageCategoriesCount - 1) {
      var imageCategoryList = new Array();
      for (var i = 0; i < imageCategoriesCount; i++) {
        imageCategoryList.push(new ImageCategory(imageCategoriesJson[i].name, imageCategoriesJson[i].id));
      }
      return imageCategoryList;
    }
    console.error("No of categories in the db are lesser than expected");
  }

  //To get the Images to drop from db (Json in this case) based on the configured values
  getRandomImagesToGuess(imagesToGuessCount) {
    $.ajaxSetup({
      async: false
    });
    var imagesJson = $.getJSON(this.dataSourceUrl + 'images.json').responseJSON.images;

    if (imagesJson.length >= imagesToGuessCount - 1) {
      var images = new Array();
      for (var i = 0; i < imagesJson.length; i++) {
        images.push(new GameImage(imagesJson[i].id, imagesJson[i].name, imagesJson[i].categoryId));
      }

      //Picking the images randomly from all the images in db to give a unique experience for each game
      return this.getRandomElements(images, imagesToGuessCount);
    }
    console.error("No of images in the db are lesser than expected");
  }

  //To get the category id of selected image
  getImageCategoryId(imageId) {
    $.ajaxSetup({
      async: false
    });
    var imagesJson = $.getJSON(this.dataSourceUrl + 'images.json').responseJSON.images;
    for (var i = 0; i < imagesJson.length; i++) {
      if (imagesJson[i].id == imageId) {
        return imagesJson[i].categoryId
      }
    }
  };

getRandomElements(sourceArray, neededElements) {
  var result = [];
  for (var i = 0; i < neededElements; i++) {
    var randomNumber = sourceArray[Math.floor(Math.random() * sourceArray.length)];
    if (!result.includes(randomNumber))
      result.push(randomNumber);
    else i--;
  }
  return result;
};
}
