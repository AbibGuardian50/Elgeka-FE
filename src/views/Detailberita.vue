<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
export default {
    components: {
        Navbar
    },
    data() {
        return {
            detailberita: '',
            url: 'https://elgeka-web-api-production.up.railway.app/'
        }
    },
    methods: {
        updateAnchorStyles() {
            // Pastikan detailberita.content tidak kosong
            if (this.detailberita.content) {
                // Buat elemen sementara untuk menangani HTML
                const tempElement = document.createElement('div');
                tempElement.innerHTML = this.detailberita.content;

                // Ambil semua elemen <a> di dalam konten
                const links = tempElement.getElementsByTagName('a');

                // Loop melalui setiap elemen <a> dan atur gaya
                for (let i = 0; i < links.length; i++) {
                    links[i].style.color = '#eb0707';
                    links[i].style.textDecoration = 'underline';
                    links[i].style.cursor = 'pointer';
                }

                // Setelah mengubah gaya, perbarui kembali detailberita.content
                this.detailberita.content = tempElement.innerHTML;
            }
        }
    },
    setup() {
    },
    async created() {
        try {
            const id = this.$route.params.id
            const response_beritaumum = await axios.get(`https://elgeka-web-api-production.up.railway.app/api/v1/berita/${id}`);
            this.detailberita = response_beritaumum.data.result.data
            console.log(response_beritaumum.data.result.data.content)
            // const params_id = this.$route.params.id
        } catch (error) {
            console.error(error);
        }
    }
}
</script>

<template>
    <Navbar />

    <div v-if="detailberita"
        class="flex flex-col m-auto sm:p-8 max-sm:w-full min-[1600px]:max-w-[1440px] max-sm:overflow-x-hidden">
        <img class="sm:mt-32 mt-28 rounded-t-md max-h-[404px]" :src="url + detailberita.image_url" alt="gambar">
        <div class="rounded-b-md bg-teal">
            <div class="pt-8 max-sm:pl-4 sm:pl-8 md:pl-20 pr-4 pb-12">
                <p class="text-5xl text-white font-poppins font-semibold leading-[3.875rem]">{{ detailberita.title }}
                </p>
                <p v-html="detailberita.content"
                    class="text-base text-[#FFFFFFB2] font-poppins font-normal leading-6 sm:pr-24 md:pr-48 content-richtext">
                </p>
            </div>

        </div>
    </div>
</template>

<style>
.content-richtext b {
    font-weight: bold;
}

a {
    color: #000 !important
}

.content-richtext a:link,
a:visited {
    color: #eb0707;
    text-decoration: underline;
    cursor: pointer;
}

.content-richtext a:link:active,
a:visited:active {
    color: #eb0707;
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
}
</style>