"use strict";
var A08_Canvas;
(function (A08_Canvas) {
    window.addEventListener("load", fillCanvas);
    let canvas;
    let crc2;
    function fillCanvas(_event) {
        canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        // Leinwand leeren
        crc2.clearRect(0, 0, canvas.width, canvas.height);
        // Hintergrundmuster zeichnen
        zeichneHintergrundmuster();
        // Vordergrundformen zeichnen
        let anzahlObjekte = zufallsZahl(30, 150);
        for (let i = 0; i < anzahlObjekte; i++) {
            zeichneFließendeForm();
        }
        // Event für neuen Button
        let neuerButton = document.querySelector("button");
        neuerButton.addEventListener("click", fillCanvas);
    }
    // Zeichnet spiralförmige Muster als Hintergrund
    function zeichneHintergrundmuster() {
        let farben = ["#2E4A62", "#8B572A", "#E8C547", "#A1D2CE", "#D9BF77"];
        let anzahlSpiralen = zufallsZahl(3, 6);
        for (let i = 0; i < anzahlSpiralen; i++) {
            let zentrumX = zufallsZahl(0, canvas.width);
            let zentrumY = zufallsZahl(0, canvas.height);
            let maxRadius = zufallsZahl(50, 300);
            let linienbreite = zufallsZahl(1, 5);
            crc2.save();
            crc2.strokeStyle = farben[i % farben.length];
            crc2.lineWidth = linienbreite;
            for (let winkel = 0; winkel < Math.PI * 4; winkel += 0.1) {
                let radius = (winkel / (Math.PI * 4)) * maxRadius;
                let x = zentrumX + Math.cos(winkel) * radius;
                let y = zentrumY + Math.sin(winkel) * radius;
                crc2.beginPath();
                crc2.moveTo(zentrumX, zentrumY);
                crc2.lineTo(x, y);
                crc2.stroke();
            }
            crc2.restore();
        }
    }
    // Zeichnet eine fließende Form im Vordergrund
    function zeichneFließendeForm() {
        let x = zufallsZahl(0, canvas.width);
        let y = zufallsZahl(0, canvas.height);
        crc2.save();
        crc2.translate(x, y);
        // Farbverlauf für die Linien
        let gradient = crc2.createLinearGradient(-50, -50, 50, 50);
        gradient.addColorStop(0, zufallsFarbe());
        gradient.addColorStop(1, zufallsFarbe());
        crc2.strokeStyle = gradient;
        crc2.lineWidth = zufallsZahl(1, 4);
        let anzahlLinien = zufallsZahl(20, 50);
        let versatz = zufallsZahl(5, 15);
        for (let i = 0; i < anzahlLinien; i++) {
            crc2.beginPath();
            crc2.moveTo(0, 0);
            crc2.quadraticCurveTo(zufallsZahl(-versatz, versatz), zufallsZahl(-versatz, versatz), zufallsZahl(-versatz * 5, versatz * 5), zufallsZahl(-versatz * 5, versatz * 5));
            crc2.stroke();
        }
        crc2.restore();
    }
    // Gibt eine zufällige Zahl in einem Bereich zurück
    function zufallsZahl(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    // Gibt eine zufällige Farbe im Hexadezimal-Format zurück
    function zufallsFarbe() {
        let buchstaben = "0123456789ABCDEF";
        let farbe = "#";
        for (let i = 0; i < 6; i++) {
            farbe += buchstaben[Math.floor(Math.random() * 16)];
        }
        return farbe;
    }
})(A08_Canvas || (A08_Canvas = {}));
//# sourceMappingURL=canvas.js.map