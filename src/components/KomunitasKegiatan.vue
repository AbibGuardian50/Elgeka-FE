<script>
import axios from 'axios';
import Navbar from './Navbar.vue'

export default {
    components: {
        Navbar
    },
    data() {
        return {
            received_kegiatankomunitas: [],
            perPage: 10, // Number of items per page
            currentPage: 1, // Current page
            totalPages: 0, // Total pages
            paginatedreceived_kegiatankomunitas: [] // Paginated data
        };
    },
    async created() {
        try {
            const url = 'https://elgeka-web-api-production.up.railway.app/api/v1/kegiatanKomunitas'
            const response_kegiatankomunitas = await axios.get(url);
            this.received_kegiatankomunitas = response_kegiatankomunitas.data.result.data
            console.log(this.received_kegiatankomunitas)

            this.totalPages = Math.ceil(this.received_kegiatankomunitas.length / this.perPage); // Calculate total pages
            this.updatePaginatedData(); // Update paginated data
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        updatePaginatedData() {
            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            this.paginatedreceived_kegiatankomunitas = this.received_kegiatankomunitas.slice(startIndex, endIndex);
        },
        goToPage(pageNumber) {
            this.currentPage = pageNumber; // Set current page to the selected page number
            this.updatePaginatedData(); // Update paginated data for the selected page
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.updatePaginatedData(); // Update paginated data when navigating to next page
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updatePaginatedData(); // Update paginated data when navigating to previous page
            }
        }
    }
}
</script>

<template>
    <Navbar />

    <div>

        <div>

            <div class="grid pt-40 grid-cols-2 gap-8 pb-4 m-auto max-w-[1316px]">
                <div v-for="kegiatan in received_kegiatankomunitas" :key="kegiatan.id"
                    class="flex items-start flex-col bg-silver rounded-md p-4">
                    <img class=" w-[642px] h-[340px] overflow-hidden"
                        :src="'https://elgeka-web-api-production.up.railway.app/' + kegiatan.image_url" alt="" srcset="">
                    <div>
                        <p class="font-poppins font-semibold text-4xl text-teal">{{ kegiatan.title }}</p>
                        <div v-html="kegiatan.content"
                            class="truncate line-clamp-1 font-poppins font-normal leading-6 text-base text-[#000000B2] pt-4 max-w-[620px]">
                        </div>
                        <a :href="'detailkegiatan/' + kegiatan.id"><button type="button"
                                class="bg-teal text-white my-2 py-2 px-16 rounded-md">Selengkapnya</button></a>
                    </div>

                </div>
            </div>

            <!-- Pagination navigation -->
            <div class="ml-8 mt-4 flex justify-center">
                <button @click="prevPage" :disabled="currentPage === 1"
                    class="px-4 py-2 mr-2 bg-teal  text-white rounded-md">Previous</button>
                <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)"
                    :class="{ 'bg-teal  text-white rounded-md': pageNumber === currentPage, 'bg-white text-blue-500 border border-blue-500 rounded-md': pageNumber !== currentPage }"
                    class="px-4 py-2 mr-2">{{ pageNumber }}</button>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                    class="px-4 py-2 bg-teal  text-white rounded-md">Next</button>
            </div>
        </div>
    </div>
</template>

<style>
ol {
    list-style-type: decimal;
}
</style>