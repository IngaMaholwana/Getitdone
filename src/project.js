
export default class Project {
    constructor(name, description, deadline, todos = [], isFinished = false, createdAt) {
        this.name = name
        this.description = description
        this.deadline = deadline
        this.todos = todos
        this.isFinished = isFinished
        this.createdAt = createdAt
    }
    addTodo(todo) {
        this.todos.unshift(todo)
    }
    finish() {
        this.isFinished = true
    }
    removeTodo(todoIndex) {
        this.todos.splice(todoIndex, 1)
    }
    changeTodoOrder(todoIndex, newIndex) {
        let todo = this.todos.at(todoIndex)
        this.todos.splice(todoIndex, 1)
        this.todos.splice(newIndex, 0, todo)
    }
}