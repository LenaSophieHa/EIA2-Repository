namespace a10_2_polymorphie   {

    export class Snowflake extends Moveable {
        size: number;

        constructor(_size: number, _position?: Vector) {
            console.log("constructor Snowflakes");

            super(_position);

            if (_position)
            this.position = _position.copy();
            else
            this.position = new Vector(0, 0);

            this.velocity = new Vector(0, 0);
            this.velocity.random(100, 200);
            this.size = _size;
        }

        move(_timeslice: number): void {
            console.log("move Snowflakes");
            super.move(_timeslice);
        }

        draw(): void {
            console.log("draw Snowflake");

            let canvas: HTMLCanvasElement = document.querySelector("canvas");
            let crc2: CanvasRenderingContext2D = canvas.getContext("2d");

            let r2: number = 2;

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
}