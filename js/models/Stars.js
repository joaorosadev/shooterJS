export default class Stars extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children) {
        super(world, scene);
        this.scene = scene;
        this.alive = true;
        this.x;
        this.y;
    }

    addStar(){
    do{
        this.x = 67*Math.floor(Math.random() * 10) + 10;
        if(this.x <=20) this.x = 20;  
        } while (this.x > 500); 
    this.y = 0;

    var star=this.stars.create(this.x,this.y,"star");
    star.setVelocityX(0);
    star.setVelocityY(275);
    star.setFrame(0);
    star.setScale(0.1);
    star.checkWorldBounds = true;
    star.outOfBoundsKill = true;
    }
}