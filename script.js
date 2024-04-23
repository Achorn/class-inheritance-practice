//document 'load' unreliable
window.addEventListener("load", (e) => {
  // waits for all resources to load before running any code

  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 800;

  // wrapper containing and controlling all movement and animation logic
  class Game {
    constructor(ctx, width, height) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.enemies = [];
      this.enemyInterval = 1000;
      this.enemyTimer = 0;
      this.#addNewEnemy();
      console.log(this.enemies);
    }
    update(deltaTime) {
      if (this.enemyTimer > this.enemyInterval) {
        this.enemies = this.enemies.filter(
          (object) => !object.markedForDeletion
        );

        this.#addNewEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }

      this.enemies.forEach((enemy) => enemy.update());
    }
    draw() {
      this.enemies.forEach((enemy) => enemy.draw(this.ctx));
    }

    //# means private
    #addNewEnemy() {
      this.enemies.push(new Enemy(this));
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.x = this.game.width;
      this.y = Math.random() * this.game.height;
      this.width = 100;
      this.height = 100;
      this.markedForDeletion = false;
    }
    update() {
      this.x--;
      if (this.x < 0 - this.width) this.markedForDeletion = true;
    }
    draw(ctx) {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  const game = new Game(ctx, canvas.width, canvas.height);
  let lastTime = 1;
  function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    //some code
    game.update(deltaTime);
    game.draw();
    requestAnimationFrame(animate);
  }
  animate(0);
});
