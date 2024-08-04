<script>
import Penyemangat from '../components/Penyemangat.vue';
import Navbar from '../components/Navbar.vue';
import Quotes from '../components/Quotes.vue';
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
      const [profilKomunitasResponse, kegiatanKomunitasResponse, beritaUmumResponse, beritaCMLResponse, beritaKomunitasResponse] = await Promise.all([
        axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/profilKomunitas'),
        axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/kegiatanKomunitas'),
        axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/berita'),
        axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/berita/kategori/perkembanganCML'),
        axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/berita/kategori/perkembanganKomunitas'),
      ]);

      this.profilkomunitas = profilKomunitasResponse.data.result;

      // Filter kegiatan komunitas yang show === true
      let kegiatanKomunitasFiltered = kegiatanKomunitasResponse.data.result.data.filter(kegiatan => kegiatan.show === true);

      // Shuffle data yang sudah difilter
      this.kegiatankomunitas = this.shuffleArray(kegiatanKomunitasFiltered).slice(0, 6);

      // Filter berita yang show === true
      let beritaUmumFiltered = beritaUmumResponse.data.result.data.filter(berita => berita.show === true);
      let beritaCMLFiltered = beritaCMLResponse.data.result.data.filter(berita => berita.show === true);
      let beritaKomunitasFiltered = beritaKomunitasResponse.data.result.data.filter(berita => berita.show === true);

      // Shuffle berita untuk memastikan randomization
      beritaUmumFiltered = this.shuffleArray(beritaUmumFiltered);
      beritaCMLFiltered = this.shuffleArray(beritaCMLFiltered);
      beritaKomunitasFiltered = this.shuffleArray(beritaKomunitasFiltered);

      // Ambil berita pertama dari masing-masing kategori tanpa ada duplikasi
      const beritaTerpilih = [];

      const pilihBeritaUnik = (beritaArray) => { // Fungsi pilih BeritaUnik digunakan untuk memilih berita pertama dari array yang tidak ada di beritaTerpilih. Jika berita terpilih, ID berita disimpan di array beritaTerpilih untuk memastikan bahwa berita tersebut tidak dipilih lagi oleh kategori berita lainnya
        for (let berita of beritaArray) {
          if (!beritaTerpilih.includes(berita.id)) {
            beritaTerpilih.push(berita.id);
            return berita;
          }
        }
        return null;
      };

      // Array beritaumum, beritaCML, dan beritaKomunitas diisi dengan berita unik yang dipilih menggunakan fungsi pilihBeritaUnik.
      this.beritaumum = [pilihBeritaUnik(beritaUmumFiltered)].filter(Boolean);
      this.beritaCML = [pilihBeritaUnik(beritaCMLFiltered)].filter(Boolean);
      this.beritaKomunitas = [pilihBeritaUnik(beritaKomunitasFiltered)].filter(Boolean);


      this.$nextTick(() => {
        this.truncateContent();
      });

      console.log(this.profilkomunitas, this.kegiatankomunitas, this.beritaumum, this.beritaCML, this.beritaKomunitas);
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
      beritaumum: [],
      beritaCML: [],
      beritaKomunitas: [],
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
    },
    truncateContent() {
      const contents = document.querySelectorAll('.berita-content');
      contents.forEach(content => {
        const text = content.textContent;
        if (text.length > 150) { // Panjang maksimum yang Anda inginkan
          content.textContent = text.substring(0, 150) + '...';
        }
      });
    },
  },
  setup() {
    return {
      modules: [Pagination, Navigation],
    };
  },
};
</script>


<template class="max-[500px]:overflow-x-hidden">
  <Navbar />

  <div v-if="profilkomunitas.currentPage === 1"
    :style="{ backgroundImage: `url(${url + profilkomunitas.data.image_url})` }"
    class="h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center" id="profile">
    <p class="font-poppins font-semibold text-3xl min-[965px]:text-5xl text-white">PROFIL</p>
    <p class="text-center font-poppins font-semibold text-3xl  min-[965px]:text-5xl text-white">Sahabat CGI</p>
    <div v-html="profilkomunitas.data.content"
      class="list-decimal max-w-[70%]  text-[16px] text-[#FFFFFFB2] font-normal font-poppins leading-6 mb-4 min-[965px]:w-[630px] text-center line-clamp-4">
    </div>
    <router-link to="/profilkomunitas">
      <button type="button" class="bg-teal font-poppins font-bold text-[20px] text-white py-2 px-16 rounded-md" id="button-profil-komunitas">
        Selengkapnya
      </button>
    </router-link>
  </div>

  <!-- Kegiatan Komunitas -->
  <div class="kegiatan">
    <div class="bg-greymercury flex flex-col items-center pt-10 pb-10">
      <div>
        <p class="text-center font-poppins font-semibold text-5xl text-teal">Kegiatan dari</p>
        <p class="text-center font-poppins font-semibold text-5xl text-teal">komunitas kami</p>
      </div>

      <!-- Carousel/Slideshow -->
      <div class="w-[90%] pt-4" id="kegiatan">
        <swiper :slidesPerView="1" :spaceBetween="10" :pagination="{
          clickable: true,
        }" :breakpoints="{
  '640': {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  '768': {
    slidesPerView: 3,
    spaceBetween: 40,
  },
  '1920': {
    slidesPerView: 4,
    spaceBetween: 50,
  },
  '2800': {
    slidesPerView: 5,
    spaceBetween: 50,
  },
}" :modules="modules" class="mySwiper">
          <swiper-slide v-for="foto in kegiatankomunitas" :key="foto.id" class="relative group rounded-[20px]">
            <div class="max-w-md rounded overflow-hidden drop-shadow-lg shadow-lg bg-white relative">
              <div class="flex justify-center">
                <a target="_blank" :href="'detailkegiatan/' + foto.id">
                  <img class="min-w-[347px] max-w-[350px] min-h-[367px] max-h-[370px] object-cover"
                    :src="url + foto.image_url" :alt="foto.alt_text || 'Foto Kegiatan'">
                </a>
              </div>
              <a target="_blank" :href="'detailkegiatan/' + foto.id"
                class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
                <p class="text-xl font-semibold">{{ foto.title }}</p>
                <div v-html="foto.content" class="line-clamp-3 text-sm"></div>
              </a>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <router-link to="/komunitaskegiatan">
        <button type="button" class="bg-teal text-white py-2 px-10 rounded-md font-poppins font-bold text-2xl mt-4" id="button-lihatsemua-kegiatan">
          Lihat Semua
        </button>
      </router-link>
    </div>
  </div>

  <!-- Berita -->
  <div class="pt-4 pb-16 bg-greymercury">
    <div class="pl-8 sm:pl-16 min-[2000px]:items-center min-[2000px]:flex min-[2000px]:flex-col">
      <div class="flex justify-between items-center">
        <p class="font-poppins font-semibold text-2xl sm:text-5xl text-teal">Berita</p>
      </div>
    </div>

    <div class="flex flex-col items-center">
      <div class="flex flex-wrap justify-around gap-8 sm:gap-16 pt-8 px-4 sm:px-8">
        <div v-for="berita in beritaKomunitas" :key="berita.id"
          class="relative group flex items-center flex-col pt-8  pb-8 px-4 bg-white rounded-[5px]">
          <a target="_blank" :href="'detailberita/' + berita.id" class="relative">
            <img class="w-full h-48 sm:min-h-[180px] sm:max-h-[185px] sm:min-w-[320px] sm:max-w-[325px] rounded-lg object-cover"
              :src="url + berita.image_url" alt="foto berita">
          </a>
          <div class="relative text-center pt-4 w-full transition-opacity duration-300">
            <!-- <p class="text-xl sm:text-3xl font-poppins font-semibold leading-6 sm:leading-9 group-hover:hidden">Berita
              Komunitas highlight</p> -->
            <p class="text-xl font-semibold break-word block max-w-[350px] group-hover:break-words">
              {{ berita.title }}</p>
            <div v-html="berita.content"
              class="line-clamp-3 truncate block max-w-[350px] group-hover:break-words text-sm berita-content">
            </div>
          </div>
        </div>

        <div v-for="berita in beritaumum" :key="berita.id"
          class="relative group flex items-center flex-col pt-8  pb-8 px-4 bg-white rounded-[5px]">
          <a target="_blank" :href="'detailberita/' + berita.id" class="relative">
            <img class="w-full h-48 sm:min-h-[180px] sm:max-h-[185px] sm:min-w-[320px] sm:max-w-[325px] rounded-lg object-cover"
              :src="url + berita.image_url" alt="foto berita">
          </a>
          <div class="relative text-center pt-4 w-full transition-opacity duration-300">
            <!-- <p class="text-xl sm:text-3xl font-poppins font-semibold leading-6 sm:leading-9 group-hover:hidden">Berita
              Komunitas highlight</p> -->
            <p class="text-xl font-semibold break-word block max-w-[350px] group-hover:break-words">
              {{ berita.title }}</p>
            <div v-html="berita.content"
              class="line-clamp-3 truncate block max-w-[350px] group-hover:break-words text-sm berita-content">
            </div>
          </div>
        </div>

        <div v-for="berita in beritaCML" :key="berita.id"
          class="relative group flex items-center flex-col pt-8  pb-8 px-4 bg-white rounded-[5px]">
          <a target="_blank" :href="'detailberita/' + berita.id" class="relative">
            <img class="w-full h-48 sm:min-h-[180px] sm:max-h-[185px] sm:min-w-[320px] sm:max-w-[325px] rounded-lg object-cover"
              :src="url + berita.image_url" alt="foto berita">
          </a>
          <div class="relative text-center pt-4 w-full transition-opacity duration-300">
            <!-- <p class="text-xl sm:text-3xl font-poppins font-semibold leading-6 sm:leading-9 group-hover:hidden">Berita
              Komunitas highlight</p> -->
            <p class="text-xl font-semibold break-word block max-w-[350px] group-hover:break-words">
              {{ berita.title }}</p>
            <div v-html="berita.content"
              class="line-clamp-3 truncate block max-w-[350px] group-hover:break-words text-sm berita-content">
            </div>
          </div>
        </div>
      </div>
      <div class="my-8 sm:my-20">
        <router-link target="_blank" to="/perkembangancml">
          <button type="button"
            class="bg-teal text-white py-2 px-6 sm:px-10 rounded-md font-poppins font-bold text-xl sm:text-2xl" id="button-lihatsemua-berita">
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
#profile::before {
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

#profile * {
  position: relative;
  z-index: 2;
}

#kegiatan .swiper-pagination-bullet-active {
  background-color: #0A6B77;
  margin-top: 4rem;
}

#kegiatan .swiper-pagination-bullet {
  margin-top: 4rem;
}

.swiper-button-next {
  right: -12px;
  /* Jarak dari tepi kanan carousel */
  z-index: 50;
}

.swiper-button-prev {
  left: -12px;
  /* Jarak dari tepi kiri carousel */
  z-index: 50;
}

.swiper-button-prev,
.swiper-button-next {
  color: #fff;
  top: 50%;
  width: 3rem;
  height: 3rem;
  margin-top: -1.5rem;
}

.relative {
  position: relative;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}

.transition-opacity {
  transition: opacity 0.3s;
}

.text-white {
  color: white;
}

.p-4 {
  padding: 1rem;
}

/* .group:hover .berita-highlight {
  display: none;
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group .group-hover\:opacity-100 {
  opacity: 0;
} */</style>
