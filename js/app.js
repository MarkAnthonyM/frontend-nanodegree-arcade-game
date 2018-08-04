// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 171;
    this.randomSeed = Enemy.prototype.generateRandomNumber(200, 500);
};

//Provides a random number and returns it in a variable. Use is for
//randomizing the speed of enemies as they move across screen
Enemy.prototype.generateRandomNumber = function(min, max) {
  return Math.random() * (max - min) + min;
};

//Resets the location of instance this function is called on
Enemy.prototype.initLocation = function(x = 0) {
  this.x = x;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
      this.x = -101;
      this.randomSeed = Enemy.prototype.generateRandomNumber(200, 500);
      this.x += this.randomSeed * dt;
    } else {
      this.x += this.randomSeed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 171;
  }

  handleInput(input) {
    if (input === 'up') {
      if (this.y === (-17)) {
        console.log(`At top boundry, not moving`);
      } else {
        this.y -= 80;
      }
    } else if (input === 'down') {
      if (this.y === 383) {
        console.log(`At bottom boundry, not moving`);
      } else {
        this.y += 80;
      }
    } else if (input === 'right') {
      if (this.x === 404) {
        console.log(`At right boundry, not moving`);
      } else {
        this.x += 101;
      }
    } else if (input === 'left') {
      if (this.x === 0) {
        console.log(`At left boundry, not moving`);
      } else {
        this.x -= 101;
      }
    }
  }

//Resets player location to beginning position when function called
  initLocation() {
    this.x = 202;
    this.y = 303;
  }

  update(dt) {
    if (this.y === (-17)) {
      this.initLocation();
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const allEnemies = [enemy1, enemy2, enemy3];

const player = new Player(202, 303);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
