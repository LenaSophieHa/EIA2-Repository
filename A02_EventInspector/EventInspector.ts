namespace EventsInspector {

    // Event-Listener, der die handleLoad-Funktion ausführt, wenn die Seite vollständig geladen ist.
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        // Referenzen auf die HTML-Elemente: body, div0, div1, und button
        let body: HTMLElement = <HTMLElement>document.body;
        let div0: HTMLDivElement = <HTMLDivElement>document.querySelector("#div0");
        let div1: HTMLDivElement = <HTMLDivElement>document.querySelector("#div1");
        let button: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button");

        // Fügt einen Event-Listener hinzu, der die setInfoBox-Funktion bei Mausbewegungen ausführt.
        document.addEventListener("mousemove", setInfoBox);

        // Fügt Event-Listener für Klick- und Tastaturereignisse auf verschiedenen Elementen hinzu.
        // Diese Listener loggen Informationen über die Ereignisse in die Konsole.
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);
        body.addEventListener("click", logInfo);
        body.addEventListener("keyup", logInfo);
        div0.addEventListener("click", logInfo);
        div0.addEventListener("keyup", logInfo);
        div1.addEventListener("click", logInfo);
        div1.addEventListener("keyup", logInfo);

        // Fügt einen Klick-Event-Listener auf den Button hinzu, der ein benutzerdefiniertes Event auslöst.
        button.addEventListener("click", customEvent);

        // Fügt einen Event-Listener hinzu, der auf das benutzerdefinierte "petTheCat"-Event reagiert.
        document.addEventListener("petTheCat", logInfo);
    }

    function setInfoBox(_event: MouseEvent): void {
        // Holt die x- und y-Koordinaten der Mauszeigerposition.
        let x: number = _event.clientX;
        let y: number = _event.clientY;

        // Das Ziel-Element des Mauszeigerereignisses.
        let target: EventTarget = _event.target;

        // Holt das <span>-Element, das als Info-Box dient.
        let span: HTMLSpanElement = <HTMLSpanElement>document.querySelector("span");

        // Definiert den Offset der Info-Box zur Mauszeigerposition.
        let offset: number = 10;

        // Setzt die Position und den Inhalt der Info-Box.
        span.style.left = (x + offset) + "px";
        span.style.top = (y + offset) + "px";
        span.innerHTML = "x: " + x + "<br>" + "y: " + y + "<br>" + "target: " + target;
    }

    function logInfo(_event: Event): void {
        // Loggt den Typ des Ereignisses in die Konsole (z.B. "click" oder "keyup").
        console.log(_event.type);

        // Loggt das Ziel-Element des Ereignisses in die Konsole.
        console.log(_event.target);

        // Loggt das aktuelle Ziel (das Element, an dem der Event-Listener angebracht wurde) in die Konsole.
        console.log(_event.currentTarget);

        // Loggt das gesamte Ereignisobjekt in die Konsole.
        console.log(_event);
    }

    function customEvent(_event: Event): void {
        // Speichert eine Referenz auf den Button, der das Event ausgelöst hat.
        let button: HTMLButtonElement = <HTMLButtonElement>_event.target;

        // Erstellt ein neues benutzerdefiniertes Event "petTheCat", das im DOM aufsteigt (bubbles: true).
        let newEvent: CustomEvent = new CustomEvent("petTheCat", { bubbles: true });

        // Löst das benutzerdefinierte Event am Button-Element aus.
        button.dispatchEvent(newEvent);
    }
}