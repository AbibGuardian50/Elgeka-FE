<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'

export default {
    async created() {
        try {
            const response = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/infoRS');
            this.InfoRS = response.data.result.data;
            this.totalPages = Math.ceil(this.InfoRS.length / this.perPage);
            this.updatePaginatedData();
            console.log(this.InfoRS);
        } catch (error) {
            console.error(error);
        }
    },
    components: {
        Navbar
    },
    data() {
        return {
            InfoRS: [],
            paginatedInfoRS: [],
            perPage: 8, // Number of items per page
            currentPage: 1, // Current page
            totalPages: 1 // Total number of pages
        };
    },
    methods: {
        updatePaginatedData() {
            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            this.paginatedInfoRS = this.InfoRS.slice(startIndex, endIndex);
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
    }
};
</script>

<template>
    <Navbar />

    <div>
        <div class="h-screen text-[40px] leading-[62px] bg-hospital bg-no-repeat bg-center bg-cover max-h-[550px] flex flex-col justify-center items-center">
            <p class="text-white text-center font-bold">RUMAH SAKIT REKOMENDASI</p>
            <p class="text-white text-center font-bold">Komunitas ELGEKA Jawa Barat</p>
        </div>

        <div class="grid justify-center absolute top-[50rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center min-w-[1200px] max-w-[1260px] bg-gray-100">
                <div v-for="data in paginatedInfoRS" :key="data.id" class="bg-verylightgray rounded-lg shadow-lg overflow-hidden w-[291px] h-[327px] ">
                    <div class="flex items-center justify-center pt-4">
                        <img src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606" alt="Mountain" class="w-full max-w-[262px] rounded-[1rem] max-h-[144px] object-cover">
                    </div>
                    <div class="p-4">
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ data.nama_rs }}</h2>
                        <p class="text-gray-700 leading-tight mb-4">
                            {{ data.lokasi_rs }} Nomor Telepon: {{ data.info_kontak }}
                        </p>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center">
                                <a target="_blank" :href="data.link_maps">
                                    <button class="bg-teal text-white font-medium text-[10px] leading-4 px-2 py-1 rounded-md">Google Maps</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination navigation -->
            <div class="mt-4 flex justify-center">
                <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 mr-2 bg-teal text-white rounded-md">Previous</button>
                <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)"
                    :class="{ 'bg-teal text-white rounded-md': pageNumber === currentPage, 'bg-white text-blue-500 border border-blue-500 rounded-md': pageNumber !== currentPage }"
                    class="px-4 py-2 mr-2">{{ pageNumber }}</button>
                <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-teal text-white rounded-md">Next</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>
