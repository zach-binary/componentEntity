define(['es'], function() {

  es.systems.animate = {
    components: ['animate', 'renderable'],

    update: function(e) {
      if (e.animate.animation === null) return;

      e.animate.elapsed += es.deltaTime;

      if (e.animate.elapsed > e.animate.interval) {
        e.animate.index = e.animate.index >= e.animate.animation.length - 1 ? 0 : e.animate.index + 1;
        e.renderable.source = e.animate.animation[e.animate.index];
        e.animate.elapsed = 0;
      }
    }
  };

  es.systems.renderable = {
    components: ['renderable', 'position'],

    update: function(e) {
      es.canvasContext.globalAlpha = e.renderable.alpha;

      if (e.renderable.source) { 
        var source = e.renderable.source;
        es.canvasContext.drawImage(e.renderable.image, source.x, source.y, source.w, source.h, e.position.x, e.position.y, source.w, source.h);
      }
      else {
        es.canvasContext.drawImage(e.renderable.image, e.position.x, e.position.y);
      }
    }
  };

  es.systems.debugCollision = {
    components: ['collision'],

    update: function(e) {
      if (es.debug.showBoxes) {
        var bounds = e.collision.bounds;
        es.canvasContext.beginPath();
        es.canvasContext.rect(bounds.x, bounds.y, bounds.w, bounds.h);
        es.canvasContext.strokeStyle = '#bb1111';
        es.canvasContext.stroke();
      }
    }
  };

  es.systems.displayHealth = {
    components: ['player', 'health'],

    update: function(e) {
      es.canvasContext.font="20px Verdana";
      es.canvasContext.fillStyle = '#ffffff';
      es.canvasContext.fillText('Health: ' + e.health, 10, 30);
    }
  };

});