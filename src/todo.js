export default class Todo {
    constructor(description, priority, completed = false) {
        this.description = description
        this.priority = priority
        this.completed = completed
    }
    finish() {
        this.completed = true
    }
    destroy(project) {
        let todoIndex = project.todos.indexOf(this)
        project.todos.splice(todoIndex, 1)
    }
    editDescription(newDescription) {
        this.description = newDescription
    }
    editPriority(newPriority) {
        this.priority = newPriority
    }
}