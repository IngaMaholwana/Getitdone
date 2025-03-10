export default class Storage {
    constructor() {
        this.userProjects = this.deserialize(localStorage.getItem("userProjects"))
    }
    getProject(name) {
        return this.deserialize(localStorage.getItem(name))
    }
    getProjectNames() {
        return Object.keys(localStorage)
    }
    getProjectList() {
        let projectNames = this.getProjectNames()
        let projects = []
        projectNames.forEach(project => projects.push(this.deserialize(localStorage[project])))
        return projects
    }
    saveProject(name, project) {
        localStorage.setItem(name, this.serialize(project))
    }
    serialize(object) {
        return JSON.stringify(object)
    }
    deserialize(object) {
        return JSON.parse(object)
    }
}