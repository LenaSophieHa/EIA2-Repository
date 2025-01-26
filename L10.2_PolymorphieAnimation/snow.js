"use strict";
var a10_2_polymorphie;
(function (a10_2_polymorphie) {
    class Snowflake extends a10_2_polymorphie.Moveable {
        size;
        constructor(_size, _position) {
            console.log("constructor Snowflakes");
            super(_position);
            if (_position)
                this.position = _position.copy();
            else
                this.position = new a10_2_polymorphie.Vector(0, 0);
            this.velocity = new a10_2_polymorphie.Vector(0, 0);
            this.velocity.random(100, 200);
            this.size = _size;
        }
        move(_timeslice) {
            console.log("move Snowflakes");
            super.move(_timeslice);
        }
        draw() {
            console.log("draw Snowflake");
            let canvas = document.querySelector("canvas");
            let crc2 = canvas.getContext("2d");
            let r2 = 2;
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.scale(this.size, this.size);
            crc2.fillStyle = "white";
            crc2.beginPath();
            crc2.arc(100, 10, r2, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
            crc2.restore();
        }
    }
    a10_2_polymorphie.Snowflake = Snowflake;
})(a10_2_polymorphie || (a10_2_polymorphie = {}));
//# sourceMappingURL=snow.js.map