"use strict";
var a10_2_polymorphie;
(function (a10_2_polymorphie) {
    class Moveable {
        position;
        velocity;
        constructor(_position) {
            console.log("constructor Snowflakes");
            if (_position)
                this.position = _position.copy();
            else
                this.position = new a10_2_polymorphie.Vector(0, 0);
            this.velocity = new a10_2_polymorphie.Vector(0, 0);
        }
        move(_timeslice) {
            console.log("move Moveable");
            let canvas = document.querySelector("canvas");
            let crc2 = canvas.getContext("2d");
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += crc2.canvas.height;
            if (this.position.x > crc2.canvas.width)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height)
                this.position.y -= crc2.canvas.height;
        }
        draw() {
            console.log("Moveable move");
        }
    }
    a10_2_polymorphie.Moveable = Moveable;
})(a10_2_polymorphie || (a10_2_polymorphie = {}));
//# sourceMappingURL=moveable.js.map