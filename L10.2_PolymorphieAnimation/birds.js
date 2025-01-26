"use strict";
var a10_2_polymorphie;
(function (a10_2_polymorphie) {
    class Bird extends a10_2_polymorphie.Moveable {
        //position: VectorBird;
        //velocity: VectorBird;
        size;
        constructor(_size, _position) {
            super(_position);
            if (_position)
                this.position = _position.copy();
            else
                this.position = new a10_2_polymorphie.Vector(0, 0);
            this.velocity = new a10_2_polymorphie.Vector(0, 0);
            this.velocity.random(0, 400);
            this.size = _size;
        }
        draw() {
            console.log("draw bird");
            let canvas = document.querySelector("canvas");
            let crc2 = canvas.getContext("2d");
            let rAuge = 1;
            crc2.save();
            crc2.beginPath();
            crc2.translate(this.position.x, this.position.y);
            crc2.fillStyle = "black";
            crc2.arc(0, 0, rAuge, 0, 2 * Math.PI);
            crc2.fill();
            crc2.closePath();
            crc2.restore();
            crc2.save();
            crc2.beginPath();
            crc2.translate(this.position.x, this.position.y);
            crc2.moveTo(1, 0);
            crc2.bezierCurveTo(8, -5, 15, -10, 20, -2);
            crc2.moveTo(-1, 0);
            crc2.bezierCurveTo(-8, -5, -15, -10, -20, -2);
            crc2.stroke();
            crc2.closePath();
            crc2.restore();
        }
        move(_timeslice) {
            console.log("move bird");
            super.move(0.003);
            let canvas = document.querySelector("canvas");
            let crc2 = canvas.getContext("2d");
            if (this.position.y > 420)
                this.position.y = crc2.canvas.height;
        }
    }
    a10_2_polymorphie.Bird = Bird;
})(a10_2_polymorphie || (a10_2_polymorphie = {}));
//# sourceMappingURL=birds.js.map