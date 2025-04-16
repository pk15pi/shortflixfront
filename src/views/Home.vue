<template>
  <div :class="themeClass" class="video-list-container">
    <div class="header">
      <h2 class="welcome">Welcome, {{ auth.name }}</h2>

      <div class="nav-items">
        <button @click="fetchVideos('hot')">Hot</button>
        <button @click="fetchVideos('new')">New Arrivals</button>
        <button @click="fetchVideos('romantic')">Romantic</button>
        <button @click="fetchVideos('most_viewed')">Most Viewed</button>
        <button @click="fetchVideos('most_starred')">Most Starred</button>
      </div>

      <div class="profile-wrapper">
        <button @click="toggleDropdown" class="profile-icon">👤</button>
        <div v-if="showDropdown" class="dropdown-menu">
          <button v-if="isGuest" @click="goToLogin">Login</button>
          <button v-if="isGuest" @click="goToSignup">Signup</button>
          <button v-if="isGuest" @click="logout()">Logout</button>
        </div>
      </div>

      <label class="theme-switch">
        <input type="checkbox" v-model="isDarkMode" />
        <span class="slider"></span>
      </label>

    </div>

    <div class="thumbnails">
      <VideoList
        :videos="videos"
        :next="next"
        :previous="previous"
        :totalPages="totalPages"
        :currentPage="currentPage"
        @paginate="handlePagination"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import VideoList from '../components/VideoList.vue'
import axios from 'axios'

const router = useRouter()
const auth = useAuthStore()

const videos = ref([])
const next = ref(null)
const previous = ref(null)
const totalPages = ref(1)
const currentPage = ref(1)

const isDarkMode = ref(true)
const themeClass = computed(() => (isDarkMode.value ? 'dark-theme' : 'light-theme'))
const isGuest = computed(() => auth.username === 'Guest')

const showDropdown = ref(false)

const goToLogin = () => {
  router.push('/login')
  showDropdown.value = false
}
const goToSignup = () => {
  router.push('/signup')
  showDropdown.value = false
}

const toggleTheme = () => (isDarkMode.value = !isDarkMode.value)
const toggleDropdown = () => (showDropdown.value = !showDropdown.value)

const fetchVideos = async (category = '', page = 1) => {
  videos.value = ''
  next.value = ''
  previous.value = ''
  totalPages.value = ''
  currentPage.value = ''
  try {
    const response = await axios.get(`http://localhost:8000/api/videos/?keyword=${category}&page=${page}`)
    videos.value = response.data.results
    next.value = response.data.next
    previous.value = response.data.previous
    totalPages.value = response.data.total_pages
    currentPage.value = response.data.current_page
  } catch (err) {
    console.error('Error fetching videos:', err)
  }
}

const handlePagination = (pageNumber) => {
  fetchVideos(pageNumber)
}

onMounted(() => {
  fetchVideos('hot')
})


const logout = async () => {
  const auth = useAuthStore()
  const refresh = localStorage.getItem('refresh')

  // try {
  //   await axios.post('http://localhost:8000/api/logout/', { refresh })
  // } catch (error) {
  //   console.error('Logout failed', error)
  // }

  // Clear localStorage or auth state
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  auth.$reset() // If using Pinia

  // Redirect to login
  window.location.href = '/login'
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
  flex-wrap: wrap;
  color: black;
}

.welcome {
  margin: 0;
  font-size: 1.5rem;
  color: white;
  background-color: #409eff;
  padding: 6px 12px;
  border-radius: 6px;
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
  transform: scale(1.1);
}

/* Profile icon and dropdown */
.profile-wrapper {
  position: relative;
  display: inline-block;
}

.profile-icon {
  background: #409eff;
  color: white;
  font-size: 20px;
  padding: 8px 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 110%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.dropdown-menu button {
  padding: 10px;
  background: none;
  border: none;
  text-align: left;
  width: 100%;
  cursor: pointer;
  font-size: 14px;
}

.dropdown-menu button:hover {
  background-color: #f0f0f0;
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

.dark-theme .nav-items button,
.dark-theme .profile-icon,
.dark-theme .theme-toggle-btn {
  color: white;
  background-color: #409eff;
}

.dark-theme .dropdown-menu {
  background-color: #2c3e50;
  color: white;
}

.dark-theme .dropdown-menu button:hover {
  background-color: #1a252f;
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

.theme-toggle-btn {
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

button {
  padding: 8px 16px;
  cursor: pointer;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.theme-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.theme-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.theme-switch .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.theme-switch .slider::before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

.theme-switch input:checked + .slider {
  background-color: #409eff;
}

.theme-switch input:checked + .slider::before {
  transform: translateX(24px);
}


</style>
