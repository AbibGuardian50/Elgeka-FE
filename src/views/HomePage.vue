<script>
import Penyemangat from '../components/Penyemangat.vue'
import Navbar from '../components/Navbar.vue'
import Quotes from '../components/Quotes.vue'
import VueCookies from 'vue-cookies';
import axios from 'axios';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../assets/style.css';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

export default {
  async created() {
    try {
      const response = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/profilKomunitas');
      this.profilkomunitas = response.data.result;
      console.log(this.profilkomunitas);

      const url = 'https://elgeka-web-api-production.up.railway.app/api/v1/kegiatanKomunitas';
      const response_kegiatankomunitas = await axios.get(url);
      this.kegiatankomunitas = this.shuffleArray(response_kegiatankomunitas.data.result.data).slice(0, 8);
      console.log(this.kegiatankomunitas);
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
      kegiatankomunitas: [],
      StatusUser: '',
      url: 'https://elgeka-web-api-production.up.railway.app/',
    }
  },
  methods: {
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  },
  setup() {
    return {
      modules: [Pagination, Navigation],
    };
  },
};
</script>


<template>
  <Navbar />

  <div v-if="profilkomunitas.currentPage === 1" class="flex flex-col items-center justify-center" id="profile">
    <p class="font-poppins font-semibold text-5xl text-white">PROFILE</p>
    <p class="text-center font-poppins font-semibold text-5xl text-white">Komunitas ELGEKA Jawa Barat</p>
    <div v-html="profilkomunitas.data.content"
      class="list-decimal text-[16px] text-[#FFFFFFB2] font-normal font-poppins leading-6 mb-4 w-[630px] text-center line-clamp-4">
    </div>
    <router-link to="/profilkomunitas">
      <button type="button" class="bg-teal font-poppins font-bold text-[20px] text-white py-2 px-16 rounded-md">
        Selengkapnya
      </button>
    </router-link>
  </div>

  <!-- Kegiatan Komunitas -->
  <div class="kegiatan">
    <div class="bg-greymercury flex flex-col items-center pt-10 pb-10">
      <div>
        <p class="text-center font-poppins font-semibold text-xl text-black">Kegiatan Komunitas</p>
        <p class="text-center font-poppins font-semibold text-5xl text-teal">Kegiatan dari</p>
        <p class="text-center font-poppins font-semibold text-5xl text-teal">komunitas kami</p>
      </div>

      <!-- Carousel/Slideshow -->
      <div class="w-4/5 pt-4" id="kegiatan">
        <div>
          <swiper :slidesPerView="3" :spaceBetween="30" :navigation="true" :pagination="{
                        clickable: true,
                    }" :modules="modules" class="mySwiper">
            <swiper-slide v-for="foto in kegiatankomunitas" :key="foto.id" class="rounded-[20px]">
              <div class="max-w-md rounded overflow-hidden drop-shadow-lg shadow-lg bg-white">
                <div class="flex justify-center">
                  <img class="min-w-[347px] max-w-[350px] min-h-[367px] max-h-[370px] object-cover"
                    :src="url + foto.image_url" :alt="foto.alt_text || 'Foto Kegiatan'">
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <router-link to="/komunitaskegiatan">
        <button type="button" class="bg-teal text-white py-2 px-10 rounded-md font-poppins font-bold text-2xl">
          Lihat Semua
        </button>
      </router-link>
    </div>
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
        <div class="group active:bg-teal flex items-center flex-col pt-12 pb-40 px-4 bg-white rounded-[5px]">
          <img src="../assets/Rectangle179.png" alt="">
          <p class="group-active:text-white text-3xl text-center font-poppins font-semibold leading-9 pt-4">Berita
            Komunitas highlight
          </p>
        </div>

        <div class="group active:bg-teal flex items-center flex-col pt-12 pb-40 px-4 bg-white rounded-[5px]">
          <img src="../assets/Rectangle179.png" alt="">
          <p class="group-active:text-white text-3xl text-center font-poppins font-semibold leading-9 pt-4">Berita terkini
            highlight
          </p>
        </div>

        <div class="group active:bg-teal flex items-center flex-col pt-12 pb-40 px-4 bg-white rounded-[5px]">
          <img src="../assets/Rectangle179.png" alt="">
          <p class="group-active:text-white text-3xl text-center font-poppins font-semibold leading-9 pt-4">Berita CML
            highlight</p>
        </div>
      </div>

      <div class="my-20">
        <router-link to="/perkembangancml">
          <button type="button" class="bg-teal text-white py-2 px-10 mr-8 rounded-md font-poppins font-bold text-2xl">
            Lihat Semua
          </button>
        </router-link>
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
  filter: brightness(91%);
}

#kegiatan .swiper-pagination-bullet-active {
    background-color: #0A6B77;
    margin-top: 4rem;
}

#kegiatan .swiper-pagination-bullet {
    margin-top: 4rem;
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

