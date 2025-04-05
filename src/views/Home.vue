<template>
  <div class="video-list-container">
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



const isGuest = computed(() => auth.username === 'Guest')

const goToLogin = () => {
  router.push('/login')
}

const goToSignup = () => {
  router.push('/signup')
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
}

.welcome {
  margin: 0;
  font-size: 1.5rem;
  color: #2c3e50;
}

.nav-items {
  display: flex;
  gap: 10px;
}

.nav-items button {
  padding: 8px 12px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.nav-items button:hover {
  background-color: #1a252f;
  border-color: #ff407c;
  transform: scale(1.2);
  border-radius: 8px;
}

.thumbnails {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
</style>
