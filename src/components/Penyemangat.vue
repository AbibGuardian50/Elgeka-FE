<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

import 'swiper/css/navigation';

import '../assets/style.css';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';


import "swiper/css";

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Pagination, Navigation],
            QuotesPengurus: [
                {name: 'John Doe', role:'Pengurus',quotes: 'Mari sembuh bersama menjalani hidup yang lebih baik', image: 'Rectangle69.png'},
                {name: 'Dennis Harahap', role:'Pengurus',quotes: 'Mari sembuh bersama menjalani hidup yang lebih baik'},
                {name: 'Cecep Sudarma', role:'Pengurus',quotes: 'Mari sembuh bersama menjalani hidup yang lebih baik'},
                {name: 'Muhammad Sulaiman', role:'Pengurus',quotes: 'Mari sembuh bersama menjalani hidup yang lebih baik'},
                {name: 'Surya Somad', role:'Pengurus',quotes: 'Mari sembuh bersama menjalani hidup yang lebih baik'},
                {name: 'Ijal', role:'Pengurus',quotes: 'Mari sembuh bersama menjalani hidup yang lebih baik'},
            ]
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
    <div class="penyemangat">
        <div class="bg-white py-16">
        <div class=" pl-16">
            <p class="text-center font-poppins font-medium text-2xl">Pengurus Komunitas</p>
            <p class="text-center font-poppins font-semibold text-5xl text-red pt-4 pb-16">Pengurus Komunitas</p>
        </div>

        <div class="w-full pb-4">

            <div>
                <swiper :slidesPerView="3" :spaceBetween="30" :pagination="{
                    clickable: true,
                }" :modules="modules" class="mySwiper">
                    <swiper-slide v-for="quotes in QuotesPengurus" class="rounded-lg max-h-72">
                        <div   class="max-w-md rounded overflow-hidden drop-shadow-lg shadow-lg">
                            <div class="flex px-6 py-4">
                                <img class="w-[240px]" src="../assets/Rectangle69.png" alt="Sunset in the mountains">
                                <div class="pl-6 flex items-center justify-center flex-col">
                                    <p class="font-poppins font-semibold text-2xl mb-4">{{ quotes.name }}</p>
                                    <p class="text-xl text-bluegrey text-base">
                                        {{ quotes.role}}
                                    </p>
                                </div>

                            </div>
                            <div class="px-6 pt-2 pb-2">
                                <p class="text-gray-700 text-base text-left mb-4">
                                    “{{ quotes.quotes }}”
                                </p>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
    </div>
    
</template>

<style>
.penyemangat .swiper-pagination-bullet-active {
    background-color: #FF914C;
    margin-top: 4rem;
    width: 46px;
    height: 7px;
    border-radius: 30px;
}

.penyemangat .swiper-pagination-bullet {
    border-radius: 30px;
    margin-top: 4rem;
}

.penyemangat .swiper-slide img {
    width: 60%; 
}

/* .swiper-pagination .swiper-pagination-clickable .swiper-pagination-bullets .swiper-pagination-horizontal {

} */

/* .swiper-slide {
    text-align: left;
} */
</style>