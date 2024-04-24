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
      this.enemyInterval = 100;
      this.enemyTimer = 0;
      this.enemyTypes = ["worm", "ghost"];
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

      this.enemies.forEach((enemy) => enemy.update(deltaTime));
    }
    draw() {
      this.enemies.forEach((enemy) => enemy.draw(this.ctx));
    }

    //# means private
    #addNewEnemy() {
      const randomEnemy =
        this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
      if (randomEnemy == "worm") this.enemies.push(new Worm(this));
      if (randomEnemy == "ghost") this.enemies.push(new Ghost(this));
      this.enemies.push(new Worm(this));

      //keeps objects behind other objects that are lower on screen
      this.enemies.sort((a, b) => a.y - b.y);
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.markedForDeletion = false;
    }
    update(deltaTime) {
      this.x -= this.vx * deltaTime;
      if (this.x < 0 - this.width) this.markedForDeletion = true;
    }
    draw(ctx) {
      ctx.drawImage(
        this.image,
        0,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  class Worm extends Enemy {
    constructor(game) {
      // using enemy parent class and injecting game variable in enemies constructor
      super(game);
      this.spriteWidth = 229;
      this.spriteHeight = 171;
      this.width = this.spriteWidth * 0.5;
      this.height = this.spriteHeight * 0.52;
      this.x = this.game.width;
      this.y = Math.random() * this.game.height;
      //any element in DOM with id can be access just by calling its id
      this.image = worm;
      this.vx = Math.random() * 0.1 + 0.1;
    }
  }

  class Ghost extends Enemy {
    constructor(game) {
      // using enemy parent class and injecting game variable in enemies constructor
      super(game);
      this.spriteWidth = 261;
      this.spriteHeight = 209;
      this.width = this.spriteWidth * 0.5;
      this.height = this.spriteHeight * 0.52;
      this.x = this.game.width;
      this.y = Math.random() * this.game.height;
      //any element in DOM with id can be access just by calling its id
      this.image = ghost;
      this.vx = Math.random() * 0.2 + 0.1;
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
