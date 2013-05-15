define(['es'], function() {

  es.systems.playerHealth = {
    components: ['player', 'health'],

    update: function(e) {
      if (e.health <= 0) {
        es.currentState.loadLevel(es.currentState.currentLevel);
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

  es.systems.playerAnimations = {
    components: ['movement', 'animate', 'playerAnimations'],

    update: function(e) {
      if (e.movement.x > 0) e.animate.animation = e.playerAnimations.right;
      else if (e.movement.x < 0) e.animate.animation = e.playerAnimations.left;
      else if (e.movement.y > 0) e.animate.animation = e.playerAnimations.down;
      else if (e.movement.y < 0) e.animate.animation = e.playerAnimations.up;
      else e.animate.animation = e.playerAnimations.idle;
    }
  };

});