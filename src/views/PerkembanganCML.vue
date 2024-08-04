<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';
import { useToast } from 'vue-toastification';

export default {
    components: {
        Navbar
    },
    data() {
        return {
            url: 'https://elgeka-web-api-production.up.railway.app/',
            pilih_kategori: null,
            received_beritaCML: [],
            received_beritaKomunitas: [],
            received_beritaumum: [],
            received_gist: [],
            paginatedreceived_beritaumum: [],
            paginatedreceived_beritaCML: [],
            paginatedreceived_beritaKomunitas: [],
            paginatedreceived_gist: [],
            perPage: 6, // Number of items per page
            currentPage: 1, // Current page
            totalPages: 1 // Total number of pages
        };
    },
    async created() {
        const toast = useToast();
        try {
            await this.fetchData();
            toast.success('Data berita berhasil dimuat');
        } catch (error) {
            console.error(error);
            toast.error('Terdapat kesalahan sistem, mohon muat ulang lagi');
        }
    },
    methods: {
        async fetchData() {
            const response_beritaumum = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/berita');
            const response_beritaCML = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/berita/kategori/perkembanganCML');
            const response_beritaKomunitas = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/berita/kategori/perkembanganKomunitas');
            const response_gist = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/berita/kategori/GIST');

            this.received_beritaumum = this.processHyperlinks(response_beritaumum.data.result.data.filter(item => item.show === true));
            this.received_beritaCML = this.processHyperlinks(response_beritaCML.data.result.data.filter(item => item.show === true));
            this.received_beritaKomunitas = this.processHyperlinks(response_beritaKomunitas.data.result.data.filter(item => item.show === true));
            this.received_gist = this.processHyperlinks(response_gist.data.result.data.filter(item => item.show === true));

            this.updateTotalPages();
            this.updatePaginatedData();
        },
        processHyperlinks(data) {
            return data.map(item => {
                if (item.content) {
                    const div = document.createElement('div');
                    div.innerHTML = item.content;
                    const anchors = div.getElementsByTagName('a');
                    for (let i = 0; i < anchors.length; i++) {
                        let href = anchors[i].getAttribute('href');
                        if (href && !href.startsWith('http')) {
                            anchors[i].setAttribute('href', 'https://' + href);
                        }
                    }
                    item.content = div.innerHTML;
                }
                return item;
            });
        },
        updateTotalPages() {
            if (this.pilih_kategori === null) {
                this.totalPages = Math.ceil(this.received_beritaumum.length / this.perPage);
            } else if (this.pilih_kategori === 'perkembanganCML') {
                this.totalPages = Math.ceil(this.received_beritaCML.length / this.perPage);
            } else if (this.pilih_kategori === 'perkembanganKomunitas') {
                this.totalPages = Math.ceil(this.received_beritaKomunitas.length / this.perPage);
            } else if (this.pilih_kategori === 'GIST') {
                this.totalPages = Math.ceil(this.received_gist.length / this.perPage);
            }
        },
        updatePaginatedData() {
            let data = [];
            if (this.pilih_kategori === null) {
                data = this.received_beritaumum;
            } else if (this.pilih_kategori === 'perkembanganCML') {
                data = this.received_beritaCML;
            } else if (this.pilih_kategori === 'perkembanganKomunitas') {
                data = this.received_beritaKomunitas;
            } else if (this.pilih_kategori === 'GIST') {
                data = this.received_gist;
            }

            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            if (this.pilih_kategori === null) {
                this.paginatedreceived_beritaumum = data.slice(startIndex, endIndex);
            } else if (this.pilih_kategori === 'perkembanganCML') {
                this.paginatedreceived_beritaCML = data.slice(startIndex, endIndex);
            } else if (this.pilih_kategori === 'perkembanganKomunitas') {
                this.paginatedreceived_beritaKomunitas = data.slice(startIndex, endIndex);
            } else if (this.pilih_kategori === 'GIST') {
                this.paginatedreceived_gist = data.slice(startIndex, endIndex);
            }
        },
        goToPage(pageNumber) {
            this.currentPage = pageNumber;
            this.updatePaginatedData();
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.updatePaginatedData();
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updatePaginatedData();
            }
        }
    },
    watch: {
        pilih_kategori() {
            this.updateTotalPages();
            this.currentPage = 1;
            this.updatePaginatedData();
        }
    }
};
</script>


<template>
    <Navbar />

    <div>
        <!-- Category Selection -->
        <div class="flex flex-col gap-2 items-end pt-20 ml-auto mr-10">
            <select autocomplete="off" name="Pilih Kategori" class="form-select focus:bg-white focus:text-teal text-white bg-teal p-2 mb-4 mt-20 font-bold font-inter hover:cursor-pointer rounded-lg
                sm:text-sm sm:p-1 md:text-base md:p-2 lg:text-lg lg:p-3" v-model="pilih_kategori">
                <option class="bg-white" :value="null" selected>Pilih Kategori</option>
                <option class="bg-white" value="perkembanganKomunitas">Komunitas</option>
                <option class="bg-white" value="perkembanganCML">CML</option>
                <option class="bg-white" value="GIST">GIST</option>
            </select>
        </div>

        <!-- News Items -->
        <div v-show="pilih_kategori === null">
            <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-8 pb-4 m-auto max-w-[1316px]">
                <div v-for="berita in paginatedreceived_beritaumum" :key="berita.id"
                    class="flex flex-col bg-silver rounded-md p-4 h-full">
                    <div class="image-container">
                        <img class="max-sm:w-full w-[38.688rem] h-[21.25rem] object-cover rounded-lg" :src="url + berita.image_url" alt="" />
                    </div>
                    <div class="flex flex-col flex-grow">
                        <p
                            class="max-w-full md:max-w-[619px] font-poppins font-semibold text-2xl md:text-4xl text-center text-teal">
                            {{ berita.title }}</p>
                        <div v-html="berita.content"
                            class="max-w-full md:max-w-[619px] break-words line-clamp-1 font-poppins font-normal leading-6 text-base text-center pt-4">
                        </div>
                        <a :href="'detailberita/' + berita.id" class="mt-auto flex flex-col items-center">
                            <button type="button"
                                class="bg-teal font-semibold font-inter text-base text-white mt-2 py-2 px-8 rounded-md">Selengkapnya</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="pilih_kategori === 'perkembanganKomunitas'">
            <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-8 pb-4 m-auto max-w-[1316px]">
                <div v-for="berita in paginatedreceived_beritaKomunitas" :key="berita.id"
                    class="flex flex-col bg-silver rounded-md p-4 h-full">
                    <div class="image-container">
                        <img class="max-sm:w-full w-[38.688rem] h-[21.25rem] object-cover rounded-lg" :src="url + berita.image_url" alt="" />
                    </div>
                    <div class="flex flex-col flex-grow">
                        <p
                            class="max-w-full md:max-w-[619px] font-poppins font-semibold text-2xl md:text-4xl text-center text-teal">
                            {{ berita.title }}</p>
                        <div v-html="berita.content"
                            class="max-w-full md:max-w-[619px] break-words line-clamp-1 font-poppins font-normal leading-6 text-base text-center pt-4">
                        </div>
                        <a :href="'detailberita/' + berita.id" class="mt-auto flex flex-col items-center">
                            <button type="button"
                                class="bg-teal font-semibold font-inter text-base text-white mt-2 py-2 px-8 rounded-md">Selengkapnya</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="pilih_kategori === 'perkembanganCML'">
            <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-8 pb-4 m-auto max-w-[1316px]">
                <div v-for="berita in paginatedreceived_beritaCML" :key="berita.id"
                    class="flex flex-col bg-silver rounded-md p-4 h-full">
                    <div class="image-container">
                        <img class="max-sm:w-full w-[38.688rem] h-[21.25rem] object-cover rounded-lg" :src="url + berita.image_url" alt="" />
                    </div>
                    <div class="flex flex-col flex-grow">
                        <p
                            class="max-w-full md:max-w-[619px] font-poppins font-semibold text-2xl md:text-4xl text-center text-teal">
                            {{ berita.title }}</p>
                        <div v-html="berita.content"
                            class="max-w-full md:max-w-[619px] line-clamp-1 font-poppins font-normal leading-6 text-base text-center pt-4">
                        </div>
                        <a :href="'detailberita/' + berita.id" class="mt-auto flex flex-col items-center">
                            <button type="button"
                                class="bg-teal font-semibold font-inter text-base text-white mt-2 py-2 px-8 rounded-md">Selengkapnya</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="pilih_kategori === 'GIST'">
            <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-8 pb-4 m-auto max-w-[1316px]">
                <div v-for="berita in paginatedreceived_gist" :key="berita.id"
                    class="flex flex-col bg-silver rounded-md p-4 h-full">
                    <div class="image-container">
                        <img class="w-full h-full object-cover" :src="url + berita.image_url" alt="" />
                    </div>
                    <div class="flex flex-col flex-grow">
                        <p
                            class="max-w-full md:max-w-[619px] font-poppins font-semibold text-2xl md:text-4xl text-center text-teal">
                            {{ berita.title }}</p>
                        <div v-html="berita.content"
                            class="max-w-full md:max-w-[619px] break-words line-clamp-1 font-poppins font-normal leading-6 text-base text-center pt-4">
                        </div>
                        <a :href="'detailberita/' + berita.id" class="mt-auto flex flex-col items-center">
                            <button type="button"
                                class="bg-teal font-semibold font-inter text-base text-white mt-2 py-2 px-8 rounded-md">Selengkapnya</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagination navigation -->
        <div class="ml-8 my-8 flex justify-center">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="px-4 py-2 mr-2 bg-teal text-white rounded-md">Previous</button>
            <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)"
                :class="{ 'bg-teal text-white rounded-md': pageNumber === currentPage, 'bg-white text-blue-500 border border-blue-500 rounded-md': pageNumber !== currentPage }"
                class="px-4 py-2 mr-2">{{ pageNumber }}</button>
            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="px-4 py-2 bg-teal text-white rounded-md">Next</button>
        </div>
    </div>
</template>

<style scoped>
/* Menambahkan beberapa styling untuk mengatasi tumpang tindih konten */
@media (max-width: 640px) {
    img {
        width: 100%;
        height: auto;
    }

    p {
        font-size: 1rem;
    }

    .line-clamp-1 {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}

/* Style untuk menjaga konsistensi tinggi gambar */
.image-container {
    width: 100%;
    height: 250px;
    /* Kamu bisa atur tinggi sesuai kebutuhan */
    overflow: hidden;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}</style>

