$(document).ready(function () {
  
  $("#gameOver").hide();
  var gameInstance = new GameInstance();
  gameInstance.loadGameInstance();

  
  var dragAndDropHandler = new DragAndDropEventHandler();
  document.addEventListener("drop", function (event) {
    var imageId = event.dataTransfer.getData("imageId");
    var canvasId = event.target.id;
    gameInstance.calculateScore(imageId, canvasId);
    dragAndDropHandler.drop(event);
    gameInstance.displayNextImage();
  });

  document.addEventListener("dragstart", function (event) {
    dragAndDropHandler.drag(event);
  });

  document.addEventListener("dragover", function (event) {
    dragAndDropHandler.allowDrop(event);
  });

  setInterval(function () {
    gameInstance.displayNextImage();
    console.log("Image changed!");
  }, 4000);

});