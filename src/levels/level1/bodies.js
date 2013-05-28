define(function() {

  function Bodies() {
    this.bodies = [
      {
        _id: 1,
        bounds: new es.AABB(100, 100, 30, 40),
        type: 'dynamic',
        triggers: {
          solid: 'HitWall',
          dealsDamage: 'TakeDamage'
        }
      },

      {
        _id: 2,
        bounds: new es.AABB(4, 45, 25, 478),
        type: 'static',
        traits: ['solid']
      },

      {
        _id: 3,
        bounds: new es.AABB(31, 492, 450, 30),
        type: 'static',
        traits: ['solid']
      },

      {
        _id: 4,
        bounds: new es.AABB(483, 45, 25, 478),
        type: 'static',
        traits: ['solid']
      },

      {
        _id: 5,
        bounds: new es.AABB(31, 45, 450, 30),
        type: 'static',
        traits: ['solid']
      },

      {
        _id: 6,
        bounds: new es.AABB(200, 200, 25, 25),
        type: 'dynamic',
        triggers: {
          solid: 'HitWall',
          arrow: 'ArrowHitEnemy'
        }
      }
    ];
  }

  return Bodies;
});