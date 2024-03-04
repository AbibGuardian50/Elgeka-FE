<script>
import axios from 'axios';
import Navbar from './Navbar.vue'

export default {
    components: {
        Navbar
    },
    data() {
        return {
            received_kegiatankomunitas: [],
        };
    },
    async created() {
        try {
            const response_kegiatankomunitas = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/kegiatanKomunitas');
            this.received_kegiatankomunitas = response_kegiatankomunitas.data.result.data

        } catch (error) {
            console.error(error);
        }
    }
}
</script>

<template>
    <Navbar />

    <div>

        <div>

            <div class="grid pt-12 grid-cols-2 gap-8 pb-4">
                <div v-for="kegiatan in received_kegiatankomunitas" :key="kegiatan.id" class="flex items-start flex-col">
                    <img class="pl-8 w-[619px] h-[340px] overflow-hidden"
                        :src="'https://elgeka-web-api-production.up.railway.app/' + kegiatan.image_url" alt="" srcset="">
                    <div class="pl-8">
                        <p class="font-poppins font-semibold text-4xl text-red">{{ kegiatan.title }}</p>
                        <p class="font-poppins font-normal leading-6 text-base py-4">{{ kegiatan.content }}.</p>
                        <router-link to="/detailkegiatan"><button type="button"
                                class="bg-red text-white py-2 px-16 rounded-full">Selengkapnya</button></router-link>
                    </div>

                </div>
            </div>


        </div>
    </div>
</template>