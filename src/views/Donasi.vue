<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios';

export default {
    components: {
        Navbar,
    },
    data() {
        return {
            donasielgeka: [],
            gambar_url: 'https://elgeka-web-api-production.up.railway.app/',
        }
    },
    async created() {
        try {
            const url = 'https://elgeka-web-api-production.up.railway.app/api/v1/donasi'
            const response = await axios.get(url);
            this.donasielgeka = response.data.result
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        ensureAbsoluteUrl(url) {
            if (!url.match(/^https?:\/\//)) {
                return 'http://' + url;
            }
            return url;
        }
    }
}
</script>

<template>
    <div class="overflow-y-hidden">
        <Navbar />
        <div v-if="donasielgeka.currentPage === 1" class="flex flex-col justify-center items-center pt-40 m-auto min-w-7/12">
            <p class="font-poppins font-bold max-md:text-[30px] text-[40px] text-teal text-center">{{ donasielgeka.data.title }}</p>
            <img class="max-w-[314px] max-h-[283px] border-8 border-teal my-4" :src="gambar_url + donasielgeka.data.image_url" alt="Gambar QR"
                srcset="">
            <a :href="ensureAbsoluteUrl(donasielgeka.data.donate_link)"
                class="font-poppins font-bold text-[40px] max-md:text-[30px] text-center hover:underline mb-2" target="_blank">
                <button>{{ donasielgeka.data.donate_link }}</button></a>
            <p v-html="donasielgeka.data.content" class="font-poppins font-normal max-w-[673px] md:w-[673px] max-md:px-8 max-md:text-[14px] text-[#000000B2]"></p>
        </div>
    </div>
</template>

<style>
ol {
    list-style-type: decimal;
}

ul {
    list-style-type: disc;
}
</style>
