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
    }
}
</script>

<template>
    <div class="overflow-y-hidden">
        <Navbar />
        <div v-if="donasielgeka.currentPage === 1" class="flex flex-col justify-center items-center p-40 m-auto min-w-7/12">
            <p class="font-poppins font-bold text-[40px] text-teal text-center">{{ donasielgeka.data.title }}</p>
            <img class="max-w-[314px] max-h-[283px] border-8 border-teal my-4" :src="gambar_url + donasielgeka.data.image_url" alt="Gambar QR"
                srcset="">
            <a :href="donasielgeka.data.donate_link"
                class="font-poppins font-bold text-[40px] text-center hover:underline mb-2" target="_blank">{{
                    donasielgeka.data.donate_link }}</a>
            <p v-html="donasielgeka.data.content" class="font-poppins font-normal w-[673px] text-[16px] text-[#000000B2]"></p>


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
