(function() {

  es = {
    canvas: null,
    canvasContext: null,
    currentState: null,
    images: {},
    sprites: {},
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

    loadSprite: function(url, name, w, h) {
      this.sprites[name] = new es.Sprite(url, w, h);
    },

    newAnimation: function(sprite, frames) {
      var animation = [];
      var i = frames.length;
      while(i--) animation.push(sprite.frames[frames[i]]);
      return animation;
    },

    loop: function() {
      es.canvasContext.clearRect(0, 0, es.canvas.width, es.canvas.height);

      if (!this.currentState) return;

      var now = Date.now();
      var delta = now - es.lastTime;
      es.deltaTime = delta;

      var entities = this.currentState.entities;

      for(var key in this.systems) {
        var system = this.systems[key];

        var systemEntities = this.getEntitiesWith(system.components);

        systemEntities
          .forEach(system.update);
      }

      es.lastTime = now;
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

    Sprite: function(url, w, h) {
      this.image = new Image();
      this.image.src = url;
      this.w = w;
      this.h = h;

      this.frames = [];

      this.image.onload = function() {
        for(var x = 0; x < this.image.width; x += this.w) {
          for (var y = 0; y < this.image.height; y += this.h) {
            this.frames.push({
              x: x,
              y: y,
              w: w,
              h: h
            });
          }
        }
      }.bind(this);
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

      this.minimumTranslationVector = function(box) {
        var left = box.x - (this.x + this.w);
        var right = (box.x + box.w) - this.x;
        var top = box.y - (this.y + this.h);
        var bottom = (box.y + box.h) - this.y;

        var mtd = {
          x: 0,
          y: 0
        };

        if (left > 0 || right < 0) return mtd;
        if (top > 0 || bottom < 0) return mtd;

        if (Math.abs(left) < right) 
          mtd.x = left;
        else 
          mtd.x = right;

        if (Math.abs(top) < bottom) 
          mtd.y = top;
        else
          mtd.y = bottom;

        if (Math.abs(mtd.x) < Math.abs(mtd.y))
          mtd.y = 0;
        else
          mtd.x = 0;

        return mtd;
      };
    }

  };
})();