"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var RotateIcon = exports.RotateIcon = function RotateIcon(options) {
	this.options = options || {};
	this.rImg = options.img || new Image();
	this.rImg.src = this.rImg.src || this.options.url || "/static/groups/img/car_map_state_go.png";
	this.options.width = this.options.width || this.rImg.width || 52;
	this.options.height = this.options.height || this.rImg.height || 60;
	var canvas = document.createElement("canvas");
	var size = this.options.width > this.options.height ? this.options.width : this.options.height;
	canvas.width = size + 10;
	canvas.height = size + 10;
	this.context = canvas.getContext("2d");
	this.canvas = canvas;
};
RotateIcon.makeIcon = function (url) {
	return new RotateIcon({ url: url });
};
RotateIcon.prototype.setRotation = function (options) {
	var canvas = this.context,
	    angle = options.deg ? options.deg * Math.PI / 180 : options.rad,
	    centerX = this.options.width / 2,
	    centerY = this.options.height / 2;

	canvas.clearRect(0, 0, this.options.width, this.options.height);
	canvas.save();
	canvas.translate(centerX, centerY);
	canvas.rotate(angle);
	canvas.drawImage(this.rImg, -centerX, -centerY);
	canvas.restore();
	return this;
};
RotateIcon.prototype.getUrl = function () {
	return this.canvas.toDataURL("idist/images");
};