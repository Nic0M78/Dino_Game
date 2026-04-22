// Dino Run Game - P5.js Implementation
// Based on PRD: Endless runner with dinosaur avoiding obstacles

let player;
let obstacles = [];
let environment;
let gameState = 'playing'; // 'playing' or 'gameOver'
let score = 0;
let speed = 3;
let speedIncreaseInterval = 15;
let maxSpeed = 6.5;

// Platform event variables
let platformEventActive = false;
let platformEventTimer = 0;
let platformEventDuration = 180; // 3 seconds at 60fps
let platformY = 300; // Raised platform height
let platformWidth = 200;
let platformX = 0;

// Assets
let skyImg, groundImg;
let dinoRun1, dinoRun2, dinoCrouch1, dinoCrouch2, dinoIdle;
let dinoWideEye;

function preload() {
  // Load images
  skyImg = loadImage('Sky.jpg');
  groundImg = loadImage('desert-ground.png');
  dinoRun1 = loadImage('dino/run-1.png');
  dinoRun2 = loadImage('dino/run-2.png');
  dinoCrouch1 = loadImage('dino/crouch-1.png');
  dinoCrouch2 = loadImage('dino/crouch-2.png');
  dinoIdle = loadImage('dino/idle.png');
  dinoWideEye = loadImage('dino/wide-eye.png');
}

function setup() {
  createCanvas(800, 400);
  player = new Player();
  environment = new Environment();
  // Initial obstacle
  obstacles.push(new Obstacle(random(['smallCactus', 'largeCactus', 'flyingDino'])));
}

function draw() {
  if (gameState === 'playing') {
    updateGame();
  }
  renderGame();

  if (gameState === 'gameOver') {
    displayGameOver();
  }
}

function updateGame() {
  // Update environment
  environment.update(speed);

  // Update player
  player.update();

  // Update obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update(speed);
    if (obstacles[i].x < -obstacles[i].width) {
      obstacles.splice(i, 1);
      score++;
      // Speed increase every 15 points
      if (score % speedIncreaseInterval === 0 && speed < maxSpeed) {
        speed += 0.5;
      }
    }
  }

  // Spawn new obstacles
  if (random() < 0.01 * speed) { // Spawn rate increases with speed
    let types = ['smallCactus', 'largeCactus'];
    if (random() < 0.3) types.push('flyingDino');
    obstacles.push(new Obstacle(random(types)));
  }

  // Platform event trigger
  if (!platformEventActive && score >= 20 && random() < 0.005) {
    startPlatformEvent();
  }

  // Update platform event
  if (platformEventActive) {
    updatePlatformEvent();
  }

  // Check collisions (skip ground obstacles when player is on platform)
  for (let obs of obstacles) {
    if (platformEventActive && player.collidesWithPlatform()) {
      if (obs.type !== 'flyingDino' && obs.y >= platformY) {
        continue; // player is on platform; ignore ground obstacles below platform
      }
    }
    if (player.collidesWith(obs)) {
      gameState = 'gameOver';
    }
  }
}

function renderGame() {
  // Background
  image(skyImg, 0, 0, width, height);

  // Environment
  environment.render();

  // Obstacles
  for (let obs of obstacles) {
    obs.render();
  }

  // Platform if active
  if (platformEventActive) {
    fill(139, 69, 19); // Brown
    rect(platformX, platformY, platformWidth, height - platformY);
  }

  // Player
  player.render();

  // UI
  fill(0);
  textSize(24);
  text(`Score: ${score}`, 10, 30);
  text(`Speed: ${speed.toFixed(1)}`, 10, 60);
}

function displayGameOver() {
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text('Game Over', width/2, height/2 - 50);
  textSize(24);
  text(`Final Score: ${score}`, width/2, height/2);
  text('Press R to Restart', width/2, height/2 + 50);
  textAlign(LEFT, BASELINE);
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    restartGame();
  }
  if (gameState === 'playing') {
    if (key === ' ' || keyCode === UP_ARROW || key === 'w' || key === 'W') {
      player.jump();
    }
    if (keyCode === DOWN_ARROW || key === 's' || key === 'S') {
      player.duck();
    }
    if (keyCode === LEFT_ARROW || key === 'a' || key === 'A') {
      speed = max(1, speed - 0.5);
    }
    if (keyCode === RIGHT_ARROW || key === 'd' || key === 'D') {
      speed = min(maxSpeed, speed + 0.5);
    }
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW || key === 's' || key === 'S') {
    player.stand();
  }
}

function restartGame() {
  gameState = 'playing';
  score = 0;
  speed = 3;
  obstacles = [];
  platformEventActive = false;
  platformEventTimer = 0;
  player.reset();
  obstacles.push(new Obstacle(random(['smallCactus', 'largeCactus', 'flyingDino'])));
}

function startPlatformEvent() {
  platformEventActive = true;
  platformEventTimer = 0;
  platformX = width + 100;
  // Increase ground obstacles
  for (let i = 0; i < 5; i++) {
    obstacles.push(new Obstacle('smallCactus', width + i * 100));
  }
}

function updatePlatformEvent() {
  platformX -= speed;
  platformEventTimer++;
  if (platformEventTimer > platformEventDuration) {
    platformEventActive = false;
  }
}

// Player Class
class Player {
  constructor() {
    this.x = 100;
    this.y = 300;
    this.width = 40;
    this.height = 40;
    this.velocityY = 0;
    this.gravity = 0.6;
    this.jumpForce = -12;
    this.isJumping = false;
    this.isDucking = false;
    this.animationFrame = 0;
    this.animationTimer = 0;
  }

  update() {
    // Gravity
    if (this.isJumping) {
      this.velocityY += this.gravity;
      this.y += this.velocityY;
      if (this.y >= 300) {
        this.y = 300;
        this.isJumping = false;
        this.velocityY = 0;
      }
    }
    this.updateAnimation();
  }

  updateAnimation() {
    // Advance frame timer
    this.animationTimer++;
    if (this.animationTimer > 10) {
      this.animationFrame = (this.animationFrame + 1) % 2;
      this.animationTimer = 0;
    }

    // Game over => wide-eye
    if (gameState === 'gameOver') {
      this.currentSprite = dinoWideEye;
      return;
    }

    // Jumping uses idle sprite
    if (this.isJumping) {
      this.currentSprite = dinoIdle;
      return;
    }

    // Ducking cycles crouch sprites
    if (this.isDucking) {
      this.currentSprite = this.animationFrame === 0 ? dinoCrouch1 : dinoCrouch2;
      return;
    }

    // Default: running animation cycles
    this.currentSprite = this.animationFrame === 0 ? dinoRun1 : dinoRun2;
  }

  render() {
    // Adjust height when ducking
    if (this.isDucking) this.height = 30; else this.height = 40;
    image(this.currentSprite, this.x, this.y, this.width, this.height);
  }

  jump() {
    if (!this.isJumping && !this.isDucking) {
      this.isJumping = true;
      this.velocityY = this.jumpForce;
    }
  }

  duck() {
    if (!this.isJumping) {
      this.isDucking = true;
      this.y = 310; // Lower position
    }
  }

  stand() {
    this.isDucking = false;
    this.y = 300;
  }

  collidesWith(obs) {
    return (this.x < obs.x + obs.width &&
            this.x + this.width > obs.x &&
            this.y < obs.y + obs.height &&
            this.y + this.height > obs.y);
  }

  collidesWithPlatform() {
    if (!platformEventActive) return false;
    return (this.x < platformX + platformWidth &&
            this.x + this.width > platformX &&
            this.y + this.height >= platformY &&
            this.velocityY >= 0); // Falling onto platform
  }

  reset() {
    this.y = 300;
    this.velocityY = 0;
    this.isJumping = false;
    this.isDucking = false;
  }
}

// Obstacle Class
class Obstacle {
  constructor(type, x = width) {
    this.type = type;
    this.x = x;
    this.width = 20;
    this.height = 40;

    // Ground obstacle bottom baseline (matches previous behavior where bottom y ~= 340)
    const bottomY = 340;

    switch (type) {
      case 'smallCactus':
        this.width = 20;
        this.height = floor(random(30, 50));
        this.y = bottomY - this.height;
        break;
      case 'largeCactus':
        this.width = 30;
        this.height = floor(random(50, 80));
        this.y = bottomY - this.height;
        break;
      case 'flyingDino':
        this.width = 40;
        this.height = 30;
        this.y = 250; // Airborne
        break;
    }
  }

  update(speed) {
    this.x -= speed;
  }

  render() {
    fill(0, 128, 0); // Green for cacti
    if (this.type === 'flyingDino') {
      fill(0); // Black for flying dino
    }
    rect(this.x, this.y, this.width, this.height);
    // TODO: Replace with actual sprites if available
  }
}

// Environment Class
class Environment {
  constructor() {
    this.groundOffset = 0;
  }

  update(speed) {
    this.groundOffset -= speed;
    if (this.groundOffset <= -width) {
      this.groundOffset = 0;
    }
  }

  render() {
    // Ground
    for (let x = this.groundOffset; x < width; x += groundImg.width) {
      image(groundImg, x, 320, groundImg.width, 80);
    }
  }
}