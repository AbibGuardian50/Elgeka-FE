<script>
import Penyemangat from './Penyemangat.vue'
import Navbar from './Navbar.vue'
import axios from 'axios';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

import 'swiper/css/navigation';

import '../assets/style.css';

// import required modules
import { Autoplay, Navigation, Pagination, } from 'swiper/modules';


import "swiper/css";

export default {
    components: {
        Swiper,
        SwiperSlide,
        Penyemangat,
        Navbar
    },
    data() {
        return {
            received_quotes: [],
        }
    },
    setup() {
        return {
            url: 'https://elgeka-web-api-production.up.railway.app/',
            modules: [Autoplay, Pagination, Navigation],
            // Quotes: [
            //     {content: '”Janganlah pernah menyerah ketika kamu masih mampu berusaha lagi. Tidak ada kata berakhir sampai kamu berhenti mencoba” - Brian Dyson'},
            //     {content: '”Segala sesuatu memiliki kesudahan, yang sudah berakhir biarlah berlalu dan yakinlah semua akan baik-baik saja” - Anonym'},
            //     {content: '“Hidup itu bukan soal menemukan diri Anda sendiri, hidup itu membuat diri Anda sendiri.” - George Bernard Shaw'},
            //     {content: '“Hidup yang baik adalah hidup yang diinspirasi oleh cinta dan dipandu oleh ilmu pengetahuan.” - Bertrand Russell'},
            // ],

        };
    },
    async created() {
        try {
            const response_quotes = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/quotes');
            this.received_quotes = response_quotes.data.result.data
            console.log(this.received_quotes);
        } catch (error) {
            console.error(error);
        }
    }
};

// const photos = [
//   "Rectangle180.png",
//   "Rectangle180.png",
//   "Rectangle180.png",
//   "Rectangle180.png",
// ]

</script>

<template>
    <!-- Carousel/Slideshow -->
    <!-- :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
        }" -->
    <div class="pb-4">
        <swiper :slidesPerView="1" :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
        }" :spaceBetween="15" :modules="modules" class="mySwiper">
            <swiper-slide v-for="recite in received_quotes" class="rounded-lg">
                <div class="flex flex-col p-8 w-[1440px]">
                    <div class="bg-teal flex p-5 items-center justify-center h-[520px]">
                        <img class="min-w-[700px] h-[470px]" :src="url + recite.image_url" alt="" srcset="">
                        <div class="flex flex-col ml-8">
                            <!-- <p class="text-5xl text-center text-black font-poppins font-semibold leading-[3.875rem] pb-4">
                                </p> -->
                            <p class="text-base text-[40px] text-white font-poppins font-semibold leading-[62px]"> "{{
                                recite.quote }}" - {{ recite.author_name }} </p>
                        </div>

                    </div>
                </div>
            </swiper-slide>
        </swiper>

    </div>

    <!-- Berita -->
</template>

<style>
/* .swiper-pagination-bullet-active {
    background-color: #fff;
} */

/* .swiper-slide img {
    width: auto;
} */

.swiper-button-next {
    right: 0px;
}

.swiper-button-prev {
    left: 0px;
}

.swiper-button-prev,
.swiper-button-next {
    color: #fff;
}
</style>


