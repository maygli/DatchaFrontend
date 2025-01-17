import { sendProtectedRequest } from "./protected_request.js"

const PROJECTS_URL = "/projects"
const PROJECT_URL = "/project"
const GET_PROJECTS_METHOD = "GET"
const PUT_PROJECT_METHOD = "PUT"
const NEW_PROJECT_METHOD = "POST"
const DELETE_PROJECT_METHOD = "DELETE"
const PUT_PROJECT_DATA_TYPE = "multipart/form-data"
const NEW_PROJECT_DATA_TYPE = "multipart/form-data"

export function getProjects() {
  return new Promise((resolve, reject) => {
    sendProtectedRequest(PROJECTS_URL, GET_PROJECTS_METHOD)
      .then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
  })
}

export function postNewProject(newProjectData) {
  return new Promise((resolve, reject) => {
    sendProtectedRequest(PROJECTS_URL, NEW_PROJECT_METHOD, newProjectData, NEW_PROJECT_DATA_TYPE)
      .then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
  })
}

export function deleteProject(projectId) {
  return new Promise((resolve, reject) => {
    sendProtectedRequest(PROJECT_URL + "/" + projectId, DELETE_PROJECT_METHOD, null, null)
      .then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
  })
}

export function putProject(projectData) {
  return new Promise((resolve, reject) => {
    sendProtectedRequest(PROJECT_URL, PUT_PROJECT_METHOD, projectData, PUT_PROJECT_DATA_TYPE)
      .then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
  })
}