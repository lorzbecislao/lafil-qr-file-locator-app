<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import SingleFileUpload from './components/SingleFileUpload.vue'
import ShowQRModal from './components/ShowQRModal.vue'
import { ref } from 'vue'

const fileInput = ref(null);
const qrCodeUrl = ref(null);
const modalOpen = ref(false)
const uploader = ref(null) // Upload component reference

const sendFile = async () => {
    const formData = new FormData()
    formData.append('file', fileInput.value)
  
    try {
        // TODO:: Create .env file
        const response = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            body: formData
        });

      const data = await response.json();

      if (response.ok) {
        console.log('File uploaded successfully');
        qrCodeUrl.value = data.qrCode;  // Set the QR code data URL from response
        if (uploader.value) {
            uploader.value.handleRemoveFile();
        }
        modalOpen.value = true;
      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
        console.error('Failed to upload file', error);
    }
}

const handleUpload = (file) => {
  fileInput.value = file;
}

</script>
<template>
  <div class="bg-white">
  <header class="absolute inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">La Filipina Uy Gongco Group of Companies</span>
          <img class="h-8 w-auto" src="./assets/lafil-logo.png" alt="">
        </a>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span class="sr-only">Open main menu</span>
          <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a href="#" class="text-sm/6 font-semibold text-gray-900">Portal Link</a>
        <a href="#" class="text-sm/6 font-semibold text-gray-900">Features</a>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" class="text-sm/6 font-semibold text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
      </div>
    </nav>
    
  </header>

  <div class="relative isolate px-6 pt-14 lg:px-8">
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div class="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
    <div class="flex justify-center items-center">
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <form @submit.prevent="sendFile">
            <div class="text-center">
              <h1 class="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">QR Code File Locator</h1>

              <div class="pt-8">
                <single-file-upload ref="uploader" @uploaded="handleUpload"/>
              </div>
              
            </div>
            <div class="text-right">
                <button type="submit" class="rounded-md cursor-pointer bg-indigo-600 px-12 w-full py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Upload File
                </button>
            </div>
        </form>
      </div>
      
    </div>
    
    <ShowQRModal :open="modalOpen"
                 :qrCode="qrCodeUrl"
                 @close="modalOpen = false" />

  </div>
</div>
</template>

