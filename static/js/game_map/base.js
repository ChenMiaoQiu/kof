import { GameObject } from '../game_object/base.js'


class GameMap extends GameObject {
    constructor(root) {
        super();

        this.root = root;
        let $canvas = $('<canvas width="1280" height="720" tabindex=0></canvas>');
        this.ctx = $canvas[0].getContext('2d');
        this.root.$kof.append(this.$canvas);
        this.$canvas.focus();
    }

    start() {

    }

    update() {

    }
}

export {
    GameMap
}