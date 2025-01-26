namespace a10_2_polymorphie  {

    export class Bird extends Moveable {

        //position: VectorBird;
        //velocity: VectorBird;
        size: number;

        constructor(_size: number, _position?: Vector) {

            super(_position);

            if (_position)
            this.position = _position.copy();
            else
            this.position = new Vector(0, 0);

            this.velocity = new Vector(0, 0);
            this.velocity.random(0, 400);
            this.size = _size;
        }

        draw(): void {
            console.log("draw bird");
            let canvas: HTMLCanvasElement = document.querySelector("canvas");
            let crc2: CanvasRenderingContext2D = canvas.getContext("2d");

            let rAuge: number = 1;
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

        move(_timeslice: number): void {
            console.log("move bird");
            super.move(0.003);

            let canvas: HTMLCanvasElement = document.querySelector("canvas");
            let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
            
            if (this.position.y > 420)
                this.position.y = crc2.canvas.height;
        }

    }

}