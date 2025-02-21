<script setup>
import Modal from "./Modal.vue"
// import PrimaryButton from "@/Components/Shared/PrimaryButton.vue"
// import SecondaryButton from "@/Components/Shared/SecondaryButton.vue"
import { ref, onMounted, watch, computed } from "vue";
// import TextInput from "@/Components/Shared/TextInput.vue"


// emits
const emits = defineEmits(['close'])

// props
const props = defineProps({
    open: Boolean,
    qrCode: String
})

// methods
function close() {
    emits('close')
}

const cancel = () => {
    close()
}

const print = () => {
    window.print()
    console.log('handle print QR');
}

</script>
<template>
    <Modal :open="open" @close="close">
        <template v-slot:content>
            <h5 class="font-heading font-bold text-2xl text-center text-black-darkest">
                QR Code
            </h5>
            <!-- Forms -->
            <form @submit.prevent="submit">
                  <div class="pt-6 flex justify-center">
                        <img :src="qrCode" alt="" srcset="" class="w-72">
                  </div>
                  <div class="pt-6 flex justify-end gap-3">
                        <button @click="cancel" class="w-full rounded-md cursor-pointer bg-white border border-gray-100 px-12 w-full py-2.5 text-sm font-semibold text-primary shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                              Cancel
                        </button>
                        <button @click="print" class="w-full rounded-md cursor-pointer bg-indigo-600 px-12 w-full py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                              Print QR Code
                        </button>
                  </div> 
            </form>
        </template>
    </Modal >
</template>