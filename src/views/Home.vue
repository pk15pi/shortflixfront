<template>
  <div :class="themeClass" class="video-list-container">
    <div class="header">
      <h2 class="welcome">Welcome, {{ auth.name }}</h2>
      <div>
        <button @click="goToLogin">Hot</button>
        <button @click="goToLogin">New Arrivals</button>
        <button @click="goToLogin">Romantic</button>
        <button @click="goToLogin">Most Viewed</button>
        <button @click="goToLogin">Most Starred</button>
        <button v-if="isGuest" @click="goToLogin">Login</button>
        <button v-if="isGuest" @click="goToSignup">Signup</button>
      </div>
      
      <!-- Toggle Button for Day/Night mode -->
      <button @click="toggleTheme" class="theme-toggle-btn">
        Toggle Theme
      </button>
    </div>

    <div class="thumbnails">
      <VideoList />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import VideoList from '../components/VideoList.vue'

const router = useRouter()
const auth = useAuthStore()

// Store theme state (light/dark mode)
const isDarkMode = ref(true) // default is dark mode

// Computed property to add appropriate classes for theme
const themeClass = computed(() => {
  return isDarkMode.value ? 'dark-theme' : 'light-theme'
})

const isGuest = computed(() => auth.username === 'Guest')

const goToLogin = () => {
  router.push('/login')
}

const goToSignup = () => {
  router.push('/signup')
}

// Toggle between dark and light theme
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}
</script>

<style scoped>
.video-list-container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: black;
}

.welcome {
  margin: 0;
  font-size: 1.5rem;
  color:white;
  background-color: #409eff;
}

.nav-items {
  display: flex;
  gap: 10px;
}


.nav-items button {
  cursor: pointer;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-items button:hover {
  background-color: #1a252f;
  border-color: #ff407c;
  transform: scale(1.2);
  border-radius: 5px;
}

.thumbnails {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

/* Dark theme styles */
.dark-theme {

  color: white;
}

.dark-theme .header {
  color: black;
}

.dark-theme .nav-items button {
  color: white;
}

.dark-theme .nav-items button:hover {
  background-color: #1a252f;
  border-color: #ff407c;
}

/* Light theme styles */
.light-theme {
  background-color: #f7f7f7;
  color: #2c3e50;
}

.light-theme .header {
  background-color: #fff;
}

.light-theme .nav-items button {
  background-color: #fff;
  color: #2c3e50;
  border: 1px solid #ccc;
}

.light-theme .nav-items button:hover {
  background-color: #f1f1f1;
  border-color: #ff407c;
}

/* Add styles for the toggle button */
.theme-toggle-btn {
  padding: 8px 16px;
  cursor: pointer;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button {
  padding: 8px 16px;
  cursor: pointer;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.theme-toggle-btn:hover {
  background-color: #005cbf;
}
</style>
