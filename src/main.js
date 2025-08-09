// import './assets/main.css'
// import '@/assets/style.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

// app.component('DataTable', DataTable)
// app.component('Column', Column)

app.mount('#app')
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZLQf2IpJnCRgVOLuIYd3pVxcCh38eSVI",
  authDomain: "fit5032-35524537.firebaseapp.com",
  projectId: "fit5032-35524537",
  storageBucket: "fit5032-35524537.firebasestorage.app",
  messagingSenderId: "511043587023",
  appId: "1:511043587023:web:e87bfab7a7fc5e826960ba"
};

// Initialize Firebase
initializeApp(firebaseConfig);