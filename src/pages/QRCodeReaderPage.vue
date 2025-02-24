<script setup>
import { ref } from "vue"
import QRCodeScanner from '@/components/QRCodeScanner.vue';

const showScanner = ref(false); // Control visibility of the scanner

const toggleScanner = () => {
  showScanner.value = !showScanner.value; // Toggle the scanner
};

</script>
<template>
    <div class="flex justify-center items-center">
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <button @click="toggleScanner" class="bg-blue-500 text-white py-2 px-4 rounded">
                {{ showScanner ? 'Stop Scanning' : 'Start Scanning' }}
            </button>
            <div v-if="showScanner">
                <QRCodeScanner />
            </div>
            <!-- <form @submit.prevent="sendFile">
                <div class="text-center">
                    <h1 class="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">QR Code File Locator</h1>
                    <div class="pt-8">
                  
                    </div>
                </div>
                <div class="text-right">
                  
                
                </div>
            </form> -->
        </div>
    </div>
</template>