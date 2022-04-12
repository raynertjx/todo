const editProjectModal = document.querySelector('.edit-project-modal')
const editProjectNameInput = document.querySelector('[data-project-name-edit]')
const editProjectForm = document.querySelector('[data-project-edit-form]')

const editTaskModal = document.querySelector('.edit-task-modal')
const editTaskForm = document.querySelector('[data-task-form-edit]')
const editTaskNameInput = document.querySelector('[data-task-name-edit]')
const editTaskDescInput = document.querySelector('[data-task-desc-edit]')
const editTaskDateInput = document.querySelector('[data-task-date-edit]')
const editTaskPriorityInput = document.querySelector('[data-task-priority-edit]')

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

export { makeVisible, makeHidden, clearElement, checkForm, clearForm, openProjectEditForm, openEditTaskForm, editTask }