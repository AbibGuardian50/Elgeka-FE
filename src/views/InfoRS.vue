<template>
    <Navbar />

    <div>
        <div
            class="h-screen bg-hospital bg-no-repeat bg-center bg-cover max-h-[550px] flex flex-col justify-center items-center">
            <p class="text-white text-center font-bold text-[40px] leading-[62px]">RUMAH SAKIT REKOMENDASI</p>
            <p class="text-white text-center font-bold text-[40px] leading-[62px]">Sahabat CGI</p>

            <div class="relative mt-3 mb-4">
                <img src="../assets/magnifyingglass.svg" alt="magnifying-glass"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-teal">
                <input class="px-3 py-2 bg-white border rounded-lg text-fullblack font-semibold" type="text"
                    v-model="searchQuery" @input="updatePaginatedData" placeholder="Cari Rumah Sakit">
            </div>
        </div>

        <div
            class="grid justify-center absolute max-md:top-[72rem] max-sm:relative max-sm:top-[93rem] max-sm:overflow-x-hidden  max-[1200px]:top-[62rem] min-[1200px]:top-[50rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 min-[1200px]:grid-cols-4 gap-4 place-items-center min-w-[320px] sm:min-w-[640px] md:min-w-[880px] lg:min-w-[1011px] min-[1200px]:min-w-[1200px] max-w-[1260px] bg-gray-100">
                <div v-for="data in paginatedInfoRS" :key="data.id"
                    class="bg-verylightgray rounded-lg shadow-lg overflow-hidden w-[291px] h-[24.375rem] flex flex-col justify-between">
                    <div class="flex items-center justify-center pt-4 px-2">
                        <img :src="data.image_url ? url + data.image_url : 'https://cdn.pixabay.com/photo/2021/11/20/03/16/doctor-6810750_1280.png'"
                            alt="foto rumah sakit" class="w-full max-w-[262px] rounded-[1rem] max-h-[144px] object-cover">
                    </div>
                    <div class="p-4 flex flex-col justify-between flex-grow">
                        <div>
                            <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ data.nama_rs }}</h2>
                            <p class="text-gray-700 leading-tight line-clamp-2">
                                {{ data.lokasi_rs }}
                            </p>
                            <p class="text-gray-700 leading-tight mb-4">
                                Nomor Telepon: {{ data.info_kontak }}
                            </p>
                        </div>
                        <div class="flex justify-between">
                            <a target="_blank" :href="data.link_maps">
                                <button
                                    class="bg-teal text-white font-medium text-[10px] font-medium font-poppins leading-4 px-2 py-1 rounded-md">Google
                                    Maps</button>
                            </a>
                            <button @click="showDetail(data)"
                                class="bg-teal text-white font-medium text-[10px] font-medium font-poppins leading-4 px-2 py-1 rounded-md">Detail
                                Info</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination navigation -->
            <div class="mt-4 flex justify-center">
                <button @click="prevPage" :disabled="currentPage === 1"
                    class="px-4 py-2 mr-2 bg-teal text-white rounded-md">Previous</button>
                <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)"
                    :class="{ 'bg-teal text-white rounded-md': pageNumber === currentPage, 'bg-white text-blue-500 border border-blue-500 rounded-md': pageNumber !== currentPage }"
                    class="px-4 py-2 mr-2">{{ pageNumber }}</button>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                    class="px-4 py-2 bg-teal text-white rounded-md">Next</button>
            </div>
        </div>

        <!-- Modal Detail Info -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-[700px] md:w-1/2 max-h-[90vh] overflow-y-auto relative">
                <div class="flex justify-end">
                    <button @click="closeModal" class="mb-4"><svg width="34" height="35" viewBox="0 0 34 35" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17 0.416992C7.78337 0.416992 0.333374 8.05324 0.333374 17.5003C0.333374 26.9474 7.78337 34.5837 17 34.5837C26.2167 34.5837 33.6667 26.9474 33.6667 17.5003C33.6667 8.05324 26.2167 0.416992 17 0.416992ZM25.3334 23.6332L22.9834 26.042L17 19.9091L11.0167 26.042L8.66671 23.6332L14.65 17.5003L8.66671 11.3674L11.0167 8.95866L17 15.0916L22.9834 8.95866L25.3334 11.3674L19.35 17.5003L25.3334 23.6332Z"
                                fill="#0A6B77" />
                        </svg>
                    </button>
                </div>
                <img :src="selectedData.image_url ? url + selectedData.image_url : 'https://cdn.pixabay.com/photo/2021/11/20/03/16/doctor-6810750_1280.png'"
                    alt="foto rumah sakit" class="w-full max-h-[250px] object-cover mb-2 rounded-lg">
                <h2 class="font-poppins font-bold text-[15px] leading-[62px] text-fullblack">{{ selectedData.nama_rs }}</h2>
                <p class="font-poppins font-normal text-[15px] leading-[20px] text-fullblack">Alamat : {{
                    selectedData.lokasi_rs }}</p>
                <p class="font-poppins font-normal text-[15px] leading-[20px] text-fullblack">Nomor Telepon : {{
                    selectedData.info_kontak }}</p>
                <p class="font-poppins font-normal text-[15px] leading-[20px] text-fullblack mt-4">Dokter :</p>
                <ul v-if="processedDokter.length > 0"
                    class="font-poppins font-bold text-[15px] leading-[20px] text-fullblack">
                    <li v-for="(dokter, index) in processedDokter" :key="index">• {{ dokter }}</li>
                </ul>
                <p v-else class="font-poppins font-normal text-[15px] leading-[20px] text-fullblack">Belum ada Data Dokter
                </p>
                <a target="_blank" :href="selectedData.link_maps" class="flex justify-center ">
                    <button
                        class="bg-teal text-white font-medium text-[10px] font-medium font-poppins leading-4 mt-2 px-8 py-4 rounded-md">Google
                        Maps</button>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
import { useToast } from 'vue-toastification';

export default {
    async created() {
        const toast = useToast();
        try {
            const response = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/infoRS');
            this.InfoRS = response.data.result.data;
            this.totalPages = Math.ceil(this.InfoRS.length / this.perPage);
            this.updatePaginatedData();
            console.log(response);

            if (response.data.message === "Get Info RS Successfully") {
                toast.success('Data Info RS berhasil dimuat')
            }
        } catch (error) {
            console.error(error);
            toast.error('Data Info RS gagal dimuat, mohon coba lagi')
        }
    },
    components: {
        Navbar
    },
    computed: {
        filteredInfoRS() {
            if (this.searchQuery) {
                return this.InfoRS.filter(rs =>
                    rs.nama_rs.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    (rs.data_dokter && rs.data_dokter.toLowerCase().includes(this.searchQuery.toLowerCase()))
                );
            }
            return this.InfoRS;
        },
        paginatedInfoRS() {
            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            return this.filteredInfoRS.slice(startIndex, endIndex);
        },
        processedDokter() {
            if (this.selectedData && this.selectedData.data_dokter) {
                return this.selectedData.data_dokter
                    .split(';')
                    .map(dokter => dokter.split(',')[0].trim()); // Hanya nama dokter yang diambil
            }
            return [];
        }
    },
    data() {
        return {
            url: 'https://elgeka-web-api-production.up.railway.app/',
            InfoRS: [],
            paginatedInfoRS: [],
            perPage: 8,
            currentPage: 1,
            totalPages: 1,
            showModal: false,
            selectedData: {},
            searchQuery: ''
        };
    },
    methods: {
        updatePaginatedData() {
            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            this.paginatedInfoRS = this.filteredInfoRS.slice(startIndex, endIndex);
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
        },
        showDetail(data) {
            this.selectedData = data;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        }
    }
};
</script>

<style scoped>
/* Tambahkan gaya custom Anda di sini */
</style>
