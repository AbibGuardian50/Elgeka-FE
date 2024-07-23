<script>
import Navbar from '../components/Navbar.vue'
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import axios from 'axios'
import { useToast } from 'vue-toastification';
import VueCookies from 'vue-cookies';

export default {
    data() {
        return {
            form: {
                content: '',
                title: '',
            },
            username: '',
            editor: null,
            prompt: '',
            blog: '',
            errorMessage: '',
        };
    },
    methods: {
        createblog() {
            const toast = useToast();
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
                    this.statuscode = response.data.code;
                    if (response.data.code === 201 || response.data.message === "Create Blog Successfully") {
                        toast.success('Blog berhasil dibuat, mohon untuk menunggu verifikasi')
                        setTimeout(() => {
                            this.$router.push('/Blog');
                        }, 2000);
                    } else if (response.data.code === 400) {
                        toast.error('Blog gagal dibuat, mohon coba lagi')
                    }
                })
                .catch(error => {
                    console.log(error.message)
                    if (error.message === 'Request failed with status code 413') {
                        toast.error('Konten yang akan diupload terlalu besar, mohon untuk mengganti file foto dengan ukuran lebih kecil atau meringkas konten')
                    }
                })
        },
    },
    components: {
        Navbar,
        QuillEditor,
    },
}

</script>

<template>
    <Navbar />
    <div>
        <div class="flex flex-col justify-end pt-12">
            <form @submit.prevent="createblog()">
                <div id="editor" class=" border-2 border-teal mt-24 mx-8 mb-8 rounded-lg p-4 bg-white">
                    <p class="text-darktransparent font-bold">Judul Blog</p>
                    <input class="w-full bg-grey min-h-[2rem]" type="text" name="judul Blog" id="" v-model="form.title">
                </div>
                <div class="border-2 border-teal m-8 rounded-lg p-4 bg-white">
                    <p class="text-darktransparent font-bold">Tuliskan Blog anda</p>
                    <quill-editor :toolbar="['bold', 'italic', 'underline', 'image', 'link', {'list': 'ordered'}, {'list': 'bullet'}]" theme="snow" class="bg-grey min-h-[4rem]"
                        contentType="html" v-model:content="form.content"></quill-editor>
                </div>
                <div class="flex justify-end pr-8">
                    <button type="submit"
                        class="bg-teal font-bold font-poppins text-[20px] text-white rounded-md py-[10px] px-12 mb-8">Kirim</button>
                </div>
            </form>
        </div>
    </div>
</template>

