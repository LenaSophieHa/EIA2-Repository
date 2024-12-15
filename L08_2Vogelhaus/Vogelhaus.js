"use strict";
var Vogelhaus;
(function (Vogelhaus) {
    // Generiert eine Zufallszahl zwischen einem angegebenen Minimum (_min) und Maximum (_max)
    function randomNumber(_min, _max) {
        return Math.random() * (_max - _min) + _min;
    }
    window.addEventListener("load", createCanvas);
    let canvas;
    // Erstellt das Canvas und fügt Event-Listener für Größenänderungen hinzu
    function createCanvas(_event) {
        canvas = document.querySelector("canvas");
        Vogelhaus.crc2 = canvas.getContext("2d");
        // Event-Listener für Fenstergröße und Orientierung
        window.addEventListener("resize", fillCanvas, false);
        window.addEventListener("orientationchange", fillCanvas, false);
        fillCanvas();
    }
    // Wird aufgerufen, um das Canvas mit Inhalt zu füllen
    function fillCanvas() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        let horizon = canvas.height * 0.38; // Position des Horizonts
        let posMountains = { x: 0, y: horizon }; // Startposition der Berge
        // Zeichnet alle Elemente auf das Canvas
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
    // Zeichnet den Hintergrund: Himmel und schneebedeckte Wiese
    function drawBackground(_horizon) {
        // Himmel
        let gradientSky = Vogelhaus.crc2.createLinearGradient(0, 0, 0, _horizon);
        gradientSky.addColorStop(0, "skyblue");
        gradientSky.addColorStop(1, "grey");
        Vogelhaus.crc2.fillStyle = gradientSky;
        Vogelhaus.crc2.fillRect(0, 0, canvas.width, _horizon);
        // Wiese
        let gradientMeadow = Vogelhaus.crc2.createLinearGradient(0, _horizon, 0, canvas.height);
        gradientMeadow.addColorStop(0, "white");
        gradientMeadow.addColorStop(1, "grey");
        Vogelhaus.crc2.fillStyle = gradientMeadow;
        Vogelhaus.crc2.fillRect(0, _horizon, canvas.width, canvas.height);
    }
    // Zeichnet die Sonne an der angegebenen Position
    function drawSun(_position) {
        let r1 = canvas.width * 0.02; // Innerer Radius der Sonne
        let r2 = canvas.width * 0.06; // Äußerer Radius der Sonne
        let gradient = Vogelhaus.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 60%, 0)");
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        Vogelhaus.crc2.fillStyle = gradient;
        Vogelhaus.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.restore();
    }
    // Zeichnet eine Wolke basierend auf Position und Größe
    function drawCloud(_position, _size) {
        let nParticles = 40; // Anzahl der Partikel, aus denen die Wolke besteht
        let radiusParticle = 60; // Radius eines Partikels
        let particle = new Path2D();
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        let gradient = Vogelhaus.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        Vogelhaus.crc2.fillStyle = gradient;
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        // Platziert jedes Partikel an einer zufälligen Position innerhalb der Wolkenbegrenzung
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
    // Zeichnet Berge in einer bestimmten Farbe und Größe
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        let stepMin = 10; // Minimaler Abstand zwischen Berggipfeln
        let stepMax = 20; // Maximaler Abstand
        let x = 0;
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.moveTo(0, 0);
        Vogelhaus.crc2.lineTo(0, -_max);
        // Zeichnet die einzelnen Gipfel
        do {
            x += stepMin + randomNumber(stepMin, stepMax);
            let y = -randomNumber(_min, _max);
            Vogelhaus.crc2.lineTo(x, y);
        } while (x < canvas.width);
        Vogelhaus.crc2.lineTo(x, 0);
        Vogelhaus.crc2.closePath();
        // Farbverlauf der Berge
        let gradient = Vogelhaus.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.9, _colorHigh);
        Vogelhaus.crc2.fillStyle = gradient;
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.restore();
    }
    // Zeichnet eine Reihe von Bäumen an zufälligen Positionen
    function drawTrees(_min, _max) {
        let stepMin = 5; // Minimaler Abstand zwischen den Bäumen
        let stepMax = 15; // Maximaler Abstand
        let x = 0;
        do {
            let y = randomNumber(_min, _max);
            Vogelhaus.crc2.save();
            Vogelhaus.crc2.translate(x, y + canvas.height * 0.39);
            let treeTrunk = -30; // Höhe des Baumstamms
            let treeTop = -150; // Höhe des Baumgipfels
            let treeColor = ["#1d5d18", "#22691d", "#267121"]; // Verschiedene Grüntöne für die Baumkronen
            let treeSize = randomNumber(0.15, 0.2); // Skalierung des Baums
            Vogelhaus.crc2.scale(treeSize, treeSize);
            // Baumstamm zeichnen
            Vogelhaus.crc2.fillStyle = "#6d502b";
            Vogelhaus.crc2.fillRect(0, 0, 15, treeTrunk);
            // Baumkrone zeichnen
            for (let color = 0; color < 3; color++) {
                Vogelhaus.crc2.beginPath();
                Vogelhaus.crc2.moveTo(-50, treeTrunk);
                Vogelhaus.crc2.lineTo(60, treeTrunk);
                Vogelhaus.crc2.lineTo(10, treeTop);
                Vogelhaus.crc2.closePath();
                Vogelhaus.crc2.fillStyle = treeColor[color];
                Vogelhaus.crc2.fill();
                treeTrunk -= 40;
                treeTop -= 40;
            }
            x += stepMin + randomNumber(stepMin, stepMax);
            Vogelhaus.crc2.restore();
        } while (x < canvas.width);
    }
    // Zeichnet einen Schneemann
    function drawSnowman() {
    }
    // Zeichnet Schneeflocken
    function drawsnowflakes() {
    }
    // Zeichnet ein Vogelhaus
    function drawhouse(_position) {
    }
    // Zeichnet fliegende Vögel
    function drawbirdflying(_position) {
    }
    // Zeichnet Vögel auf dem Boden
    function drawbird(_position) {
    }
    // Zeichnet sitzende Vögel
    function drawbirdsitting(_position) {
    }
    // Generiert eine zufällige Farbe
    function randomColor() {
        let letters = "0123456789";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 10)];
        }
        return color;
    }
})(Vogelhaus || (Vogelhaus = {}));
//# sourceMappingURL=Vogelhaus.js.map