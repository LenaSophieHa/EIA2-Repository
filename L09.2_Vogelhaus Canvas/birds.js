var a09_2_Vogelhaus;
(function (a09_2_Vogelhaus) {
    class Bird {
        position;
        velocity;
        size;
        constructor(_size) {
            this.position = new a09_2_Vogelhaus.VectorBird(0, 0);
            this.velocity = new a09_2_Vogelhaus.VectorBird(0, 0);
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
            let canvas = document.querySelector("canvas");
            let crc2 = canvas.getContext("2d");
            let offset = new a09_2_Vogelhaus.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += 420;
            if (this.position.x > crc2.canvas.width)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height)
                this.position.y -= crc2.canvas.height;
        }
    }
    a09_2_Vogelhaus.Bird = Bird;
})(a09_2_Vogelhaus || (a09_2_Vogelhaus = {}));
//# sourceMappingURL=birds.js.map