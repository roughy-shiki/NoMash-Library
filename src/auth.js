// src/auth.js
import { ref } from 'vue'

let isAuthenticated
if (!window.__authState) {
  isAuthenticated = ref(false)
  window.__authState = isAuthenticated
} else {
  isAuthenticated = window.__authState
}

const hardcodedUser = {
  username: 'admin',
  password: 'password123'
}

function login(username, password) {
  if (username === hardcodedUser.username && password === hardcodedUser.password) {
    isAuthenticated.value = true
    return true
  }
  isAuthenticated.value = false
  return false
}

function logout() {
  isAuthenticated.value = false
}

function useAuth() {
  return { isAuthenticated, login, logout }
}

export { useAuth };
