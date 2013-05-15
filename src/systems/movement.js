define(['es'], function() {

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

  es.systems.movement = {
    components: ['position', 'movement'],

    update: function(e) {
      e.position.x += e.movement.x;
      e.position.y += e.movement.y;
    }
  };

  es.systems.mouseMovement = {
    components: ['mouseMovement', 'movement', 'position'],

    update: function(e) {

      var targetReached = Math.abs(Math.round(e.position.x) - e.mouseMovement.targetPosition.x) < 5 ||
                          Math.abs(Math.round(e.position.y) - e.mouseMovement.targetPosition.y) < 5;

      if(targetReached) {
        e.movement.x = 0;
        e.movement.y = 0;
        e.mouseMovement.targetPosition = {
          x: 0,
          y: 0
        };
      }
    }
  };

});