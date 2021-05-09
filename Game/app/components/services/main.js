$(document).ready(function () {
  var imageIdentificationservice = new ImageIdentificationService();
  var dragAndDropHandler = new DragAndDropEventHandler();

  imageIdentificationservice.loadGameInstance();

  document.addEventListener("drop", function (event) {
    var imageId = event.dataTransfer.getData("text");
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
});