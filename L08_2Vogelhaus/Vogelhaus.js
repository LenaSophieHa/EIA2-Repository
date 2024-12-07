var Vogelhaus;
(function (Vogelhaus) {
    // Zufallszahl zwischen minimaler und maximaler Eingabe
    function randomNumber(_min, _max) {
        return Math.random() * (_max - _min) + _min;
    }
    window.addEventListener("load", createCanvas);
    let canvas;
    function createCanvas(_event) {
        canvas = document.querySelector("canvas");
        Vogelhaus.crc2 = canvas.getContext("2d");
        window.addEventListener("resize", fillCanvas, false);
        window.addEventListener("orientationchange", fillCanvas, false);
        fillCanvas();
    }
    window.addEventListener("load", fillCanvas);
    function fillCanvas() {
        let canvas = document.querySelector("canvas"); //Anpassung screen
        if (!canvas)
            return;
        let horizon = canvas.height * 0.38;
        let posMountains = { x: 0, y: horizon };
        drawBackground(horizon);
        drawSun({ x: canvas.width * 0.1, y: canvas.height * 0.12 });
        drawCloud({ x: canvas.width * 0.8, y: canvas.height * 0.15 }, { x: 90, y: 50 });
        drawCloud({ x: canvas.width * 0.4, y: canvas.height * 0.2 }, { x: 70, y: 40 });
        drawMountains(posMountains, canvas.height * 0.08, canvas.height * 0.15, "black", "white");
        drawMountains(posMountains, canvas.height * 0.05, canvas.height * 0.09, "#442b0b", "#c09682");
        drawTrees(0, 15);
        drawSnowman();
        drawhouse({ x: 800, y: 540 });
        drawbirdflying({ x: canvas.width, y: canvas.height });
        drawbird({ x: canvas.width, y: canvas.height });
        drawbirdsitting({ x: canvas.width, y: canvas.height });
        drawsnowflakes();
    }
    function drawBackground(_horizon) {
        // Himmelfarbe
        let gradientSky = Vogelhaus.crc2.createLinearGradient(0, 0, 0, _horizon);
        gradientSky.addColorStop(0, "skyblue");
        gradientSky.addColorStop(1, "grey");
        Vogelhaus.crc2.fillStyle = gradientSky;
        Vogelhaus.crc2.fillRect(0, 0, canvas.width, _horizon);
        // Wiesenfarbe (voll mit Schnee)
        let gradientMeadow = Vogelhaus.crc2.createLinearGradient(0, _horizon, 0, canvas.height);
        gradientMeadow.addColorStop(0, "white");
        gradientMeadow.addColorStop(1, "grey");
        Vogelhaus.crc2.fillStyle = gradientMeadow;
        Vogelhaus.crc2.fillRect(0, _horizon, canvas.width, canvas.height);
    }
    function drawSun(_position) {
        //Sonne und Sonnenstrahlen
        let r1 = canvas.width * 0.02;
        let r2 = canvas.width * 0.06;
        let gradient = Vogelhaus.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 60%, 0)");
        // Zeichnung Sonne
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        Vogelhaus.crc2.fillStyle = gradient;
        Vogelhaus.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.restore();
    }
    function drawCloud(_position, _size) {
        // Basispartikel erstellen und färben
        let nParticles = 40;
        let radiusParticle = 60;
        let particle = new Path2D();
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        let gradient = Vogelhaus.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        Vogelhaus.crc2.fillStyle = gradient;
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        // Jedem Partikel zufällige Position innerhalb des Wolkenbereichs
        for (let drawn = 0; drawn < nParticles; drawn++) {
            Vogelhaus.crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            Vogelhaus.crc2.translate(x, y);
            Vogelhaus.crc2.fill(particle);
            Vogelhaus.crc2.restore();
        }
        Vogelhaus.crc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        // Abstand zwischen Berggipfeln und Tälern
        let stepMin = 10;
        let stepMax = 20;
        let x = 0;
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        // Anfang Bergpfad auf linken Seite
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.moveTo(0, 0);
        Vogelhaus.crc2.lineTo(0, -_max);
        // Zeichne Berge
        do {
            x += stepMin + randomNumber(stepMin, stepMax);
            let y = -randomNumber(_min, _max);
            Vogelhaus.crc2.lineTo(x, y);
        } while (x < canvas.width);
        // Ende Bergpfad auf der rechten Seite
        Vogelhaus.crc2.lineTo(x, 0);
        Vogelhaus.crc2.closePath();
        // Farbe Berge
        let gradient = Vogelhaus.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.9, _colorHigh);
        Vogelhaus.crc2.fillStyle = gradient;
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.restore();
    }
    function drawTrees(_min, _max) {
        // Abstand zwischen Bäumen
        let stepMin = 5;
        let stepMax = 15;
        let x = 0;
        // Zeichne jeden Baum
        do {
            let y = randomNumber(_min, _max);
            Vogelhaus.crc2.save();
            Vogelhaus.crc2.translate(x, y + (canvas.height * 0.39));
            let treeTrunk = -30; // Baumstammhöhe
            let treeTop = -150; // Baumgipfelhöhe
            let treeColor = ["#1d5d18", "#22691d", "#267121"]; // Grüntöne
            let treeSize = randomNumber(0.15, 0.2);
            Vogelhaus.crc2.scale(treeSize, treeSize);
            // Baumstamm
            Vogelhaus.crc2.fillStyle = "#6d502b"; // Farbe Baumstamm
            Vogelhaus.crc2.fillRect(0, 0, 15, treeTrunk);
            // Baumgipfel
            for (let color = 0; color < 3; color++) {
                // Dreieck zeichnen und mit Farbe füllen
                Vogelhaus.crc2.beginPath();
                Vogelhaus.crc2.moveTo(-50, treeTrunk);
                Vogelhaus.crc2.lineTo(60, treeTrunk);
                Vogelhaus.crc2.lineTo(10, treeTop);
                Vogelhaus.crc2.closePath();
                Vogelhaus.crc2.fillStyle = treeColor[color];
                Vogelhaus.crc2.fill();
                // Startposition des nächsten Dreiecks nach oben verschieben
                treeTrunk += -40;
                treeTop += -40;
            }
            x += stepMin + randomNumber(stepMin, stepMax);
            Vogelhaus.crc2.restore();
        } while (x < canvas.width);
    }
    function drawSnowman() {
        //Schneekugeln
        let radius = 40;
        let positionX = 300;
        let positionY = 350;
        for (let i = 0; i < 3; i++) {
            Vogelhaus.crc2.beginPath();
            Vogelhaus.crc2.arc(positionX, positionY, radius, 0, 2 * Math.PI);
            Vogelhaus.crc2.fillStyle = "white";
            Vogelhaus.crc2.fill();
            Vogelhaus.crc2.stroke();
            Vogelhaus.crc2.closePath();
            positionY = positionY + radius + 50;
            radius = radius + 10;
        }
        //Nase Linie
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.moveTo(300, 350);
        Vogelhaus.crc2.lineTo(305, 365);
        Vogelhaus.crc2.stroke();
        Vogelhaus.crc2.closePath();
        //Augen
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.arc(positionX - 10, positionY - 307, radius - 66, 0, 2 * Math.PI);
        Vogelhaus.crc2.fillStyle = "black";
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.closePath();
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.arc(positionX + 8, positionY - 307, radius - 66, 0, 2 * Math.PI);
        Vogelhaus.crc2.fillStyle = "black";
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.closePath();
        //Mund
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.arc(positionX + 3, positionY - 280, radius - 66, 0, 1 * Math.PI);
        Vogelhaus.crc2.stroke();
        Vogelhaus.crc2.closePath();
        //Knöpfe
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.arc(positionX + 1, positionY - 190, radius - 66, 0, 2 * Math.PI);
        Vogelhaus.crc2.fillStyle = "black";
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.closePath();
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.arc(positionX + 1, positionY - 210, radius - 66, 0, 2 * Math.PI);
        Vogelhaus.crc2.fillStyle = "black";
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.closePath();
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.arc(positionX + 1, positionY - 230, radius - 66, 0, 2 * Math.PI);
        Vogelhaus.crc2.fillStyle = "black";
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.closePath();
    }
    function drawsnowflakes() {
        console.log("snowflakes");
        for (let index = 0; index < 600; index++) {
            let randomx = Math.floor(Math.random() * (1000 - 1) + 1);
            let randomy = Math.floor(Math.random() * (700 - 1) + 1);
            let randomscale = Math.floor(Math.random() * (4 - 1) + 1);
            let r1 = 1;
            let r2 = 2;
            let gradient = Vogelhaus.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradient.addColorStop(0, "HSLA(0, 0%, 100%, 1)");
            gradient.addColorStop(1, "HSLA(240, 50%, 90%, 0)");
            Vogelhaus.crc2.save();
            Vogelhaus.crc2.scale(randomscale, randomscale);
            Vogelhaus.crc2.beginPath();
            Vogelhaus.crc2.translate(randomx, randomy);
            Vogelhaus.crc2.fillStyle = gradient;
            Vogelhaus.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
            Vogelhaus.crc2.fill();
            Vogelhaus.crc2.closePath();
            Vogelhaus.crc2.restore();
        }
    }
    function drawhouse(_position) {
        console.log("Vogelhaus");
        //Oberer Teil des Hauses
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        Vogelhaus.crc2.moveTo(-80, 0);
        Vogelhaus.crc2.lineTo(80, 0);
        Vogelhaus.crc2.lineTo(80, -120);
        Vogelhaus.crc2.lineTo(120, -120);
        Vogelhaus.crc2.lineTo(0, -180);
        Vogelhaus.crc2.lineTo(-120, -120);
        Vogelhaus.crc2.lineTo(-80, -120);
        Vogelhaus.crc2.fillStyle = "purple";
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.closePath();
        Vogelhaus.crc2.restore();
        //Unterer Teil des Hauses 
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        Vogelhaus.crc2.moveTo(-8, 0);
        Vogelhaus.crc2.lineTo(8, 0);
        Vogelhaus.crc2.lineTo(8, 50);
        Vogelhaus.crc2.lineTo(30, 110);
        Vogelhaus.crc2.lineTo(26, 110);
        Vogelhaus.crc2.lineTo(8, 80);
        Vogelhaus.crc2.lineTo(5, 110);
        Vogelhaus.crc2.lineTo(-5, 110);
        Vogelhaus.crc2.lineTo(-8, 80);
        Vogelhaus.crc2.lineTo(-26, 110);
        Vogelhaus.crc2.lineTo(-30, 110);
        Vogelhaus.crc2.lineTo(-8, 50);
        Vogelhaus.crc2.fillStyle = "lightpurple";
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.closePath();
        Vogelhaus.crc2.restore();
        let rhole = 32;
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        Vogelhaus.crc2.fillStyle = "beige";
        Vogelhaus.crc2.arc(0, -60, rhole, 0, 2 * Math.PI);
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.closePath();
        Vogelhaus.crc2.restore();
    }
    function drawbirdflying(_position) {
        for (let index = 0; index < 10; index++) {
            let positionx = Math.floor(Math.random() * (900 - 40) + 40);
            let positiony = Math.floor(Math.random() * (200 - 20) + 20);
            let randomscale = Math.floor(Math.random() * (3 - 0.5) + 0.5);
            Vogelhaus.crc2.save();
            Vogelhaus.crc2.beginPath();
            Vogelhaus.crc2.translate(positionx, positiony);
            Vogelhaus.crc2.scale(randomscale, randomscale);
            Vogelhaus.crc2.moveTo(1, 0);
            Vogelhaus.crc2.bezierCurveTo(8, -5, 15, -10, 20, -2);
            Vogelhaus.crc2.moveTo(-1, 0);
            Vogelhaus.crc2.bezierCurveTo(-8, -5, -15, -10, -20, -2);
            Vogelhaus.crc2.stroke();
            Vogelhaus.crc2.closePath();
            Vogelhaus.crc2.restore();
        }
    }
    //Funktion für Vögel auf dem Boden
    function drawbird(_position) {
        for (let index = 0; index < 9; index++) {
            let maxWidth = 800;
            let minWidth = 100;
            let minHeight = 515;
            let maxHeight = 530;
            let positionx = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth);
            let positiony = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
            //Unterkörper
            let radius2 = 15;
            Vogelhaus.crc2.beginPath();
            Vogelhaus.crc2.arc(positionx, positiony, radius2, 0, 2 * Math.PI);
            Vogelhaus.crc2.fillStyle = randomColor();
            Vogelhaus.crc2.fill();
            Vogelhaus.crc2.stroke();
            Vogelhaus.crc2.closePath();
            //Kopf
            let radius = 10;
            Vogelhaus.crc2.beginPath();
            Vogelhaus.crc2.arc(positionx - 10, positiony - 10, radius, 0, 2 * Math.PI);
            Vogelhaus.crc2.fillStyle = randomColor();
            Vogelhaus.crc2.fill();
            Vogelhaus.crc2.stroke();
            Vogelhaus.crc2.closePath();
            //Auge
            let radius3 = 1;
            Vogelhaus.crc2.beginPath();
            Vogelhaus.crc2.arc(positionx - 11, positiony - 11, radius3, 0, 2 * Math.PI);
            Vogelhaus.crc2.fillStyle = "black";
            Vogelhaus.crc2.fill();
            Vogelhaus.crc2.stroke();
            Vogelhaus.crc2.closePath();
            //Schnabel
            Vogelhaus.crc2.beginPath();
            Vogelhaus.crc2.moveTo(positionx - 20, positiony - 10);
            Vogelhaus.crc2.lineTo(positionx - 25, positiony - 5);
            Vogelhaus.crc2.stroke();
            Vogelhaus.crc2.closePath();
            Vogelhaus.crc2.beginPath();
            Vogelhaus.crc2.moveTo(positionx - 19, positiony - 5);
            Vogelhaus.crc2.lineTo(positionx - 25, positiony - 5);
            Vogelhaus.crc2.stroke();
            Vogelhaus.crc2.closePath();
            //Bein
            Vogelhaus.crc2.beginPath();
            Vogelhaus.crc2.moveTo(positionx, positiony + 5);
            Vogelhaus.crc2.lineTo(positionx, positiony + 20);
            Vogelhaus.crc2.stroke();
            Vogelhaus.crc2.closePath();
            //Fuß
            Vogelhaus.crc2.beginPath();
            Vogelhaus.crc2.moveTo(positionx, positiony + 20);
            Vogelhaus.crc2.lineTo(positionx - 5, positiony + 20);
            Vogelhaus.crc2.stroke();
            Vogelhaus.crc2.closePath();
        }
    }
    function drawbirdsitting(_position) {
        let positionx = 800;
        let positiony = 340;
        //Unterkörper
        let radius2 = 12;
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.arc(positionx, positiony, radius2, 0, 2 * Math.PI);
        Vogelhaus.crc2.fillStyle = randomColor();
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.stroke();
        Vogelhaus.crc2.closePath();
        //Kopf
        let radius = 10;
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.arc(positionx - 10, positiony - 10, radius, 0, 2 * Math.PI);
        Vogelhaus.crc2.fillStyle = randomColor();
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.stroke();
        Vogelhaus.crc2.closePath();
        //Auge
        let radius3 = 1;
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.arc(positionx - 11, positiony - 11, radius3, 0, 2 * Math.PI);
        Vogelhaus.crc2.fillStyle = "black";
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.stroke();
        Vogelhaus.crc2.closePath();
        //Schnabel
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.moveTo(positionx - 20, positiony - 10);
        Vogelhaus.crc2.lineTo(positionx - 25, positiony - 5);
        Vogelhaus.crc2.stroke();
        Vogelhaus.crc2.closePath();
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.moveTo(positionx - 19, positiony - 5);
        Vogelhaus.crc2.lineTo(positionx - 25, positiony - 5);
        Vogelhaus.crc2.stroke();
        Vogelhaus.crc2.closePath();
        //Bein
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.moveTo(positionx, positiony + 5);
        Vogelhaus.crc2.lineTo(positionx, positiony + 20);
        Vogelhaus.crc2.stroke();
        Vogelhaus.crc2.closePath();
        //Fuß
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.moveTo(positionx, positiony + 20);
        Vogelhaus.crc2.lineTo(positionx - 5, positiony + 20);
        Vogelhaus.crc2.stroke();
        Vogelhaus.crc2.closePath();
    }
    //Funktion zufällige Farbe 
    function randomColor() {
        let letters = "0123456789";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 10)];
        }
        return color;
    }
})(Vogelhaus || (Vogelhaus = {}));
//# sourceMappingURL=L08_2.js.map