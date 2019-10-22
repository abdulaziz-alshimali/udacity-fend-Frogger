      //score selector
      let score = document.querySelector('#score');
      score.innerHTML = 0;
      //initial class for both of the other classes (parent class :D)
      class init {
          constructor(x, y, speed) {
              this.x = x;
              this.y = y;
              this.speed = speed;
          }
          //Rendering the sprites
          render() {
              ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
          }
          //updating the game
          update(dt) {
              this.x += 1 + this.speed * dt;
              //   console.log(this.speed);

              if (this.x > 550) {
                  this.x = -100;
                  this.speed = 50 + Math.floor(Math.random() * 500);
                  if (this.speed < 100) {
                      this.speed = 105;
                  }
                  console.log(this.speed);

              }
              if (this.x < player.x + 50 && this.x + 50 > player.x && this.y < player.y + 40 && 40 + this.y > player.y) {
                  player.x = 200;
                  player.y = 380;
                  score.innerHTML = 0;
              }

          }

      }
      //the enemy subClass (the bugs)
      class Enemy extends init {
          constructor(x, y, speed) {
              super(x, y, speed);
              this.sprite = 'images/enemy-bug.png'

          }
      }
      //player subClass
      class Player extends init {
          constructor(x, y) {
              super(x, y);
              this.sprite = 'images/char-boy.png'
          }
          update() {}
          // if the player passed al the bugs it relocate him to the inital place and  add to the score
          pass() {
              this.x = 200;
              this.y = 380;
              score.innerHTML++;
              console.log(this.speed);
              this.speed *= 50;
          }
          // basic handing and i made sure the player dont go beyond the canavas
          handleInput(allowedKeys) {
              if (allowedKeys == 'left' && this.x != 0) {
                  this.x -= 100;
              } else
              if (allowedKeys == 'right' && this.x != 400) {
                  this.x += 100;
              } else
              if (allowedKeys == 'down' && this.y < 380) {
                  this.y += 85;
              } else
              if (allowedKeys == 'up') {
                  console.log(this.y);
                  if (this.y < 0) {
                      //if the player reached to the top of the y axis he wins
                      this.pass();
                  } else
                      this.y -= 85;
              }
          }
      }
      //making the player object
      let player = new Player(200, 380);
      // the enemy array , objects, and pushing to the array 
      let allEnemies = [];
      let enemy1 = new Enemy(-100, 210, 50 * Math.floor(Math.random() * 10 + 10))
      let enemy2 = new Enemy(-100, 125, 50 * Math.floor(Math.random() * 10 + 10))
      let enemy3 = new Enemy(-100, 40, 50 * Math.floor(Math.random() * 10 + 10))
      allEnemies.push(enemy1);
      allEnemies.push(enemy2);
      allEnemies.push(enemy3);
      // recoreding the key presses
      document.addEventListener('keydown', function (e) {
          var allowedKeys = {
              37: 'left',
              38: 'up',
              39: 'right',
              40: 'down'
          };
          player.handleInput(allowedKeys[e.keyCode]);
      });