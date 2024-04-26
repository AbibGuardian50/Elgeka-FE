<script>
import Navbar from './Navbar.vue'
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import axios from 'axios'
import VueCookies from 'vue-cookies';

export default {
    data() {
        return {
            form: {
                content: '',
                title: '',
            },
            username:'',
            editor: null,
            prompt: '',
            blog: '',
            errorMessage: '',
        };
    },
    methods: {
        createcerita() {
            const Token = VueCookies.get('token')
            axios.defaults.withCredentials = true;
            this.username = VueCookies.get('Name')
            const url = 'https://elgeka-web-api-production.up.railway.app/api/v1/blog '
            const formData = new FormData();
            formData.append('author_name', this.username);
            formData.append('title', this.form.title);
            formData.append('content', this.form.content);
            axios.post(url, formData, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${Token}` } })
                .then(response => {
                    console.log(response.data);
                    this.statuscode = response.data.code;
                    console.log(this.statuscode);
                    if (response.data.code === 201) {
                        setTimeout(() => {
                            this.$router.push('/cerita');
                        }, 2000);
                    } else if (response.data.code === 400) {
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async generateblog() {
            try {
                const Token = VueCookies.get('token')
                const url = 'https://elgeka-web-api-production.up.railway.app/api/v1/blog/generate'
                const response = await axios.post(url, { prompt: this.prompt }, { headers: { 'Authorization': `Bearer ${Token}` } });
                this.token = tokenlogin
                this.blog = response.data.result;
                console.log(this.blog);
                console.log(this.token)
            } catch (error) {
                console.error('Error generating blog:', error);
            }
        },
    },
    components: {
        Navbar,
        QuillEditor,
    },
    // setup: () => {
    //     const modules = {
    //         name: 'blotFormatter',
    //         module: BlotFormatter,
    //         options: {/* options */ }
    //     }
    //     return { modules }
    // },
}

</script>

<template>
    <Navbar />

    <div class="flex flex-col gap-4">
        <div class="mt-40 mx-8">
            <!-- <p class="font-gotham font-normal text-2xl text-black mb-2">Quotes</p> -->
            <input type="text" class="bg-grey pl-4 py-1 w-full rounded-full" v-model="prompt"
                placeholder="Enter your prompt here">
            <button class="px-8 py-2 bg-orange text-white font-poppins rounded-md my-2" @click="generateblog">Generate
                blog</button>
            <div class="bg-orange text-white font-bold font-poppins px-2" v-if="blog">{{ blog.generated_blog
            }}</div>
            <div v-else>(Hasil Generate blog akan tampil disini)</div>
        </div>

    </div>

    <div>
        <div class="flex flex-col justify-end ">
            <form @submit.prevent="createcerita()">
                <!-- <div class="bg-grey">
                    <input type="text" v-model="username">
                </div> -->
               
                <div id="editor" class=" border-2 border-orange mt-24 mx-8 mb-8 rounded-lg p-4 bg-white">
                    <p class="text-darktransparent font-bold">Judul Cerita</p>
                    <input class="w-full bg-grey" type="text" name="judul cerita" id="" v-model="form.title">
                    <!-- <QuillEditor class="bg-white" :modules="modules" toolbar="essential" /> -->
                </div>

                <div class="border-2 border-orange m-8 rounded-lg p-4 bg-white">
                    <p class="text-darktransparent font-bold">Tuliskan Cerita anda</p>
                    <quill-editor :toolbar="['bold', 'italic', 'underline', 'image']" theme="snow" class="bg-grey"
                        contentType="html" v-model:content="form.content"></quill-editor>
                   
                </div>

                <div class="flex justify-end pr-8">
                    <!-- <router-link to="/komentar"><button
                        class="bg-orange font-bold font-poppins text-[20px] text-white rounded-md py-[10px] px-12">Kirim</button></router-link> -->
                    <button type="submit"
                        class="bg-orange font-bold font-poppins text-[20px] text-white rounded-md py-[10px] px-12">Kirim</button>
                </div>
            </form>


        </div>
    </div>
</template>

