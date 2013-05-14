define(['es', 'resources', 'systems/renderable'], function() {

  es.states.gameplay = {
    entities: [],
    currentLevel: '',
    
    loadLevel: function(level) {
      this.entities = [];
      require([level], function(level) {
        for(var e in level) {
          e = level[e];
          this.entities.push(e);
        }
      }.bind(this));
    }
  };

  es.initCanvasGame('#canvas', 512, 525, es.states.gameplay);
  es.states.gameplay.currentLevel = 'levels/level1';
  es.states.gameplay.loadLevel(es.states.gameplay.currentLevel);

});