//import { Country } from "./models/country.js";


function startGame() {
alert("Let's paly");
}

window.onload = (event) => {
    console.log('page is fully loaded');
    test();
    populateImageCategory("imageCategory1", "India");
    populateImageCategory("imageCategory2", "UK");
    populateImageCategory("imageCategory3", "China");
    populateImageCategory("imageCategory4", "Africa");
    moveTheImage();
  };

  function populateImageCategory(canvasId, categoryName)
  {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.strokeText(categoryName, 60, 100);
  }


function displayNextImage() {
var imageName = "image2";
var img = document.getElementById("image-to-identify");
img.src = "/images/" + imageName + ".png";
var imagePlaceHolder = document.getElementById("image-placeholder");
imagePlaceHolder.appendChild(img);
};

function moveTheImage()
{
    var animation = anime({
        targets: '#image-to-identify',
        // Properties 
      keyframes: [
          {translateY: 1000},
        ],
        duration: 200000,
        easing: 'easeOutElastic(1, .8)',
        loop: true
      });
      return anime;
}

function fadeOutDraggedImage(ev)
{
        anime({
          targets: '#image-to-identify',
          translateY: [50, -50],
          direction: 'alternate',
          loop: true,
          delay: 1000,
          endDelay: 1000,
          duration: 100000,
      });   
     // ev.preventDefault();
      //var data = ev.dataTransfer.getData("text");
      //ev.target.appendChild(document.getElementById(data));
      //var canvas = document.getElementById(canvasId);
      //var ctx = ev.target.getContext("2d");
      //ctx.drawImage(img, 10, 10);
}

function calculateScore()
{
    var score = document.getElementById("score");
    var currentScore = score.getAttribute("user-current-source");
    var result = parseInt(currentScore) +  20;
    var currentScore = score.setAttribute("user-current-source", result);
    score.innerHTML = "Score:"  + result;
}

function getRandomIntBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function test() {
    var countryList = [];
    countryList.push(new Country("India", 1));
    countryList.push(new Country("UK", 2));
    countryList.push(new Country("China", 3));
    countryList.push(new Country("Africa", 4));

    var myJSON = JSON.stringify(countryList);
    document.getElementById("h1").innerHTML = myJSON;

    console.log(myJSON);

    var ImageList =[];
    ImageList.push(new Image("kid.png", 1));
    ImageList.push(new Image("image2.png", 2));
    ImageList.push(new Image("image3.png", 3));
    ImageList.push(new Image("image4.png", 3));
    };

function dragAndDropHandler()
{
var dropzone = $('#droparea');
 
dropzone.on('dragover', function() {
    //add hover class when drag over
    dropzone.addClass('hover');
    return false;
});
 
dropzone.on('dragleave', function() {
    //remove hover class when drag out
    dropzone.removeClass('hover');
    return false;
});
 
dropzone.on('drop', function(e) {
    //prevent browser from open the file when drop off
    e.stopPropagation();
    e.preventDefault();
    dropzone.removeClass('hover');
 
    //retrieve uploaded files data
    var files = e.originalEvent.dataTransfer.files;
    processFiles(files);
 
    return false;
});
    





}


