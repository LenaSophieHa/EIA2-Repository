window.addEventListener("load", initialize);

interface Task {
    Product: string;
    Amount: number;
    Comment: string;
    Checkboxdate: boolean;
}

const serverUrl = "https://7c8644f9-f81d-49cd-980b-1883574694b6.fr.bw-cloud-instance.org/lha45131/";
const collection = "shopping_list"; // Name der Sammlung

// Initialisierungsfunktion
async function initialize(): Promise<void> {
    await checkAndCreateCollection(collection);

    const addButton = document.getElementById("add") as HTMLButtonElement;
    addButton?.addEventListener("click", (event) => {
        event.preventDefault();
        addItem();
    });

    const response = await fetch(`${serverUrl}?command=find&collection=${collection}`);
    const result = await response.json();
    if (result.status === "success") {
        loadTasks(result.data); // Aufgaben laden
    } else {
        console.error("Fehler beim Laden der Daten:", result.data);
    }
}

// Prüft, ob die Sammlung existiert, und erstellt sie, falls nicht
async function checkAndCreateCollection(collection: string): Promise<void> {
    const response = await fetch(`${serverUrl}?command=show`);
    const result = await response.json();
    if (result.status === "success") {
        const collections: string[] = result.data;
        if (!collections.includes(collection)) {
            console.log(`Collection "${collection}" existiert nicht. Erstelle...`);
            await fetch(`${serverUrl}?command=create&collection=${collection}`);
        } else {
            console.log(`Collection "${collection}" existiert bereits.`);
        }
    } else {
        console.error("Fehler beim Abrufen der Collections:", result.data);
    }
}

// Lädt Aufgaben und zeigt sie an
function loadTasks(tasks: Record<string, Task>): void {
    Object.keys(tasks).forEach((id) => {
        createTaskElement(id, tasks[id]);
    });
}

// Erstellt ein neues Aufgaben-Element und fügt es zum DOM hinzu
function createTaskElement(id: string, task: Task): void {
    const outputContainer = document.getElementById("alloutputs") as HTMLDivElement;
    if (!outputContainer) return;

    const taskElement = document.createElement("div");
    taskElement.classList.add("inputData");

    const today = new Date();
    const nextPurchase = task.Checkboxdate ? " buy" : "";

    // HTML-Inhalt
    taskElement.innerHTML = `
        ${today.toLocaleDateString()}   ${task.Product}   ${task.Amount}   ${task.Comment}   ${nextPurchase}
        <input type="checkbox" class="checkbox1" ${task.Checkboxdate ? "checked" : ""}>
        <div class="edit"><i id="edit" class="fa-regular fa-pen-to-square"></i></div>
        <div><i id="trash" class="fa-solid fa-trash-can"></i></div>
    `;

    // Checkbox-Event
    const checkbox = taskElement.querySelector(".checkbox1") as HTMLInputElement;
    checkbox.addEventListener("change", () => {
        task.Checkboxdate = checkbox.checked;
        updateTask(id, task);
    });

    // Lösch-Button
    const trash = taskElement.querySelector("#trash") as HTMLElement;
    trash.addEventListener("click", () => deleteTask(taskElement, id));

    // Bearbeitungs-Button
    const edit = taskElement.querySelector("#edit") as HTMLElement;
    edit.addEventListener("click", () => editTask(task, id));

    outputContainer.appendChild(taskElement);
}

// Fügt eine neue Aufgabe hinzu
function addItem(): void {
    const productInput = document.getElementById("inputproduct") as HTMLInputElement;
    const amountInput = document.getElementById("amount") as HTMLInputElement;
    const commentInput = document.getElementById("inputcomment") as HTMLInputElement;
    const checkboxDate = document.getElementById("checkboxdate") as HTMLInputElement;

    const task: Task = {
        Product: productInput.value,
        Amount: Number(amountInput.value),
        Comment: commentInput.value,
        Checkboxdate: checkboxDate.checked,
    };

    sendTaskToServer(task);
}

// Sendet eine neue Aufgabe an den Server
async function sendTaskToServer(task: Task): Promise<void> {
    const query = new URLSearchParams({
        command: "insert",
        collection: collection,
        data: JSON.stringify(task),
    });

    const response = await fetch(`${serverUrl}?${query.toString()}`);
    const result = await response.json();
    if (result.status === "success") {
        console.log("Aufgabe erfolgreich hinzugefügt:", result.data);
        const id = result.data.id;
        createTaskElement(id, task);
    } else {
        console.error("Fehler beim Hinzufügen:", result.data);
    }
}

// Aktualisiert eine Aufgabe auf dem Server
async function updateTask(id: string, task: Task): Promise<void> {
    const query = new URLSearchParams({
        command: "update",
        collection: collection,
        id: id,
        data: JSON.stringify(task),
    });

    const response = await fetch(`${serverUrl}?${query.toString()}`);
    const result = await response.json();
    if (result.status === "success") {
        console.log("Aufgabe erfolgreich aktualisiert:", result.data);
    } else {
        console.error("Fehler beim Aktualisieren:", result.data);
    }
}

// Löscht eine Aufgabe auf dem Server
async function deleteTask(taskElement: HTMLDivElement, id: string): Promise<void> {
    const query = new URLSearchParams({
        command: "delete",
        collection: collection,
        id: id,
    });

    const response = await fetch(`${serverUrl}?${query.toString()}`);
    const result = await response.json();
    if (result.status === "success") {
        console.log("Aufgabe erfolgreich gelöscht:", result.data);
        taskElement.remove();
    } else {
        console.error("Fehler beim Löschen:", result.data);
    }
}

// Bearbeitet eine Aufgabe
function editTask(task: Task, id: string): void {
    const productInput = document.getElementById("inputproduct") as HTMLInputElement;
    const amountInput = document.getElementById("amount") as HTMLInputElement;
    const commentInput = document.getElementById("inputcomment") as HTMLInputElement;
    const checkboxDate = document.getElementById("checkboxdate") as HTMLInputElement;

    productInput.value = task.Product;
    amountInput.value = task.Amount.toString();
    commentInput.value = task.Comment;
    checkboxDate.checked = task.Checkboxdate;

    deleteTask(document.querySelector(`[data-id="${id}"]`) as HTMLDivElement, id);
}