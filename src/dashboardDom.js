import DomManager from "./dom";

export default class dashboardDom extends DomManager {
    constructor(projects) {
        super()
        this.projects = this.sortProjects(projects)
        this.projectList = document.querySelector("ul#nav-projects")
        this.nav = document.querySelector("nav")
        this.activeProject = null
        this.projectList.addEventListener("click", (e) => {
            if (e.target.id != "nav-projects") {
                this.nav.className = "nav-mobile"
                setTimeout(() => document.querySelector(".mobile-menu").addEventListener("click", () => this.nav.classList.remove("nav-mobile")),
                100)
            }
        })
        this.renderDashboard()
    }
    addProject(projectName, isNew = false) {
        let projectElem = this.createNavProject(projectName, true)
        this.projectList.prepend(projectElem)
    }
    finishProject(projectName) {
        let projectElem = document.querySelector(`button[data-project-name = "${projectName}"]`)
        let firstCompletedProject = document.querySelector(".finished-project")
        projectElem.classList.add("finished-project")
        this.projectList.insertBefore(projectElem, firstCompletedProject)
    }
    setActiveProject(target) {
        if (this.activeProject != null) { this.activeProject.classList.remove("active-project") }
        if (target.className == "nav-project-name") { target = target.parentElement}
        target.classList.add("active-project")
        this.activeProject = target
    }
    sortProjects(projects) {
        let sortedByDate =  projects.sort((a,b) => (new Date(b.createdAt) - new Date(a.createdAt)))
        return sortedByDate.sort((a,b) => a.isFinished - b.isFinished)
    }
    createNavProject(project, isNew = false) {
        let template = document.querySelector("#nav-project-template").content.cloneNode(true)
        super.setTextContent(template, ".nav-project-name", project.name)
        template.querySelector("button").title = project.name
        template.querySelector("button.nav-project").dataset.projectName = project.name
        template.querySelector(".nav-project-name").dataset.projectName = project.name
        if (project.isFinished) { template.querySelector("button").classList.add("finished-project")}
        if (isNew) { this.setActiveProject(template.querySelector("button")) }
        return template
    }
    renderDashboard() {
        let projectElements = []
        for (const project of this.projects) {
            let projectElem = this.createNavProject(project)
            projectElements.push(projectElem)
        }
        super.wrapElements(projectElements, this.projectList)
    }
}