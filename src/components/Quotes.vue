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
    <div class="pb-4 max-[600px]:bg-teal">
        <swiper :slidesPerView="1" :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
        }" :spaceBetween="15" :modules="modules" class="mySwiper">
            <swiper-slide v-for="recite in received_quotes" class="rounded-lg">
                <div class="flex flex-col max-[500px]:p-0 p-8 min-[1200px]:w-[1440px]">
                    <div class="bg-teal flex p-5 max-[600px]:p-2 items-center justify-center min-[1200px]:h-[520px] max-[1200px]:h-[450px]">
                        <img :src="url + recite.image_url" alt="" srcset="">
                        <div class="flex flex-col ml-8">
                            <!-- <p class="text-5xl text-center text-black font-poppins font-semibold leading-[3.875rem] pb-4">
                                </p> -->
                            <p class="text-base max-[500px]:text-left min-[1200px]:text-[40px] max-[1200px]:text-[25px] max-[800px]:text-[20px] max-[800px]:text-[15px] text-white font-poppins font-semibold min-[1200px]:leading-[62px] max-[1200px]:leading-[42px] max-[800px]:leading-[32px] max-[500px]:leading-[22px]"> "{{
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
/* Styles untuk layar dengan lebar 1200px atau lebih */
@media screen and (min-width: 1200px) {
    .swiper-slide img {
        width: 700px;
        height: 80%;
    }
}

/* Styles untuk layar dengan lebar 800px atau lebih */
@media screen and (max-width: 1200px) {
    .swiper-slide img {
        width: 450px;
        height: 80%;
    }
}

/* Styles untuk layar dengan lebar 540px atau lebih */
@media screen and (max-width: 800px) {
    .swiper-slide img {
        width: 300px;
        height: 80%;
    }
}

@media screen and (max-width: 600px) {
    .swiper-slide img {
        width: 250px;
        height: 80%;
    }
}

@media screen and (max-width: 500px) {
    .swiper-slide img {
        width: 150px;
        height: 60%;
    }
}

@media screen and (max-width: 400px) {
    .swiper-slide img {
        width: 130px;
        height: 50%;
    }
}

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


