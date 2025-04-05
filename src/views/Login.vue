<template>
  <div class="login">
    <form @submit.prevent="handleLogin">
      <h2 class="title">LOGIN</h2> 

      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>

      <hr style="margin: 20px 0" />

      <button type="button" @click="continueAsGuest">Continue as Guest</button>

      <hr style="margin: 20px 0" />

      <p>
        Don’t have an account? &nbsp;&nbsp;
        <router-link to="/signup">Sign up here</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await auth.login(username.value, password.value)
    router.push('/home')
  } catch (err) {
    alert('Login failed')
  }
}

const continueAsGuest = () => {
  auth.token = ''
  auth.username = 'Guest'
  auth.name = 'Guest'
  localStorage.setItem('username', 'Guest')
  localStorage.setItem('name', 'Guest')
  localStorage.removeItem('token')
  router.push('/home')
}

</script>

<style scoped>


.login {
  display: flex;
  justify-content: center;   /* Centers content horizontally */
  align-items: center;       /* Centers content vertically */
  height: 100vh;             /* Full viewport height */
  width: 100vw;              /* Full viewport width */
  color : white;
}

/* Styling for the form inside the login container */
.login form {
  display: flex;
  flex-direction: column;
  justify-content: center;   /* Center form elements vertically */
  align-items: center;       /* Center form elements horizontally */
  padding: 20px;             /* Add padding inside the form */
  border: 2px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;          /* Limit form width to make it look better on large screens */
}

/* Input fields styling */
.login input {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 100%;  /* Ensure the inputs take full width inside the form */
}

/* Button styling */
.login button {
  padding: 10px;
  margin-top: 10px;
  font-size: 1rem;
  border: none;
  background-color: #2c3e50;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;  /* Make the button stretch to full width inside the form */
}

/* Hover effect on the button */
.login button:hover {
  background-color: #1a242f;
}

/* Paragraph styling */
.login p {
  margin-top: 15px;
  font-size: 0.95rem;
}


</style>
