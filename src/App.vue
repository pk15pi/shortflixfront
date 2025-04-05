<template>
  <div class="app-container">
    <!-- Background video -->
    <video autoplay loop muted class="background-video">
      <source src="./assets/bg2.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Router view (existing content) -->
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
/* Apply full screen, fixed background video */
body {
  margin: 0;
  background-color: #1d1c1c;
  color: white;
  font-family: sans-serif;
  overflow-x: hidden; /* Prevent horizontal scrolling */
  width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
}

/* This will position the video behind all content */
.app-container {
  position: relative;
  height: 100vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */
}

/* Make the background video cover the entire screen */
.background-video {
  position: fixed; /* Fix the video in place */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the video fills the screen */
  z-index: -1; /* Ensure the video stays behind the content */
}

/* Ensure content is visible above the video */
.content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1; /* Keeps content above the video */
  padding: 20px; /* Optional: Add padding around the content */
  box-sizing: border-box; /* Prevent padding from affecting layout */
  overflow: auto; /* Allows content to scroll if necessary */
}

button {
  padding: 8px 16px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
