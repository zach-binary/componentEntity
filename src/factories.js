define(['es'], function() {

  es.factories.arrow = function(x, y, angle) {
    var arrowEntity = {
      name: 'bullet',
      arrow: {
        damage: 2
      },
      position: {
        x: x,
        y: y
      },
      movement: {
        x: Math.cos(angle),
        y: Math.sin(angle)
      },
      renderable: {
        image: es.images.arrow,
        alpha: 1,
        rotation: angle + Math.PI / 2,
        origin: {
          x: 4,
          y: 4
        }
      }
    };

    var arrowBody = {
      _id: es.next_id,
      bounds: new es.AABB(0, 0, 4, 4),
      type: 'dynamic',
      triggers: {
        solid: 'Stick',
        enemyHealth: 'Stick'
      },
      traits: []
    };

    arrowEntity.collision = arrowBody;
    arrowEntity._id = es.next_id;
    es.currentState.entities[es.next_id] = arrowEntity;    
    es.physics.addBody(arrowBody);
    es.next_id++;
  };

});