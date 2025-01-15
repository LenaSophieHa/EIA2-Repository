"use strict";
var a09_2_Vogelhaus;
(function (a09_2_Vogelhaus) {
    window.addEventListener("load", handleload);
    let crc2;
    let golden = 0.62;
    let background;
    let snowflakes = [];
    let birds = [];
    function handleload() {
        console.log("handleload");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        drawBackground();
        create();
        setInterval(update, 20);
    }
    a09_2_Vogelhaus.handleload = handleload;
    function create() {
        console.log("create snowflakes");
        for (let index = 0; index < 200; index++) {
            let randomscale = Math.floor(Math.random() * (2 - 1) + 1);
            let snowflake = new a09_2_Vogelhaus.Snowflake(randomscale);
            snowflakes.push(snowflake);
        }
        for (let indexbird = 0; indexbird < 17; indexbird++) {
            let randomscale2 = Math.floor(Math.random() * (2 - 0.5) + 0.5);
            let bird = new a09_2_Vogelhaus.Bird(randomscale2);
            birds.push(bird);
        }
    }
    function update() {
        console.log("Update");
        crc2.putImageData(background, 0, 0);
        for (let snowflake of snowflakes) {
            snowflake.moveBy(1 / 400);
            snowflake.draw();
        }
        for (let bird of birds) {
            bird.draw();
            bird.move(1 / 700); //fliegenden Vögel Hintergrund
        }
    }
    function drawBackground() {
        console.log("Background");
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "skyblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "#b4c3d7");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        let horizon = crc2.canvas.height * golden;
        let mountains = { x: 0, y: horizon };
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
    a09_2_Vogelhaus.drawBackground = drawBackground;
    function drawSun(_position) {
        console.log("sun", _position);
        let r1 = 40;
        let r2 = 150;
        let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(50, 100%, 40%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }
    function drawCloud(_position, _size) {
        console.log("Cloud", _position, _size);
        let nParticles = 15;
        let rparticle = 50;
        let particle = new Path2D();
        let gradient = crc2.createRadialGradient(0, 2, 2, 0, 0, rparticle);
        particle.arc(0, 0, rparticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.8)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0.2)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    function drawmountains(_position, _min, _max, _colorLow, _colorHigh) {
        console.log("Mountains", _position, _min, _max);
        let stepMin = 30;
        let stepMax = 20;
        let x = 0;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);
        crc2.lineTo(x, 0);
        crc2.closePath();
        let gradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.9, _colorHigh);
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }
    function drawtrees(_position) {
        console.log("trees");
        crc2.save();
        crc2.beginPath();
        crc2.translate(_position.x, _position.y);
        crc2.scale(2, 2);
        crc2.moveTo(20, 0);
        crc2.lineTo(-20, 0);
        crc2.lineTo(-13, -10);
        crc2.lineTo(-16, -10);
        crc2.lineTo(-8, -20);
        crc2.lineTo(-10, -20);
        crc2.lineTo(0, -35);
        crc2.lineTo(10, -20);
        crc2.lineTo(8, -20);
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
        for (let index = 0; index < 7; index++) {
            let randomx = Math.floor(Math.random() * (750 - 200) + 200);
            let randomy = Math.floor(Math.random() * (500 - 420) + 420);
            let randomscale = Math.floor(Math.random() * (3 - 1) + 1);
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
            crc2.lineTo(-8, -20);
            crc2.lineTo(-10, -20);
            crc2.lineTo(0, -35);
            crc2.lineTo(10, -20);
            crc2.lineTo(8, -20);
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
        for (let index = 0; index < 7; index++) {
            let randomx = Math.floor(Math.random() * (750 - 200) + 200);
            let randomy = Math.floor(Math.random() * (500 - 420) + 420);
            let randomscale = Math.floor(Math.random() * (3 - 1) + 1);
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
            crc2.lineTo(-8, -20);
            crc2.lineTo(-10, -20);
            crc2.lineTo(0, -35);
            crc2.lineTo(10, -20);
            crc2.lineTo(8, -20);
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
    function drawsnowman(_position) {
        console.log("snowman", _position);
        let r1 = 90;
        let r2 = 60;
        let r3 = 90;
        let r4 = 40;
        let r5 = 90;
        let r6 = 30;
        let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        let gradient2 = crc2.createRadialGradient(0, 0, r3, 0, 0, r4);
        let gradient3 = crc2.createRadialGradient(0, 0, r5, 0, 0, r6);
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
        let rAuge = 4;
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
    function drawhouse(_position) {
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
        let rhole = 32;
        crc2.save();
        crc2.beginPath();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = "white";
        crc2.arc(0, -60, rhole, 0, 2 * Math.PI);
        crc2.fill();
        crc2.closePath();
        crc2.restore();
    }
    function drawbird(_position) {
        console.log("birds");
        for (let index = 0; index < 9; index++) {
            let maxWidth = 800;
            let minWidth = 100;
            let minHeight = 515;
            let maxHeight = 530;
            let positionx = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth);
            let positiony = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
            //Unterkörper
            let radius2 = 15;
            crc2.beginPath();
            crc2.arc(positionx, positiony, radius2, 0, 2 * Math.PI);
            crc2.fillStyle = randomColor();
            crc2.fill();
            crc2.stroke();
            crc2.closePath();
            //Kopf
            let radius = 10;
            crc2.beginPath();
            crc2.arc(positionx - 10, positiony - 10, radius, 0, 2 * Math.PI);
            crc2.fillStyle = randomColor();
            crc2.fill();
            crc2.stroke();
            crc2.closePath();
            //Auge
            let radius3 = 1;
            crc2.beginPath();
            crc2.arc(positionx - 11, positiony - 11, radius3, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.stroke();
            crc2.closePath();
            //Schnabel
            crc2.beginPath();
            crc2.moveTo(positionx - 20, positiony - 10);
            crc2.lineTo(positionx - 25, positiony - 5);
            crc2.stroke();
            crc2.closePath();
            crc2.beginPath();
            crc2.moveTo(positionx - 19, positiony - 5);
            crc2.lineTo(positionx - 25, positiony - 5);
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
            crc2.moveTo(positionx, positiony + 20);
            crc2.lineTo(positionx - 5, positiony + 20);
            crc2.stroke();
            crc2.closePath();
        }
    }
    function drawbird2(_position) {
        console.log("bird2");
    }
    function randomColor() {
        let letters = "0123456789";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 10)];
        }
        return color;
    }
})(a09_2_Vogelhaus || (a09_2_Vogelhaus = {}));
//# sourceMappingURL=a09_2.js.map