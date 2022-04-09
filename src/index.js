import { createTask, createProject } from './objects'
import { formatDate } from './datetime'

const projectsContainer = document.querySelector('[data-projects]')
const noProjectsMessage = document.querySelector('[data-no-projects]')
const noTasksMessage = document.getElementById('no-tasks-message')

const addProjectForm = document.querySelector('[data-project-form]')
const projectInput = document.querySelector('[data-project-input]')

const headerContainer = document.querySelector('[data-contents-header]')
const projectHeading = document.querySelector('[data-project-heading]')

const editProjectModal = document.querySelector('.edit-project-modal')
const editProjectNameInput = document.querySelector('[data-project-name-edit]')
const editProjectForm = document.querySelector('[data-project-edit-form]')

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

let general_project = {id: 'general', name: 'General', tasks:[createTask('head to the gym', 'today is chest day', '10/04/2022', '!!!', 'general')]}
let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [general_project]
let selectedProjectID = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY) || 'general'

function render() {
  makeVisible(openTaskModalButton)
  clearElement(projectsContainer)
  clearElement(tasksContainer)
  if (projects === undefined || projects.length == 0) {
    makeVisible(noProjectsMessage)
    return
  }
  makeHidden(noProjectsMessage)
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
  const currentProject = projects.find(project => project.id === selectedProjectID)
  renderTasks(currentProject)
}

function renderTasks(project) {
  if (project.tasks === undefined || project.tasks.length == 0) {
    const message = document.importNode(noTasksMessage.content, true)
    const p = message.querySelector('p')
    tasksContainer.appendChild(p)
    return
  }
  clearElement(tasksContainer)
  project.tasks.forEach(task => {
  const newTask = document.importNode(taskTemplate.content, true)
  const outer = newTask.querySelector('div')
  const task_checker = outer.querySelector('[data-task-checker]')
  const task_content = outer.querySelector('[data-task-content]')
  const task_buttons = outer.querySelector('[data-task-buttons]')
  const task_date = outer.querySelector('[data-task-date]')

  const task_checkbox = task_checker.querySelector('[data-task-complete]')

  const task_name = task_content.querySelector('[data-task-name]')
  const task_desc = task_content.querySelector('[data-task-desc]')

  const editTaskButton = task_buttons.querySelector('.edit-task-button')
  const deleteTaskButton = task_buttons.querySelector('.delete-task-button') 

  task_name.textContent = task.name
  task_date.textContent = formatDate(task.date)

  task_desc.textContent = task.desc
  task_checkbox.id = editTaskButton.id = deleteTaskButton.id = task.id  

  task_checkbox.setAttribute('data-modifier-project-id', task.project)
  editTaskButton.setAttribute('data-modifier-project-id', task.project)
  deleteTaskButton.setAttribute('data-modifier-project-id', task.project)

  if (task.priority == "!") {
    outer.classList.add('low-priority')
  } else if (task.priority == "!!"){
    outer.classList.add('med-priority')
  } else {
    outer.classList.add("high-priority")
  }

  task_checkbox.checked = task.complete
  if (task.complete) {
    task_name.classList.add('task-completed')
    task_date.classList.add('task-completed')
    task_desc.classList.add('task-completed')
  }
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

projectsContainer.addEventListener("click", (e) => {
  selectedProjectID = e.target.dataset.projectId
  saveAndRender()
})

headerContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === 'button') {
    if (e.target.classList.contains('delete-project-button')) {
      if (confirm("Are you sure you want to delete this project and all its tasks?")) {
        projects = projects.filter(project => project.id !== selectedProjectID)
        if (projects.length > 0) {
          selectedProjectID = projects[0].id
        }
      }
    }
    else if (e.target.classList.contains('edit-project-button')) {
      const currentProject = projects.find(project => project.id === selectedProjectID)
      openProjectEditForm(currentProject.id, currentProject.name)
    }
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
      openEditTaskForm(currentTask.id, currentTask.project, currentTask.name, currentTask.desc, currentTask.date, currentTask.priority)
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
  if (projects.length == 1) {
    selectedProjectID = projects[0].id
  }
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

editProjectForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const currentProject = projects.find(project => project.id === editProjectForm.getAttribute('data-edit-project-id'))
  currentProject.name = editProjectNameInput.value
  saveAndRender()
  editProjectModal.close()
})

openTaskModalButton.addEventListener("click", () => {
  clearForm(addTaskNameInput, addTaskDescInput, addTaskDateInput, addTaskPriorityInput)
  addTaskModal.showModal()
})

closeTaskModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    addTaskModal.close()
    editTaskModal.close()
    editProjectModal.close()
  })
})

function makeVisible(element) {
  element.classList.remove('hidden')
}

function makeHidden(element) {
  element.classList.add('hidden')
}


function clearElement(element) {
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

function openProjectEditForm(id, name) {
  editProjectForm.setAttribute('data-edit-project-id', id)
  editProjectNameInput.value = name
  editProjectModal.showModal()
}

function openEditTaskForm(id, project, name, desc, date, priority) {
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