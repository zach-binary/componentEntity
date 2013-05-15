define(['es'], function() {

  es.systems.collision = {
    components: ['position', 'collision'],

    update: function(e) {
      var bounds = e.collision.bounds;
      bounds.x = e.position.x;
      bounds.y = e.position.y;
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

});