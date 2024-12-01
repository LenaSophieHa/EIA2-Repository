"use strict";
var tasklistApp;
(function (tasklistApp) {
    tasklistApp.savedTasks = [
        {
            savedName: "Bernd",
            savedTitle: "Grocery Shopping",
            savedDeadline: "06.11.2014 12:00",
            savedComment: "Buy milk, eggs, and bread",
            savedCompleted: true
        },
        {
            savedName: "Kevin",
            savedTitle: "Finish Homework",
            savedDeadline: "11.11.2024 17:00",
            savedComment: "Complete math and science assignments",
            savedCompleted: false
        }
    ];
    tasklistApp.savedTaskTitle = "";
})(tasklistApp || (tasklistApp = {}));
//# sourceMappingURL=data.js.map