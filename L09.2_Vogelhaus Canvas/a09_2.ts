namespace a09_2_Vogelhaus {

    window.addEventListener("load", handleload);

    let crc2: CanvasRenderingContext2D;
    let golden: number = 0.62;

    interface Vector {
        x: number;
        y: number;
    }

    let background: ImageData;
    let snowflakes: Snowflake[] = [];
    let birds: Bird[] = [];

    export function handleload(): void {
        console.log("handleload");

        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawBackground();
        create();
        setInterval(update, 20);

    }

    function create(): void {
        console.log("create snowflakes");

        for (let index: number = 0; index < 200; index++) {

            let randomscale: number = Math.floor(Math.random() * (2 - 1) + 1);
            let snowflake: Snowflake = new Snowflake(randomscale);
            snowflakes.push(snowflake);
        }

        for (let indexbird: number = 0; indexbird < 17; indexbird++) {
            let randomscale2: number = Math.floor(Math.random() * (2 - 0.5) + 0.5);
            let bird: Bird = new Bird(randomscale2);
            birds.push(bird);
        }
    }

    function update(): void {
        console.log("Update");
        crc2.putImageData(background, 0, 0);

        for (let snowflake of snowflakes) {
            snowflake.moveBy(1 / 400);
            snowflake.draw();
        }

        for (let bird of birds) {
            bird.draw();
            bird.move(1 / 700);  //fliegenden Vögel Hintergrund
        }
    }


    export function drawBackground(): void {
        console.log("Background");

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "skyblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "#b4c3d7");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);


        let horizon: number = crc2.canvas.height * golden;
        let mountains: Vector = { x: 0, y: horizon };


        drawSun({ x: 100, y: 75 });
        drawCloud({ x: 500, y: 125 }, { x: 250, y: 75 });

        drawmountains(mountains, 50, 100, "grey", "white");
        drawmountains(mountains, 25, 75, "white", "grey");
        drawtrees({ x: 200, y: 420 });
        drawsnowman({ x: 90, y: 620 });
        drawhouse({ x: 830, y: 540 });
        drawbird({ x: 500, y: 610 });
        drawbird2({ x: 800, y: 466 });

        background = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function drawSun(_position: Vector): void {
        console.log("sun", _position);

        let r1: number = 40;
        let r2: number = 150;
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(50, 100%, 40%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }


    function drawCloud(_position: Vector, _size: Vector): void {
        console.log("Cloud", _position, _size);

        let nParticles: number = 15;
        let rparticle: number = 50;
        let particle: Path2D = new Path2D();
       
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 2, 2, 0, 0, rparticle);

        particle.arc(0, 0, rparticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.8)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0.2)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }

    function drawmountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string): void {
        console.log("Mountains", _position, _min, _max);
        let stepMin: number = 30;
        let stepMax: number = 20;
        let x: number = 0;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);

        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number = -_min - Math.random() * (_max - _min);

            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);

        crc2.lineTo(x, 0);
        crc2.closePath();

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.9, _colorHigh);

        crc2.fillStyle = gradient;
        crc2.fill();

        crc2.restore();
    }

    function drawtrees(_position: Vector): void {
        console.log("trees");

        crc2.save();
        crc2.beginPath();
        crc2.translate(_position.x, _position.y);
        crc2.scale(2, 2);
        crc2.moveTo(20, 0);
        crc2.lineTo(-20, 0);
        crc2.lineTo(-13, -10);
        crc2.lineTo(-16, -10);
        crc2.lineTo(-08, -20);
        crc2.lineTo(-10, -20);
        crc2.lineTo(0, -35);
        crc2.lineTo(10, -20);
        crc2.lineTo(08, -20);
        crc2.lineTo(16, -10);
        crc2.lineTo(13, -10);
        crc2.fillStyle = "darkgreen";
        crc2.fill();
        crc2.closePath();
        crc2.restore();

        crc2.save();
        crc2.shadowBlur = 3;
        crc2.shadowColor = "black";
        crc2.beginPath();
        crc2.translate(_position.x, _position.y);
        crc2.moveTo(5, 0);
        crc2.lineTo(-5, 0);
        crc2.lineTo(-5, 19);
        crc2.lineTo(5, 19);
        crc2.fillStyle = "brown";
        crc2.fill();
        crc2.closePath();
        crc2.restore();

        for (let index: number = 0; index < 7; index++) {
            let randomx: number = Math.floor(Math.random() * (750 - 200) + 200);
            let randomy: number = Math.floor(Math.random() * (500 - 420) + 420);
            let randomscale: number = Math.floor(Math.random() * (3 - 1) + 1);

            crc2.save();
            crc2.shadowBlur = 3;
            crc2.shadowColor = "black";
            crc2.beginPath();
            crc2.translate(randomx, randomy);
            crc2.scale(randomscale, randomscale);
            crc2.moveTo(20, 0);
            crc2.lineTo(-20, 0);
            crc2.lineTo(-13, -10);
            crc2.lineTo(-16, -10);
            crc2.lineTo(-08, -20);
            crc2.lineTo(-10, -20);
            crc2.lineTo(0, -35);
            crc2.lineTo(10, -20);
            crc2.lineTo(08, -20);
            crc2.lineTo(16, -10);
            crc2.lineTo(13, -10);
            crc2.fillStyle = "darkgreen";
            crc2.fill();
            crc2.closePath();
            crc2.restore();

            crc2.save();
            crc2.shadowBlur = 3;
            crc2.shadowColor = "black";
            crc2.beginPath();
            crc2.translate(randomx, randomy);
            crc2.moveTo(5, 0);
            crc2.lineTo(-5, 0);
            crc2.lineTo(-5, 19);
            crc2.lineTo(5, 19);
            crc2.fillStyle = "brown";
            crc2.fill();
            crc2.closePath();
            crc2.restore();
        }
        
        
        //mehr Bäume
        for (let index: number = 0; index < 7; index++) {
            let randomx: number = Math.floor(Math.random() * (750 - 200) + 200);
            let randomy: number = Math.floor(Math.random() * (500 - 420) + 420);
            let randomscale: number = Math.floor(Math.random() * (3 - 1) + 1);

            crc2.save();
            crc2.shadowBlur = 3;
            crc2.shadowColor = "black";
            crc2.beginPath();
            crc2.translate(randomx, randomy);
            crc2.scale(randomscale, randomscale);
            crc2.moveTo(20, 0);
            crc2.lineTo(-20, 0);
            crc2.lineTo(-13, -10);
            crc2.lineTo(-16, -10);
            crc2.lineTo(-08, -20);
            crc2.lineTo(-10, -20);
            crc2.lineTo(0, -35);
            crc2.lineTo(10, -20);
            crc2.lineTo(08, -20);
            crc2.lineTo(16, -10);
            crc2.lineTo(13, -10);
            crc2.fillStyle = "darkgreen";
            crc2.fill();
            crc2.closePath();
            crc2.restore();

            crc2.save();
            crc2.shadowBlur = 3;
            crc2.shadowColor = "black";
            crc2.beginPath();
            crc2.translate(randomx, randomy);
            crc2.moveTo(5, 0);
            crc2.lineTo(-5, 0);
            crc2.lineTo(-5, 19);
            crc2.lineTo(5, 19);
            crc2.fillStyle = "brown";
            crc2.fill();
            crc2.closePath();
            crc2.restore();
        }
    }
    

    function drawsnowman(_position: Vector): void {
        console.log("snowman", _position);

        let r1: number = 90;
        let r2: number = 60;
        let r3: number = 90;
        let r4: number = 40;
        let r5: number = 90;
        let r6: number = 30;

        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        let gradient2: CanvasGradient = crc2.createRadialGradient(0, 0, r3, 0, 0, r4);
        let gradient3: CanvasGradient = crc2.createRadialGradient(0, 0, r5, 0, 0, r6);

        gradient.addColorStop(0, "HSLA(0, 0%, 100%, 1)");
        
        gradient2.addColorStop(0, "HSLA(0, 0%, 100%, 1)");
        
        gradient3.addColorStop(0, "HSLA(0, 0%, 100%, 1)");
        

        //unterster Kreis
        crc2.save();
        crc2.beginPath();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.stroke();
        crc2.closePath();
        crc2.restore();

        //mittlerer Kreis
        crc2.save();
        crc2.beginPath();
        crc2.translate(_position.x, 520);
        crc2.fillStyle = gradient2;
        crc2.arc(0, 0, r4, 0, 2 * Math.PI);
        crc2.fill();
        crc2.stroke();
        crc2.closePath();
        crc2.restore();

        //oberster Kreis
        crc2.save();
        crc2.beginPath();
        crc2.translate(_position.x, 450);
        crc2.fillStyle = gradient3;
        crc2.arc(0, 0, r6, 0, 2 * Math.PI);
        crc2.fill();
        crc2.stroke();
        crc2.closePath();
        crc2.restore();

        //Augen
        let rAuge: number = 4;
        crc2.save();
        crc2.beginPath();
        crc2.translate(_position.x, 460);
        crc2.fillStyle = "black";
        crc2.arc(11, -10, rAuge, 0, 2 * Math.PI);
        crc2.arc(-11, -10, rAuge, 0, 2 * Math.PI);
        crc2.fill();
        crc2.closePath();
        crc2.restore();

       //Mund
        

        //Knöpfe
        crc2.save();
        crc2.beginPath();
        crc2.translate(_position.x, 515);
        crc2.fillStyle = "black";
        crc2.arc(0, 5, rAuge, 0, 2 * Math.PI);
        crc2.arc(0, -14, rAuge, 0, 2 * Math.PI);
        crc2.arc(0, 24, rAuge, 0, 2 * Math.PI);
        crc2.fill();
        crc2.closePath();
        crc2.restore();
    }

    function drawhouse(_position: Vector): void {
        console.log("Vogelhaus");

        //oberer Teil des Hauses
        crc2.save();
        crc2.beginPath();
        crc2.translate(_position.x, _position.y);
        crc2.moveTo(-80, 0);
        crc2.lineTo(80, 0);
        crc2.lineTo(80, -120);
        crc2.lineTo(120, -120);
        crc2.lineTo(0, -180);
        crc2.lineTo(-120, -120);
        crc2.lineTo(-80, -120);
        crc2.lineTo(-80, 0);
        crc2.lineWidth = 6;
        crc2.fillStyle = "brown";
        crc2.fill();
        crc2.closePath();
        crc2.restore();
        
        //unterer Teil des Hauses
        crc2.save();
        crc2.beginPath();
        crc2.translate(_position.x, _position.y);
        crc2.moveTo(-8, 0);
        crc2.lineTo(8, 0);
        crc2.lineTo(8, 50);
        crc2.lineTo(30, 110);
        crc2.lineTo(26, 110);
        crc2.lineTo(8, 80);
        crc2.lineTo(5, 110);
        crc2.lineTo(-5, 110);
        crc2.lineTo(-8, 80);
        crc2.lineTo(-26, 110);
        crc2.lineTo(-30, 110);
        crc2.lineTo(-8, 50);
        crc2.fillStyle = "brown";
        crc2.fill();
        crc2.closePath();
        crc2.restore();

        //Loch Vogelhaus
        let rhole: number = 32;
        crc2.save();
        crc2.beginPath();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = "white";
        crc2.arc(0, -60, rhole, 0, 2 * Math.PI);
        crc2.fill();
        crc2.closePath();
        crc2.restore();
    }

    function drawbird(_position: Vector): void {
        console.log("birds");
 
        for (let index: number = 0; index < 9; index++) {
        
            let maxWidth: number = 800;                      
            let minWidth: number = 100;
            let minHeight: number = 515;
            let maxHeight: number = 530;
    
            let positionx: number = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth);
            let positiony: number = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
            
            //Unterkörper
            let radius2: number = 15;
            crc2.beginPath();
            crc2.arc(positionx , positiony , radius2, 0, 2 * Math.PI);
            crc2.fillStyle = randomColor();
            crc2.fill();
            crc2.stroke();
            crc2.closePath();
    
            //Kopf
            let radius: number = 10;
            crc2.beginPath();
            crc2.arc(positionx - 10, positiony - 10, radius, 0, 2 * Math.PI);
            crc2.fillStyle = randomColor();
            crc2.fill();
            crc2.stroke();
            crc2.closePath();
    
    
            //Auge
            let radius3: number = 1;
            crc2.beginPath();
            crc2.arc(positionx - 11, positiony -11 , radius3, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.stroke();
            crc2.closePath();
          
            //Schnabel
            crc2.beginPath();
            crc2.moveTo(positionx -20, positiony - 10);
            crc2.lineTo(positionx -25, positiony -5);
            crc2.stroke();
            crc2.closePath();
    
            crc2.beginPath();
            crc2.moveTo(positionx -19, positiony -5);
            crc2.lineTo(positionx -25, positiony -5);
            crc2.stroke();
            crc2.closePath();
           
    
            //Bein
            crc2.beginPath();
            crc2.moveTo(positionx, positiony + 5);
            crc2.lineTo(positionx, positiony + 20);
            crc2.stroke();
            crc2.closePath();
    
            //Fuß
            crc2.beginPath();
            crc2.moveTo(positionx , positiony +20);
            crc2.lineTo(positionx - 5, positiony + 20);
            crc2.stroke();
            crc2.closePath();
    
            }
       
    
        }

        function drawbird2(_position: Vector): void {
            console.log("bird2");
    
            }
    
        function randomColor(): string {
            let letters: string = "0123456789";
            let color: string = "#";
            for (let i: number = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 10)];
            }
            return color;
     }

}