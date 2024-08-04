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
            this.processHyperlinks();
            console.log(this.profilkomunitas);
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        processHyperlinks() {
            if (this.profilkomunitas.data && this.profilkomunitas.data.content) {
                const div = document.createElement('div');
                div.innerHTML = this.profilkomunitas.data.content;
                const anchors = div.getElementsByTagName('a');
                for (let i = 0; i < anchors.length; i++) {
                    let href = anchors[i].getAttribute('href');
                    if (href && !href.startsWith('http')) {
                        anchors[i].setAttribute('href', 'https://' + href);
                    }
                }
                this.profilkomunitas.data.content = div.innerHTML;
            }
        }
    }
}
</script>

<template>
    <Navbar />

    <div v-if="profilkomunitas.currentPage === 1" >
        <div id="container" class="flex max-[900px]:bg-center"
            :style="{ 'background-image': `url(${url + profilkomunitas.data.image_url})` }">
            <div class="flex flex-col justify-center items-center m-auto">
                <div>
                    <div>
                        <p
                            class="font-bold font-poppins max-md:text-[54px] max-sm:text-[44px] text-[64px] text-white text-center pt-4">
                            TENTANG</p>
                        <p
                            class="font-bold font-poppins max-md:text-[54px] max-sm:text-[44px] text-[64px] text-white text-center">
                            SAHABAT CGI</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-[2023px] min-[2400px]:mx-auto">
            <div class="flex max-sm:flex-col-reverse max-sm:items-center mx-20 max-[900px]:mx-8 my-8 justify-between">
                <div class="w-9/12 max-[900px]:w-8/12 max-sm:w-full">
                    <p class="font-poppins font-bold max-[900px]:text-[30px] max-sm:text-[25px] text-[40px] text-fullblack">
                        {{ profilkomunitas.data.title }}</p>
                    <div class="font-poppins font-normal max-[900px]:text-[1rem] text-3xl content-richtext"
                        v-html="profilkomunitas.data.content"></div>
                    <div class="mt-4 flex gap-4">
                        <a :href="profilkomunitas.data.twitter_link" target="_blank"><img class="w-[44px] h-[44px]"
                                src="../assets/Logo-X.png" alt="Twitter"></a>
                        <a :href="profilkomunitas.data.fb_link" target="_blank"><img class="w-[44px] h-[44px]"
                                src="../assets/Logo-Facebook.png" alt="Facebook"></a>
                        <a :href="profilkomunitas.data.ig_link" target="_blank"><img class="w-[44px] h-[44px]"
                                src="../assets/Logo-Instagram.png" alt="Instagram"></a>
                    </div>
                </div>

                <!-- <img class="w-3/12 max-sm:w-full max-sm:max-w-[550px] max-sm:h-full max-[900px]:w-4/12 max-md:h-[300px] max-md:h-[200px] max-w-[438px] max-h-[463px] max-xl:h-full"
                    src="../assets/together.png" alt="foto" srcset=""> -->
            </div>

            <div class="flex flex-col gap-12">
                <div
                    class="max-sm:mx-8 border-2 border-grey flex flex-col items-center px-4 pt-1 max-[900px]:w-auto w-[972px] m-auto relative">
                    <p
                        class="absolute bg-teal max-sm:bottom-[82%] bottom-[75%] right-[46%] max-[900px]:right-[43%] max-sm:right-[39%] px-4 py-1 rounded-lg font-inter font-bold text-[20px] text-white">
                        VISI</p>
                    <p class="p-4 font-poppins font-normal text-[20px] text-darkgrey">{{ profilkomunitas.data.visi }}</p>
                </div>

                <div
                    class="border-2 border-grey flex flex-col items-center px-4 pt-1 max-[900px]:w-auto w-[972px] m-auto relative max-sm:mb-4">
                    <p
                        class="absolute bg-teal bottom-[75%] right-[46%] max-[900px]:right-[38%] px-4 py-1 rounded-lg font-inter font-bold text-[20px] text-white">
                        MISI</p>
                    <p class="p-4 font-poppins font-normal text-[20px] text-darkgrey">{{ profilkomunitas.data.misi }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
#container::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    /* Ubah nilai opacity sesuai kebutuhan */
    z-index: 1;
}

#container * {
    position: relative;
    z-index: 2;
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
}</style>