<template>
  <div class="register-container">
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Save to Firebase</button></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";


const email = ref("");
const password = ref("");


const router = useRouter();
const auth = getAuth();

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Register Successful!");
      router.push("/FireLogin"); 
    })
    .catch((error) => {
      console.log(error.code);
    });
};
</script>

<style scoped>

.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
input, button {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
}
</style>