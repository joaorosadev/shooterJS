import Ship from '../models/Ship.js';

export default class TitleScene extends Phaser.Scene{
    constructor(){
        super({key:'Title'});
    }
    preload(){
        this.load.image("background", "assets/background.png");
        this.load.spritesheet("ship", "assets/ship.png",{ frameWidth:396/4, frameHeight: 308/2 } );
    }
    create(){
        this.add.image(0, 0, "background").setOrigin(0, 0);
        this.add.text(100, 200, "Space Shooter", {
            font: "50px Cambria",
            fill: "#ffffff"
          });
        this.add.text(135,265, "Press <space> to start", {
            font: "25px Cambria",
            fill: "#ffffff"
        })
        this.ship=new Ship(this,250,600);         
        this.ship.setGravityY(0);
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spaceBar.on('down',function(event){
            this.scene.stop();
            this.scene.start('FirstScene');
        }.bind(this));
    }
}