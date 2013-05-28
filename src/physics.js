(function() {

  es.physics = {

    staticBodies: [],
    dynamicBodies: [],

    addBody: function(body) {
      if (body.type === 'dynamic') 
        this.dynamicBodies.push(body);
      else if (body.type === 'static') 
        this.staticBodies.push(body);
    },

    removeBody: function(body) {
      var index = this.dynamicBodies.indexOf(body);
      if (index != -1) {
        this.dynamicBodies.splice(index, 1);
        return;
      }

      index = this.staticBodies.indexOf(body);
      if (index != -1) {
        this.staticBodies.splice(index, 1);
        return;
      }
    },

    update: function() {

      var allBodies = this.staticBodies.concat(this.dynamicBodies);

      for (var i in allBodies) {
        var b1 = allBodies[i];

        for (var j in this.dynamicBodies) {
          var b2 = this.dynamicBodies[j];

          if (b1 === b2) continue;

          if (b2.bounds.intersects(b1.bounds)) {
            this.triggerEvents(b2, b1);
          }
        }
      }

    },

    triggerEvents: function(b1, b2) {
      var e1 = es.currentState.entities[b1._id];
      var e2 = es.currentState.entities[b2._id];

      var trigger;
      for(trigger in b1.triggers) {
        
        if (b2.traits && b2.traits.indexOf(trigger) != -1) {
          es.publish(b1.triggers[trigger], e1, b2);
        }
        if (e2.hasOwnProperty(trigger)) {
          var data = {};
          data[trigger] = e2[trigger];
          data.body = b2;
          es.publish(b1.triggers[trigger], e1, data);
        }
      }
    }
  };

}());