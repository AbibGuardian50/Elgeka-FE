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
                    <swiper-slide class="rounded-lg">
                        <div class="max-w-md rounded overflow-hidden shadow-lg">
                            <div class="flex px-6 py-4">
                                <img class="w-full" src="../assets/Rectangle69.png" alt="Sunset in the mountains">
                                <div class="pl-6 flex items-center justify-center flex-col">
                                    <p class="font-poppins font-semibold text-2xl mb-4">Jenny Wilson</p>
                                    <p class="text-xl text-bluegrey text-base">
                                        Pengurus
                                    </p>
                                </div>

                            </div>
                            <div class="px-6 pt-2 pb-2">
                                <p class="text-gray-700 text-base">
                                    “Mari sembuh bersama menjalani hidup yang lebih baik”
                                </p>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="rounded-lg">
                        <div class="max-w-md rounded overflow-hidden shadow-lg">
                            <div class="flex px-6 py-4">
                                <img class="w-full" src="../assets/Rectangle69.png" alt="Sunset in the mountains">
                                <div class="pl-6 flex items-center justify-center flex-col">
                                    <p class="font-poppins font-semibold text-2xl mb-4">Jenny Wilson</p>
                                    <p class="text-xl text-bluegrey text-base">
                                        Pengurus
                                    </p>
                                </div>

                            </div>
                            <div class="px-6 pt-2 pb-2">
                                <p class="text-gray-700 text-base">
                                    “Mari sembuh bersama menjalani hidup yang lebih baik”
                                </p>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="rounded-lg">
                        <div class="max-w-md rounded overflow-hidden shadow-lg">
                            <div class="flex px-6 py-4">
                                <img class="w-full" src="../assets/Rectangle69.png" alt="Sunset in the mountains">
                                <div class="pl-6 flex items-center justify-center flex-col">
                                    <p class="font-poppins font-semibold text-2xl mb-4">Jenny Wilson</p>
                                    <p class="text-xl text-bluegrey text-base">
                                        Pengurus
                                    </p>
                                </div>

                            </div>
                            <div class="px-6 pt-2 pb-2">
                                <p class="text-gray-700 text-base">
                                    “Mari sembuh bersama menjalani hidup yang lebih baik”
                                </p>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="rounded-lg">
                        <div class="max-w-md rounded overflow-hidden shadow-lg">
                            <div class="flex px-6 py-4">
                                <img class="w-full" src="../assets/Rectangle69.png" alt="Sunset in the mountains">
                                <div class="pl-6 flex items-center justify-center flex-col">
                                    <p class="font-poppins font-semibold text-2xl mb-4">Jenny Wilson</p>
                                    <p class="text-xl text-bluegrey text-base">
                                        Pengurus
                                    </p>
                                </div>

                            </div>
                            <div class="px-6 pt-2 pb-2">
                                <p class="text-gray-700 text-base">
                                    “Mari sembuh bersama menjalani hidup yang lebih baik”
                                </p>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="rounded-lg">
                        <div class="max-w-md rounded overflow-hidden shadow-lg">
                            <div class="flex px-6 py-4">
                                <img class="w-full" src="../assets/Rectangle69.png" alt="Sunset in the mountains">
                                <div class="pl-6 flex items-center justify-center flex-col">
                                    <p class="font-poppins font-semibold text-2xl mb-4">Jenny Wilson</p>
                                    <p class="text-xl text-bluegrey text-base">
                                        Pengurus
                                    </p>
                                </div>

                            </div>
                            <div class="px-6 pt-2 pb-2">
                                <p class="text-gray-700 text-base">
                                    “Mari sembuh bersama menjalani hidup yang lebih baik”
                                </p>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="rounded-lg">
                        <div class="max-w-md rounded overflow-hidden shadow-lg">
                            <div class="flex px-6 py-4">
                                <img class="w-full" src="../assets/Rectangle69.png" alt="Sunset in the mountains">
                                <div class="pl-6 flex items-center justify-center flex-col">
                                    <p class="font-poppins font-semibold text-2xl mb-4">Jenny Wilson</p>
                                    <p class="text-xl text-bluegrey text-base">
                                        Pengurus
                                    </p>
                                </div>

                            </div>
                            <div class="px-6 pt-2 pb-2">
                                <p class="text-gray-700 text-base">
                                    “Mari sembuh bersama menjalani hidup yang lebih baik”
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
    background-color: #8B1A0F;
    width: 46px;
    height: 7px;
    border-radius: 30px;
}

.penyemangat .swiper-pagination-bullet {
    border-radius: 30px;
}

.penyemangat .swiper-slide img {
    width: 60%;
}
</style>