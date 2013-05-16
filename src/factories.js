define(['es'], function() {

  es.factories.arrow = function(x, y, angle) {
    this.name = 'bullet';
    this.arrow = {
      damage: 2
    };
    this.position = {
      x: x,
      y: y
    };
    this.movement = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    };
    this.renderable = {
      image: es.images.arrow,
      alpha: 1,
      rotation: angle + Math.PI / 2,
      origin: {
        x: 4,
        y: 4
      }
    };
    this.collision = {
      bounds: new es.AABB(0, 0, 4, 4)
    };
  };

});