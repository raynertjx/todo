function createTask(name, desc, date, priority, project) {
  return {
    id: Date.now().toString(),
    name: name,
    desc: desc,
    date: date,
    priority: priority,
    project: project,
    complete: false
  }
}

function createProject(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: []
  }
}

export { createTask, createProject }