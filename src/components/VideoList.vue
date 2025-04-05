<template>
    <div class="video-list-page">
      <!-- Large Video Player -->
      <div v-if="selectedVideo" class="main-player-container">
        <h2>{{ selectedVideo.title }}</h2>
        <video
          ref="mainVideoRef"
          :src="selectedVideo.file"
          controls
          autoplay
          class="main-video"
        />
      </div>
  
      <!-- Video Thumbnails -->
      <div class="thumbnails-container">
        <div
          v-for="video in videos"
          :key="video.id"
          class="video-thumb"
          @click="selectVideo(video)"
        >
          <video
            :src="video.file"
            muted
            loop
            preload="metadata"
            playsinline
            class="thumbnail-preview"
          />
          <p>{{ video.title }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const videos = ref([])
  const selectedVideo = ref(null)
  const mainVideoRef = ref(null)
  
  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/videos/')
      videos.value = response.data
    } catch (err) {
      console.error('Error loading videos:', err)
    }
  }
  
  const selectVideo = (video) => {
    selectedVideo.value = video
  
    // Autoplay on select (in case autoplay is blocked by browser policy)
    nextTick(() => {
      const player = mainVideoRef.value
      if (player) {
        player.play().catch(() => {
          // some browsers require user interaction
        })
      }
    })
  }
  
  onMounted(fetchVideos)
  </script>
  
  <style scoped>
  .video-list-page {
    padding: 20px;
    max-width: 100%;
    margin: auto;
  }
  
  .main-player-container {
    margin-bottom: 30px;
    text-align: center;
  }
  
  .main-video {
    width: 100%;
    max-height: 550px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }
  
  .thumbnails-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    color : white;
  }
  
  .video-thumb {
    width: 220px;
    cursor: pointer;
    text-align: center;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }
  
  .video-thumb:hover {
    border-color: #409eff;
    transform: scale(1.02);
  }
  
  .thumbnail-preview {
    width: 100%;
    height: 130px;
    object-fit: cover;
    border-radius: 8px;
    background-color: #000;
  }
  </style>
  