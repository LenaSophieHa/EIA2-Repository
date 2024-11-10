namespace tasklistApp {

    export interface Task {
        savedName: string;
        savedTitle: string;
        savedDeadline: string;
        savedComment: string;
        savedCompleted: boolean;
    }

    export let savedTasks: Task[] = [
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

    export let savedTaskTitle: string = "";

}