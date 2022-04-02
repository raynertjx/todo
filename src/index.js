import { createTask, createProject } from './objects'

const homeContainer = document.querySelector('[data-home]')
const projectsContainer = document.querySelector('[data-projects]')

const addProjectForm = document.querySelector('[data-project-form]')
const projectInput = document.querySelector('[data-project-input]')
const addProjectButton = document.querySelector('[data-add-project-btn]')
const projectHeading = document.querySelector('[data-project-heading]')

const LOCAL_STORAGE_PROJECT_KEY = 'task.projects'
const LOCAL_STORAGE_SELECTED_PROJECT_KEY = 'task.selected.project'

let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || []
let selectedProjectID = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY)

function render() {
  clearElement(projectsContainer)
  projects.forEach(project => {
    const li = document.createElement('li');
    li.dataset.projectId = project.id
    li.textContent = project.name
    li.classList.add('indiv-project')
    projectsContainer.appendChild(li)
    if (li.dataset.projectId === selectedProjectID) {
      li.classList.add("project-active") 
      projectHeading.textContent = li.textContent
    }
  })
  if (selectedProjectID == 'home') {
    homeContainer.classList.add("project-active")
    projectHeading.textContent = homeContainer.textContent
  }
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects))
  localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY, selectedProjectID)
}

function saveAndRender() {
  save()
  render()
} 

homeContainer.addEventListener("click", (e) => {
  selectedProjectID = e.target.dataset.projectId
  saveAndRender()
})

projectsContainer.addEventListener("click", (e) => {
  selectedProjectID = e.target.dataset.projectId
  saveAndRender()
})

addProjectForm.addEventListener("click", (e) => {
  e.preventDefault();
  console.log('hi')
  const projectName = projectInput.value
  if (projectName == null || projectName === '') return
  projectInput.value = null
  const newProject = createProject(projectName)
  projects.push(newProject)
  saveAndRender()
})

function clearElement(element) {
  homeContainer.classList.remove("project-active")
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

render()