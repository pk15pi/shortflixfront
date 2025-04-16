<template>
  <div :class="themeClass" class="video-list-container">
    <div class="header">
      <h2 class="welcome">Welcome, {{ auth.name }}</h2>
      <div>
        <button @click="fetchVideos('hot')">Hot</button>
        <button @click="fetchVideos('new')">New Arrivals</button>
        <button @click="fetchVideos('romantic')">Romantic</button>
        <button @click="fetchVideos('most_viewed')">Most Viewed</button>
        <button @click="fetchVideos('most_starred')">Most Starred</button>
        <button v-if="isGuest" @click="goToLogin">Login</button>
        <button v-if="isGuest" @click="goToSignup">Signup</button>
      </div>

      <button @click="toggleTheme" class="theme-toggle-btn">Toggle Theme</button>
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
import axios from 'axios'
import VideoList from '../components/VideoList.vue'

const next = ref(null)
const previous = ref(null)
const router = useRouter()
const auth = useAuthStore()
const videos = ref([])
const totalPages = ref(1)
const currentPage = ref(1)

const isDarkMode = ref(true)
const themeClass = computed(() => (isDarkMode.value ? 'dark-theme' : 'light-theme'))
const isGuest = computed(() => auth.username === 'Guest')

const goToLogin = () => router.push('/login')
const goToSignup = () => router.push('/signup')
const toggleTheme = () => (isDarkMode.value = !isDarkMode.value)


// Fetch videos based on category
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

// Load default videos on mount (e.g. 'hot' by default)
onMounted(() => {
  fetchVideos('hot')
})
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
