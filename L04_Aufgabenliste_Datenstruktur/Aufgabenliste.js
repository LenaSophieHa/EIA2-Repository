document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const deadline = new Date(document.getElementById('deadline').value);
    const comment = document.getElementById('comment').value;
    const currentDate = new Date();

    const taskContainer = document.getElementById('taskContainer');
    const taskElement = document.createElement('div');
    taskElement.classList.add('container');

    // Überprüfung der Frist
    if (deadline < currentDate) {
        taskElement.classList.add('expired');
    } else {
        taskElement.classList.add('in-progress');
    }

    taskElement.innerHTML = `
        <div class="task-details">
            <input type="checkbox" class="task-checkbox">
            <div class="attribute-row">
                <div class="attribute"><strong>Name:</strong></div>
                <div class="value">${name}</div>
            </div>
            <div class="attribute-row">
                <div class="attribute"><strong>Deadline:</strong></div>
                <div class="value">${deadline.toLocaleString()}</div>
            </div>
            <div class="attribute-row">
                <div class="attribute"><strong>Comment:</strong></div>
                <div class="value">${comment}</div>
            </div>
        </div>
        <span class="task-status">${deadline < currentDate ? "Expired" : "In Progress"}</span>
        <button class="delete-task-btn">Delete</button> <!-- Löschbutton -->
    `;

    // Event-Listener für die Checkbox
    const checkbox = taskElement.querySelector('.task-checkbox');
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            taskElement.classList.add('completed'); // Markiert die Aufgabe als erledigt
        } else {
            taskElement.classList.remove('completed'); // Entfernt die Erledigung
        }
    });

    // Event-Listener für den Löschbutton
    const deleteButton = taskElement.querySelector('.delete-task-btn');
    deleteButton.addEventListener('click', function() {
        taskContainer.removeChild(taskElement); // Entfernt das Task-Element aus dem DOM
        updateTaskCounter(); // Aktualisiert den Zähler
    });

    taskContainer.appendChild(taskElement);
    updateTaskCounter();

    // Eingabefelder zurücksetzen
    this.reset();
});

// Funktion zur Aktualisierung des Aufgaben-Zählers
function updateTaskCounter() {
    const taskContainer = document.getElementById('taskContainer');
    document.getElementById('counterItem').innerText = taskContainer.children.length;
}