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
            received_kegiatankomunitas: [],
            paginatedreceived_kegiatankomunitas: [],
            perPage: 6, // Number of items per page
            currentPage: 1, // Current page
            totalPages: 0 // Total pages
        };
    },
    async created() {
        const toast = useToast();
        try {
            const url = 'https://elgeka-web-api-production.up.railway.app/api/v1/kegiatanKomunitas';
            const response_kegiatankomunitas = await axios.get(url);
            console.log(response_kegiatankomunitas);
            if (response_kegiatankomunitas.data.message === "Get Kegiatan Komunitas Successfully") {
                toast.success('Kegiatan Komunitas berhasil dimuat');
            }
            // Filter data dengan show === true
            this.received_kegiatankomunitas = response_kegiatankomunitas.data.result.data.filter(item => item.show === true);
            // Hitung total halaman dan perbarui data terpagination
            this.totalPages = Math.ceil(this.received_kegiatankomunitas.length / this.perPage);
            this.updatePaginatedData();
            this.processAllHyperlinks();
        } catch (error) {
            console.error(error);
            toast.error('Kegiatan Komunitas gagal dimuat, mohon coba lagi');
        }
    },
    methods: {
        processAllHyperlinks() {
            this.received_kegiatankomunitas.forEach((kegiatan, index) => {
                if (kegiatan.content) {
                    const div = document.createElement('div');
                    div.innerHTML = kegiatan.content;
                    const anchors = div.getElementsByTagName('a');
                    for (let i = 0; i < anchors.length; i++) {
                        let href = anchors[i].getAttribute('href');
                        if (href && !href.startsWith('http')) {
                            anchors[i].setAttribute('href', 'https://' + href);
                        }
                    }
                    this.received_kegiatankomunitas[index].content = div.innerHTML;
                }
            });
            this.updatePaginatedData(); // Update paginated data again to reflect the changes
        },
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
};
</script>

<template>
    <Navbar />
    <div>
        <div>
            <div class="grid pt-40 sm:grid-cols-1 md:grid-cols-2 gap-8 pb-4 m-auto max-w-[1316px]">
                <div v-for="kegiatan in paginatedreceived_kegiatankomunitas" :key="kegiatan.id"
                    class="flex items-start flex-col bg-silver rounded-md p-4">
                    <img class="w-full sm:h-auto md:w-[642px] md:h-[340px]" :src="url + kegiatan.image_url" alt=""
                        srcset="">
                    <div>
                        <p class="font-poppins font-semibold text-2xl md:text-4xl text-teal">{{ kegiatan.title }}</p>
                        <div v-html="kegiatan.content"
                            class="line-clamp-1 font-poppins font-normal leading-6 text-base text-[#000000B2] pt-4 max-w-full md:max-w-[620px]">
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
</style>
