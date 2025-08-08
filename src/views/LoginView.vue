<template>
  <div class="container mt-5">
    <h2 class="text-center">Login</h2>
    <form @submit.prevent="handleLogin" class="mt-4">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input v-model="username" type="text" class="form-control" id="username" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control" id="password" required />
      </div>
      <div v-if="error" class="text-danger mb-3">{{ error }}</div>
      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../auth'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const { login } = useAuth()

const handleLogin = () => {
  error.value = ''
  if (login(username.value, password.value)) {
    router.push('/about')
  } else {
    error.value = 'Invalid username or password.'
  }
}
</script>
