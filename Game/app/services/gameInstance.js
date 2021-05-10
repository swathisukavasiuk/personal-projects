class GameInstance {
  constructor() {
    this.loadGameConfiguration();
    this.imageIdentificationService = new ImageIdentificationService(new ImageIdentificationReposiry(this.gameConfigurations.datasource.url));
    this.randomImagesToGuess = new Array();
    this.gameConfigurations;
  }

  loadGameConfiguration() {
    $.ajaxSetup({
      async: false
    });
    this.gameConfigurations = $.getJSON('./config.json').responseJSON;
  };

  loadGameInstance() {
    var imageCategories = this.imageIdentificationService.getImageCategories(this.gameConfigurations.imageConfiguration.categoriesCount);
    this.randomImagesToGuess = this.imageIdentificationService.getRandomImagesToGuess(this.gameConfigurations.imageConfiguration.imageCount);
    var i = 0;
    imageCategories.forEach(imageCategory => {
      var canvas = document.getElementsByTagName("canvas");
      canvas[i].setAttribute("name", imageCategory.name);
      canvas[i].setAttribute("categoryId", imageCategory.id);
      this.imageIdentificationService.populateImageCategory(canvas[i], imageCategory.name);
      i++;
    });
    this.displayNextImage();
  };

  displayNextImage() {
    var imageIndex = this.randomImagesToGuess.length-1;
    if (imageIndex >= 0) {
      $('div#image-placeholder > img').remove();
      var imgSrc = "./app/resources/images/" + this.randomImagesToGuess[imageIndex].name;
      this.imageIdentificationService.displayImage('image-placeholder', imgSrc, { "id": this.randomImagesToGuess[imageIndex].id }, this.gameConfigurations.imageConfiguration.dropTime);
      this.imageIdentificationService.moveTheImageDown('img');
      this.randomImagesToGuess.pop();
    }
    else {
      $("#container").hide();
    }
  };

  calculateScore(imageId, canvasId) {
    var category = document.getElementById(canvasId);
    var categoryId = category.getAttribute("categoryId");

    var score = document.getElementById("score");
    var currentScore = score.getAttribute("user-current-source");

    var latestUserScore = this.imageIdentificationService.calculateScore(imageId, categoryId, currentScore, this.gameConfigurations.score.successPoints, this.gameConfigurations.score.failurePoints)

    score.setAttribute("user-current-source", latestUserScore);
    score.innerHTML = "Score:" + latestUserScore;
  };
}