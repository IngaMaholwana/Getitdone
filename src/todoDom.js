import DomManager from "./dom";

export default class todoDom extends DomManager {
    constructor(todo, project, storage, isNew = false) {
        super()
        this.todo = todo
        this.project = project
        this.storage = storage
        this.isNew = isNew
        this.todosDiv = document.querySelector("#todos")
        this.template = document.querySelector("#todo-template").content.cloneNode(true)
        this.todoElem = null
        this.render()
    }
    create() {
        super.setTextContent(this.template, ".todo-description", this.todo.description)
        this.template.querySelector(".todo-description").title = this.todo.description
        this.template.querySelector(".todo").classList.add(`${this.todo.priority}-priority`)
        super.setTextContent(this.template, ".todo-priority-text", this.todo.priority)
        this.template.querySelector(".todo").ariaLabel = `${this.todo.priority} priority todo`
        this.template.querySelector("div.todo").dataset.todoDescription = this.todo.description
        this.template.querySelector("#todo-complete").addEventListener("click", (e) => this.finish(e))
        this.template.querySelector("#todo-delete").addEventListener("click", (e) => this.destroy())
        this.todoElem = this.template.querySelector("div")
        if (this.todo.completed) { this.finish() }
        return this.template
    }
    finish() {
        this.todo.finish()
        this.todoElem.classList.add("completed-todo")
        this.todoElem.querySelector("#todo-complete").remove()
        this.todoElem.querySelector("#todo-delete").remove()
        this.todoElem.ariaLabel = "finished todo"
        this.todosDiv.appendChild(this.todoElem)
        this.storage.saveProject(this.project.name, this.project)
    }
    destroy() {
        this.todo.destroy(this.project)
        this.todoElem.remove()
        this.storage.saveProject(this.project.name, this.project)
    }
    render() {
        let todoElem = this.create()
        if (this.isNew) { this.todosDiv.prepend(todoElem) }
        else { this.todosDiv.append(todoElem) }
    }
}