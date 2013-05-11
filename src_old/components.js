Engine.Components.Position = function(x, y) {
  this.x = x;
  this.y = y;

  // this.prototype.getTag = function() { return 'Position'; };
};

Engine.Components.Position.prototype.getTag = function() { return 'Position'; };

Engine.Components.Renderable = function(imageSrc) {
  var self = Engine.Components.Position.apply(this);
  this.image = imageSrc;
};

Engine.Components.Renderable.prototype.getTag = function() { return 'Renderable'; };

Engine.Components.Renderable.prototype.render = function(canvasContext) {
  canvasContext.drawImage(this.image, this.x, this.y);
};

Engine.Components.Movement = function(dx, dy) {
  var self = Engine.Components.Position.apply(this);
  this.dx = dx;
  this.dy = dy;
};

Engine.Components.Movement.prototype.getTag = function() { return 'Movement'; };

Engine.Components.Movement.prototype.update = function() {
  this.x += this.dx;
  this.y += this.dy;
};

Engine.Components.Collision = function(x, y, w, h) {
  var self = Engine.Components.Position.apply(this);
  this.bounds = new Engine.AABB(x, y, w, h);
  this.onCollision = null;
};

Engine.Components.Collision.prototype.getTag = function() { return 'Collision'; };

Engine.Components.Collision.prototype.update = function() {
  var otherBodies = Engine.Game.GetEntitiesWithTags(['Collision']);

  this.bounds.x = this.x;
  this.bounds.y = this.y;

  var i = otherBodies.length;
  while(i--) {
    if (otherBodies[i].name == this.name) continue; // quick way to ignore the same entity as this
    if (this.bounds.intersects(otherBodies[i].bounds)) {
      if (this.onCollision) this.onCollision(otherBodies[i]);
      if (otherBodies[i].onCollision) otherBodies[i].onCollision(this);
    }
  }
};

Engine.Components.Collision.prototype.render = function(canvasContext) {
  canvasContext.beginPath();
  canvasContext.rect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
  canvasContext.strokeStyle = '#ff3333';
  canvasContext.stroke();
};

Engine.Components.EightWayMovement = function(speed) {
  var self = Engine.Components.Movement.apply(this);
  this.speed = speed;

  this.upKey = false;
  this.downKey = false;
  this.leftKey = false;
  this.rightKey = false;

  var keyDownBind = function(key) {
    if (key === 'w') this.upKey = true;
    if (key === 'a') this.leftKey = true;
    if (key === 's') this.downKey = true;
    if (key === 'd') this.rightKey = true;
  };

  var keyUpBind = function(key) {
    if (key === 'w') this.upKey = false;
    if (key === 'a') this.leftKey = false;
    if (key === 's') this.downKey = false;
    if (key === 'd') this.rightKey = false;
  };

  radio('KeyPressed').subscribe([keyDownBind, this]);
  radio('KeyReleased').subscribe([keyUpBind, this]);
};

Engine.Components.EightWayMovement.prototype.update = function() {
  var dx = 0, dy = 0;
  if (this.upKey) dy -= this.speed;
  if (this.downKey) dy += this.speed;
  if (this.leftKey) dx -= this.speed;
  if (this.rightKey) dx += this.speed;

  this.dx = dx;
  this.dy = dy;
};

Engine.Components.EightWayMovement.prototype.getTag = function() {
  return 'EightWayMovement';
};


