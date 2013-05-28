define(['es', 'resources', 'systems/renderable', 'systems/collision', 'systems/player', 'systems/movement', 'systems/projectiles', 'topics'], function() {

  es.states.gameplay = {
    entities: {},
    currentLevel: '',
    
    loadLevel: function(level) {
      delete this.entities;
      this.entities = {};
      var entitiesLocation = level + "/entities";
      var bodiesLocation = level + "/bodies";

      require([entitiesLocation, bodiesLocation], function(entities, bodies) {
        var entitiesObj = new entities().entities;
        for(var key in entitiesObj) {
          this.entities[key] = entitiesObj[key];
          this.entities[key]._id = es.next_id; // being lazy
          es.next_id++;
        }
        var bodiesObj = new bodies().bodies;
        bodiesObj.forEach(this.addBody.bind(this));
      }.bind(this));
    },

    addBody: function(body) {
      this.entities[body._id].collision = body;
      es.physics.addBody(body);
    }
  };

  es.initCanvasGame('canvas', 512, 525, es.states.gameplay);
  es.states.gameplay.currentLevel = 'levels/level1';
  es.states.gameplay.loadLevel(es.states.gameplay.currentLevel);

});