<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

const navigation = [
  { name: 'File Upload', href: '/', current: false },
  { name: 'QR Code Reader', href: '/read-qr', current: false },
]
</script>

<template>
    <header>
        <Disclosure as="nav" class="bg-white" v-slot="{ open }">
            <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-200 hover:text-black focus:ring-2 focus:ring-black focus:outline-hidden focus:ring-inset">
                        <span class="absolute -inset-0.5" />
                        <span class="sr-only">Open main menu</span>
                        <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </DisclosureButton>
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex shrink-0 items-center">
                    <img class="h-8 w-auto" src="../assets/lafil-logo.png" alt="La Filipina Uy Gongco Group of Companies" />
                    </div>
                    <div class="hidden sm:ml-6 sm:block">
                    <div class="flex space-x-4">
                        <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900', 'rounded-md px-3 py-2 text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">
                            <router-link :to="item.href">{{ item.name }}</router-link>
                        </a>
                    </div>
                    </div>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        
                </div>
                </div>
            </div>
        
            <DisclosurePanel class="sm:hidden">
                <div class="space-y-1 px-2 pt-2 pb-3">
                <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900', 'block rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
                </div>
            </DisclosurePanel>
        </Disclosure>
    </header>
</template>
