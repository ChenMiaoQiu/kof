import { GameObject } from "../game_object/base.js";

class Player extends GameObject {
    constructor(root, info) {
        super();

        this.root = root;
        this.ctx = root.GameMap.ctx;
        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;

        this.vx = 0;
        this.vy = 0;

        this.gravity = 50;

        this.speedx = 400;
        this.speedy = -1500;

        this.ctx = this.root.GameMap.ctx;
        this.press = this.root.GameMap.Controller.pressed;

        this.status = 3;// 0: 静止 1：向前移动 2：向后移动 3：跳跃 4：攻击 5：被打 6：死亡
        this.frame_current_cnt = 0;
        this.animations = new Map();
    }

    start() {

    }

    update_status() {
        let w, a, d, space;

        if (this.id === 0) {
            w = this.press.has('w');
            a = this.press.has('a');
            d = this.press.has('d');
            space = this.press.has(' ');
        } else {
            w = this.press.has('ArrowUp');
            a = this.press.has('ArrowLeft');
            d = this.press.has('ArrowRight');
            space = this.press.has('Enter');
        }

        if (this.status === 0 || this.status === 1 || this.status === 2) {
            if (space) {
                this.status = 4;
                this.vx = 0;
                this.frame_current_cnt = 0;
            } else if (w) {
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = -this.speedx;
                } else {
                    this.vx = 0;
                }
                this.vy = this.speedy;
                this.status = 3;
                this.frame_current_cnt = 0;
            } else if (d) {
                this.vx = this.speedx;
                this.status = 1;
            } else if (a) {
                this.vx = -this.speedx;
                this.status = 2;
            } else {
                this.vx = 0;
                this.status = 0;
            }
        }
    }

    update_direction() {
        if (this.status === 6) return;

        let players = this.root.Player;
        if (players[0] && players[1]) {
            let me = this, you = players[1 - this.id];
            if (me.x < you.x) me.direction = 1;
            else me.direction = -1;
        }
    }

    move() {
        this.vy += this.gravity;

        this.x += this.vx * this.timedelta / 1000;
        this.y += this.vy * this.timedelta / 1000;

        if (this.y > 450) {
            this.y = 450;
            this.vy = 0;

            if (this.status === 3) this.status = 0;
        }

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.root.GameMap.$canvas.width()) {
            this.x = this.root.GameMap.$canvas.width() - this.width;
        }
    }

    update() {
        this.update_status();
        this.update_direction();
        this.move();

        this.render();
    }

    render() {
        // this.ctx.fillStyle = this.color;
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);

        let status = this.status;
        let obj = this.animations.get(status);
        if (obj && obj.loaded) {
            if (this.direction > 0) {
                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.x, this.y + obj.offsets_y, image.width * obj.scale, image.height * obj.scale);
            } else {
                this.ctx.save();
                this.ctx.scale(-1, 1);
                this.ctx.translate(-this.root.GameMap.$canvas.width(), 0);

                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.root.GameMap.$canvas.width() - this.x - this.width, this.y + obj.offsets_y, image.width * obj.scale, image.height * obj.scale);

                this.ctx.restore();
            }
        }

        if (status === 4 || status === 5 || status === 6) {
            if (this.frame_current_cnt == obj.frame_rate * (obj.frame_cnt - 1)) {
                if (status === 6) {
                    this.frame_current_cnt--;
                } else {
                    this.status = 0;
                }
            }
        }

        this.frame_current_cnt++;
    }
}

export {
    Player
}