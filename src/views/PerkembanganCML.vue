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
            paginatedreceived_beritaumum: [],
            paginatedreceived_beritaCML: [],
            paginatedreceived_beritaKomunitas: [],
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

            this.received_beritaumum = response_beritaumum.data.result.data;
            this.received_beritaCML = response_beritaCML.data.result.data;
            this.received_beritaKomunitas = response_beritaKomunitas.data.result.data;

            this.updateTotalPages();
            this.updatePaginatedData();
        },
        updateTotalPages() {
            if (this.pilih_kategori === null) {
                this.totalPages = Math.ceil(this.received_beritaumum.length / this.perPage);
            } else if (this.pilih_kategori === 'perkembanganCML') {
                this.totalPages = Math.ceil(this.received_beritaCML.length / this.perPage);
            } else if (this.pilih_kategori === 'perkembanganKomunitas') {
                this.totalPages = Math.ceil(this.received_beritaKomunitas.length / this.perPage);
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
            }

            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            this.paginatedreceived_beritaumum = data.slice(startIndex, endIndex);
            this.paginatedreceived_beritaCML = data.slice(startIndex, endIndex);
            this.paginatedreceived_beritaKomunitas = data.slice(startIndex, endIndex);
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
            this.updatePaginatedData(); // Tambahkan pemanggilan updatePaginatedData di sini
        }
    }

};
</script>


<template>
    <Navbar />

    <div>
        <div class="flex flex-col gap-2 items-end pt-20 ml-auto mr-10 ">
            <select autocomplete="off" name="Pilih Kategori"
                class="form-select focus:bg-white focus:text-teal text-white flex bg-teal items-center gap-2 p-2 mb-4 mt-20 font-bold font-inter marker:content-none hover:cursor-pointer rounded-lg"
                v-model="pilih_kategori">
                <option class="bg-white" :value="null" selected>Pilih Kategori</option>
                <option class="bg-white" value="perkembanganKomunitas">Komunitas</option>
                <option class="bg-white" value="perkembanganCML">CML</option>
            </select>
        </div>

        <div>
            <div class="grid grid-cols-2 gap-8 pb-4 m-auto max-w-[1316px]" v-show="pilih_kategori === null">
                <div v-for="berita in paginatedreceived_beritaumum" :key="berita.id"
                    class="flex items-center flex-col rounded-md p-4">
                    <img class="w-[642px] h-[340px]" :src="url + berita.image_url" alt="" srcset="">
                    <p class="truncate max-w-[619px] font-poppins font-semibold text-4xl text-center text-teal">{{
                        berita.title }}</p>
                    <div v-html="berita.content"
                        class="max-w-[619px] truncate line-clamp-1 font-poppins font-normal leading-6 text-base text-center pt-4">
                    </div>
                    <a :href="'detailberita/' + berita.id"><button type="button"
                            class="bg-teal font-semibold font-inter text-base text-white mt-2 py-2 px-8 rounded-md">Tampilan
                            Detail</button></a>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-8 pb-4 m-auto max-w-[1316px]"
                v-show="pilih_kategori === 'perkembanganKomunitas'">
                <div v-for="berita in paginatedreceived_beritaKomunitas" :key="berita.id"
                    class="flex items-center flex-col rounded-md p-4">
                    <img class="w-[619px] h-[320px]" :src="url + berita.image_url" alt="" srcset="">
                    <p class="max-w-[619px] truncate font-poppins font-semibold text-4xl text-center text-teal">{{
                        berita.title }}</p>
                    <div v-html="berita.content"
                        class="max-w-[619px] truncate line-clamp-1 font-poppins font-normal leading-6 text-base text-center pt-4">
                    </div>
                    <a :href="'detailberita/' + berita.id"><button type="button"
                            class="bg-teal font-semibold font-inter text-base text-white mt-2 py-2 px-8 rounded-md">Tampilan
                            Detail</button></a>
                </div>

            </div>

            <div class="grid grid-cols-2 gap-8 pb-4 m-auto max-w-[1316px]" v-show="pilih_kategori === 'perkembanganCML'">
                <div v-for="berita in paginatedreceived_beritaCML" :key="berita.id"
                    class="flex items-center flex-col rounded-md p-4">
                    <img class="w-[619px] h-[320px]" :src="url + berita.image_url" alt="" srcset="">
                    <p class="max-w-[619px] truncate font-poppins font-semibold text-4xl text-center text-teal">{{
                        berita.title }}</p>
                    <div v-html="berita.content"
                        class="max-w-[619px] truncate line-clamp-1 font-poppins font-normal leading-6 text-base text-center pt-4">
                    </div>
                    <a :href="'detailberita/' + berita.id"><button type="button"
                            class="bg-teal font-semibold font-inter text-base text-white mt-2 py-2 px-8 rounded-md">Tampilan
                            Detail</button></a>
                </div>
            </div>

            <!-- Pagination navigation -->
            <div class="ml-8 mt-4 flex justify-center">
                <button @click="prevPage" :disabled="currentPage === 1"
                    class="px-4 py-2 mr-2 bg-teal text-white rounded-md">Previous</button>
                <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)"
                    :class="{ 'bg-teal text-white rounded-md': pageNumber === currentPage, 'bg-white text-blue-500 border border-blue-500 rounded-md': pageNumber !== currentPage }"
                    class="px-4 py-2 mr-2">{{ pageNumber }}</button>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                    class="px-4 py-2 bg-teal text-white rounded-md">Next</button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
