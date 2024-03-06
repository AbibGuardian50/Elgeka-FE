<script>
import Navbar from './Navbar.vue'
import Createcerita from './Createcerita.vue'
export default {
    components: {
        Navbar
    },
    name: "large-modal",
    data() {
        return {
            Ceritaanda: [
                { title: 'Cerita', content: 'Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec vulputate neque non mi.' },
                { title: 'Cerita', content: 'Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec vulputate neque non mi.' },
                { title: 'Cerita', content: 'Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec vulputate neque non mi.' },
                { title: 'Cerita', content: 'Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec vulputate neque non mi.' },
            ],
            showModal: false
        }
    },
    methods: {
        toggleModal: function () {
            this.showModal = !this.showModal;
        }
    }
}
</script>
<template>
    <Navbar />

    <div>
        <div class="pt-4 mx-4 flex justify-between">
            <button
                class="text-white flex bg-red items-center gap-2 p-2 mb-4 font-medium hover:cursor-pointer rounded-md">Cerita
                Anda</button>
            <button v-on:click="toggleModal()"
                class="font-inter text-white flex bg-red items-center gap-2 p-2 mb-4 font-bold hover:cursor-pointer rounded-md">Unggah
                Cerita</button>
        </div>

        <div class="grid grid-cols-2 gap-8 pb-4 px-16">
            <div class="flex flex-col items-center" v-for="cerita in Ceritaanda">
                <p class="font-poppins font-bold text-center text-black text-[40px]">{{ cerita.title }}</p>
                <p class="font-poppins font-normal text-[16px] text-center py-4">{{ cerita.content }}</p>
                <button class="rounded-md bg-red py-4 text-white text-xl font-bold w-full">Lihat Semua</button>
            </div>
        </div>


    </div>

    <div>
        <div v-if="showModal"
            class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
            <div class="relative w-auto my-6 mx-auto max-w-6xl">
                <!--content-->
                <div
                    class="border border-red rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <!--header-->
                    <div class="flex items-start justify-between p-5 border-b border-blueGray-200 rounded-t">
                        <h3 class="text-3xl font-semibold">
                            Aturan Blog/Cerita
                        </h3>
                        <button
                            class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            v-on:click="toggleModal()">
                            <span
                                class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                            </span>
                        </button>
                    </div>
                    <!--body-->
                    <div class="relative p-6 flex-auto">
                        <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non
                            facilisi eget.
                            Eget quis et tortor cras sed. Nec vulputate neque non mi. Lorem ipsum dolor sit amet
                            consectetur. Commodo
                            adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec
                            vulputate
                            neque non mi. Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque
                            elementum non
                            facilisi eget. Eget quis et tortor cras sed. Nec vulputate neque non mi. Lorem ipsum dolor sit
                            amet
                            consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et
                            tortor cras
                            sed. Nec vulputate neque non mi.
                        </p>
                        <p>1.Lorem ipsum dolor sit amet consectetur</p>
                        <p>2.Lorem ipsum dolor sit amet consectetur</p>
                        <p>3.Lorem ipsum dolor sit amet consectetur</p>
                        <p>4.Lorem ipsum dolor sit amet consectetur</p>
                        <p>5.Lorem ipsum dolor sit amet consectetur</p>
                    </div>
                    <!--footer-->
                    <div class="flex items-center justify-center p-6 border-t border-blueGray-200 rounded-b">
                        <router-link to="/createcerita"><button
                                class="text-white bg-red border hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button">
                                Setuju
                            </button></router-link>
                        <button
                            class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button" v-on:click="toggleModal()">
                            Tidak Setuju
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
</template>

