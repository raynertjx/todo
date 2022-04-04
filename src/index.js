import { createTask, createProject } from './objects'
import { formatDate } from './datetime'

const homeContainer = document.querySelector('[data-home]')
const projectsContainer = document.querySelector('[data-projects]')

const addProjectForm = document.querySelector('[data-project-form]')
const projectInput = document.querySelector('[data-project-input]')
const addProjectButton = document.querySelector('[data-add-project-btn]')
const projectHeading = document.querySelector('[data-project-heading]')

const openTaskModalButton = document.querySelector('.open-modal-button')
const closeTaskModalButtons = document.querySelectorAll('.close-modal-button')

const addTaskModal = document.querySelector('.add-task-modal')
const editTaskModal = document.querySelector('.edit-task-modal')

const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const projectTemplate = document.getElementById('project-template')

const addTaskForm = document.querySelector('[data-task-form-add]')
const addTaskNameInput = document.querySelector('[data-task-name-add]')
const addTaskDescInput = document.querySelector('[data-task-desc-add]')
const addTaskDateInput = document.querySelector('[data-task-date-add]')
const addTaskPriorityInput = document.querySelector('[data-task-priority-add]')

const editTaskForm = document.querySelector('[data-task-form-edit]')
const editTaskNameInput = document.querySelector('[data-task-name-edit]')
const editTaskDescInput = document.querySelector('[data-task-desc-edit]')
const editTaskDateInput = document.querySelector('[data-task-date-edit]')
const editTaskPriorityInput = document.querySelector('[data-task-priority-edit]')

const LOCAL_STORAGE_PROJECT_KEY = 'task.projects'
const LOCAL_STORAGE_SELECTED_PROJECT_KEY = 'task.selected.project'

let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || []
let selectedProjectID = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY) || 'home'

function render() {
  makeVisible(openTaskModalButton)
  clearElement(projectsContainer)
  clearElement(tasksContainer)
  projects.forEach(project => {
    const newProject = document.importNode(projectTemplate.content, true)
    const li = newProject.querySelector('li');
    li.dataset.projectId = project.id
    const children = li.querySelectorAll('.project-modifier')
    children.forEach((child) => {
      child.dataset.projectId = project.id
    })
    const project_name = li.querySelector('span')
    project_name.textContent = project.name
    li.classList.add('indiv-project')
    projectsContainer.appendChild(li)
    if (li.dataset.projectId === selectedProjectID) {
      li.classList.add("project-active") 
      projectHeading.textContent = project.name
    }
  })
  if (selectedProjectID == 'home') {
    renderHome()
    return
  }
  const currentProject = projects.find(project => project.id === selectedProjectID)
  renderTasks(currentProject)
}

function renderTasks(project) {
  project.tasks.forEach(task => {
  const newTask = document.importNode(taskTemplate.content, true)
  const outer = newTask.querySelector('div')

  const task_title = outer.querySelector('[data-collapsible]')
  const task_details = outer.querySelector('[data-task-details]')
  const task_checkbox = outer.querySelector('[data-task-complete]')

  const task_name = task_title.querySelector('[data-task-name]')
  const task_date = task_title.querySelector('[data-task-date]')
  const task_project = task_title.querySelector('[data-task-project]')
  
  const task_desc = task_details.querySelector('[data-task-desc]')
  const editTaskButton = task_details.querySelector('.edit-task-button')
  const deleteTaskButton = task_details.querySelector('.delete-task-button') 

  task_name.textContent = task.name
  task_date.textContent = formatDate(task.date)
  task_project.textContent = project.name

  task_desc.textContent = task.desc + " " + task.priority
  task_checkbox.id = editTaskButton.id = deleteTaskButton.id = task.id  

  task_checkbox.setAttribute('data-modifier-project-id', task.project)
  editTaskButton.setAttribute('data-modifier-project-id', task.project)
  deleteTaskButton.setAttribute('data-modifier-project-id', task.project)

  task_checkbox.checked = task.complete
  if (task.complete) {
    task_title.classList.add("task-completed")
  }
  tasksContainer.appendChild(newTask)
  })
}

function renderHome() {
  selectedProjectID = 'home'
  makeHidden(openTaskModalButton)
  homeContainer.classList.add("project-active")
  projectHeading.textContent = homeContainer.textContent
  projects.forEach(project => {
    renderTasks(project)
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
  if (e.target.tagName.toLowerCase() === 'button') {
    if (e.target.classList.contains('delete-project-button')) {
      if (confirm("Are you sure you want to delete this project and all its tasks?")) {
        projects = projects.filter(project => project.id !== e.target.dataset.projectId)
        renderHome()
      }
    }
  }
  else {
    selectedProjectID = e.target.dataset.projectId
  }
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
    const currentProject = projects.find(project => project.id === e.target.getAttribute('data-modifier-project-id'))
    const currentTask = currentProject.tasks.find(task => task.id === e.target.id)
    currentTask.complete = e.target.checked
    saveAndRender()
  }
  if (e.target.tagName.toLowerCase() === 'button') {
    const currentProject = projects.find(project => project.id === e.target.getAttribute('data-modifier-project-id'))
    const currentTask = currentProject.tasks.find(task => task.id === e.target.id)
    if (e.target.classList.contains('delete-task-button')) {
      currentProject.tasks = currentProject.tasks.filter(task => task !== currentTask)
      saveAndRender()
    }
    else if (e.target.classList.contains('edit-task-button')) {
      openEditForm(currentTask.id, currentTask.project, currentTask.name, currentTask.desc, currentTask.date, currentTask.priority)
    }
  }
})

addProjectForm.addEventListener("submit", (e) => {
  e.preventDefault()
  if (projects.length >= 15) {
    alert("Maximum number of projects!")
    return
  }
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
  const newTask = createTask(addTaskNameInput.value, addTaskDescInput.value, addTaskDateInput.value, addTaskPriorityInput.value, currentProject.id)
  currentProject.tasks.push(newTask)
  saveAndRender()
  addTaskModal.close()
})

editTaskForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const currentProject = projects.find(project => project.id === editTaskForm.getAttribute('data-edit-task-project'))
  const editedTask = currentProject.tasks.find(task => task.id === editTaskForm.id)
  editTask(editedTask, editTaskNameInput.value, editTaskDescInput.value, editTaskDateInput.value, editTaskPriorityInput.value)
  saveAndRender()
  editTaskModal.close()
}
)

openTaskModalButton.addEventListener("click", () => {
  clearForm(addTaskNameInput, addTaskDescInput, addTaskDateInput, addTaskPriorityInput)
  addTaskModal.showModal()
})

closeTaskModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    addTaskModal.close()
    editTaskModal.close()
  })
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

function openEditForm(id, project, name, desc, date, priority) {
  editTaskForm.id = id
  editTaskForm.setAttribute('data-edit-task-project', project)
  editTaskNameInput.value = name
  editTaskDescInput.value = desc
  editTaskDateInput.value = date
  editTaskPriorityInput.value = priority
  editTaskModal.showModal()
}

function editTask(task, name, desc, date, priority) {
  task.name = name
  task.desc = desc
  task.date = date
  task.priority = priority
}

render()