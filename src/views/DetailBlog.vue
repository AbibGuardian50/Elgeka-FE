<script>
import Navbar from '../components/Navbar.vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import moment from 'moment';
import 'moment/locale/id'; // Impor locale bahasa Indonesia
import 'moment-timezone';
import { useToast } from 'vue-toastification';

export default {
    async created() {
        const toast = useToast();
        try {
            const id = this.$route.params.id;
            const response_blog = await axios.get(`https://elgeka-web-api-production.up.railway.app/api/v1/blog/${id}`);
            this.storyblog = response_blog.data.result.data;

            const response_commentblog = await axios.get(`https://elgeka-web-api-production.up.railway.app/api/v1/blogComment/${id}`);
            this.commentblog = response_commentblog.data.result.data;

            const logintoken = VueCookies.get('token');
            this.usertoken = logintoken;
            this.processHyperlinks();  // Panggil fungsi setelah data diambil
        } catch (error) {
            console.error(error);
            toast.error('Terdapat kesalahan sistem, mohon coba lagi');
        }
    },
    components: {
        Navbar
    },
    data() {
        return {
            content: '',
            storyblog: {},
            commentblog: [],
            user_name: '',
            usertoken: '',
        }
    },
    methods: {
        createcomment() {
            const toast = useToast();
            const id = this.$route.params.id;
            const url = `https://elgeka-web-api-production.up.railway.app/api/v1/blogComment/${id}`;
            const token = VueCookies.get('token');
            this.user_name = VueCookies.get('Name');
            const formData = new FormData();
            formData.append('user_name', this.user_name);
            formData.append('content', this.content);
            if (token) {
                axios.post(url, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => {
                        window.location.reload();
                        if (response.data.message === "Create Blog Comment Successfully") {
                            toast.success('Komentar berhasil dibuat');
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else if (!token) {
                this.$router.push('/login');
            }
        },
        formatDateTime(dateTimeString) {
            const dateTime = moment(dateTimeString).tz('Asia/Jakarta');
            const formattedDateTime = dateTime.format("HH:mm, DD MMMM YYYY");
            return formattedDateTime;
        },
        processHyperlinks() {
            if (this.storyblog.content) {
                const div = document.createElement('div');
                div.innerHTML = this.storyblog.content;
                const anchors = div.getElementsByTagName('a');
                for (let i = 0; i < anchors.length; i++) {
                    let href = anchors[i].getAttribute('href');
                    if (href && !href.startsWith('http')) {
                        anchors[i].setAttribute('href', 'https://' + href);
                    }
                }
                this.storyblog.content = div.innerHTML;
            }
        }
    }
}
</script>

<template>
    <Navbar />
    <div>
        <div v-if="storyblog" class="flex flex-col pb-12 pt-20">
            <p class="text-center font-poppins font-bold text-[40px] pt-2 pb-4 mt-16">{{ storyblog.title }}</p>
            <p v-html="storyblog.content" class="px-16 text-[#000000B2] font-base content-richtext"></p>
            <div>
                <form class="px-16 pt-4 flex gap-2 justify-between max-w-[1800px] m-auto" @submit.prevent="createcomment">
                    <input v-if="usertoken"
                        class="bg-white w-11/12 max-w-[1600px] px-4 placeholder:text-[#000000B2] border border-teal"
                        required type="text" name="komentar" id="" placeholder="Berikan Komentar......." v-model="content">
                    <input v-else-if="!usertoken"
                        class="bg-white w-11/12 max-w-[1600px] px-1 placeholder:text-[#000000B2] max-sm:placeholder:text-[10px] cursor-not-allowed border border-teal"
                        type="text" name="komentar" id=""
                        placeholder="Harap login terlebih dahulu untuk memberikan komentar" v-model="content" disabled>
                    <button v-if="usertoken" type="submit"
                        class="bg-teal font-bold font-poppins text-[20px] text-white rounded-md py-[10px] px-12">Kirim</button>
                    <button v-if="!usertoken" type="submit"
                        class="bg-teal font-bold font-poppins text-[20px] text-white rounded-md py-[10px] px-12 cursor-not-allowed opacity-50"
                        disabled>Kirim</button>
                </form>
            </div>
        </div>

        <p class="pl-16 font-poppins font-bold text-[24px] text-black">Komentar :</p>

        <div class="pt-2 flex flex-col items-start mx-16" v-for="kolomkomentar in commentblog" :key="kolomkomentar.id"
            name="kolom komentar">
            <div class="flex flex-col gap-2 py-4 border border-teal rounded-lg justify-start items-start">
                <p class="max-w-[673px] px-4 text-black font-poppins font-bold text-base">{{ kolomkomentar.user_name }}</p>
                <p class="min-w-[152px] max-w-[673px] px-4 text-[#636363D9] font-poppins font-base">{{ kolomkomentar.content
                }}</p>
            </div>
            <p class="px-4 text-[#9D9D9D] font-poppins text-[12px] tracking-wide">{{ formatDateTime(kolomkomentar.createdAt)
            }}</p>
        </div>
    </div>
</template>


<style>
a {
    color: blue;
}

.content-richtext a:link,
a:visited {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
}

.content-richtext a:link:active,
a:visited:active {
    color: blue;
}

.content-richtext b {
    font-weight: bold;
}

.content-richtext i {
    font-style: italic;
}

.content-richtext u {
    text-decoration: underline;
}

.content-richtext h1 {
    display: block;
    font-size: 2em;
    margin-top: 0.67em;
    margin-bottom: 0.67em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
}

.content-richtext h2 {
    display: block;
    font-size: 1.5em;
    margin-top: 0.83em;
    margin-bottom: 0.83em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
}

.content-richtext h3 {
    display: block;
    font-size: 1.17em;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
}

.content-richtext ul {
    display: block;
    list-style-type: disc;
    margin-top: 1em;
    margin-bottom: 1 em;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
}

.content-richtext ol {
    display: block;
    list-style-type: decimal;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
}</style>