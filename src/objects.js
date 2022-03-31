function ToDo(title, desc, date, priority) {
  return {
    title: title,
    desc: desc,
    date: date,
    priority: priority
  }
}

function Project(title) {
  return {
    title: title,
    children: {}
  }
}

export { ToDo, Project }