console.log("hello?");

//document 'load' unreliable
window.addEventListener("load", (e) => {
  // waits for all resources to load before running any code

  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 800;
  let lastTime = 0;

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

  function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    console.log(deltaTime);
    //some code
    requestAnimationFrame(animate);
  }

  animate(0);
});
