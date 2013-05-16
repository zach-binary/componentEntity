define(['es'], function() {

  es.systems.bulletLife = {
    components: ['bulletLife'],

    update: function(e) {

      e.bulletLife.elapsed += es.deltaTime;

      if (e.bulletLife.elapsed > e.bulletLife.lifeTime) {
        var index = es.currentState.entities.indexOf(e);
        es.currentState.entities.splice(index, 1);
      }
    }
  };

  es.systems.arrowCollision = {
    components: ['collision', 'arrow'],

    update: function(e) {
      if (e.bulletLife) return;
      var solids = es.getEntitiesWith(['solid', 'collision']);

      var i = solids.length;
      while(i--) {
        if (solids[i].collision.bounds.intersects(e.collision.bounds)) {
          e.bulletLife = {
            elapsed: 0,
            lifeTime: 500
          };
          e.movement.x = 0;
          e.movement.y = 0;
        }
      }
    }
  };

  es.systems.arrowHitEnemy = {
    components: ['collision', 'arrow'],

    update: function(e) {
      if (e.bulletLife) return;
      var solids = es.getEntitiesWith(['enemyHealth', 'collision']);

      var i = solids.length;
      while(i--) {
        if (solids[i].collision.bounds.intersects(e.collision.bounds)) {
          e.bulletLife = {
            elapsed: 0,
            lifeTime: 500
          };
          e.movement.x = 0;
          e.movement.y = 0;
          solids[i].enemyHealth -= e.arrow.damage;
        }
      }
    }
  };

  es.systems.enemyHealth = {
    components: ['enemyHealth'],

    update: function(e) {
      if (e.enemyHealth <= 0) {
        var index = es.currentState.entities.indexOf(e);
        es.currentState.entities.splice(index, 1);
      }
    }
  };

});