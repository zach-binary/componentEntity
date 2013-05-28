define(['es'], function() {

  es.systems.collisionPosition = {
    components: ['position', 'collision'],

    update: function(e) {
      var bounds = e.collision.bounds;
      bounds.x = e.position.x;
      bounds.y = e.position.y;
    }
  };
  
  es.systems.collisionOffset = {
    components: ['collision', 'renderable'],

    update: function(e) {
      if (!e.renderable.origin) return;

      var bounds = e.collision.bounds;
      bounds.x -= e.renderable.origin.x;
      bounds.y -= e.renderable.origin.y;
    }
  };

});