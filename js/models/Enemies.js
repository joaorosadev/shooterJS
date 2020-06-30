export default class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children) {
        super(world, scene);
        this.scene = scene;
        this.alive = true;
        this.drop = false;
        this.x;
        this.y;
        /*this.shields=this.scene.physics.add.group({
          classType: Shield,
          key:"shield"
        });*/
    }

      addNewEnemy(){
        do{
          this.x = 67*Math.floor(Math.random() * 10) + 10;
          if(this.x <=20) this.x = 20;  
        } while (this.x > 500); 
        this.y = 0;
        var enemy=this.enemies.create(this.x,this.y,"enemy1");
        /*if(Math.random() < 0.1){
            var shield = this.shields.get(); 
            if(shield){
              shield.fire(this.x,this.y,0,0);
            }
            var shield = this.shields.create(this.x,this.y,"shield");
            shield.setSize(170,170,true);
            shield.setScale(0.25);
            shield.setVelocityY(300);
        }*/
        //https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Sprite.html#setFrame__anchor
        enemy.setFrame(2);
        enemy.setScale(0.4);
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
        enemy.setVelocityY(250);
      }

      addNewEnemy2(){
        do{
          this.y = 67*Math.floor(Math.random() * 10) + 10;
          if(this.y <=20) this.y = 20;  
        } while (this.y > 800);
        this.opt = 0;
        this.opt = (Math.random()  > 0.5 ? 0 : 500);
        this.x = this.opt;
        var enemy=this.enemies.create(this.x,this.y,"enemy1");
        
        if(this.opt == 0){
          enemy.setVelocityX(175);
          enemy.setFrame(3);
        }
        else {
          enemy.setVelocityX(-175);
          enemy.setFrame(1);
        }
        
        enemy.setScale(0.4);
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
        enemy.setVelocityY(0);
    
      }
}