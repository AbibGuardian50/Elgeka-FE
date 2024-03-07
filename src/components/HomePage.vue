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
import { Navigation, Pagination } from 'swiper/modules';


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
  <Navbar />


  <div class="flex flex-col items-center py-40" id="profile">
    <p class="font-poppins font-semibold text-5xl text-white">PROFILE</p>
    <p class="text-center font-poppins font-semibold text-5xl text-white">Komunitas ELGEKA Jawa Barat</p>
    <p class="text-center text-base md:px-60 pb-4 pt-2 text-white">Lorem ipsum dolor sit amet consectetur. Commodo
      adipiscing massa
      et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec vulputate neque non mi.</p>
    <router-link to="/detailprofil"> <button type="button"
        class="bg-orange font-poppins font-bold text-[20px] text-white py-4 px-16 rounded-md">Selengkapnya</button></router-link>
  </div>

  <!-- Kegiatan Komunitas -->
  <div class="bg-orange flex flex-col items-center pt-10 pb-10">
    <div>
      <p class="text-center font-poppins font-semibold text-xl text-white">Kegiatan Komunitas</p>
      <p class="text-center font-poppins font-semibold text-5xl text-white">Kegiatan dari</p>
      <p class="text-center font-poppins font-semibold text-5xl text-white">komunitas kami</p>
      <p class="text-center text-lightwhite text-base font-normal font-poppins">Lorem ipsum dolor sit amet consectetur.
        Commodo adipiscing massa et sem. Neque elementum </p>
    </div>

    <!-- Carousel/Slideshow -->
    <div class="w-4/5 pb-4">
      <swiper :slidesPerView="3" :spaceBetween="30" :navigation="true" :pagination="{
        clickable: true,
      }" :modules="modules" class="mySwiper">
        <swiper-slide class="rounded-lg object-cover"><img src="../assets/Rectangle180.png" alt=""></swiper-slide>
        <swiper-slide class="rounded-lg"><img src="../assets/Rectangle180.png" alt=""></swiper-slide>
        <swiper-slide class="rounded-lg"><img src="../assets/Rectangle180.png" alt=""></swiper-slide>
        <swiper-slide class="rounded-lg"><img src="../assets/Rectangle180.png" alt=""></swiper-slide>
        <swiper-slide class="rounded-lg"><img src="../assets/Rectangle180.png" alt=""></swiper-slide>
        <swiper-slide class="rounded-lg"><img src="../assets/Rectangle180.png" alt=""></swiper-slide>
      </swiper>

    </div>

    <router-link to="/komunitaskegiatan"><button type="button"
        class="bg-white text-red py-2 px-8 rounded-md font-poppins text-2xl">Lihat
        Semua</button></router-link>

  </div>

  <!-- Berita -->

  <div class="pt-4 pb-16 bg-lightgrey">
    <div class="pl-16">
      <p class="font-poppins font-medium text-2xl pb-4">Berita</p>
      <div class="flex justify-between items-center">
        <p class="font-poppins font-semibold text-5xl text-red  ">Disini Berita</p>
        <router-link to="/perkembangancml"><button type="button"
            class="bg-orange text-white py-2 px-8 mr-8 rounded-md font-poppins text-2xl">Lihat
            Semua</button></router-link>
      </div>

    </div>

    <div class="flex justify-around gap-4 pt-8 px-8 max-sm:flex-wrap">
      <div class="group active:bg-orange flex items-center flex-col pt-12 pb-28 px-8 bg-white rounded-[30px]">
        <!-- <span class="group-active:bg-white rounded-full bg-orange w-24 h-24 block"></span> -->
        <img src="../assets/Rectangle179.png" alt="">
        <p class="group-active:text-white text-3xl font-poppins font-semibold leading-9 pt-4">Berita Komunitas highlight
        </p>
      </div>

      <div class="group active:bg-orange flex items-center flex-col pt-12 pb-28 px-8 bg-white rounded-[30px]">
        <!-- <span class="group-active:bg-white rounded-full bg-orange w-24 h-24 block"></span> -->
        <img src="../assets/Rectangle179.png" alt="">
        <p class="group-active:text-white text-3xl font-poppins font-semibold leading-9 pt-4">Berita terkini highlight</p>
      </div>

      <div class="group active:bg-orange flex items-center flex-col pt-12 pb-28 px-8 bg-white rounded-[30px]">
        <!-- <span class="group-active:bg-white rounded-full bg-orange w-24 h-24 block"></span> -->
        <img src="../assets/Rectangle179.png" alt="">
        <p class="group-active:text-white text-3xl font-poppins font-semibold leading-9 pt-4">Berita CML highlight</p>
      </div>

    </div>

  </div>

  <div>
    <Penyemangat />
  </div>
</template>

<style>
#profile {
  background: url('../assets/kerjasama.png');
  background-repeat: no-repeat;
  background-size: cover;
}

/* .swiper-pagination-bullet-active {
    background-color: #fff;
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
