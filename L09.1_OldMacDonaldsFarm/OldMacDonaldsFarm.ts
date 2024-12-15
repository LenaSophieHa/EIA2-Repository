namespace Farm {

    // Klasse Animal repräsentiert ein Tier auf dem Bauernhof
    class Animal {
        name: string; // Name des Tieres
        breed: string; // Tierart (z. B. Kuh, Hund)
        foodtype: string; // Art des Futters, das das Tier benötigt
        sound: string; // Geräusch, das das Tier macht
        foodneed: number; // Futterbedarf des Tieres pro Tag (in kg)

        // Konstruktor initialisiert ein neues Tier mit den gegebenen Eigenschaften
        constructor(_name: string, _breed: string, _foodtype: string, _sound: string, _foodneed: number) {
            this.name = _name;
            this.breed = _breed;
            this.foodtype = _foodtype;
            this.sound = _sound;
            this.foodneed = _foodneed;
        }
    }

    // Array, das alle Tiere auf dem Bauernhof speichert
    let animals: Animal[] = [];

    // Interface für die Struktur des Futterinventars
    interface Food {
        greens: number; // Grünfutter
        corn: number; // Mais
        carrots: number; // Karotten
        meat: number; // Fleisch
        fish: number; // Fisch
    }

    // Aktueller Futterbestand des Bauernhofs
    let currentFood: Food = {
        greens: 200,
        corn: 300,
        carrots: 400,
        meat: 550,
        fish: 350
    };

    // Event-Listener, der die Funktion handleLoad ausführt, sobald die Seite geladen ist
    window.addEventListener("load", handleLoad);

    // Funktion wird beim Laden der Seite aufgerufen
    function handleLoad(_event: Event): void {
        loadAnimals(); // Tiere erstellen und anzeigen
        feedAnimals(); // Tiere füttern und ihre Aktionen darstellen

        // Futterbestand manuell anpassen
        currentFood.greens = 190;
        currentFood.meat = 538;
        currentFood.fish = 345;
        currentFood.corn = 270;
        currentFood.carrots = 375;

        // Event-Listener für den Button "Nächster Tag"
        document.querySelector("#nextDay").addEventListener("click", foodForAnimal);
    }

    // Funktion erstellt Tiere und zeigt sie im DOM an
    function loadAnimals(): void {
        // Erstellen von Tierobjekten
        let cow: Animal = new Animal("Bonta", "cow", "greens", "moo", 10);
        let dog: Animal = new Animal("Bello", "dog", "meat", "woof", 12);
        let cat: Animal = new Animal("snow", "cat", "fish", "miauz", 5);
        let chicken: Animal = new Animal("chicka", "chicken", "corn", "bock", 30);
        let pig: Animal = new Animal("rose", "pig", "carrots", "quick", 25);

        // Hinzufügen der Tiere zum Array animals
        animals.push(cow);
        animals.push(dog);
        animals.push(cat);
        animals.push(chicken);
        animals.push(pig);

        // Referenzen auf DOM-Elemente der Tiere
        let cowDiv: HTMLElement = document.getElementById("cow");
        let dogDiv: HTMLElement = document.getElementById("dog");
        let catDiv: HTMLElement = document.getElementById("cat");
        let chickenDiv: HTMLElement = document.getElementById("chicken");
        let pigDiv: HTMLElement = document.getElementById("pig");

        // Anzeige der Tierarten
        cowDiv.innerHTML = cow.breed + "<br>";
        dogDiv.innerHTML = dog.breed + "<br>";
        catDiv.innerHTML = cat.breed + "<br>";
        chickenDiv.innerHTML = chicken.breed + "<br>";
        pigDiv.innerHTML = pig.breed + "<br>";
    }

    // Funktion füttert die Tiere und zeigt ihre Aktionen an
    function feedAnimals(): void {
        let cowDiv: HTMLElement = document.getElementById("cow");
        let dogDiv: HTMLElement = document.getElementById("dog");
        let catDiv: HTMLElement = document.getElementById("cat");
        let chickenDiv: HTMLElement = document.getElementById("chicken");
        let pigDiv: HTMLElement = document.getElementById("pig");

        // Hinzufügen von Text über das Fressen und das Lied der Tiere
        cowDiv.innerHTML += `${animals[0].name} ate ${animals[0].foodneed} kg of ${animals[0].foodtype}<br>`;
        dogDiv.innerHTML += `${animals[1].name} ate ${animals[1].foodneed} kg of ${animals[1].foodtype}<br>`;
        catDiv.innerHTML += `${animals[2].name} ate ${animals[2].foodneed} kg of ${animals[2].foodtype}<br>`;
        chickenDiv.innerHTML += `${animals[3].name} ate ${animals[3].foodneed} kg of ${animals[3].foodtype}<br>`;
        pigDiv.innerHTML += `${animals[4].name} ate ${animals[4].foodneed} kg of ${animals[4].foodtype}<br>`;

        foodForAnimal(); // Aktualisiert den Futterbestand
    }

    // Funktion berechnet den verbleibenden Futterbestand
    function foodForAnimal(): void {
        // Futterbedarf der Tiere vom Bestand abziehen
        currentFood.greens -= animals[0].foodneed;
        currentFood.meat -= animals[1].foodneed;
        currentFood.fish -= animals[2].foodneed;
        currentFood.corn -= animals[3].foodneed;
        currentFood.carrots -= animals[4].foodneed;

        // Überprüfen, ob Futterbestand aufgebraucht ist
        for (const [key, foodAmount] of Object.entries(currentFood)) {
            if (foodAmount <= 0) {
                alert("no more food!"); // Warnung bei leerem Bestand
                window.location.reload(); // Seite neu laden
            }
        }

        // Futterbestand im DOM anzeigen
        let inventoryDiv: HTMLElement = document.getElementById("inventory");
        inventoryDiv.innerHTML = `Inventory:<br>
            ${currentFood.greens} kg greens <br>
            ${currentFood.meat} kg meat <br>
            ${currentFood.fish} kg fish <br>
            ${currentFood.corn} kg corn <br>
            ${currentFood.carrots} kg carrots<br>`;
    }
}