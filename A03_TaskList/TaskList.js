"use strict";
window.addEventListener("load", initialize);
// Initialisierungsfunktion, um die Event-Listener zu setzen
function initialize() {
    const deleteButton = document.querySelector("#trash");
    const checkButton = document.querySelector("#check");
    const addButton = document.querySelector("#newitem");
    const editButton = document.querySelector("#edit");
    // Fügt Event-Listener zu den Buttons hinzu
    deleteButton?.addEventListener("click", deleteItem);
    checkButton?.addEventListener("click", markItem);
    addButton?.addEventListener("click", addItem);
    editButton?.addEventListener("click", updateItem);
}
// Funktion zum Entfernen eines Items (Mülleimer)
function deleteItem() {
    console.log("Item wird aus der Liste gelöscht");
}
// Funktion zum Markieren eines Items als erledigt (Checkbox)
function markItem() {
    console.log("Item wurde abgehakt/wurde gekauft");
}
// Funktion zum Hinzufügen eines neuen Items (Plus-Symbol)
function addItem() {
    console.log("Neues Item wird zur Liste hinzugefügt");
}
// Funktion zum Bearbeiten eines Items (Stift-Symbol)
function updateItem() {
    console.log("Item kann nun bearbeitet werden");
}
//# sourceMappingURL=TaskList.js.map