<template>
    <video controls width="600" :src="src" />
  </template>
  
  <script setup>
  defineProps(['src'])
  </script>
  