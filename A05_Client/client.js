"use strict";
window.addEventListener("load", initialize);
// Initialisierungsfunktion zum Setzen der Event-Listener
async function initialize() {
    const addButton = document.getElementById("addTaskButton");
    addButton?.addEventListener("click", (event) => {
        event.preventDefault(); // Verhindert das Neuladen der Seite
        addItem();
    });
    // Lade bestehende Aufgaben aus der JSON-Datei
    const response = await fetch("data.json");
    const data = await response.json();
    loadTasks(data);
}
// Funktion zum Laden von Aufgaben aus JSON
function loadTasks(tasks) {
    tasks.forEach((task) => createTaskElement(task));
}
// Funktion zum Erstellen eines neuen Aufgaben-Elements und Hinzufügen zum DOM
function createTaskElement(task) {
    const taskContainer = document.getElementById("taskContainer");
    if (!taskContainer)
        return; // Prüft, ob der Container existiert
    const taskElement = document.createElement("div");
    taskElement.classList.add("task-item");
    // Setze den Zustand "abgelaufen" oder "in Bearbeitung" anhand der Deadline
    const deadline = new Date(task.deadline);
    if (deadline < new Date()) {
        taskElement.classList.add("expired");
    }
    else {
        taskElement.classList.add("in-progress");
    }
    // HTML für das neue Aufgaben-Element
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
    // Checkbox-Event-Listener
    const checkbox = taskElement.querySelector(".task-checkbox");
    checkbox.addEventListener("change", () => {
        taskElement.classList.toggle("completed", checkbox.checked);
        console.log("Item wurde abgehakt/wurde gekauft");
    });
    // Event-Listener für Lösch- und Bearbeitungsbutton
    const deleteButton = taskElement.querySelector(".delete-task-btn");
    deleteButton.addEventListener("click", () => deleteItem(taskElement));
    const editButton = taskElement.querySelector(".edit-task-btn");
    editButton.addEventListener("click", () => editItem(taskElement, task));
    taskContainer.appendChild(taskElement); // Aufgabe in den Container einfügen
}
// Funktion zum Löschen eines Aufgaben-Elements
function deleteItem(taskElement) {
    taskElement.remove();
    console.log("Item wird aus der Liste gelöscht");
}
// Funktion zum Bearbeiten eines Aufgaben-Elements
function editItem(taskElement, task) {
    document.getElementById("name").value = task.name;
    document.getElementById("title").value = task.title;
    document.getElementById("deadline").value = task.deadline;
    document.getElementById("comment").value = task.comment;
    deleteItem(taskElement);
    console.log("Item kann nun bearbeitet werden");
}
// Funktion zum Hinzufügen einer neuen Aufgabe
function addItem() {
    const name = document.getElementById("name").value;
    const title = document.getElementById("title").value;
    const deadline = document.getElementById("deadline").value;
    const comment = document.getElementById("comment").value;
    const task = {
        name: name,
        title: title,
        deadline: deadline,
        comment: comment,
        completed: false,
    };
    createTaskElement(task); // Fügt das neue Task-Element hinzu
    console.log("Neues Item wird zur Liste hinzugefügt");
    //  Daten an den Server senden
    sendData(task);
}
// Funktion zum Senden der Daten (simuliert)
async function sendData(task) {
    const query = new URLSearchParams(task);
    await fetch("Tasklist.html?" + query.toString());
    alert("Data sent");
}
//# sourceMappingURL=Tasklist.js.map