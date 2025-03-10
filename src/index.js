import Project from "./project.js"
import Todo from "./todo.js"
import dashboardDom from "./dashboardDom.js"
import projectsDom from "./projectsDom.js"
import todoDom from "./todoDom.js"
import Storage from "./storage.js"
import Forms from "./forms.js"
import "./index.css"
import { format } from "date-fns";

const STORAGE = new Storage()
const DASHBOARD = new dashboardDom(STORAGE.getProjectList())
const FORMS = new Forms()
let navProjects = document.querySelector("#nav-projects")
let newProjectForm = document.querySelector("#new-project-form")
let currentProject = null
let projectDom = null
let todosDom = []


if (STORAGE.getProjectList().length == 0) { setDefaults() }

navProjects.addEventListener("click", function(e) {
    if (e.target.id != "nav-projects") {
        let projectName = e.target.dataset.projectName
        let projectJson = STORAGE.getProject(projectName)
        let project = new Project(projectJson.name, projectJson.description, projectJson.deadline, projectJson.todos,
                                projectJson.isFinished, projectJson.createdAt)
        renderProject(project)
        DASHBOARD.setActiveProject(e.target)
    }
})

newProjectForm.addEventListener("submit", function(e) {
    e.preventDefault()
    let response = FORMS.projectFormHandler()
    let project = new Project(response.name, response.description, response.deadline, [], false, format(new Date(), "yyyy-MM-dd HH:mm"))
    if (STORAGE.getProjectNames().includes(project.name)) { window.alert("ERROR: There's another project with that name") }
    else {
        DASHBOARD.addProject(project, true)
        STORAGE.saveProject(project.name, project)
        renderProject(project)
    }
})

function renderProject(project) {
    todosDom = []
    projectDom = new projectsDom(project)
    project.todos = project.todos.map(todoJson => {
        let todo = new Todo(todoJson.description, todoJson.priority, todoJson.completed)
        todosDom.push(new todoDom(todo, project, STORAGE))
        return todo
    })
    currentProject = project
    setProjectListeners()
}

function setProjectListeners() {
    document.querySelector("#new-todo-form").addEventListener("submit", (e) => newTodo(e))
    document.querySelector("#todo-priority-select").addEventListener("change", filterTodosListener)
    document.querySelector("#todo-completion-select").addEventListener("change", filterTodosListener)
    if (currentProject.isFinished == false) {
        document.querySelector("#finish-project").addEventListener("click", finishProject)
    }
}

function finishProject() {
    currentProject.finish()
    projectDom.finish()
    todosDom.forEach(todoDom => {if (todoDom.todo.completed == false) { todoDom.finish() }})
    DASHBOARD.finishProject(currentProject.name)
    STORAGE.saveProject(currentProject.name, currentProject)
}
function newTodo(e) {
    e.preventDefault()
    let response = FORMS.todoFormHandler()
    let todo = new Todo(response.description, response.priority, false)
    currentProject.addTodo(todo)
    todosDom.push(new todoDom(todo, currentProject, STORAGE, true))
    STORAGE.saveProject(currentProject.name, currentProject)
}

function filterTodos(todos, priority, completion) {
    if (priority == "all") { priority = ["high","normal","low"] }
    if (completion == "all") { completion = ["true","false"] }
    return todos.filter(todo => priority.includes(todo.priority) && completion.includes(todo.completed.toString()))
}

function filterTodosListener() {
    document.querySelector("#todos").textContent = ""
    let priority = document.querySelector("#todo-priority-select").value
    let completion = document.querySelector("#todo-completion-select").value
    let todos = filterTodos(currentProject.todos, priority, completion)
    todos.forEach(todo => {
        new todoDom(todo, currentProject, STORAGE)
    })
}

function setDefaults() {
    let defaultProject = new Project("Miscelaneous todos", "A list of tasks from various projects", "2999/12/31", [], false, format(new Date(), "yyyy-MM-dd HH:mm"))
    let defaultTodo = new Todo("Default todo", "low", false)
    defaultProject.addTodo(defaultTodo)
    STORAGE.saveProject(defaultProject.name, defaultProject)
    DASHBOARD.addProject(defaultProject, true)
    renderProject(defaultProject)
}