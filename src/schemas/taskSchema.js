
const { buildSchema } = require('graphql');

const taskSchema = buildSchema(`
    type TaskEvent {
        _id: ID!
        title: String!
        description: String!
        due_date: String!
        assignee: String!
        creator: User!
    }

    type User {
        _id: ID!
        email: String!
        password: String
        createdTasks: [TaskEvent!]
    }

    type RootQuery {
        events: [TaskEvent!]!
    }

    input TaskInput {
        title: String!
        description: String!
        due_date: String!
        assignee: String!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type RootMutation {
        createEvent(taskInput: TaskInput): TaskEvent
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

module.exports = { taskSchema };