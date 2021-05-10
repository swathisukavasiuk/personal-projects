class ImageIdentificationService {

  constructor(imageIdentificationReposiry) {
    this.imageIdentificationReposiry = imageIdentificationReposiry;
  }

  getImageCategories(imageCategoriesCount) {
    return this.imageIdentificationReposiry.getImageCategories(imageCategoriesCount);
  };

  getRandomImagesToGuess(imagesToGuessCount) {
    return this.imageIdentificationReposiry.getRandomImagesToGuess(imagesToGuessCount);
  };

  calculateScore(imageId, selectedCategoryId, userCurrentScore, successpoints, failurePoints) {
    return this.imageIdentificationReposiry.getImageCategoryId(imageId) == selectedCategoryId ? (parseInt(userCurrentScore) + parseInt(successpoints)) : (parseInt(userCurrentScore) - parseInt(failurePoints));
  };

  populateImageCategory(canvasElement, categoryName) {
    var ctx = canvasElement.getContext("2d");
    ctx.font = "30px Arial";
    var gradient = ctx.createLinearGradient(0, 0, canvasElement.width, 0);
    ctx.strokeText(categoryName, 60, 100);
  };

  displayImage(imagePlaceHolder, imageSrc, imageAtttributes, dropTime) {
    var img = document.createElement("img");
    this.setAttributes(img, imageAtttributes);
    img.src = imageSrc;
    var imagePlaceHolder = document.getElementById(imagePlaceHolder);
    imagePlaceHolder.appendChild(img);
    this.moveTheImageDown('img', dropTime);
  };

  moveTheImageDown(target, dropTime){
    var animation = anime({
      targets: target,
      keyframes: [
        { translateY: 1000 },
      ],
      duration: 20000,
      easing: 'easeOutElastic(1, .8)',
    });
    return anime;
  };

  setAttributes(element, attrs) {
    for (var key in attrs) {
      element.setAttribute(key, attrs[key]);
    }
  };

  createAudioEffec(audioName) {
    var myAudio = document.createElement('audio');
    myAudio.controls = true;
   // myAudio.src = '../resources/audio/' + audioName;
    myAudio.play();
  };

}

