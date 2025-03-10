import DomManager from "./dom";
import { format } from "date-fns";

export default class Forms {
    constructor() {
        this.projectButton = document.querySelector("button[data-formtarget='new-project']")
        this.projectForm = document.querySelector("#new-project-form")
        this.projectPopover = document.querySelector("#new-project")
        this.populateForms()
    }
    populateForms() {
        this.projectButton.addEventListener("click", function() {
            const dateField = document.querySelector("#new-project-form > input[type=date]")
            dateField.min = format(new Date(), "yyyy-MM-dd")
        }, {once: true})
    }
    projectFormHandler() {
        let form = new FormData(document.querySelector("#new-project-form"))
        let formObject = {"name": form.get("name"), "description": form.get("description"), "deadline": form.get("deadline") }
        this.projectPopover.hidePopover()
        this.projectForm.reset()
        return formObject
    }
    todoFormHandler() {
        let todoForm = document.querySelector("#new-todo-form")
        let todoPopover = document.querySelector("#new-todo")
        let form = new FormData(todoForm)
        let formObject = {"project": form.get("project"), "description": form.get("description"), "priority": form.get("priority") }
        todoPopover.hidePopover()
        todoForm.reset()
        todoForm.querySelector("input[name='project']").value = form.get("project")
        return formObject
        }
}