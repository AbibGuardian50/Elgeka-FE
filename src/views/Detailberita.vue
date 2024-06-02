<script>
import Navbar from '../components/Navbar.vue'
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

    <div v-if="detailberita" class="flex flex-col m-auto sm:p-8 max-sm:w-full min-[1600px]:max-w-[1440px] max-sm:overflow-x-hidden">
        <img class="sm:mt-32 mt-28 rounded-t-md max-h-[404px]" :src="url + detailberita.image_url" alt="gambar">
        <div class="rounded-b-md bg-teal">
            <div class="pt-8 max-sm:pl-4 sm:pl-8 md:pl-20 pr-4 pb-12">
                <p class="text-5xl text-white font-poppins font-semibold leading-[3.875rem]">{{ detailberita.title}}
                </p>
                <p v-html="detailberita.content" class="text-base text-[#FFFFFFB2] font-poppins font-normal leading-6 sm:pr-24 md:pr-48"></p>
            </div>

        </div>
    </div>
</template>