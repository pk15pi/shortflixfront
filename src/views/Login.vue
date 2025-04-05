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

      <p style="color: black;">
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
.title {
  color: blue; margin: auto; padding-bottom: 50px;
  text-decoration: underline;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
}

.login form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.login input {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.login button {
  padding: 10px;
  margin-top: 10px;
  font-size: 1rem;
  border: none;
  background-color: #2c3e50;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

.login button:hover {
  background-color: #1a242f;
}

.login p {
  margin-top: 15px;
  font-size: 0.95rem;
}
</style>
