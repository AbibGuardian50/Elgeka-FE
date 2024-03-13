<script>
import Navbar from './Navbar.vue'
import axios from 'axios'

export default {
    components: {
        Navbar
    },
    data() {
        return {
            profilkomunitas: [],
        }
    },
    async created() {
        try {
            const response = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/profilKomunitas');
            this.profilkomunitas = response.data.result;
            // this.parsed_aturanblog = this.aturanblog.split("\n");
            console.log(this.profilkomunitas)
        } catch (error) {
            console.error(error);
        }
    },
}
</script>

<template>
    <Navbar />

    <div id="container" class="flex">
        <div class="flex flex-col justify-center items-center m-auto">
            <div v-if="profilkomunitas.currentPage === 1"
                class="bg-orange flex absolute px-32 w-[1022px] mt-40 isolate rounded-xl bg-orange/75 shadow-lg ring-1 ring-black/5">
                <div>
                    <p class="font-bold font-poppins text-[40px] text-white text-center pt-4">PROFILE</p>
                    <p class="font-bold font-poppins text-[40px] text-white text-center pb-4">{{ profilkomunitas.data.title
                    }}</p>
                    <p class="text-[16px] text-[#FFFFFFB2] font-normal font-poppins leading-6 pb-4 ">{{ profilkomunitas.data.content
                    }}</p>
                </div>

                <div class="mt-4 right-4 absolute flex flex-col gap-4">
                    <a :href="profilkomunitas.data.ig_link" target="_blank"><img class="w-[35px] h-[35px]" src="../assets/Logo-Instagram.png" alt="Instagram"></a>
                    <a :href="profilkomunitas.data.fb_link" target="_blank"><img class="w-[35px] h-[35px]" src="../assets/Logo-Facebook.png" alt="Facebook"></a>
                    <a :href="profilkomunitas.data.twitter_link" target="_blank"><img class="w-[35px] h-[35px]" src="../assets/Logo-X.png" alt="Twitter"></a>
                </div>

            </div>
        </div>

    </div>
</template>

<style scoped>
#container {
    background: url("../assets/kerjasama.png");
    background-repeat: no-repeat;
    background-size: cover;
    width: auto;
    height: 100vh;
}
</style>