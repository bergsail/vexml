// VeXML
// Copyright (c) 2012 Daniel Ringwalt
//
// Element - Abstract class wrapping a particular XML element.

Vex.Flow.VeXML.Element = function(element, options) {
  if (arguments.length > 0) this.init(element, options);
}
Vex.Flow.VeXML.Element.nodeName = null;

Vex.Flow.VeXML.Element.prototype.init = function(element, options) {
  this.options = {};
  Vex.Merge(this.options, options);
  this.element = element;
  if (this.nodeName &&
      this.element.nodeName != this.nodeName) {
    throw new Vex.Flow.Error('Cannot create "' + this.constructor.name
      + '" with a "' + this.element.nodeName + '" element.'); }
}
