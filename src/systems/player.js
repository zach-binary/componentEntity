define(['es', 'factories'], function() {

  es.systems.playerHealth = {
    components: ['player', 'health'],

    update: function(e) {
      if (e.health <= 0) {
        es.currentState.loadLevel(es.currentState.currentLevel);
      }
    }
  };

  es.systems.playerMovement = {
    components: ['stun', 'playerControls', 'movement', 'position'],

    update: function(e) {

      if (e.stun.recoverTime > 0) {
        e.movement.x = 0;
        e.movement.y = 0;
        return;
      }

      var angle;

      if (es.input.mouse.left) {

        if (es.hit(es.input.mouse.x, es.input.mouse.y)) return;

        e.mouseMovement.targetPosition.x = es.input.mouse.x ;
        e.mouseMovement.targetPosition.y = es.input.mouse.y ;

        angle = Math.atan2(e.mouseMovement.targetPosition.y - e.position.y, e.mouseMovement.targetPosition.x - e.position.x);

        e.movement.x = Math.cos(angle) * e.movement.speed;
        e.movement.y = Math.sin(angle) * e.movement.speed;
      }
      if (es.input.mouse.right) {

        angle = Math.atan2(es.input.mouse.y - e.position.y, es.input.mouse.x - e.position.x);

        var arrow = new es.factories.arrow(e.position.x, e.position.y, angle);
        es.currentState.entities.push(arrow);
      }
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