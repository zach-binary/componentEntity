Engine.Game = (function() {

  var entities = [];

  var Update = function() {
    var i = entities.length;
    while(i--) {
      entities[i].Update();
    }
  };

  var Render = function() {
    Engine.canvasContext.clearRect(0, 0, Engine.canvas.width, Engine.canvas.height);

    var i = entities.length;
    while(i--) {
      entities[i].Render(Engine.canvasContext);
    }
  };

  var AddEntity = function(e) {
    entities.push(e);
  };

  var GetEntitiesWithTags = function(tags) {
    return entities.filter(function(e) {
      var i = tags.length;
      while(i--) {
        if (e.tags.indexOf(tags[i]) != -1) return true;
      }
      return false;
    });
  };

  var LoadLevel = function(level) {
    entities = [];
    require(level);
  };

  return {
    Update: Update,
    Render: Render,
    AddEntity: AddEntity,
    GetEntitiesWithTags: GetEntitiesWithTags,
    LoadLevel: LoadLevel
  };

})();

