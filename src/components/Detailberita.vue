<script>
import Navbar from './Navbar.vue'
import axios from 'axios'
export default {
    components: {
        Navbar
    },
    data() {
        return {
            detailberita: '',
            url: 'https://elgeka-web-api-production.up.railway.app/'
        }
    },
    setup() {

    },
    async created() {
        try {
            const id = this.$route.params.id
            const response_beritaumum = await axios.get(`https://elgeka-web-api-production.up.railway.app/api/v1/berita/${id}`);
            this.detailberita = response_beritaumum.data.result.data
            // const params_id = this.$route.params.id

        } catch (error) {
            console.error(error);
        }
    }
}
</script>

<template>
    <Navbar />

    <div v-if="detailberita" class="flex flex-col m-auto p-8 min-[1600px]:max-w-[1440px]">
        <img class="mt-32 rounded-t-md max-h-[404px]" :src="url + detailberita.image_url" alt="gambar">
        <div class="rounded-b-md bg-teal">
            <div class="pt-8 pl-20 pr-4 pb-12">
                <p class="text-5xl text-white font-poppins font-semibold leading-[3.875rem]">BERITA</p>
                <p class="text-5xl text-white font-poppins font-semibold leading-[3.875rem]">{{ detailberita.title}}
                </p>
                <p v-html="detailberita.content" class="text-base text-[#FFFFFFB2] font-poppins font-normal leading-6 pr-48"></p>
            </div>

        </div>
    </div>
</template>