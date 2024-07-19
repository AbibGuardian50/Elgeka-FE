<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'

export default {
    components: {
        Navbar
    },
    data() {
        return {
            profilkomunitas: [],
            url: 'https://elgeka-web-api-production.up.railway.app/'
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

    <div v-if="profilkomunitas.currentPage === 1">
        <div id="container" class="flex max-[900px]:bg-center" :style="{ 'background-image': `url(${url + profilkomunitas.data.image_url})` }">
            <div class="flex flex-col justify-center items-center m-auto">
                <div>
                    <div>
                        <p class="font-bold font-poppins max-md:text-[54px] max-sm:text-[44px] text-[64px] text-white text-center pt-4">TENTANG</p>
                        <p class="font-bold font-poppins max-md:text-[54px] max-sm:text-[44px] text-[64px] text-white text-center">KOMUNITAS ELGEKA</p>
                    </div>

                </div>
            </div>

        </div>

        <div class="max-w-[2023px] min-[2400px]:mx-auto">
            <div class="flex max-sm:flex-col-reverse max-sm:items-center mx-20 max-[900px]:mx-8 my-8 justify-between  ">
                <div class="w-9/12 max-[900px]:w-8/12 max-sm:w-full">
                    <p class="font-poppins font-bold max-[900px]:text-[30px] max-sm:text-[25px] text-[40px] text-fullblack">{{ profilkomunitas.data.title }}
                    </p>
                    <div class="font-poppins font-normal max-[900px]:text-[1rem] text-3xl content-richtext" v-html="profilkomunitas.data.content"></div>
                    <div class="mt-4 flex gap-4 ">
                        <a :href="profilkomunitas.data.twitter_link" target="_blank"><img class="w-[44px] h-[44px]"
                                src="../assets/Logo-X.png" alt="Twitter"></a>
                        <a :href="profilkomunitas.data.fb_link" target="_blank"><img class="w-[44px] h-[44px]"
                                src="../assets/Logo-Facebook.png" alt="Facebook"></a>
                        <a :href="profilkomunitas.data.ig_link" target="_blank"><img class="w-[44px] h-[44px]"
                                src="../assets/Logo-Instagram.png" alt="Instagram"></a>

                    </div>
                </div>

                <img class="w-3/12 max-sm:w-full max-sm:max-w-[550px] max-sm:h-full max-[900px]:w-4/12 max-md:h-[300px] max-md:h-[200px] max-w-[438px] max-h-[463px] max-xl:h-full" src="../assets/together.png" alt="foto" srcset="">

            </div>

            <div class="flex flex-col gap-12 ">
                <div class="max-sm:mx-8 border-2 border-grey flex flex-col items-center px-4 pt-1 max-[900px]:w-auto w-[972px] m-auto relative">
                    <p class="absolute bg-teal max-sm:bottom-[82%] bottom-[75%] right-[46%] max-[900px]:right-[43%] max-sm:right-[39%] px-4 py-1 rounded-lg font-inter font-bold text-[20px] text-white">VISI</p>
                    <p class="p-4 font-poppins font-normal text-[20px] text-darkgrey">{{ profilkomunitas.data.visi }}</p>
                </div>

                <div class="border-2 border-grey flex flex-col items-center px-4 pt-1 max-[900px]:w-auto w-[972px] m-auto relative max-sm:mb-4">
                    <p class="absolute bg-teal bottom-[75%] right-[46%] max-[900px]:right-[38%] px-4 py-1 rounded-lg font-inter font-bold text-[20px] text-white">MISI</p>
                    <p class="p-4 font-poppins font-normal text-[20px] text-darkgrey">{{ profilkomunitas.data.misi }}</p>
                </div>
            </div>



        </div>

    </div>
</template>

<style>
.caontainer {
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* Mengatur border */
    padding: 10px;
    padding-left: 4rem;
    padding-right: 4rem;
    padding-top: 1rem;
    width: 972px;
    /* Menambahkan padding agar teks tidak terlalu dekat dengan border */
    position: relative;
    /* Mengatur posisi relatif untuk positioning elemen p */
}

.bordered-paraw23agraph {
    position: absolute;
    /* Mengatur posisi absolut */
    bottom: 80%;
    /* Menempatkan paling atas */
    right: 45%;

    /* Mengatur jarak dari border */
    background-color: rgb(171, 18, 18);
    /* Mengatur latar rgb(177, 28, 28)ang p */
    padding: 0 10px;
    /* Menambahkan padding untuk memberi ruang antara teks dan border */

}



#container {
    background-repeat: no-repeat;
    background-size: cover;
    width: auto;
    height: 100vh;

}

.content-richtext a {
    color: blue;
    text-decoration: underline;
}

.content-richtext b {
    font-weight: bold;
}

.content-richtext i {
    font-style: italic;
}

.content-richtext u {
    text-decoration: underline;
}

.content-richtext h1 {
    display: block;
    font-size: 2em;
    margin-top: 0.67em;
    margin-bottom: 0.67em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
}

.content-richtext h2 {
    display: block;
    font-size: 1.5em;
    margin-top: 0.83em;
    margin-bottom: 0.83em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
}

.content-richtext h3 {
    display: block;
    font-size: 1.17em;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
}

.content-richtext ul {
    display: block;
    list-style-type: disc;
    margin-top: 1em;
    margin-bottom: 1 em;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
}

.content-richtext ol {
    display: block;
    list-style-type: decimal;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
}
</style>