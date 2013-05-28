define(['es'], function() {

  es.systems.bulletLife = {
    components: ['bulletLife'],

    update: function(e) {

      e.bulletLife.elapsed += es.deltaTime;

      if (e.bulletLife.elapsed > e.bulletLife.lifeTime) {
        es.kill(e);
      }
    }
  };

  es.systems.enemyHealth = {
    components: ['enemyHealth'],

    update: function(e) {
      if (e.enemyHealth <= 0) {
        es.kill(e);
      }
    }
  };

});