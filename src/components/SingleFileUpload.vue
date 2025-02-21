<script setup>
import { ref } from 'vue';

// Reactive references
const file = ref(null);
const imagePreview = ref(null);
const image = ref(null);
const fileName = ref('');
const fileSize = ref('');

// Register all your emits here
const emit = defineEmits(["error", 'uploaded']);

// Handle file selection
function onChange(event) {
  const selectedFile = event.target.files[0];
  if (!selectedFile) return;

  file.value = selectedFile;
  fileName.value = selectedFile.name;
  fileSize.value = formatFileSize(selectedFile.size);

  // Check if the selected file is an image
  const isImage = selectedFile.type.startsWith('image/');
  
  if (isImage) {
    // Display image preview if the selected file is an image
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
      image.value = selectedFile;
    };
  } else {
    // If it's not an image, reset the preview
    imagePreview.value = null;
    image.value = null;
  }

  emit('uploaded', selectedFile);
}

// Functions

// TODO:: Implement functionality
function dragleave(event) {
    event.currentTarget.classList.add('bg-accent')
    event.currentTarget.classList.remove('bg-purple-200')
}

// TODO:: Implement functionality
function dragover(event) {
    event.preventDefault()
    if (!event.currentTarget.classList.contains('bg-purple-200')) {
        event.currentTarget.classList.remove('bg-accent')
        event.currentTarget.classList.add('bg-purple-50')
    }
}

// TODO:: Implement functionality
function drop(event) {
    event.preventDefault();
    file.value = event.dataTransfer.files[0]
    emit('uploaded', file.value);
    event.currentTarget.classList.add('bg-accent')
    event.currentTarget.classList.remove('bg-purple-200')
}

// Format file size to a human-readable format
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  else if (bytes < 1048576) return `${(bytes / 1024).toFixed(2)} KB`;
  else return `${(bytes / 1048576).toFixed(2)} MB`;
}

function handleRemoveFile() {
  file.value = null;
  imagePreview.value = null;
  image.value = null;
  fileName.value = '';
  fileSize.value = '';
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput) {
    fileInput.value = null;
  }
}

defineExpose({
  handleRemoveFile
})

</script>

<template>
  <div class="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-300">
    <!-- Drop area -->
    <div class="flex-1 h-full justify-center items-center content-stretch" @dragover.prevent @drop.prevent>
      <div class="flex flex-col items-center mx-auto py-6 gap-2">
        <!-- File Upload Instructions -->
        <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.1665 26.6665L14.8095 19.0235C16.1112 17.7218 18.2218 17.7218 19.5235 19.0235L27.1665 26.6665M23.8332 23.3332L26.4761 20.6902C27.7779 19.3884 29.8884 19.3884 31.1902 20.6902L33.8332 23.3332M23.8332 13.3332H23.8498M10.4998 33.3332H30.4998C32.3408 33.3332 33.8332 31.8408 33.8332 29.9998V9.99984C33.8332 8.15889 32.3408 6.6665 30.4998 6.6665H10.4998C8.65889 6.6665 7.1665 8.15889 7.1665 9.99984V29.9998C7.1665 31.8408 8.65889 33.3332 10.4998 33.3332Z" 
            stroke="#878CA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="flex items-center gap-1 text-sm">
          <label class="relative cursor-pointer text-gray-600 font-medium text-sm" for="fileUpload">
            <span class="text-primary text-lg font-bold hover:underline">Upload a file</span>
            <input @click="handleRemoveFile" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx"
              class="w-px h-px opacity-0 overflow-hidden absolute" required id="fileUpload" ref="fileUpload" type="file" @change="onChange" />
          </label>
          <!-- <p class="text-gray-600 font-medium">or drag and drop</p> -->
        </div>
        <p class="text-xs text-gray-500">
          PNG, JPG, JPEG, PDF, DOC, DOCX, XLS, XLSX up to 10MB
        </p>
      </div>
    </div>
  </div>

  <div class="pt-4 mt-4">
<!-- Image Preview -->
   <div v-if="imagePreview" class="pt-4">
      <div class="relative">
        <div class="absolute top-1 right-1 rounded-full bg-white p-1 cursor-pointer" @click="handleRemoveFile">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
        <img :src="imagePreview" alt="Image Preview" class="w-full h-[300px] bg-medium-dark object-cover object-scale-down rounded-2xl" />
      </div>
    </div>

    <!-- File Name and Size (For Non-Image Files) -->
     <div class="relative">
            <div v-if="!imagePreview && fileName" class="absolute top-1 right-1 rounded-full bg-white p-1 cursor-pointer" @click="handleRemoveFile">
                  <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
            </div>
            <div v-if="!imagePreview && fileName" class="pt-4 text-left border border-gray-100 shadow p-4 rounded-lg">
                  <p class="text-lg font-semibold text-gray-700">{{ fileName }}</p>
                  <p class="text-sm text-gray-500">{{ fileSize }}</p>
            </div>
     </div>
      

  </div>
   
</template>

