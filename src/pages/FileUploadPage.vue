<script setup>
import SingleFileUpload from '@/components/SingleFileUpload.vue'
import ShowQRModal from '@/components/ShowQRModal.vue'
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
    <div class="flex justify-center items-center">
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <form @submit.prevent="sendFile">
                <div class="text-center">
                    <h1 class="text-5xl px-12 font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">File Upload</h1>
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

        <ShowQRModal :open="modalOpen"
                :qrCode="qrCodeUrl"
                @close="modalOpen = false" />
        
    </div>
</template>