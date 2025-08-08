<template>
  <div>
    <h2>All Books (JSON)</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" style="color:red">{{ error }}</div>
    <pre v-else>{{ JSON.stringify(books, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import db from '../Firebase/init.js'
import { collection, getDocs } from 'firebase/firestore'

const books = ref([])
const loading = ref(true)
const error = ref(null)

const fetchBooks = async () => {
  loading.value = true
  error.value = null
  try {
    const querySnapshot = await getDocs(collection(db, 'books'))
    books.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (err) {
    error.value = 'Error loading books: ' + err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchBooks)
</script>
