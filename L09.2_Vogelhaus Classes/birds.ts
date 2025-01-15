namespace a09_2_Vogelhaus {

    export class Bird {

        position: VectorBird;
        velocity: VectorBird;
        size: number;

        constructor(_size: number) {
            this.position = new VectorBird(0, 0);
            this.velocity = new VectorBird(0, 0);
            this.size = _size;
        }

        draw(): void {
            console.log("draw bird");
            let canvas: HTMLCanvasElement = document.querySelector("canvas");
            let crc2: CanvasRenderingContext2D = canvas.getContext("2d")

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
            let canvas: HTMLCanvasElement = document.querySelector("canvas");
            let crc2: CanvasRenderingContext2D = canvas.getContext("2d");

            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
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

}