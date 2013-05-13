define(['es'], function() {

  es.systems.renderable = {
    components: ['renderable', 'position'],

    update: function(e) {
      es.canvasContext.drawImage(e.renderable.image, e.position.x, e.position.y);
    }
  };

  es.systems.collision = {
    components: ['position', 'collision'],

    update: function(e) {
      var bounds = e.collision.bounds;
      bounds.x = e.position.x;
      bounds.y = e.position.y;
    }
  };

  es.systems.debugCollision = {
    components: ['collision'],

    update: function(e) {
      var bounds = e.collision.bounds;
      es.canvasContext.beginPath();
      es.canvasContext.rect(bounds.x, bounds.y, bounds.w, bounds.h);
      es.canvasContext.stroke();
    }
  };

   es.systems.solidCollision = {
    components: ['collision', 'movement'],

    update: function(e) {
      var solids = es.getEntitiesWith(['solid', 'collision']);

      var i = solids.length;
      while(i--) {
        if (e.collision.bounds.intersects(solids[i].collision.bounds)) {
          e.position.x = e.movement.lastPosition.x.valueOf();
          e.position.y = e.movement.lastPosition.y.valueOf();
        }
      }
    }
  };

  es.systems.movement = {
    components: ['position', 'movement'],

    update: function(e) {
      e.movement.lastPosition.x = e.position.x.valueOf();
      e.movement.lastPosition.y = e.position.y.valueOf();
      e.position.x += e.movement.x;
      e.position.y += e.movement.y;
    }
  };

  es.systems.playerMovement = {
    components: ['player', 'movement'],

    update: function(e) {
      var dx = 0, dy = 0;
      if (es.input.isDown(e.player.up)) dy -= e.movement.speed;
      if (es.input.isDown(e.player.down)) dy += e.movement.speed;
      if (es.input.isDown(e.player.left)) dx -= e.movement.speed;
      if (es.input.isDown(e.player.right)) dx += e.movement.speed;

      e.movement.x = dx;
      e.movement.y = dy;
    }
  };

});