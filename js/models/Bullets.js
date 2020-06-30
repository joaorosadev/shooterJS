export default class Bullets extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
      super(scene, 0, 0,"bullet");
      this.setScale(0.75);
    }
  
    fire(x, y,vx,vy) {
      this.setActive(true);
      this.setVisible(true);
      this.setPosition(x, y);
      this.setVelocityX(vx);
      this.setVelocityY(vy);
    }
  }
  