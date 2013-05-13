Engine = {
  deltaTime: 0,
  lastTime: 0,
  frameRate: 60,

  currentState: null,
  Components: {}
};

Engine.Loop = function() {
  if (!Engine.currentState) return;

  var now = Date.now();
  var delta = now - Engine.lastTime;
  Engine.deltaTime = delta;
  Engine.currentState.Update();
  Engine.currentState.Render();
  Engine.lastTime = now;
};

Engine.Start = function() {
  var canvas = document.createElement('canvas');
  Engine.canvasContext = canvas.getContext('2d');
  canvas.width = 512;
  canvas.height = 525;
  document.body.appendChild(canvas);
  Engine.canvas = canvas;
  Engine.currentState = Engine.Game;
  Engine.Game.LoadLevel(['levels/level1']);
  Engine.intervalID = setInterval(Engine.Loop, this.frameRate / 1000);
};

Engine.Entity = function(name) {
  this.name = name;
  this.renderMethods = [];
  this.updateMethods = [];
  this.tags = [];
};

Engine.Entity.prototype.Render = function(canvasContext) {
  var i = this.renderMethods.length;
  while(i--) this.renderMethods[i].call(this, canvasContext);
};

Engine.Entity.prototype.Update = function() {
  var i = this.updateMethods.length;
  while(i--) this.updateMethods[i].call(this);
};

Engine.Entity.prototype.AddComponent = function(component) {
  component.apply(this);

  if ('render' in component.prototype) {
    this.renderMethods.push(component.prototype.render);
  }
  if ('update' in component.prototype) {
    this.updateMethods.push(component.prototype.update);
  }

  this.tags.push(component.prototype.getTag());
};

Engine.AABB = function(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
};

Engine.AABB.prototype.getCenter = function() {
  return {
    x: this.x + this.w / 2,
    y: this.y + this.h / 2
  };
};

Engine.AABB.prototype.intersects = function(box) {
  var c0 = this.getCenter();
  var c1 = box.getCenter();

  if (Math.abs(c0.x - c1.x) > (this.w / 2 + box.w / 2)) return false;
  if (Math.abs(c0.y - c1.y) > (this.h / 2 + box.h / 2)) return false;

  return true;
};

var requires = ['input', 'game', 'components'];
require(requires, Engine.Start);

