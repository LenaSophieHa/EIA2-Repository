"use strict";
(async function () {
    const serverUrl = "https://7c8644f9-f81d-49cd-980b-1883574694b6.fr.bw-cloud-instance.org/lha45131/";

    window.addEventListener("load", initialize);

    // Initialisierungsfunktion zum Setzen der Event-Listener
    async function initialize() {
        const addButton = document.getElementById("addTaskButton");
        addButton?.addEventListener("click", (event) => {
            event.preventDefault();
            addItem();
        });

        // Lade bestehende Aufgaben aus der Datenbank
        const response = await fetch(`${serverUrl}?command=find&collection=data`);
        const data = await response.json();
        loadTasks(data.data); // Lade Aufgaben aus der Datenbank
    }

    // Funktion zum Laden von Aufgaben
    function loadTasks(tasks) {
        tasks.forEach((task) => createTaskElement(task));
    }

    // Funktion zum Erstellen eines neuen Aufgaben-Elements
    function createTaskElement(task) {
        const taskContainer = document.getElementById("taskContainer");
        if (!taskContainer) return;

        const taskElement = document.createElement("div");
        taskElement.classList.add("task-item");

        const deadline = new Date(task.deadline);
        if (deadline < new Date()) {
            taskElement.classList.add("expired");
        } else {
            taskElement.classList.add("in-progress");
        }

        taskElement.innerHTML = `
            <div class="task-details">
                <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""}>
                <div><strong>Name:</strong> ${task.name}</div>
                <div><strong>Title:</strong> ${task.title}</div>
                <div><strong>Deadline:</strong> ${deadline.toLocaleDateString()}</div>
                <div><strong>Comment:</strong> ${task.comment}</div>
            </div>
            <button class="delete-task-btn">Delete</button>
            <button class="edit-task-btn">Edit</button>
        `;

        // Event-Listener für Checkbox
        const checkbox = taskElement.querySelector(".task-checkbox");
        checkbox.addEventListener("change", () => {
            taskElement.classList.toggle("completed", checkbox.checked);
            updateTask(task, { completed: checkbox.checked });
        });

        // Event-Listener für Löschbutton
        const deleteButton = taskElement.querySelector(".delete-task-btn");
        deleteButton.addEventListener("click", () => deleteItem(taskElement, task._id));

        // Event-Listener für Bearbeitungsbutton
        const editButton = taskElement.querySelector(".edit-task-btn");
        editButton.addEventListener("click", () => editItem(taskElement, task));

        taskContainer.appendChild(taskElement);
    }

    // Funktion zum Löschen eines Aufgaben-Elements
    async function deleteItem(taskElement, id) {
        taskElement.remove();
        const query = new URLSearchParams({ command: "delete", collection: "data", id });
        await fetch(`${serverUrl}?${query.toString()}`);
        console.log("Aufgabe gelöscht");
    }

    // Funktion zum Bearbeiten eines Aufgaben-Elements
    function editItem(taskElement, task) {
        document.getElementById("name").value = task.name;
        document.getElementById("title").value = task.title;
        document.getElementById("deadline").value = task.deadline;
        document.getElementById("comment").value = task.comment;
        deleteItem(taskElement, task._id);
        console.log("Aufgabe kann bearbeitet werden");
    }

    // Funktion zum Hinzufügen einer neuen Aufgabe
    function addItem() {
        const name = document.getElementById("name").value;
        const title = document.getElementById("title").value;
        const deadline = document.getElementById("deadline").value;
        const comment = document.getElementById("comment").value;

        const task = { name, title, deadline, comment, completed: false };

        createTaskElement(task); // Aufgabe anzeigen
        sendTaskToServer(task); // Daten an den Server senden
    }

    // Funktion zum Senden einer neuen Aufgabe an den Server
    async function sendTaskToServer(task) {
        const query = new URLSearchParams({
            command: "insert",
            collection: "data",
            data: JSON.stringify(task),
        });

        const response = await fetch(`${serverUrl}?${query.toString()}`);
        console.log("Aufgabe an den Server gesendet", response);
        alert("Aufgabe erfolgreich hinzugefügt!");
    }

    // Funktion zum Aktualisieren einer Aufgabe
    async function updateTask(task, updates) {
        const updatedTask = { ...task, ...updates };

        const query = new URLSearchParams({
            command: "update",
            collection: "data",
            data: JSON.stringify(updatedTask),
        });

        const response = await fetch(`${serverUrl}?${query.toString()}`);
        console.log("Aufgabe aktualisiert", response);
    }
})();