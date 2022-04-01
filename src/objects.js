function createTask(title, desc, date, priority) {
  return {
    title: title,
    desc: desc,
    date: date,
    priority: priority
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