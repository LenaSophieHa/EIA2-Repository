namespace Vogelhaus {

    // Interface für Vektoren mit x- und y-Koordinaten
    interface Vector {
        x: number;
        y: number;
    }

    // Generiert eine Zufallszahl zwischen einem angegebenen Minimum (_min) und Maximum (_max)
    function randomNumber(_min: number, _max: number): number {
        return Math.random() * (_max - _min) + _min;
    }

    window.addEventListener("load", createCanvas);

    let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;

    // Erstellt das Canvas und fügt Event-Listener für Größenänderungen hinzu
    function createCanvas(_event: Event): void {
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        // Event-Listener für Fenstergröße und Orientierung
        window.addEventListener("resize", fillCanvas, false);
        window.addEventListener("orientationchange", fillCanvas, false);

        fillCanvas();
    }

    // Wird aufgerufen, um das Canvas mit Inhalt zu füllen
    function fillCanvas(): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas) return;

        let horizon: number = canvas.height * 0.38; // Position des Horizonts
        let posMountains: Vector = { x: 0, y: horizon }; // Startposition der Berge

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
    function drawBackground(_horizon: number): void {
        // Himmel
        let gradientSky: CanvasGradient = crc2.createLinearGradient(0, 0, 0, _horizon);
        gradientSky.addColorStop(0, "skyblue");
        gradientSky.addColorStop(1, "grey");
        crc2.fillStyle = gradientSky;
        crc2.fillRect(0, 0, canvas.width, _horizon);

        // Wiese
        let gradientMeadow: CanvasGradient = crc2.createLinearGradient(0, _horizon, 0, canvas.height);
        gradientMeadow.addColorStop(0, "white");
        gradientMeadow.addColorStop(1, "grey");
        crc2.fillStyle = gradientMeadow;
        crc2.fillRect(0, _horizon, canvas.width, canvas.height);
    }

    // Zeichnet die Sonne an der angegebenen Position
    function drawSun(_position: Vector): void {
        let r1: number = canvas.width * 0.02; // Innerer Radius der Sonne
        let r2: number = canvas.width * 0.06; // Äußerer Radius der Sonne
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 60%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }

    // Zeichnet eine Wolke basierend auf Position und Größe
    function drawCloud(_position: Vector, _size: Vector): void {
        let nParticles: number = 40; // Anzahl der Partikel, aus denen die Wolke besteht
        let radiusParticle: number = 60; // Radius eines Partikels
        let particle: Path2D = new Path2D();
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);

        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        crc2.fillStyle = gradient;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        // Platziert jedes Partikel an einer zufälligen Position innerhalb der Wolkenbegrenzung
        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }

        crc2.restore();
    }

    // Zeichnet Berge in einer bestimmten Farbe und Größe
    function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string): void {
        let stepMin: number = 10; // Minimaler Abstand zwischen Berggipfeln
        let stepMax: number = 20; // Maximaler Abstand
        let x: number = 0;

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);

        // Zeichnet die einzelnen Gipfel
        do {
            x += stepMin + randomNumber(stepMin, stepMax);
            let y: number = -randomNumber(_min, _max);
            crc2.lineTo(x, y);
        } while (x < canvas.width);

        crc2.lineTo(x, 0);
        crc2.closePath();

        // Farbverlauf der Berge
        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.9, _colorHigh);

        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }

    // Zeichnet eine Reihe von Bäumen an zufälligen Positionen
    function drawTrees(_min: number, _max: number): void {
        let stepMin: number = 5; // Minimaler Abstand zwischen den Bäumen
        let stepMax: number = 15; // Maximaler Abstand
        let x: number = 0;

        do {
            let y: number = randomNumber(_min, _max);
            crc2.save();
            crc2.translate(x, y + canvas.height * 0.39);

            let treeTrunk: number = -30; // Höhe des Baumstamms
            let treeTop: number = -150; // Höhe des Baumgipfels
            let treeColor: string[] = ["#1d5d18", "#22691d", "#267121"]; // Verschiedene Grüntöne für die Baumkronen
            let treeSize: number = randomNumber(0.15, 0.2); // Skalierung des Baums

            crc2.scale(treeSize, treeSize);

            // Baumstamm zeichnen
            crc2.fillStyle = "#6d502b";
            crc2.fillRect(0, 0, 15, treeTrunk);

            // Baumkrone zeichnen
            for (let color: number = 0; color < 3; color++) {
                crc2.beginPath();
                crc2.moveTo(-50, treeTrunk);
                crc2.lineTo(60, treeTrunk);
                crc2.lineTo(10, treeTop);
                crc2.closePath();
                crc2.fillStyle = treeColor[color];
                crc2.fill();

                treeTrunk -= 40;
                treeTop -= 40;
            }

            x += stepMin + randomNumber(stepMin, stepMax);
            crc2.restore();
        } while (x < canvas.width);
    }

    // Zeichnet einen Schneemann
    function drawSnowman(): void {
        
    }

    // Zeichnet Schneeflocken
    function drawsnowflakes(): void {
        
    }

    // Zeichnet ein Vogelhaus
    function drawhouse(_position: Vector): void {
        
    }

    // Zeichnet fliegende Vögel
    function drawbirdflying(_position: Vector): void {
        
    }

    // Zeichnet Vögel auf dem Boden
    function drawbird(_position: Vector): void {
        
    }

    // Zeichnet sitzende Vögel
    function drawbirdsitting(_position: Vector): void {
    
    }

    // Generiert eine zufällige Farbe
    function randomColor(): string {
        let letters: string = "0123456789";
        let color: string = "#";
        for (let i: number = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 10)];
        }
        return color;
    }
}