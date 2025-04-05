<template>
    <div class="video-detail">
      <h2>{{ video.title }}</h2>
      
      <video
        v-if="video.file"
        :src="video.file"
        controls
        autoplay
        class="video-player"
      >
        Your browser does not support the video tag.
      </video>
      
      <div v-else>
        <p>Loading video...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  
  const route = useRoute()
  const video = ref({})
  
  onMounted(async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/videos/${route.params.id}/`)
      video.value = response.data
    } catch (error) {
      console.error('Failed to load video:', error)
    }
  })
  </script>
  
  <style scoped>
  .video-detail {
    max-width: 900px;
    margin: 40px auto;
    padding: 16px;
    text-align: center;
  }
  
  .video-player {
    width: 100%;
    max-height: 600px;
    border-radius: 12px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  }
  </style>
  