<script>
import Penyemangat from './Penyemangat.vue'
import Navbar from './Navbar.vue'
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
    setup() {
        return {
            modules: [Autoplay, Pagination, Navigation],
            Quotes: [
                {content: '”Janganlah pernah menyerah ketika kamu masih mampu berusaha lagi. Tidak ada kata berakhir sampai kamu berhentimencoba” - Brian Dyson'},
                {content: '”Segala sesuatu memiliki kesudahan, yang sudah berakhir biarlah berlalu dan yakinlah semua akan baik-baik saja” - Anonym'},
                {content: '“Hidup itu bukan soal menemukan diri Anda sendiri, hidup itu membuat diri Anda sendiri.” -George Bernard Shaw'},
                {content: '“Hidup yang baik adalah hidup yang diinspirasi oleh cinta dan dipandu oleh ilmu pengetahuan.” - Bertrand Russell'},
            ],
        };
    },
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
    <!--  -->
    <div class="pb-4 bg-orange">
        <swiper  :slidesPerView="1" :spaceBetween="15" :modules="modules" :autoplay="{
            delay: 1000,
            disableOnInteraction: false,
        }" class="mySwiper">
            <swiper-slide v-for="recite in Quotes" class="rounded-lg">
                <div class="flex flex-col p-8 min-[1600px]:max-w-[1440px]">
                    <div class="bg-[#FF914C] flex p-5">
                        <img src="../assets/smiling-guy.png" alt="" srcset="">
                        <div class="flex flex-col ml-8">
                            <p class="text-5xl text-center text-black font-poppins font-semibold leading-[3.875rem] pb-4">
                                Quotes</p>
                            <p class="text-base text-[40px] text-white font-poppins font-semibold leading-[62px]"> {{ recite.content }} </p>
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

.swiper-slide img {
    width: auto;
}

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


