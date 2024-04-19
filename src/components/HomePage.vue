<script>
import Penyemangat from './Penyemangat.vue'
import Navbar from './Navbar.vue'
import Quotes from './Quotes.vue'
import VueCookies from 'vue-cookies';
import axios from 'axios'
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
  async created() {
    try {
      const response = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/profilKomunitas');
      this.profilkomunitas = response.data.result;
      console.log(this.profilkomunitas)


      // const tokenlogin = VueCookies.get('Authentication')
      // const response_user = 'https://elgeka-mobile-production.up.railway.app/api/user/validate'

    } catch (error) {
      console.error(error);
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    Penyemangat,
    Navbar,
    Quotes
  },
  data() {
    return {
      profilkomunitas: [],
      StatusUser: '',
    }
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


  <div v-if="profilkomunitas.currentPage === 1" class="flex flex-col items-center justify-center" id="profile">
    <p class="font-poppins font-semibold text-5xl text-white">PROFILE</p>
    <p class="text-center font-poppins font-semibold text-5xl text-white">Komunitas ELGEKA Jawa Barat</p>
    <div v-html="profilkomunitas.data.content"
      class="list-decimal text-[16px] text-[#FFFFFFB2] font-normal font-poppins leading-6 mb-4 w-[630px] text-center line-clamp-4">
    </div>
    <router-link to="/profilkomunitas"> <button type="button"
        class="bg-orange font-poppins font-bold text-[20px] text-white py-2 px-16 rounded-md">Selengkapnya</button></router-link>
  </div>

  <!-- Kegiatan Komunitas -->
  <div class="bg-greymercury flex flex-col items-center pt-10 pb-10">
    <div>
      <p class="text-center font-poppins font-semibold text-xl text-black">Kegiatan Komunitas</p>
      <p class="text-center font-poppins font-semibold text-5xl text-orange">Kegiatan dari</p>
      <p class="text-center font-poppins font-semibold text-5xl text-orange">komunitas kami</p>
      <p class="text-center text-black text-base font-normal font-poppins">Lorem ipsum dolor sit amet consectetur.
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
        class="bg-orange text-white py-2 px-10 rounded-md font-poppins font-bold text-2xl">Lihat
        Semua</button></router-link>

  </div>

  <!-- Berita -->

  <div class="pt-4 pb-16 bg-greymercury">
    <div class="pl-16">
      <p class="font-poppins font-medium text-2xl pb-4">Berita</p>
      <div class="flex justify-between items-center">
        <p class="font-poppins font-semibold text-5xl text-red">Disini Berita</p>
      </div>

    </div>

    <div class="flex flex-col items-center">
      <div class="flex justify-around gap-16 pt-8 px-8 max-sm:flex-wrap">
        <div class="group active:bg-orange flex items-center flex-col pt-12 pb-40 px-4 bg-white rounded-[5px]">
          <!-- <span class="group-active:bg-white rounded-full bg-orange w-24 h-24 block"></span> -->
          <img src="../assets/Rectangle179.png" alt="">
          <p class="group-active:text-white text-3xl text-center font-poppins font-semibold leading-9 pt-4">Berita
            Komunitas highlight
          </p>
        </div>

        <div class="group active:bg-orange flex items-center flex-col pt-12 pb-40 px-4 bg-white rounded-[5px]">
          <!-- <span class="group-active:bg-white rounded-full bg-orange w-24 h-24 block"></span> -->
          <img src="../assets/Rectangle179.png" alt="">
          <p class="group-active:text-white text-3xl text-center font-poppins font-semibold leading-9 pt-4">Berita terkini
            highlight
          </p>
        </div>

        <div class="group active:bg-orange flex items-center flex-col pt-12 pb-40 px-4 bg-white rounded-[5px]">
          <!-- <span class="group-active:bg-white rounded-full bg-orange w-24 h-24 block"></span> -->
          <img src="../assets/Rectangle179.png" alt="">
          <p class="group-active:text-white text-3xl text-center font-poppins font-semibold leading-9 pt-4">Berita CML
            highlight</p>
        </div>

      </div>

      <div class="my-20">
        <router-link to="/perkembangancml"><button type="button"
            class="bg-orange text-white py-2 px-10 mr-8 rounded-md font-poppins font-bold text-2xl">Lihat
            Semua</button></router-link>
      </div>
    </div>





  </div>

  <div>
    <Quotes />
  </div>

  <div>
    <Penyemangat />
  </div>
</template>

<style>
#profile {
  background: rgba(0, 0, 0, 0.4) url('../assets/kerjasama.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  filter: brightness(91%)
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
}</style>
