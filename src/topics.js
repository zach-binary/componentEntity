define(['es'], function() {

  es.endpoints.HitWall = {

    handlers: [
      {
        components: ['position', 'collision'],

        handle: function(e, data) {
          var mtd = e.collision.bounds.minimumTranslationVector(data.bounds);
          e.position.x += mtd.x;
          e.position.y += mtd.y;
        }
      }
    ]
  };

  es.endpoints.TakeDamage = {

    handlers: [
      {
        components: ['player', 'stun', 'health', 'collision', 'position'],

        handle: function(e, data) {
          var hurtsPlayer = es.currentState.entities[data._id];
          if (!hurtsPlayer || !es.entityHasComponents(hurtsPlayer, ['damagePlayer'])) return;

          var mtd = e.collision.bounds.minimumTranslationVector(data.bounds);
          var bounceBack = hurtsPlayer.damagePlayer.bounceBack;

          if (mtd.x === 0 && mtd.y === 0) return;

          if (mtd.x < 0) e.position.x += mtd.x - bounceBack;
          else if (mtd.x > 0) e.position.x += mtd.x + bounceBack;
          else if (mtd.y < 0) e.position.y += mtd.y - bounceBack;
          else if (mtd.y > 0) e.position.y += mtd.y + bounceBack;

          e.stun.recoverTime = hurtsPlayer.damagePlayer.stun;
          e.blink.amount = 12;
          e.health -= hurtsPlayer.damagePlayer.damage;
        }
      }
    ]
  };

  es.endpoints.Stick = {

    handlers: [
      {
        components: ['collision', 'arrow', 'movement'],

        handle: function(e, data) {
          delete e.collision.triggers;
          e.bulletLife = {
            elapsed: 0,
            lifeTime: 500
          };
          e.movement.x = 0;
          e.movement.y = 0;
        }
      }
    ]
  };

  es.endpoints.ArrowHitEnemy = {

    handlers: [
      {
        components: ['enemyHealth'],

        handle: function(e, data) {
          e.enemyHealth -= data.arrow.damage;
          data.arrow.damage = 0;
        }
      }
    ]
  };

});