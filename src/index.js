import { createTask, createProject } from './objects'

const projectsContainer = document.querySelector('[data-projects]')

const addProjectForm = document.querySelector('[data-project-form]')
const projectInput = document.querySelector('[data-project-input]')
const addProjectButton = document.querySelector('[data-add-project-btn]')

const LOCAL_STORAGE_LIST_KEY = 'task.projects'

let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []

function render() {
  clearElement(projectsContainer)
  projects.forEach(project => {
    const li = document.createElement('li');
    li.dataset.projectId = project.id
    li.textContent = project.name
    li.classList.add('indiv-project')
    projectsContainer.appendChild(li)
  })
}

addProjectForm.addEventListener("click", (e) => {
  e.preventDefault();
  console.log('hi')
  const projectName = projectInput.value
  if (projectName == null || projectName === '') return
  projectInput.value = null
  const newProject = createProject(projectName)
  projects.push(newProject)
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(projects))
  render()
})

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

render()