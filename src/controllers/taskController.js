
const { GetAllTasks, createTask, saveUser } = require("../services/taskService");


const taskRoot = {
    events: GetAllTasks,
    createEvent: async ({ taskInput }) => {
        const { title, description, due_date, assignee } = taskInput;
        const result = await createTask(title, description, due_date, assignee);
        return result;
    },
    createUser: async ({ userInput }) => {
        const { email, password } = userInput;
        const result = await saveUser(email, password);
        return result;
    }
};

module.exports = { taskRoot };
