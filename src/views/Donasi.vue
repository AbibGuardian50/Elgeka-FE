<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios';

export default {
    components: {
        Navbar,
    },
    data() {
        return {
            donasielgeka: [],
            gambar_url: 'https://elgeka-web-api-production.up.railway.app/',
        }
    },
    async created() {
        try {
            const url = 'https://elgeka-web-api-production.up.railway.app/api/v1/donasi'
            const response = await axios.get(url);
            this.donasielgeka = response.data.result
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        ensureAbsoluteUrl(url) {
            if (!url.match(/^https?:\/\//)) {
                return 'http://' + url;
            }
            return url;
        }
    }
}
</script>

<template>
    <div class="overflow-y-hidden">
        <Navbar />
        <div v-if="donasielgeka.currentPage === 1" class="flex flex-col justify-center items-center pt-40 m-auto min-w-7/12">
            <p class="font-poppins font-bold max-md:text-[30px] text-[40px] text-teal text-center">{{ donasielgeka.data.title }}</p>
            <img class="md:min-w-[400px] md:w-full max-sm:mx-4 md:max-w-[450px] md:min-h-[250px] h-full md:max-h-[314px] border-8 border-teal my-4 md:object-cover" :src="gambar_url + donasielgeka.data.image_url" alt="Gambar QR"
                srcset="">
            <a :href="ensureAbsoluteUrl(donasielgeka.data.donate_link)"
                class="font-poppins font-bold text-[40px] max-md:text-[30px] text-center hover:underline mb-2" target="_blank">
                <button>{{ donasielgeka.data.donate_link }}</button></a>
            <p v-html="donasielgeka.data.content" class="font-poppins font-normal max-w-[673px] md:w-[673px] max-md:px-8 max-md:text-[14px] text-[#000000B2] content-richtext"></p>
        </div>
    </div>
</template>

<style>
a {
    color: black;
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
}
</style>
