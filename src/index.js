import { createTask, createProject } from './objects'

const homeContainer = document.querySelector('[data-home]')
const projectsContainer = document.querySelector('[data-projects]')

const addProjectForm = document.querySelector('[data-project-form]')
const projectInput = document.querySelector('[data-project-input]')
const addProjectButton = document.querySelector('[data-add-project-btn]')
const projectHeading = document.querySelector('[data-project-heading]')

const openTaskModalButton = document.querySelector('.open-modal-button')
const closeTaskModalButton = document.querySelector('.close-modal-button')
const taskModal = document.querySelector('.task-modal')

const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')

const addTaskForm = document.querySelector('[data-task-form]')
const taskNameInput = document.querySelector('[data-task-name]')
const taskDescInput = document.querySelector('[data-task-desc]')
const taskDateInput = document.querySelector('[data-task-date]')
const taskPriorityInput = document.querySelector('[data-task-priority]')
const addTaskButton = document.querySelector('[data-add-task-btn]')

const LOCAL_STORAGE_PROJECT_KEY = 'task.projects'
const LOCAL_STORAGE_SELECTED_PROJECT_KEY = 'task.selected.project'

let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || []
let selectedProjectID = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY) || 'home'

function render() {
  makeVisible(openTaskModalButton)
  clearElement(projectsContainer)
  clearElement(tasksContainer)
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
    makeHidden(openTaskModalButton)
    homeContainer.classList.add("project-active")
    projectHeading.textContent = homeContainer.textContent
    projects.forEach(project => {
      renderTasks(project)
    })
    return
  }
  const currentProject = projects.find(project => project.id === selectedProjectID)
  renderTasks(currentProject)
}

function renderTasks(project) {
  project.tasks.forEach(task => {
  const newTask = document.importNode(taskTemplate.content, true)
  const outer = newTask.querySelector('div')
  const task_name = outer.querySelector('[data-collapsible]')
  const task_details = outer.querySelector('[data-task-details]')
  const task_checkbox = outer.querySelector('[data-task-complete]') 
  
  task_name.textContent = task.name
  task_details.textContent = task.desc + " " + task.date + " " + task.priority
  task_checkbox.id = task.id
  task_checkbox.setAttribute('data-checkbox-project-id', task.project)
  task_checkbox.checked = task.complete
  tasksContainer.appendChild(newTask)
  })
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

tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains('collapsible')) {
    e.target.classList.toggle("active");
    let content = e.target.nextElementSibling
    if (content.style.display === 'block') {
      content.style.display = 'none'
    } else {
      content.style.display = 'block'
    }
  }
  if (e.target.tagName.toLowerCase() === 'input') {
    const currentProject = projects.find(project => project.id === e.target.getAttribute('data-checkbox-project-id'))
    const currentTask = currentProject.tasks.find(task => task.id === e.target.id)
    currentTask.complete = e.target.checked
    save()
  }
})

addProjectForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const projectName = projectInput.value
  if (projectName == null || projectName === '') return
  clearForm(projectInput)
  const newProject = createProject(projectName)
  projects.push(newProject)
  saveAndRender()
})

addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault()
  if (!checkForm(addTaskForm)) return
  const currentProject = projects.find(project => project.id === selectedProjectID)
  const newTask = createTask(taskNameInput.value, taskDescInput.value, taskDateInput.value, taskPriorityInput.value, currentProject.id)
  currentProject.tasks.push(newTask)
  saveAndRender()
  taskModal.close()
})

openTaskModalButton.addEventListener("click", () => {
  clearForm(taskNameInput, taskDescInput, taskDateInput, taskPriorityInput)
  taskModal.showModal()
})

closeTaskModalButton.addEventListener("click", () => {
  taskModal.close()
})

function makeVisible(element) {
  element.classList.remove('hidden')
}

function makeHidden(element) {
  element.classList.add('hidden')
}


function clearElement(element) {
  homeContainer.classList.remove("project-active")
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

function checkForm(form) {
  if (form.getElementsByTagName("select")) {
    let selects = form.getElementsByTagName("select")
    for (let i = 0; i < selects.length; i++) {
      if (selects[i].value == "") {
        alert("Please fill all required fields.");
        return false;
      }
    }
  } 
  let inputs = form.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      alert("Please fill all required fields.");
      return false;
    }
  }
  return true;
}

function clearForm() {
  for (let i = 0; i < arguments.length; i++) {
    arguments[i].value = null
  }
}

render()