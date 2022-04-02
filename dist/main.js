/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _objects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects */ \"./src/objects.js\");\n\n\nconst homeContainer = document.querySelector('[data-home]')\nconst projectsContainer = document.querySelector('[data-projects]')\n\nconst addProjectForm = document.querySelector('[data-project-form]')\nconst projectInput = document.querySelector('[data-project-input]')\nconst addProjectButton = document.querySelector('[data-add-project-btn]')\nconst projectHeading = document.querySelector('[data-project-heading]')\n\nconst LOCAL_STORAGE_PROJECT_KEY = 'task.projects'\nconst LOCAL_STORAGE_SELECTED_PROJECT_KEY = 'task.selected.project'\n\nlet projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || []\nlet selectedProjectID = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY)\n\nfunction render() {\n  clearElement(projectsContainer)\n  projects.forEach(project => {\n    const li = document.createElement('li');\n    li.dataset.projectId = project.id\n    li.textContent = project.name\n    li.classList.add('indiv-project')\n    projectsContainer.appendChild(li)\n    if (li.dataset.projectId === selectedProjectID) {\n      li.classList.add(\"project-active\") \n      projectHeading.textContent = li.textContent\n    }\n  })\n  if (selectedProjectID == 'home') {\n    homeContainer.classList.add(\"project-active\")\n    projectHeading.textContent = homeContainer.textContent\n  }\n}\n\nfunction save() {\n  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects))\n  localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY, selectedProjectID)\n}\n\nfunction saveAndRender() {\n  save()\n  render()\n} \n\nhomeContainer.addEventListener(\"click\", (e) => {\n  selectedProjectID = e.target.dataset.projectId\n  saveAndRender()\n})\n\nprojectsContainer.addEventListener(\"click\", (e) => {\n  selectedProjectID = e.target.dataset.projectId\n  saveAndRender()\n})\n\naddProjectForm.addEventListener(\"click\", (e) => {\n  e.preventDefault();\n  console.log('hi')\n  const projectName = projectInput.value\n  if (projectName == null || projectName === '') return\n  projectInput.value = null\n  const newProject = (0,_objects__WEBPACK_IMPORTED_MODULE_0__.createProject)(projectName)\n  projects.push(newProject)\n  saveAndRender()\n})\n\nfunction clearElement(element) {\n  homeContainer.classList.remove(\"project-active\")\n  while (element.firstChild) {\n    element.removeChild(element.firstChild)\n  }\n}\n\nrender()\n\n//# sourceURL=webpack://todo/./src/index.js?");

/***/ }),

/***/ "./src/objects.js":
/*!************************!*\
  !*** ./src/objects.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createProject\": () => (/* binding */ createProject),\n/* harmony export */   \"createTask\": () => (/* binding */ createTask)\n/* harmony export */ });\nfunction createTask(title, desc, date, priority) {\n  return {\n    title: title,\n    desc: desc,\n    date: date,\n    priority: priority\n  }\n}\n\nfunction createProject(name) {\n  return {\n    id: Date.now().toString(),\n    name: name,\n    tasks: []\n  }\n}\n\n\n\n//# sourceURL=webpack://todo/./src/objects.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;