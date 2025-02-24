import { createRouter, createWebHistory } from 'vue-router'
import FileUploadPage from '@/pages/FileUploadPage.vue'
import QRCodeReaderPage from '@/pages/QRCodeReaderPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: FileUploadPage
  },
  {
    path: '/read-qr',
    name: 'read-qr',
    component: QRCodeReaderPage
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router