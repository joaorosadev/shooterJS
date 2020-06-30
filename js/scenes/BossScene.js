import Ship from "../models/Ship.js";
import Boss from "../models/Boss.js";

export default class BossScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  preload() {
    this.load.spritesheet("ship", "assets/ship.png", {
      frameWidth: 396/4,
      frameHeight: 308/2,
      
    });
    this.load.spritesheet("enemy1", "assets/enemies.png", {
      frameWidth: 96,
      frameHeight: 96
    });
    this.load.spritesheet("shield", "assets/shield.png", {
      frameWidth: 269,
      frameHeight: 269
    });
    this.load.spritesheet("boss", "assets/greenship.png", {
      frameWidth: 422,
      frameHeight: 372
    });

    this.load.image("background", "assets/background.png");
    this.load.image("bullet", "assets/bullet.png");
    }

    create() {
        this.composeGUI();
        this.createShip();
        this.addInputs();
        this.addAnimations();
        //https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Group.html
        this.boss = new Boss(this,250,100);
        this.boss.setSize(200,200,true);
        this.addEvents();
        this.addColisions();
      }

      update(time,delta) {
        if (this.ship.lives > 0) {
          this.ship.update(this.cursors);
          this.checkInputs(time);
          this.checkBorders();
        } else {
          this.add.text(130, 200, "Game Over", {
            font: "50px Cambria",
            fill: "#ffffff"
          });
          this.add.text(75, 250, "Press <enter> to restart", {
            font: "35px Cambria",
            fill: "#ffffff"
          });
          this.stopEvents();
          this.ship.x = 250;
          this.ship.y = 600;
          this.ship.setGravityY(0);
          if (Phaser.Input.Keyboard.JustDown(this.menuKey)) {
            this.scene.restart();
          }
        }
      }

      composeGUI(){
        this.add.image(0, 0, "background").setOrigin(0, 0);
      }
      createShip() {
        this.ship = new Ship(this, 250, 600);
        this.ship.setSize(100,100,true);
      }
      addInputs() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.SPACE
        );
        this.menuKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      }
      addAnimations(){
        this.anims.create({
            key:'turn',
            frames: [{key:'ship' , frame: 0}],
            frameRate:1,
        });
    
        this.anims.create({
            key:'left',
            frames: [{key:'ship' , frame: 1}],
            frameRate:1,
            repeat: -1
        });
    
        this.anims.create({
            key:'right',
            frames: [{key:'ship' , frame: 3}],
            frameRate:1,
            repeat: -1
        });
    
        this.anims.create({
            key:'up',
            frames: [{key:'ship' , frame: 4}],
            frameRate:10,
            repeat: -1
        });
    
        this.anims.create({
            key:'up_left',
            frames: [{key:'ship' , frame: 5}],
            frameRate:10,
            repeat: -1
        });
    
        this.anims.create({
            key:'up_right',
            frames: [{key:'ship' , frame: 7}],
            frameRate:10,
            repeat: -1
        });
      }

      addEvents(){
        this.timer = this.time.addEvent({
          delay: 400,
          callback: this.boss.fire(time),
          callbackScope: this,
          repeat: -1
        });
      }

      addColisions() {  
        this.enemiesCollider=this.physics.add.overlap(
          this.ship.bullets,
          this.boss,
          this.colisionHandler,
          () => {
            this.score+=5;
            this.labelScore.setText(this.score);
          },
          null,
          this
        );
        this.enemiesCollider2=this.physics.add.overlap(
            this.ship,
            this.boss.bullets,
            this.colisionHandler2,
            () => {
              this.score+=5;
              this.labelScore.setText(this.score);
            },
            null,
            this
          );
        this.physics.add.overlap(
          this.ship,
          this.enemies,
          () => {
            this.stopEvents();
            this.recreateScene();
            this.labelLives.setText(--this.ship.lives);
          },
          null,
          this
        );  
      }

      colisionHandler(bullet, enemy) {
        bullet.destroy();
        enemy.hp = enemy.hp - 100;
        if (enemy.hp < 1)
        enemy.detroy();
      }

      colisionHandler2(ship, enemyBul) {
        ship.lives--;
        enemyBul.destroy();
      }
}