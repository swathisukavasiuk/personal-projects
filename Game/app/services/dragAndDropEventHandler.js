class DragAndDropEventHandler {
	
	allowDrop(ev) {
		ev.preventDefault();
	}

	drag(ev) {
		ev.dataTransfer.setData("imageId", ev.target.id);
	}

	drop(ev) {
		ev.preventDefault();
		var data = ev.dataTransfer.getData("imageId");
		this.drawImgOnDroppedCategory(ev.target.id, data);
	}

	drawImgOnDroppedCategory(canvasId, imageId) {
		var x = document.getElementById(canvasId);
		var canvax = x.getContext('2d');
		var imgElement = document.getElementById(imageId);
		var imgObj = new Image();
		imgObj.src = imgElement.src;
		this.drawImageScaled(imgObj, canvax);
	}

	drawImageScaled(img, ctx) {
		var canvas = ctx.canvas;
		var hRatio = canvas.width / img.width;
		var vRatio = canvas.height / img.height;
		var ratio = Math.min(hRatio, vRatio);
		var centerShift_x = (canvas.width - img.width * ratio) / 2;
		var centerShift_y = (canvas.height - img.height * ratio) / 2;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, 0, 0, img.width, img.height,
			centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);

		img.onload = function () {
			setTimeout(() => {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.font = "30px Arial";
				ctx.strokeText(ctx.canvas.getAttribute("name"), 60, 100);
			}, 200);
		};
	}
}