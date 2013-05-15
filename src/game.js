define(['es', 'resources', 'systems/renderable', 'systems/collision', 'systems/player', 'systems/movement'], function() {

  es.states.gameplay = {
    entities: [],
    currentLevel: '',
    
    loadLevel: function(level) {
      this.entities = [];
      require([level], function(level) {
        var levelObj = new level().level;
        for(var e in levelObj) {
          e = levelObj[e];
          this.entities.push(e.valueOf());
        }
      }.bind(this));
    }
  };

  es.initCanvasGame('canvas', 512, 525, es.states.gameplay);
  es.states.gameplay.currentLevel = 'levels/level1';
  es.states.gameplay.loadLevel(es.states.gameplay.currentLevel);

});