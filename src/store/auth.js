// store/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('username') || '',
    name: localStorage.getItem('name') || ''
  }),
  actions: {
    async login(username, password) {
      const res = await axios.post('http://127.0.0.1:8000/api/login/', { username, password })
      this.token = res.data.token
      this.username = res.data.username
      this.name = res.data.name || res.data.username

      localStorage.setItem('token', this.token)
      localStorage.setItem('username', this.username)
      localStorage.setItem('name', this.name)
    },
    logout() {
      this.token = ''
      this.username = ''
      this.name = ''
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('name')
    },
    restoreFromLocalStorage() {
      this.token = localStorage.getItem('token') || ''
      this.username = localStorage.getItem('username') || ''
      this.name = localStorage.getItem('name') || ''
    }
  }
})
