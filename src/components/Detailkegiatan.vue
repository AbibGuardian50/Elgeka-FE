<script>
import Navbar from './Navbar.vue'
import axios from 'axios'
import { format } from 'date-fns';
import idLocale from 'date-fns/locale/id';
export default {
    components: {
        Navbar,
    },
    data() {
        return {
            kegiatankomunitas: '',
            url: 'https://elgeka-web-api-production.up.railway.app/'
        }
    },
    setup() {
    },
    async created() {
        try {
            const id = this.$route.params.id
            // const title = this.$route.params.title
            const response_kegiatankomunitas = await axios.get(`https://elgeka-web-api-production.up.railway.app/api/v1/kegiatanKomunitas/${id}`);
            this.kegiatankomunitas = response_kegiatankomunitas.data.result.data
            // const params_id = this.$route.params.id

        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        formatDate(dateString) {
            // Ubah format tanggal
            return format(new Date(dateString), 'dd MMMM yyyy',{ locale: idLocale });
        }
    }
}
</script>

<template>
    <Navbar />

    <div v-if="kegiatankomunitas"
        class="flex gap-8 p-8 min-[1440px]:max-w-screen-2xl m-auto pt-52  min-[240px]:max-lg:flex-wrap min-[240px]:max-lg:justify-center">
        <img :src="url + kegiatankomunitas.image_url" alt="" class="rounded-md max-w-[600px] max-h-[404px]">
        <div class="flex flex-col justify-center ">
            <div class="flex flex-col">
                <!-- <p class="font-poppins text-base">Kegiatan Terbaru</p> -->
                <p class="font-poppins font-bold text-5xl pt-4">{{ kegiatankomunitas.title }}</p>
                <p class="font-poppins font-medium text-xl pb-8">{{ kegiatankomunitas.tempat }}, {{ formatDate(kegiatankomunitas.date)}}</p>
            </div>

            <div v-html="kegiatankomunitas.content" class="font-poppins font-normal text-[12px] flex flex-col">
            </div>


        </div>
    </div>
</template>

<style>
ol {
    list-style-type: decimal;
    margin-left: 1rem;
}

ul {
    list-style-type: disc;
    margin-left: 1rem;
}
</style>