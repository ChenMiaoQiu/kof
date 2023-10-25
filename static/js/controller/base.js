class Controller {
    constructor($canvas) {
        this.$canvas = $canvas;

        this.pressed = new Set();
        this.start();
    }

    start() {
        let outer = this;
        this.$canvas.keydown(function (e) {
            outer.pressed.add(e.key);
        });

        this.$canvas.keyup(function (e) {
            outer.pressed.delete(e.key);
        });
    }
}

export {
    Controller
}