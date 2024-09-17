<script>
import axios from 'axios'

export default {
    async created() {
        try {
            const response = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/profilKomunitas');
            this.profilkomunitas = response.data.result;
            this.processHyperlinks();
        } catch (error) {
            console.error(error);
        }
    },
    data() {
        return {
            profilkomunitas: [],
            url: 'https://elgeka-web-api-production.up.railway.app/'
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
    <div class="">
        <div class="flex flex-col gap-8 bg-teal pt-8 md:pt-16 pb-8 px-4 h-full">
            <div class="flex flex-col gap-16 md:gap-0 md:flex-row justify-between">
                <div class="flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-center">
                    <img src="../assets/Logo_Sahabat_CGI 2.png">
                    <p class="font-poppins font-light text-[48px] leading-5 text-white">Sahabat <span
                            class="font-poppins font-bold text-[48px] leading-5 text-white">CGI</span></p>
                </div>

                <div class="flex flex-col items-center gap-4 justify-center md:pr-8">
                    <p class="font-poppins font-light text-[20px] leading-5 text-white">Ikuti Kami</p>
                    <div class="flex gap-4 md:gap-12" v-if="profilkomunitas.currentPage === 1">
                        <a :href="profilkomunitas.data.twitter_link"><img src="../assets/Logo-X-White.svg"></a>
                        <a :href="profilkomunitas.data.fb_link"><img src="../assets/Logo-FB-White.svg"></a>
                        <a :href="profilkomunitas.data.ig_link"><img src="../assets/Logo-IG-White.svg"></a>
                    </div>
                </div>
            </div>

            <div class="mt-auto  flex items-center justify-center">
                <p class="font-poppins font-light text-[20px] leading-5 text-white">Copyright © sahabatcgi</p>
            </div>
        </div>
    </div>
</template>
