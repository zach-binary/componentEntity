define(['es', 'resources', 'systems/renderable'], function() {

  es.states.gameplay = {
    entities: [],
    
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
  es.states.gameplay.loadLevel('levels/level1');

});