import './phaser.js';

export default {
    type: Phaser.AUTO,
    width: 500,
    height: 700,
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
        gravity: {y : 0}
      }
    },    
  };