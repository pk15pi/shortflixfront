<template>
  <div class="video-list-page">
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

  <div class="pagination">
    <!-- Pagination Controls -->
    <button :disabled="!previous" @click="$emit('paginate', currentPage - 1)">Previous</button>
    <button
      v-for="page in totalPages"
      :key="page"
      :class="{ active: page === currentPage }"
      @click="$emit('paginate', page)"
    >
      {{ page }}
    </button>
    <button :disabled="!next" @click="$emit('paginate', currentPage + 1)">Next</button>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
const props = defineProps({
  videos: Array,
  next: String,
  previous: String,
  currentPage: Number,
  totalPages: Number
})



const selectedVideo = ref(null)
const mainVideoRef = ref(null)

const selectVideo = (video) => {
  selectedVideo.value = video
  nextTick(() => {
    mainVideoRef.value?.play().catch(() => {})
  })
}

watch(
  () => props.videos,
  (newVideos) => {
    if (newVideos?.length) {
      selectedVideo.value = newVideos[0]
    } else {
      selectedVideo.value = null
    }
  },
  { immediate: true }
)
</script>


<style scoped>
  .pagination {
    margin: auto;
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .pagination button {
    padding: 8px 14px;
    background-color: #409eff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    align-content: center;
  }

  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .pagination button.active {
    background-color: #1d8bf1;
    font-weight: bold;
    transform: scale(1.1);
  }

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
    border: thistle, solid;
    border-radius:5px;
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
}

</style>
