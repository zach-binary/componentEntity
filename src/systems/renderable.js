define(['es'], function() {

  es.systems.renderable = {
    components: ['renderable', 'position'],

    update: function(e) {
      if (e.renderable.alpha) {
        es.canvasContext.globalAlpha = e.renderable.alpha;
      }
      else {
        es.canvasContext.globalAlpha = 1.0;
      }
      es.canvasContext.drawImage(e.renderable.image, e.position.x, e.position.y);
    }
  };

  es.systems.animate = {
    components: ['animate'],

    update: function(e) {
      if (e.animate.animation === null) return;

      e.animate.elapsed += es.deltaTime;

      if (e.animate.index > e.animate.animation.length - 1) {
        e.animate.index = 0;
      }
      if (e.animate.elapsed > e.animate.interval) {
        e.animate.frame = e.animate.animation[e.animate.index++];
      }
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
      // var bounds = e.collision.bounds;
      // es.canvasContext.beginPath();
      // es.canvasContext.rect(bounds.x, bounds.y, bounds.w, bounds.h);
      // es.canvasContext.stroke();
    }
  };

   es.systems.solidCollision = {
    components: ['collision', 'movement'],

    update: function(e) {
      var solids = es.getEntitiesWith(['solid', 'collision']);

      var i = solids.length;
      while(i--) {
        if (e.collision.bounds.intersects(solids[i].collision.bounds)) {
          var mtd = e.collision.bounds.minimumTranslationVector(solids[i].collision.bounds);
          e.position.x += mtd.x;
          e.position.y += mtd.y;
        }
      }
    }
  };

  es.systems.damagePlayer = {
    components: ['player', 'stun', 'health', 'collision', 'position'],

    update: function(e) {
      var hurtsPlayer = es.getEntitiesWith(['collision', 'damagePlayer']);

      var i = hurtsPlayer.length;
      while(i--) {
        if (e.collision.bounds.intersects(hurtsPlayer[i].collision.bounds)) {
          var mtd = e.collision.bounds.minimumTranslationVector(hurtsPlayer[i].collision.bounds);
          var bounceBack = hurtsPlayer[i].damagePlayer.bounceBack;

          if (mtd.x === 0 && mtd.y === 0) continue;

          if (mtd.x < 0) e.position.x += mtd.x - bounceBack;
          else if (mtd.x > 0) e.position.x += mtd.x + bounceBack;
          else if (mtd.y < 0) e.position.y += mtd.y - bounceBack;
          else if (mtd.y > 0) e.position.y += mtd.y + bounceBack;

          e.stun.recoverTime = hurtsPlayer[i].damagePlayer.stun;
          e.blink.amount = 12;
          e.health -= hurtsPlayer[i].damagePlayer.damage;
        }
      }
    }
  };

  es.systems.playerMovement = {
    components: ['stun', 'playerControls', 'movement'],

    update: function(e) {
      var dx = 0, dy = 0;

      if (e.stun.recoverTime > 0) {
        e.movement.x = 0;
        e.movement.y = 0;
        return;
      }

      if (es.input.isDown(e.playerControls.up)) dy -= e.movement.speed;
      if (es.input.isDown(e.playerControls.down)) dy += e.movement.speed;
      if (es.input.isDown(e.playerControls.left)) dx -= e.movement.speed;
      if (es.input.isDown(e.playerControls.right)) dx += e.movement.speed;

      e.movement.x = dx;
      e.movement.y = dy;
    }
  };

  es.systems.stun = {
    components: ['stun'],

    update: function(e) {
      if (e.stun.recoverTime === 0) return;

      if (e.stun.delay < e.stun.recoverTime) 
        e.stun.delay += es.deltaTime;
      else {
        e.stun.delay = 0;
        e.stun.recoverTime = 0;
      }
    }
  };

  es.systems.blink = {
    components: ['renderable', 'blink'],

    update: function(e) {
      if (e.blink.amount <= 0 || e.blink.intervalID) return;

      var blink = function () {
        if (e.renderable.alpha === 0.4) e.renderable.alpha = 0.7;
        else e.renderable.alpha = 0.4;
        if (e.blink.amount > 0) {
          e.blink.amount--;
        }
        else {
          e.renderable.alpha = 1.0;
          clearInterval(e.blink.intervalID);
          delete e.blink.intervalID;
        }
      };

      e.blink.intervalID = setInterval(blink, e.blink.interval);

    }
  };

  es.systems.playerHealth = {
    components: ['player', 'health'],

    update: function(e) {
      if (e.health < 0) {
        // var index = es.currentState.entities.indexOf(e);
        // es.currentState.entities.splice(index, 1);
        es.currentState.loadLevel(es.currentState.currentLevel);
      }
    }
  };

  es.systems.movement = {
    components: ['position', 'movement'],

    update: function(e) {
      e.position.x += e.movement.x;
      e.position.y += e.movement.y;
    }
  };

  

});