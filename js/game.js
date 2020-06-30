import config from './config.js';
import FirstScene from './scenes/FirstScene.js';
import TitleScene from './scenes/TitleScene.js';

class Game extends Phaser.Game{
    constructor(){
        super(config);
        this.scene.add('FirstScene',FirstScene);
        this.scene.add('Title',TitleScene);
        this.scene.start('Title');
    }
}
new Game();