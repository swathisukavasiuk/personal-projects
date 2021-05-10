class ImageIdentificationService {
  constructor(imageIdentificationReposiry, randomImagesToGuess, imageCount ) {
    this.imageIdentificationReposiry = new ImageIdentificationReposiry();
    this.randomImagesToGuess = new Array();
    this.imageCount = 0;
  }

  loadGameInstance() {
    var imageCategories = this.imageIdentificationReposiry.getImageCategories(4);
    this.randomImagesToGuess = this.imageIdentificationReposiry.getRandomImagesToGuess(6);
    this.populateImageCategory(imageCategories);
    this.displayNextImage();
  };

  populateImageCategory(imageCategories) {
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

   moveTheImageDown(){
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

  calculateScore(imageId, canvasId) {
    var category = document.getElementById(canvasId);
    var categoryId = category.getAttribute("categoryId");

    var score = document.getElementById("score");
    var currentScore = score.getAttribute("user-current-source");

    if (this.getImageCategoryId(imageId) == categoryId) {
      var result = parseInt(currentScore) + 20;
      //this.createAudioEffect("success.wav");
    }
    else {
      var result = parseInt(currentScore) - 5;
      //this.createAudioEffect("failure.wav");
    }

    var currentScore = score.setAttribute("user-current-source", result);
    score.innerHTML = "Score:" + result;
  };

  displayNextImage(){
    if(this.imageCount < 7){
      $("#gameOver").hide();
    $('div#image-placeholder > img').remove();
    var img = document.createElement("img");
    img.setAttribute("id", this.randomImagesToGuess[this.imageCount].id);
    img.src = "./app/resources/images/" + this.randomImagesToGuess[this.imageCount].name;
    var imagePlaceHolder = document.getElementById("image-placeholder");
    imagePlaceHolder.appendChild(img);
    this.imageCount++;
    this.moveTheImageDown();
    }
    else{
       $("#gameOver").show();
    }
  };

  getImageCategoryId (imageId) {
    for (var i = 0; i < this.randomImagesToGuess.length; i++) {
      if (this.randomImagesToGuess[i].id === imageId) {
        return this.randomImagesToGuess[i].imageCategoryId;
      }
    }
  }

  createAudioEffec(audioName) {
    var myAudio = document.createElement('audio');
    myAudio.controls = true;
    myAudio.src = '../resources/audio/' + audioName;
    myAudio.play();
  }
}