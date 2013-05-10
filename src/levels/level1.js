var hero = new Engine.Entity('Hero');
hero.AddComponent(Engine.Components.Renderable);
hero.AddComponent(Engine.Components.Movement);
hero.AddComponent(Engine.Components.Collision);
hero.AddComponent(Engine.Components.EightWayMovement);
hero.x = 400;
hero.y = 100;
hero.dy = 0;
hero.dx = 0;
hero.speed = 1;
hero.bounds = new Engine.AABB(hero.x, hero.y, 32, 32);
var heroImg = new Image();
heroImg.src = 'img/hero.png';
hero.image = heroImg;
hero.onCollision = function(other) {
  if (other.tags.indexOf('Solid') != -1) {
    this.y -= this.dy;
    this.x -= this.dx;
  }
};

var level = new Engine.Entity('Level');
level.AddComponent(Engine.Components.Renderable);
level.x = 0;
level.y = 0;
var backgroundImg = new Image();
backgroundImg.src = 'img/Levels/green.png';
level.image = backgroundImg;

var leftWall = new Engine.Entity('leftWall');
leftWall.AddComponent(Engine.Components.Collision);
leftWall.tags.push('Solid');
leftWall.x = 4;
leftWall.y = 45;
leftWall.bounds = new Engine.AABB(0, 25, 25, 478);

var bottomWall = new Engine.Entity('bottomWall');
bottomWall.AddComponent(Engine.Components.Collision);
bottomWall.tags.push('Solid');
bottomWall.x = 31;
bottomWall.y = 492;
bottomWall.bounds = new Engine.AABB(0, 0, 450, 30);

var rightWall = new Engine.Entity('rightWall');
rightWall.AddComponent(Engine.Components.Collision);
rightWall.tags.push('Solid');
rightWall.x = 483;
rightWall.y = 45;
rightWall.bounds = new Engine.AABB(0, 25, 25, 478);

var topWall = new Engine.Entity('topWall');
topWall.AddComponent(Engine.Components.Collision);
topWall.tags.push('Solid');
topWall.x = 31;
topWall.y = 45;
topWall.bounds = new Engine.AABB(0, 0, 450, 30);

Engine.Game.AddEntity(hero);
Engine.Game.AddEntity(leftWall);
Engine.Game.AddEntity(rightWall);
Engine.Game.AddEntity(bottomWall);
Engine.Game.AddEntity(topWall);
Engine.Game.AddEntity(level);