define({

  0: {
    name: 'background',
    renderable: {
      image: es.images.level1bg
    },
    position: {
      x: 0,
      y: 0
    }
  },

  1: {
    name: 'hero',
    renderable: {
      image: es.images.heroImg
    },
    position: {
      x: 100,
      y: 100
    },
    movement: {
      x: 0,
      y: 0,
      speed: 1,
      lastPosition: {
        x: 0,
        y: 0
      }
    },
    collision: {
      bounds: new es.AABB(100, 100, 32, 32)
    },
    player: {
      up: 'W',
      left: 'A',
      down: 'S',
      right: 'D'
    }
  },

  2: {
    name: 'leftWall',
    solid: true,
    collision: {
      bounds: new es.AABB(4, 45, 25, 478)
    }
  },

  3: {
    name: 'bottomWall',
    solid: true,
    collision: {
      bounds: new es.AABB(31, 492, 450, 30)
    }
  },

  4: {
    name: 'rightWall',
    solid: true,
    collision: {
      bounds: new es.AABB(483, 45, 25, 478)
    }
  },

  5: {
    name: 'topWall',
    solid: true,
    collision: {
      bounds: new es.AABB(31, 45, 450, 30)
    }
  }

});