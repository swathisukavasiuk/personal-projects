var ImageIdentificationService = function (options) {

  this.construct = function () {
  };

  var randomImagesToGuess = new Array();
  var imageCount = 0;
  var imageIdentificationReposiry = new ImageIdentificationReposiry

  this.loadGameInstance = function () {
    var imageCategories = imageIdentificationReposiry.getImageCategories();
    randomImagesToGuess = imageIdentificationReposiry.getRandomImagesToGuess();
    this.populateImageCategory(imageCategories);
    this.displayNextImage();
  };

  this.populateImageCategory = function (imageCategories) {
    var canvas = document.getElementsByTagName("canvas");
    var i = 0;
    imageCategories.forEach(imageCategory => {
      canvas[i].setAttribute("name", imageCategory.name);
      canvas[i].setAttribute("categoryId", imageCategory.id);
      var ctx = canvas[i].getContext("2d");
      ctx.font = "30px Arial";
      var gradient = ctx.createLinearGradient(0, 0, canvas[i].width, 0);
     //gradient.addColorStop("0", "magenta");
     //gradient.addColorStop("0.5", "Orange");
     //gradient.addColorStop("1.0", "red");
     //ctx.fillStyle = gradient;
     //ctx.fillText(imageCategory.name, 60, 100);
     ctx.strokeText(imageCategory.name, 60, 100);
      i++;
    });
  };

  var moveTheImageDown = function () {
    var animation = anime({
      targets: 'img',
      keyframes: [
        { translateY: 1000 },
      ],
      duration: 20000,
      easing: 'easeOutElastic(1, .8)',
    });
    return anime;
  };

  this.calculateScore = function (imageId, canvasId) {
    var category = document.getElementById(canvasId);
    var categoryId = category.getAttribute("categoryId");

    var score = document.getElementById("score");
    var currentScore = score.getAttribute("user-current-source");

    if (this.getImageCategoryId(imageId) == categoryId) {
      var result = parseInt(currentScore) + 20;
      createAudioEffect("success.wav");
    }
    else {
      var result = parseInt(currentScore) - 5;
      createAudioEffect("failure.wav");
    }

    var currentScore = score.setAttribute("user-current-source", result);
    score.innerHTML = "Score:" + result;
  };

  this.displayNextImage = function () {
    if(imageCount < 7){
      $("#gameOver").hide();
    $('div#image-placeholder > img').remove();
    var img = document.createElement("img");
    img.setAttribute("id", randomImagesToGuess[imageCount].id);
    img.src = "/app/resources/images/" + randomImagesToGuess[imageCount].name;
    var imagePlaceHolder = document.getElementById("image-placeholder");
    imagePlaceHolder.appendChild(img);
    imageCount++;
    moveTheImageDown();
    }
    else{
       $("#gameOver").show();
    }
  };

  this.getImageCategoryId = function (imageId) {
    for (var i = 0; i < randomImagesToGuess.length; i++) {
      if (randomImagesToGuess[i].id === imageId) {
        return randomImagesToGuess[i].imageCategoryId;
      }
    }
  }

  var createAudioEffect = function (audioName) {
    var myAudio = document.createElement('audio');
    myAudio.controls = true;
    myAudio.src = '/app/resources/audio/' + audioName;
    myAudio.play();
  }

  

  this.construct();
}