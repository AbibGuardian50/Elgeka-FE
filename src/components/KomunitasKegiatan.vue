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
            const url = 'https://elgeka-web-api-production.up.railway.app/api/v1/kegiatanKomunitas'
            const response_kegiatankomunitas = await axios.get(url);
            this.received_kegiatankomunitas = response_kegiatankomunitas.data.result.data
            console.log(this.received_kegiatankomunitas)
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

            <div class="grid pt-40 grid-cols-2 gap-8 pb-4 m-auto max-w-[1316px]">
                <div v-for="kegiatan in received_kegiatankomunitas" :key="kegiatan.id"
                    class="flex items-start flex-col bg-silver rounded-md p-4">
                    <img class=" w-[642px] h-[340px] overflow-hidden"
                        :src="'https://elgeka-web-api-production.up.railway.app/' + kegiatan.image_url" alt="" srcset="">
                    <div>
                        <p class="font-poppins font-semibold text-4xl text-orange">{{ kegiatan.title }}</p>
                        <p class="truncate font-poppins font-normal leading-6 text-base text-[#000000B2] py-4 max-w-[620px]">{{ kegiatan.content }}.
                        </p>
                        <a :href="'detailkegiatan/' + kegiatan.id"><button type="button"
                                class="bg-orange text-white py-2 px-16 rounded-md">Selengkapnya</button></a>
                    </div>

                </div>
            </div>


        </div>
    </div>
</template>