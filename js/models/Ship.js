import Bullets from './Bullets.js';

export default class Ship extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'ship');        
        this.scene=scene;
        this.alive=true;
        this.setScale(0.4);
        this.lives=5;
        this.nextTick=0;
        this.bullets=this.scene.physics.add.group({
            classType: Bullets,
            key:"bullet"
          });
        this.bulletNormal=true;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        this.setGravityY(0);        
    }

    //fire a bullet
    fire(time){

        //a nave rastreia o tempo entre "tics" e o tempo atual do jogo
        //o tempo do jogo é sempre atualizado. o próximo tic só será se for inferior ao tempo do jogo
        if(time > this.nextTick) {
            var bullet = this.bullets.get();
                if (bullet) {
                    bullet.fire(this.x, this.y -30 ,0,-550);
                }
            //tickFreq é a frequencia em ms com a qual o evento poderá acontecer
            var tickFreq=0;
            this.nextTick = time + tickFreq;
        }        
    }

    //alterna entre tiro normal e tiro multiplo
    changeBullet(){
        if(this.bulletNormal){
            this.bulletNormal=false;
        }else{
            this.bulletNormal=true;
        }
    }

    update (cursors) {
        if(cursors.up.isDown && cursors.left.isDown){
            this.setVelocityX(-300);
            this.setVelocityY(-300);
            this.anims.play('up_left',true);
            if(this.x < 0){
                this.x = 0;
            }
        }else if(cursors.up.isDown && cursors.right.isDown){
            this.setVelocityX(300);
            this.setVelocityY(-300);
            this.anims.play('up_right',true);
            if(this.x > 500){
                this.x = 500;
            }
        }else if(cursors.down.isDown && cursors.left.isDown){
            this.setVelocityX(-300);
            this.setVelocityY(300);
            this.anims.play('left',true);
            if(this.x < 0){
                this.x = 0;
            }
        }
        else if(cursors.down.isDown && cursors.right.isDown){
            this.setVelocityX(300);
            this.setVelocityY(300);
            this.anims.play('right',true);
            if(this.x > 500){
                this.x = 500;
            }
        }
         else if(cursors.left.isDown){
            this.setVelocityY(0);
            this.setVelocityX(-300);
            this.anims.play('left',true);
            if(this.x < 0){
                this.x = 0;
            }
        } else if (cursors.right.isDown){
            this.setVelocityY(0);
            this.setVelocityX(300);
            this.anims.play('right',true);
            if(this.x > 500){
                this.x = 500;
            }
        } 
        else if(cursors.up.isDown) {
            this.setVelocityX(0);
            this.setVelocityY(-300);
            this.anims.play('up',true);
        } else if(cursors.down.isDown) {
            this.setVelocityX(0);                
            this.setVelocityY(300);
            this.anims.play('turn',true);
        } 
        else {
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.anims.play('turn',true);
        }
    }
}