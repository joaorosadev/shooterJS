export default class Comets extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children) {
        super(world, scene);
        this.scene = scene;
        this.alive = true;
        this.drop = false;
        this.x;
        this.y;
        this.isRight = true;
    }

      addNewEnemy(){
        do{
          this.y = 67*Math.floor(Math.random() * 10) + 10;
          if(this.y <=20) this.y = 20;  
        } while (this.y > 301);
        this.opt = 0;
        this.opt = (Math.random()  > 0.5 ? 0 : 500);
        this.x = this.opt;
        
        if(this.isRight){
          var enemy=this.comets.create(this.x,this.y,"comet1");
          var randomVY = Math.random() * 300 + 150;
          var randomVX = Math.random() * 300 + 100;
          enemy.setVelocityX(randomVX);
          enemy.setVelocityY(randomVY);
          enemy.setFrame(1);
          this.isRight = !this.isRight;
        }
        else {
          var enemy=this.comets.create(this.x,this.y,"comet");
          var randomVY = Math.random() * 300 + 150;
          var randomVX = Math.random() * 300 + 100;
          enemy.setVelocityX(-randomVX);
          enemy.setVelocityY(randomVY);
          enemy.setFrame(10);
          this.isRight= !this.isRigh;
        }
        
        enemy.setScale(0.15);
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
      }
}