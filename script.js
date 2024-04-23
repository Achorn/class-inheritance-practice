document.addEventListener("load", () => {
  // waits for all resources to load before running any code

  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;

  canvas.height = 800;

  // wrapper containing and controlling all movement and animation logic
  class Game {
    constructor() {
      this.enemies = [];
    }
    update() {}
    draw() {}

    //# means private
    #addNewEnemy() {}
  }

  class Enemy {
    constructor() {}
    update() {}
    draw() {}
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //some code
    requestAnimationFrame(animate);
  }
});
