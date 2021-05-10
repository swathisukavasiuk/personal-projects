$(document).ready(function () {
  
  
  var imageIdentificationservice = new ImageIdentificationService();
  var dragAndDropHandler = new DragAndDropEventHandler();

  imageIdentificationservice.loadGameInstance();

  document.addEventListener("drop", function (event) {
    var imageId = event.dataTransfer.getData("imageId");
    var canvasId = event.target.id;
    imageIdentificationservice.calculateScore(imageId, canvasId);
    dragAndDropHandler.drop(event);
    imageIdentificationservice.displayNextImage();
  });

  document.addEventListener("dragstart", function (event) {
    dragAndDropHandler.drag(event);
  });

  document.addEventListener("dragover", function (event) {
    dragAndDropHandler.allowDrop(event);
  });


  //setTimeout(imageIdentificationservice.displayNextImage, 5000);

  setInterval(function () {
    imageIdentificationservice.displayNextImage();
    console.log("Image changed!");
  }, 4000);

  // $("#startGame").click(function(event){

  //});

  var timerID = setTimeout(function() {
    console.log('Runs in 3s');
}, 3000);
setTimeout(function() {
    console.log('cancelling first timeout', timerID);
    const a = 10;
    clearTimeout(timerID);
    return a;
}, 2000);

});