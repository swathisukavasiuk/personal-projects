
function allowDrop(ev) {
ev.preventDefault();
//fadeOutDraggedImage();
//displayNextImage();
}

function drag(ev) {
ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
ev.preventDefault();
var data = ev.dataTransfer.getData("text");
ev.target.appendChild(document.getElementById(data));

var canvas = document.getElementById(ev.target.id);
var ctx = canvas.getContext("2d");
//canvas.width =  100;
//canvas.heigth =  100;

//ctx.font = "30px Arial";
//ctx.drawImage(document.getElementById(data), 0, 100);
drawImg(ev.target.id, data);
calculateScore();
displayNextImage();
}

function drawImg(canvasId, imageId){
	var x = document.getElementById(canvasId);
	var canvax = x.getContext('2d');	//getContext untuk mendeklarasikan dimensi canvas yang kita buat di var x
	var imgElement = document.getElementById(imageId);
	var imgObj = new Image();
	imgObj.src = imgElement.src;
	
	var imgW = imgObj.width;
	var imgH = imgObj.height;
	var imgX = (canvax.canvas.width * .5) - (imgW * .5);
	var imgY = (canvax.canvas.height * .5) - (imgH * .5);

	//ev.setData("imgWidth", canvax.imgW);

	imgObj.onload = function() {			//load image on canvas
		//canvax.clearRect(imgX, imgY, imgW, imgH);			//bersihkan canvas dari gambar sebelumnya
		canvax.drawImage(imgObj, imgX, imgY, imgW, imgH);	//place image on canvas in x & y coordinat = 10
	};

	} 


function onDragEnter(ev)
{
//fadeOutDraggedImage(ev);
}

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





