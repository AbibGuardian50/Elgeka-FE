<script>
import axios from 'axios';
// import Navbar from './Navbar.vue'

export default {
    // components: {
    //     Navbar
    // },
    data() {
        return {
            pilih_kategori: null,
            aturanblog: [],
        };
    },
    async created() {
        try {
            const response = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/aturanBlog');
            this.aturanblog = response.data.result
        } catch (error) {
            console.error(error);
            
        }
    }
};
</script>

<template>
    <!-- <Navbar /> -->

    <div class="flex flex-col justify-center items-center">
        <div class="border-2 border-[#8B1A0FCC] m-8 rounded-lg p-4 bg-grey">
            <p class="pb-2">Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget.
                Eget quis et tortor cras sed. Nec vulputate neque non mi. Lorem ipsum dolor sit amet consectetur. Commodo
                adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec vulputate
                neque non mi. Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non
                facilisi eget. Eget quis et tortor cras sed. Nec vulputate neque non mi. Lorem ipsum dolor sit amet
                consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras
                sed. Nec vulputate neque non mi.</p>
            <div class="flex flex-col" v-for="aturan in aturanblog" :key="aturan.id">
                <p class="flex flex-col">{{ aturan.content }} </p>
            </div>
            
        </div>

        <div class="">
            <router-link to="/createcerita"><button
                    class="bg-teal font-bold font-poppins text-[20px] text-white rounded-md py-[10px] px-12">Setuju</button></router-link>
        </div>

    </div>
</template>