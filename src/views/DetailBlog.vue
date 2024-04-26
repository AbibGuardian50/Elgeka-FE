<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
import VueCookies from 'vue-cookies';
import moment from 'moment';
import 'moment/locale/id'; // Impor locale bahasa Indonesia
import 'moment-timezone';

export default {
    async created() {
        try {
            const id = this.$route.params.id
            const response_blog = await axios.get(`https://elgeka-web-api-production.up.railway.app/api/v1/blog/${id}`);
            this.storyblog = response_blog.data.result.data

            const response_commentblog = await axios.get(`https://elgeka-web-api-production.up.railway.app/api/v1/blogComment/${id}`)
            this.commentblog = response_commentblog.data.result.data

        } catch (error) {
            console.error(error);
        }
    },
    components: {
        Navbar
    },
    data() {
        return {
            // komentar: [
            //     { user: 'Joni Bravo', content: 'Cerita ini patut kita tiru di kehidupan sehari-hari.' },
            //     { user: 'Joni Charlie', content: 'Cerita yang menyentuh hati.' },
            //     { user: 'Joni Delta', content: 'Semoga sang penulis cerita dapat terus diberikan kesabaran dalam menjalankan kehidupannya.' },
            // ]
            content: [],
            storyblog: [],
            commentblog: [],
            user_name: '',
        }
    },
    methods: {
        createcomment() {
            try {
                const id = this.$route.params.id
                const url = `https://elgeka-web-api-production.up.railway.app/api/v1/blogComment/${id}`
                const token = VueCookies.get('token')
                this.user_name = VueCookies.get('Name')
                const formData = new FormData();
                formData.append('user_name', this.user_name);
                formData.append('content', this.content);
                if (token) {
                    const response = axios.post(url, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                })
                .then(response => {
                        // Mengakses data dari respons
                        window.location.reload();
                        console.log(response)
                        // Lakukan sesuatu dengan data yang diperoleh
                    })
                } else if(!token) {
                    this.$router.push('/login')
                }
            } catch (error) {
                console.error(error)
            }
        },
        formatDateTime(dateTimeString) {
            // Parsing string tanggal dan waktu dengan moment.js
            const dateTime = moment(dateTimeString).tz('Asia/Jakarta');

            // Mengubah format tanggal dan waktu
            const formattedDateTime = dateTime.format("HH:mm,  DD MMMM YYYY");

            return formattedDateTime;
        }
    }
}
</script>

<template>
    <Navbar />

    <div>
        <div v-if="storyblog" class="flex flex-col pb-12 pt-20">
            <p class="text-center font-poppins font-bold text-[40px] pt-2 pb-4 mt-16">{{ storyblog.title }}</p>
            <p v-html="storyblog.content" class="px-16 text-[#000000B2] font-base"></p>
            <div>
                <form class="px-16 pt-4 flex gap-2 justify-between max-w-[1800px] m-auto" @submit.prevent="createcomment()">
                    <input class="bg-white w-11/12 max-w-[1600px] px-4 placeholder:text-[#000000B2] border border-orange"
                        type="text" name="komentar" id="" placeholder="Berikan Komentar......." v-model="content">
                    <button type="submit"
                        class="bg-orange font-bold font-poppins text-[20px] text-white rounded-md py-[10px] px-12">kirim</button>
                </form>

            </div>
        </div>

        <p class="pl-16 font-poppins font-bold text-[24px] text-black">Komentar :</p>

        <div class="pt-2 flex flex-col items-start mx-16" v-for="kolomkomentar in commentblog" name="kolom komentar">
            <div class="flex flex-col gap-2 py-4 border border-orange rounded-lg justify-start items-start">
                <p class="max-w-[673px] px-4 text-black font-poppins font-bold text-base"> {{ kolomkomentar.user_name }}
                </p>
                <p class="min-w-[152px] max-w-[673px] px-4 text-[#636363D9] font-poppins font-base">{{ kolomkomentar.content }}</p>
                
            </div>
            <p class="px-4 text-[#9D9D9D] font-poppins text-[12px] tracking-wide">{{ formatDateTime(kolomkomentar.createdAt) }}</p>
        </div>
    </div>
</template>