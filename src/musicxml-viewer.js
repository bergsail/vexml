// VeXML
// Copyright (c) 2012 Daniel Ringwalt
//
// Viewer - Simple multi-line music viewer using VexFlow
// Requires VexFlow, JQuery. See viewer.html

// Wraps a StaffSystem that draws in a particular <canvas> element
Vex.Flow.MusicXML.CanvasViewer = function(doc, staffsystem_options) {
  this.staffsystem_options = {x: 20, y: 10, width: 600};
  Vex.Merge(this.staffsystem_options, staffsystem_options);
  this.doc = doc;
  this.staffSystem = null;
  this.displayWidth = 800;
  this.displayHeight = 180;
  this.zoom = 0.8;
  this.canvas = null;
}

Vex.ML.CanvasViewer.prototype.getStaffSystem = function() {
  this.staffSystem = null;
  this.staffsystem_options.width = Math.floor(this.displayWidth/this.zoom - 50);
  this.staffSystem = new Vex.ML.StaffSystem(this.doc, this.staffsystem_options);
  var scale = (window.devicePixelRatio || 1) * this.zoom;
  this.displayHeight = (this.staffSystem.getHeight() + 20) * this.zoom;
  return this.staffSystem;
}

Vex.ML.CanvasViewer.prototype.getCanvas = function() {
  if (this.canvas) return this.canvas;
  this.canvas = document.createElement('canvas');
  //var zoomedWidth = Math.floor(this.displayWidth * this.zoom);
  //var zoomedHeight = Math.floor(this.displayHeight * this.zoom);
  if (window.devicePixelRatio > 1) {
    this.canvas.setAttribute('width', this.displayWidth*window.devicePixelRatio);
    this.canvas.setAttribute('height', this.displayHeight*window.devicePixelRatio);
    this.canvas.style.width = this.displayWidth + 'px';
    this.canvas.style.height = this.displayHeight + 'px';
    var scale = this.zoom * window.devicePixelRatio;
    this.canvas.getContext('2d').scale(scale, scale);
  }
  else {
    this.canvas.setAttribute('width', this.displayWidth);
    this.canvas.setAttribute('height', this.displayHeight);
    this.canvas.getContext('2d').scale(this.zoom, this.zoom);
  }
  return this.canvas;
}

Vex.ML.CanvasViewer.prototype.drawInCanvas = function() {
  this.getStaffSystem();
  this.getCanvas();
  var context = this.canvas.getContext('2d');
  this.staffSystem.draw(context);
  this.staffSystem.drawContents(context);
}

// Takes a <div> element and MusicXML.Document and displays the document
Vex.Flow.MusicXML.Viewer = function(element, doc) {
  if (arguments.length > 0) this.init(element, doc);
};
Vex.ML.Viewer.prototype.init = function(element, doc) {
  this.element = element;
  this.doc = doc;
  this.canvasViewers = new Array();
  this.displayWidth = 800;
  // Default zoom for mobile, hi-res display
  if (window.devicePixelRatio >= 2 && window.innerWidth <= 480) this.zoom = 0.5;
  // Other hi-res displays
  else if (window.devicePixelRatio >= 2) this.zoom = 0.6;
  else this.zoom = 0.8;

  this.layout();
};
Vex.ML.Viewer.prototype.getScale = function() {
  var ratio = window.devicePixelRatio || 1;
  if (ratio > 1) return ratio * this.zoom;
  return this.zoom;
}
Vex.ML.Viewer.prototype.addCanvasViewer = function(canvas_options, music_options) {
  var canvasViewer = new Vex.ML.CanvasViewer(this.doc, music_options);
  canvasViewer.zoom = this.zoom;
  canvasViewer.displayWidth = canvas_options.width;
  canvasViewer.drawInCanvas();
  this.element.appendChild(canvasViewer.getCanvas());
  return canvasViewer;
};
Vex.ML.Viewer.prototype.layout = function() {
  this.element.innerHTML = "";
  var width = $('.vexml_viewer').width();
  console.warn(width);
  var measure = 0;
  while (measure < this.doc.getPart(0).getNumberOfMeasures()) {
    var canvasViewer = this.addCanvasViewer({width:width,height:180},
      {start_measure:measure, x:20, y:10, width:Math.floor((width-40)/this.zoom)}
      );
    this.canvasViewers.push(canvasViewer);
    measure = canvasViewer.staffSystem.end_measure + 1;
  }
}
