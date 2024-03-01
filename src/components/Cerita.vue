<script>
import Navbar from './Navbar.vue'

export default {
    components: {
        Navbar
    },
    data() {
        return {
            Ceritaanda: [
                { title: 'Cerita', content: 'Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec vulputate neque non mi.' },
                { title: 'Cerita', content: 'Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec vulputate neque non mi.' },
                { title: 'Cerita', content: 'Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec vulputate neque non mi.' },
                { title: 'Cerita', content: 'Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec vulputate neque non mi.' },
            ]
        }
    }
}
</script>

<template>
    <Navbar />

    <div>
        <div class="pt-4 mx-4 flex justify-between">
            <button class="text-white flex bg-red items-center gap-2 p-2 mb-4 font-medium hover:cursor-pointer rounded-md">Cerita Anda</button>
            <router-link to="/aturancerita"><button class="font-inter text-white flex bg-red items-center gap-2 p-2 mb-4 font-bold hover:cursor-pointer rounded-md">Unggah Cerita</button></router-link> 
        </div>

        <div class="grid grid-cols-2 gap-8 pb-4 px-16">
            <div class="flex flex-col items-center" v-for="cerita in Ceritaanda">
                <p class="font-poppins font-bold text-center text-black text-[40px]">{{ cerita.title }}</p>
                <p class="font-poppins font-normal text-[16px] text-center py-4">{{ cerita.content }}</p>
                <button class="rounded-md bg-red py-4 text-white text-xl font-bold w-full">Lihat Semua</button>
            </div>
        </div>


    </div>
</template>