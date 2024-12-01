namespace A08_Canvas {
    window.addEventListener("load", fillCanvas);

    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;

    function fillCanvas(_event: Event): void {
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        // Leinwand leeren
        crc2.clearRect(0, 0, canvas.width, canvas.height);

        // Hintergrundmuster zeichnen
        zeichneHintergrundmuster();

        // Vordergrundformen zeichnen
        let anzahlObjekte: number = zufallsZahl(30, 150);
        for (let i: number = 0; i < anzahlObjekte; i++) {
            zeichneFließendeForm();
        }

        // Event für neuen Button
        let neuerButton: HTMLElement = <HTMLElement>document.querySelector("button")!;
        neuerButton.addEventListener("click", fillCanvas);
    }

    // Zeichnet spiralförmige Muster als Hintergrund
    function zeichneHintergrundmuster(): void {
        let farben: string[] = ["#2E4A62", "#8B572A", "#E8C547", "#A1D2CE", "#D9BF77"];
        let anzahlSpiralen: number = zufallsZahl(3, 6);

        for (let i: number = 0; i < anzahlSpiralen; i++) {
            let zentrumX: number = zufallsZahl(0, canvas.width);
            let zentrumY: number = zufallsZahl(0, canvas.height);
            let maxRadius: number = zufallsZahl(50, 300);
            let linienbreite: number = zufallsZahl(1, 5);

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
    function zeichneFließendeForm(): void {
        let x: number = zufallsZahl(0, canvas.width);
        let y: number = zufallsZahl(0, canvas.height);

        crc2.save();
        crc2.translate(x, y);

        // Farbverlauf für die Linien
        let gradient = crc2.createLinearGradient(-50, -50, 50, 50);
        gradient.addColorStop(0, zufallsFarbe());
        gradient.addColorStop(1, zufallsFarbe());
        crc2.strokeStyle = gradient;
        crc2.lineWidth = zufallsZahl(1, 4);

        let anzahlLinien: number = zufallsZahl(20, 50);
        let versatz: number = zufallsZahl(5, 15);

        for (let i = 0; i < anzahlLinien; i++) {
            crc2.beginPath();
            crc2.moveTo(0, 0);
            crc2.quadraticCurveTo(
                zufallsZahl(-versatz, versatz),
                zufallsZahl(-versatz, versatz),
                zufallsZahl(-versatz * 5, versatz * 5),
                zufallsZahl(-versatz * 5, versatz * 5)
            );
            crc2.stroke();
        }

        crc2.restore();
    }

    // Gibt eine zufällige Zahl in einem Bereich zurück
    function zufallsZahl(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    // Gibt eine zufällige Farbe im Hexadezimal-Format zurück
    function zufallsFarbe(): string {
        let buchstaben: string = "0123456789ABCDEF";
        let farbe: string = "#";
        for (let i: number = 0; i < 6; i++) {
            farbe += buchstaben[Math.floor(Math.random() * 16)];
        }
        return farbe;
    }
}