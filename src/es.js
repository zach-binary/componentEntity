(function() {

  es = {
    canvas: null,
    canvasContext: null,
    currentState: null,
    images: {},
    systems: {},
    states: {},

    initCanvasGame: function(id, w, h, game) {
      var canvas = document.createElement('canvas');
      canvas.setAttribute('id', id);

      var canvasContext = canvas.getContext('2d');
      canvas.width = w;
      canvas.height = h;

      document.body.appendChild(canvas);

      this.canvas = canvas;
      this.canvasContext = canvasContext; 
      this.currentState = game;

      window.addEventListener('keydown', function(e) {
        this.input.keysDown[e.keyCode] = true;
      }.bind(this));

      window.addEventListener('keyup', function(e) {
        delete this.input.keysDown[e.keyCode];
      }.bind(this));

      setInterval(this.loop.bind(this), 60 / 1000);
    },

    loadImage: function(url, name) {
      this.images[name] = new Image();
      this.images[name].src = url;
    },

    loop: function() {
      if (!this.currentState) return;

      var entities = this.currentState.entities;

      for(var key in this.systems) {
        var system = this.systems[key];

        var systemEntities = this.getEntitiesWith(system.components);

        systemEntities
          .forEach(system.update);
      }
    },

    getEntitiesWith: function(components) {
      return this.currentState.entities.filter(function(e) {
        var i = components.length;
        while(i--) {
          if (!e.hasOwnProperty(components[i])) return false;
        }
        return true;
      });
    },

    input: {
      keysDown: {},

      isDown: function(key) {
        if (typeof key === 'string') key = key.charCodeAt(0);

        return this.keysDown.hasOwnProperty(key);
      }
    },

    AABB: function (x, y, w, h) {
      this.x = x || 0;
      this.y = y || 0;
      this.w = w || 0;
      this.h = h || 0;

      this.getCenter = function() {
        return {
          x: this.x + this.w / 2,
          y: this.y + this.h / 2
        };
      };

      this.intersects = function(box) {
        var c0 = this.getCenter();
        var c1 = box.getCenter();

        if (Math.abs(c0.x - c1.x) > (this.w / 2 + box.w / 2)) return false;
        if (Math.abs(c0.y - c1.y) > (this.h / 2 + box.h / 2)) return false;

        return true;
      };
    }

  };
})();