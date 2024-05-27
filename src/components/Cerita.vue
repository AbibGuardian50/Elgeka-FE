<script>
import Navbar from './Navbar.vue'
import VueCookies from 'vue-cookies';
import axios from 'axios'
import { format } from 'date-fns';
import idLocale from 'date-fns/locale/id';

export default {
    components: {
        Navbar
    },
    name: "large-modal",
    data() {
        return {
            aturanblog: [],
            showModal: false,
            username: '',
            userstory: [],
            allstory: [],
            tokenlogin: '',
            perPage: 6, // Number of items per page
            currentPageUserStory: 1, // Current page for user stories
            totalPagesUserStory: 1, // Total number of pages for user stories
            currentPageAllStory: 1, // Current page for all stories
            totalPagesAllStory: 1, // Total number of pages for all stories
        }
    },
    methods: {
        toggleModal: function () {
            this.showModal = !this.showModal;
        },
        formatDate(dateString) {
            return format(new Date(dateString), 'dd MMMM yyyy', { locale: idLocale });
        },
        updatePaginatedUserStory() {
            const startIndex = (this.currentPageUserStory - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            return this.userstory.slice(startIndex, endIndex);
        },
        updatePaginatedAllStory() {
            const startIndex = (this.currentPageAllStory - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            return this.allstory.slice(startIndex, endIndex);
        },
        goToPageUserStory(pageNumber) {
            this.currentPageUserStory = pageNumber;
        },
        goToPageAllStory(pageNumber) {
            this.currentPageAllStory = pageNumber;
        },
        nextPageUserStory() {
            if (this.currentPageUserStory < this.totalPagesUserStory) {
                this.currentPageUserStory++;
            }
        },
        prevPageUserStory() {
            if (this.currentPageUserStory > 1) {
                this.currentPageUserStory--;
            }
        },
        nextPageAllStory() {
            if (this.currentPageAllStory < this.totalPagesAllStory) {
                this.currentPageAllStory++;
            }
        },
        prevPageAllStory() {
            if (this.currentPageAllStory > 1) {
                this.currentPageAllStory--;
            }
        }
    },
    async created() {
        try {
            const response = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/aturanBlog');
            this.aturanblog = response.data.result;
            this.username = VueCookies.get('Name');
            this.tokenlogin = VueCookies.get('token');
            const token = VueCookies.get('token');

            const url_by_user_id = 'https://elgeka-web-api-production.up.railway.app/api/v1/blog/user/id';
            const response_userstory = await axios.get(url_by_user_id, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (token) {
                this.userstory = response_userstory.data.result.data;
                this.totalPagesUserStory = Math.ceil(this.userstory.length / this.perPage);
            }


            const url = 'https://elgeka-web-api-production.up.railway.app/api/v1/blog';
            const response_allstory = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            this.allstory = response_allstory.data.result.data.filter(story => story.isVerified === true);
            this.totalPagesAllStory = Math.ceil(this.allstory.length / this.perPage);
        } catch (error) {
            console.error(error);
        }
    }
}
</script>

<template>
    <Navbar />
    <div>
        <div v-if="username" class="pt-24 flex justify-between max-w-[1400px] m-auto">
            <ul class="max-w-2xl divide-y rounded-xl">
                <li>
                    <details class="group">
                        <summary
                            class="font-inter text-white text-xl flex bg-teal items-center gap-2  mt-16  font-bold hover:cursor-pointer rounded-md flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer ">
                            <span>Cerita Anda</span>
                            <svg class="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                </path>
                            </svg>
                        </summary>
                        <article class="absolute max-h-[300px] overflow-y-scroll max-w-[534px] bg-white mx-4 pb-4">
                            <div v-for="story in updatePaginatedUserStory()" :key="story.id"
                                class="flex justify-center items-center gap-4 px-4 py-4 shadow-md text-opacity-40">
                                <p class="font-inter text-fullblack font-medium text-[14px]">{{ story.title }}</p>
                                <p class="font-inter text-fullblack font-medium text-[14px]"
                                    v-if="story.isVerified === true">Sudah di Verifikasi</p>
                                <p class="font-inter text-fullblack font-medium text-[14px]"
                                    v-else-if="story.isVerified === false">Pending</p>
                                <p class="font-inter text-fullblack font-medium text-[14px]">{{ formatDate(story.createdAt)
                                }}</p>
                            </div>
                        </article>
                    </details>
                </li>
            </ul>
            <button v-on:click="toggleModal()"
                class="font-inter text-white text-xl flex bg-teal items-center gap-2 p-2 mt-16 mb-4 font-bold hover:cursor-pointer rounded-md">Unggah
                Cerita</button>
        </div>
        <div v-else class="pt-24 flex flex-row-reverse justify-between max-w-[1400px] m-auto">
            <button v-on:click="toggleModal()"
                class="font-inter text-white text-xl flex bg-teal items-center gap-2 p-2 mt-16 mb-4 font-bold hover:cursor-pointer rounded-md">Unggah
                Cerita</button>
        </div>
        <div class="grid grid-cols-2 gap-8 pb-4 px-16 max-w-[1400px] m-auto items-end">
            <div class="flex flex-col" v-for="cerita in updatePaginatedAllStory()" :key="cerita.id">
                <p class="font-poppins font-bold text-center text-black text-[40px]">{{ cerita.title }}</p>
                <div v-html="cerita.content" class="line-clamp-3 font-poppins font-normal text-base text-center pt-4"></div>
                <a :href="'detailblog/' + cerita.id"><button
                        class="rounded-md bg-teal py-4 text-white text-xl font-bold w-full mt-4">Lihat Semua</button></a>
                <div class="flex gap-1 items-center justify-center mt-4">
                    <p class="font-poppins font-normal text-[12px] text-darktransparent">{{ cerita.author_name }} -</p>
                    <p class="font-poppins font-normal text-[12px] text-darktransparent">{{ formatDate(cerita.createdAt) }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Pagination controls for user stories -->
        <!-- <div class="mt-4 flex justify-center">
            <button @click="prevPageUserStory" :disabled="currentPageUserStory === 1" class="px-4 py-2 mr-2 bg-teal text-white rounded-md">Previous</button>
            <button v-for="pageNumber in totalPagesUserStory" :key="pageNumber" @click="goToPageUserStory(pageNumber)"
                :class="{ 'bg-teal text-white rounded-md': pageNumber === currentPageUserStory, 'bg-white text-blue-500 border border-blue-500 rounded-md': pageNumber !== currentPageUserStory }"
                class="px-4 py-2 mr-2">{{ pageNumber }}</button>
            <button @click="nextPageUserStory" :disabled="currentPageUserStory === totalPagesUserStory" class="px-4 py-2 bg-teal text-white rounded-md">Next</button>
        </div> -->

        <!-- Pagination controls for all stories -->
        <div class="mt-4 flex justify-center">
            <button @click="prevPageAllStory" :disabled="currentPageAllStory === 1"
                class="px-4 py-2 mr-2 bg-teal text-white rounded-md">Previous</button>
            <button v-for="pageNumber in totalPagesAllStory" :key="pageNumber" @click="goToPageAllStory(pageNumber)"
                :class="{ 'bg-teal text-white rounded-md': pageNumber === currentPageAllStory, 'bg-white text-blue-500 border border-blue-500 rounded-md': pageNumber !== currentPageAllStory }"
                class="px-4 py-2 mr-2">{{ pageNumber }}</button>
            <button @click="nextPageAllStory" :disabled="currentPageAllStory === totalPagesAllStory"
                class="px-4 py-2 bg-teal text-white rounded-md">Next</button>
        </div>
    </div>

    <div>
        <div v-if="showModal"
            class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
            <div v-if="aturanblog.currentPage === 1" class="relative w-auto my-6 mx-auto max-w-6xl">
                <div
                    class="border border-red rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div class="flex items-start justify-between p-5 border-b-2 border-black rounded-t">
                        <h3 class="text-[40px] text-teal font-semibold font-poppins">{{ aturanblog.data.title }}</h3>
                        <button
                            class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            v-on:click="toggleModal()">
                            <span
                                class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                        </button>
                    </div>
                    <div class="relative p-6">
                        <div v-html="aturanblog.data.content"
                        class="font-poppins text-xl font-medium leading-8 text-darkblue whitespace-break-spaces"></div>
                </div>
                <div class="flex items-center justify-center p-6 border-t-2 border-black rounded-b">
                    <router-link to="/createcerita">
                        <button
                            class="text-white bg-teal border hover:text-white active:bg-teal-600 font-bold uppercase text-sm px-12 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
                            type="button">Setuju</button>
                    </router-link>
                    <button
                        class="text-teal bg-white border active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
                        type="button" v-on:click="toggleModal()">Tidak Setuju</button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</div></template>

<style>ol {
    list-style: decimal;
    margin-left: 1rem;
}</style>
