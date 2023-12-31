import { GameMap } from "./game_map/base.js";
import { Player } from "./player/base.js";
import { Kyo } from "./player/kyo.js";

class KOF {
    constructor(id) {
        this.$kof = $('#' + id);
        console.log("kof create");
        this.GameMap = new GameMap(this);

        this.Player = [
            new Kyo(this, {
                id: 0,
                x: 200,
                y: 0,
                width: 150,
                height: 200,
                color: 'blue',
            }),
            new Kyo(this, {
                id: 1,
                x: 800,
                y: 0,
                width: 150,
                height: 200,
                color: 'red',
            }),
        ];
    }
}

export {
    KOF
}