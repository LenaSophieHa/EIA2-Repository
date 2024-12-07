"use strict";
var Flagn;
(function (Flagn) {
    window.addEventListener("load", handleLoad); // Fügt einen Event-Listener hinzu, der die Funktion "handleLoad" aufruft.
    let crc2; // Deklariert eine Variable "crc2" vom Typ CanvasRenderingContext2D
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas"); // Versucht, das erste <canvas>-Element im HTML-Dokument auszuwählen.
        if (!canvas) // Wenn kein <canvas> gefunden wurde, wird die Funktion beendet.
            return;
        crc2 = canvas.getContext("2d"); // Holt sich den 2D-Zeichenkontext des Canvas und castet ihn in den Typ CanvasRenderingContext2D.
        drawFlag(); // Ruft die Funktion drawFlag auf, um die Flagge zu zeichnen.
    }
    function drawFlag() {
        let gradient = crc2.createLinearGradient(0, 0, 0, 100); // Erstellt einen linearen Farbverlauf, der von (0, 0) nach (0, 100) verläuft.
        gradient.addColorStop(0, "black"); // Fügt der Position 0 im Farbverlauf die Farbe "schwarz" hinzu.
        gradient.addColorStop(0.5, "red");
        gradient.addColorStop(1, "gold");
        crc2.fillStyle = gradient; // Setzt Füllfarbe auf Farbverlauf.
        crc2.fillRect(0, 0, 200, 100); // Zeichnet ein Rechteck mit den Koordinaten (0, 0) und einer Größe von 200x100 Pixeln auf das Canvas.
    }
})(Flagn || (Flagn = {}));
//# sourceMappingURL=index.js.map