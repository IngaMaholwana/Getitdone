import DomManager from "./dom";
import { differenceInCalendarDays, format } from "date-fns";

export default class projectsDom extends DomManager {
    constructor(project) {
        super()
        this.project = project
        this.todos = project.todos
        this.content = document.querySelector("#content")
        this.template = document.querySelector("#project-template").content.cloneNode(true)
        this.render()
    }
    finish() {
        this.content.querySelectorAll(".header-button").forEach(element => element.remove())
    }
    sortTodos() {
        return this.todos.sort((a,b) => a.completed - b.completed)
    }
    fillTemplate() {
        super.setTextContent(this.template, ".project-name", this.project.name)
        super.setTextContent(this.template, ".project-description", this.project.description)
        super.setTextContent(this.template, ".project-deadline", this.project.deadline)
        this.project.todos = this.sortTodos()
        this.template.querySelector("input[name='project']").value = this.project.name
        if (this.project.isFinished) {
            this.template.querySelectorAll(".header-button").forEach(element => element.remove())
            this.template.querySelector("#project").classList.add("finished")
        }
        else {
            if (this.project.deadline <= format(new Date(), "yyyy-MM-dd")) { 
                this.template.querySelector(".project-deadline").classList.add("overdue") 
            }
        }
        return this.template
    }
    render() {
        this.content.textContent = ''
        let projectElem = this.fillTemplate()
        super.wrapElements([projectElem], this.content)
    }
}