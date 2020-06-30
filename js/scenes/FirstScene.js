import Ship from "../models/Ship.js";
import Enemies from "../models/Enemies.js";
import Comets from "../models/Comets.js";
import Lifes from "../models/Lifes.js"
import Stars from "../models/Stars.js";

export default class FirstScene extends Phaser.Scene {
  constructor(key) {
    super(key);
    this.highScore = 0;
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
    this.load.spritesheet("comet", "assets/comet.png", {
      frameWidth: 960/5,
      frameHeight: 1344/7,
      
    });
    this.load.spritesheet("comet1", "assets/comet1.png", {
      frameWidth: 1344/7,
      frameHeight: 959/5,
      
    });
    this.load.spritesheet("life", "assets/life.png", {
      frameWidth: 2555,
      frameHeight: 2391
      
    });
    this.load.spritesheet("star", "assets/star.png", {
      frameWidth: 300,
      frameHeight: 300
    });
   
    this.load.image("background", "assets/background.png");
    this.load.image("bullet", "assets/bullet.png");
    this.load.audio("catchup", "assets/catchup.wav");
    this.load.audio("shoot", "assets/shoot.mp3");
    this.load.audio("eDown", "assets/enemyDown.wav");
    this.load.audio("song","assets/song.wav");
    this.load.audio("dead","assets/dead.wav");
  }
  create() {
    this.composeGUI();
    this.createShip();
    this.addInputs();
    this.addAnimations();
    //https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Group.html
    this.enemies = new Enemies(this.physics.world, this, []);
    this.comets = new Comets(this.physics.world,this,[]);
    this.lifes = new Lifes(this.physics.world,this,[]);
    this.stars = new Stars(this.physics.world,this,[]);
    this.addSounds();
    this.addEvents();
    this.addColisions();  
  }

  //função update pode ter como parametros o tempo do jogo e a variação em milisegundos entre as frames
  //será usado aqui para marcar a duração entre dois tiros consecutivos
  //https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html#update__anchor
  update(time,delta) {
    var flag = false;
    if (this.ship.lives > 0) {
      this.ship.update(this.cursors);
      this.checkInputs(time);
      this.checkBorders();
      /*if(this.score > 200 && !flag){
        this.stopEvents();
        this.boss = new Boss(this,250,100);
        this.boss.setSize(200,200,true);
        this.addBossColliders();
        this.timer2 = this.time.addEvent({
          delay: 1000,
          callback: this.boss.fire(time),
          callbackScope: this,
          repeat: -1
        });
        flag = !flag;
      }*/
    } else {
      if(this.score > this.highScore){
        this.highScore = this.score;
        this.highScore1.setText(this.highScore);
      }
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
        this.song.stop();
        this.scene.restart();
      }
    }
  }

  addSounds(){
    this.catchupS = this.sound.add("catchup");
    this.catchupS.setVolume(0.05);
    this.shootS = this.sound.add("shoot");
    this.shootS.setVolume(0.10);
    this.enemyDown = this.sound.add("eDown");
    this.enemyDown.setVolume(0.25);
    this.song = this.sound.add("song");
    this.song.play();
    this.dead = this.sound.add("dead");
    this.dead.setVolume(0.25);
  }

  addColisions() {  
    this.enemiesCollider=this.physics.add.overlap(
      this.ship.bullets,
      this.enemies,
      this.colisionHandler,
      () => {
        this.score+=10;
        this.labelScore.setText(this.score);
        this.enemyDown.play();
      },
      null,
      this
    );
    this.enemiesCollider2=this.physics.add.overlap(
      this.ship,
      this.comets,
      this.colisionHandler2,
      () => {
        this.stopEvents();
        this.recreateScene();
        this.labelLives.setText(--this.ship.lives);
        this.dead.play();
      },
      null,
      this
    );
    this.enemiesCollider3=this.physics.add.overlap(
      this.ship,
      this.lifes,
      this.colisionHandler3,
      () => {
        this.catchupS.play();
        this.labelLives.setText(++this.ship.lives);
      },
      null,
      this
    );
    this.enemiesCollider4=this.physics.add.overlap(
      this.ship,
      this.stars,
      this.colisionHandler4,
      () => {
        this.catchupS.play();
        this.score += 100;
        this.labelScore.setText(this.score);
      },
      null,
      this
    );
    /*this.shieldCollider=this.physics.add.overlap(
      this.ship.bullets,
      this.enemies.shields,
      this.colisionHandler2,
      () => {
      },
      null,
      this
    );*/
    this.physics.add.overlap(
      this.ship,
      this.enemies,
      () => {
        this.stopEvents();
        this.recreateScene();
        this.labelLives.setText(--this.ship.lives);
        this.dead.play();
      },
      null,
      this
    );  
  }

  addEvents(){
    this.timer = this.time.addEvent({
      delay: 350,
      callback: this.enemies.addNewEnemy,
      callbackScope: this,
      repeat: -1
    });
    this.timer2 = this.time.addEvent({
      delay: 1000,
      callback: this.enemies.addNewEnemy2,
      callbackScope: this,
      repeat: -1
    });
    this.timer3 = this.time.addEvent({
      delay: 10000,
      callback: this.lifes.addLife,
      callbackScope: this,
      repeat: -1
    });
    this.timer4 = this.time.addEvent({
      delay: 350,
      callback: this.comets.addNewEnemy,
      callbackScope: this,
      repeat: -1
    });
    this.timer5 = this.time.addEvent({
      delay: 4555,
      callback: this.stars.addStar,
      callbackScope: this,
      repeat: -1
    });
    this.timer6 = this.time.addEvent({
      delay: 50000,
      callback: this.playSong,
      callbackScope: this,
      repeat: -1
    });
    /*this.timer6 = this.time.addEvent({
      delay: 15000,
      callback: this.saturns.addPlanet,
      callbackScope: this,
      repeat: -1
    });*/
  }

  stopEvents(){
    this.timer.destroy();
    this.timer2.destroy();
    this.timer3.destroy();
    this.timer4.destroy();
    this.timer5.destroy();
    this.timer6.destroy();
  }

  recreateScene(){
    Phaser.Actions.Call(this.enemies.getChildren(), function(p) {
      p.destroy();
    });
    Phaser.Actions.Call(this.comets.getChildren(), function(p) {
      p.destroy();
    });
    Phaser.Actions.Call(this.lifes.getChildren(), function(p) {
      p.destroy();
    });
    Phaser.Actions.Call(this.stars.getChildren(), function(p) {
      p.destroy();
    });
      this.addEvents();
      this.ship.x=250;
      this.ship.y=600;
      this.ship.alive=true;
  }
 
  colisionHandler(bullet, enemy) {
    bullet.destroy();
    enemy.destroy();
  }
  colisionHandler2(ship, comet){
    comet.destroy();
  }
  colisionHandler3(ship,life){
    life.destroy();
  }
  colisionHandler4(ship,star){
    star.destroy();
  }

  composeGUI() {
    this.add.image(0, 0, "background").setOrigin(0, 0);
    this.score = 0;
    
    this.highText = this.add.text(260, 10, "Highscore:",{
      font: "30px Cambria",
      fill: "#ffffff"
    });
    this.highScore1 = this.add.text(400,10, this.highScore,{
      font: "30px Cambria",
      fill: "#ffffff"
    });
    this.labelScore = this.add.text(90,665 , 0, {
      font: "30px Cambria",
      fill: "#ffffff"
    });
    this.labelLives = this.add.text(470 , 665, 5, {
      font: "30px Cambria",
      fill: "#ffffff"
    });
    this.scText = this.add.text(5, 665, "Score:",{
      font: "30px Cambria",
      fill: "#ffffff"
    });
    this.lvText = this.add.text(390, 665, "Lives:",{
      font: "30px Cambria",
      fill: "#ffffff"
    });
  }
  createShip() {
    this.ship = new Ship(this, 250, 600);
    this.ship.setSize(90,90,true);
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

  checkInputs(time) {
    this.ship.update(this.cursors);
    if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
      //tempo do jogo será passado para o objeto nave
      this.ship.fire(time);
      this.shootS.play();
    }
  }

  checkBorders() {
    if (this.ship.y < -25 || this.ship.y > 725) {
      this.ship.lives--;
      this.labelLives.setText(this.ship.lives);
    }
  }

  playSong(){
    this.song.stop();
    this.song.play();
  }
  
  /*
  addBossColliders(){
    this.physics.add.overlap(
      this.ship,
      this.boss,
      () => {
        this.stopEvents();
        this.recreateScene();
        this.labelLives.setText(--this.ship.lives);
      },
      null,
      this
    );  
    this.enemiesCollider1=this.physics.add.collider(
      this.ship,
      this.boss.bullets,
      () => {
        --this.ship.lives;
        if(this.ship.lives < 0){
          this.stopEvents();
          this.recreateScene();
          this.labelLives.setText(this.ship.lives);
        }
        this.score+=5;
        this.labelScore.setText(this.score);
        //this.newMethod(FirstScene);
        //this.createShield(this.enemies.x,this.enemies.y);
      },
      null,
      this
    );
    this.enemiesCollider2=this.physics.add.overlap(
      this.ship.bullets,
      this.boss,
      this.colisionHandler3,
      () => {
      },
      null,
      this
    );
  }*/
  
}

 
