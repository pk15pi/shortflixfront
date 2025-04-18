<template>
    <div class="login">  
      <form @submit.prevent="handleSignup">
        <h2 class="title">SIGNUP</h2>
  
        <input v-model="name" placeholder="Name" />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
  
        <input v-model="title" placeholder="Title" />
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
  
        <input v-model="contact" placeholder="Contact" />
        <span v-if="errors.contact" class="error">{{ errors.contact }}</span>
  
        <input v-model="username" placeholder="Username" />
        <span v-if="errors.username" class="error">{{ errors.username }}</span>
  
        <input v-model="email" placeholder="Email" />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
  
        <input v-model="password" type="password" placeholder="Password" />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
  
        <button type="submit">Signup</button>

        <hr style="margin: 20px 0; color: white;" />
  
        <button type="button" @click="continueAsGuest">Continue as Guest</button>
      </form>
  

    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../store/auth'
  
  const router = useRouter()
  const auth = useAuthStore()
  
  const name = ref('')
  const title = ref('')
  const contact = ref('')
  const username = ref('')
  const email = ref('')
  const password = ref('')
  
  const errors = ref({
    name: '',
    title: '',
    contact: '',
    username: '',
    email: '',
    password: ''
  })
  
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
  
  const validateForm = () => {
    let isValid = true
    errors.value = {
      name: '',
      title: '',
      contact: '',
      username: '',
      email: '',
      password: ''
    }
  
    if (!name.value.trim()) {
      errors.value.name = "Name can't be blank"
      isValid = false
    }
  
    if (!title.value.trim()) {
      errors.value.title = "Title can't be blank"
      isValid = false
    }
  
    if (contact.value.length !== 10) {
      errors.value.contact = "Contact number must be 10 digits"
      isValid = false
    }
  
    if (!username.value.trim()) {
      errors.value.username = "Username can't be blank"
      isValid = false
    } else if (username.value.length < 5) {
      errors.value.username = 'Username must be at least 5 characters'
      isValid = false
    }
  
    if (!email.value.trim()) {
      errors.value.email = "Email can't be blank"
      isValid = false
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.value)) {
        errors.value.email = 'Invalid email format (e.g., user@domain.com)'
        isValid = false
      }
    }
  
    if (!password.value.trim()) {
      errors.value.password = "Password can't be blank"
      isValid = false
    }
  
    return isValid
  }
  
  const handleSignup = async () => {
    if (!validateForm()) return
  
    try {
      const response = await fetch('http://localhost:8000/accounts/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.value,
          title: title.value,
          contact: contact.value,
          username: username.value,
          email: email.value,
          password: password.value
        })
      })
  
      const data = await response.json()
  
      if (response.ok) {
        alert('Signup Successful. Logging in and redirecting to home...')
        await wait(4000)
  
        try {
          // Adjust this based on your actual login logic
          await auth.login(email.value, password.value)
          auth.username = username.value
          auth.name = name.value
          router.push('/home')
        } catch (loginErr) {
          console.error('Login failed after signup:', loginErr)
          alert('Signup was successful, but login failed. Please try logging in manually.')
        }
      } else {
        alert('Signup failed: ' + JSON.stringify(data))
      }
    } catch (err) {
      console.error('Signup error:', err)
      alert('Something went wrong. Please try again.')
    }
  }
  
  const continueAsGuest = () => {
    auth.token = ''
    auth.username = 'Guest'
    router.push('/home')
  }
  </script>
  
  <style scoped>
  .error {
    color: red;
    font-size: 0.9em;
    display: block;
    margin: 4px 0 12px;
  }
  
  
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
  