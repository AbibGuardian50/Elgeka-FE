<script>
import Navbar from './Navbar.vue'
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";
import axios from 'axios'
import VueCookies from 'vue-cookies';
// import { defineComponent } from 'vue'
// import { QuillEditor } from '@vueup/vue-quill'
// import BlotFormatter from 'quill-blot-formatter'
// import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
    props: {
        modelValue: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            editor: null,
            prompt: '',
            blog: '',
            errorMessage: '',
        };
    },
    mounted() {
        var _this = this;

        this.editor = new Quill(this.$refs.editor, {
            modules: {
                toolbar: [
                    [
                        {
                            header: [1, 2, 3, 4, false],
                        },
                    ],
                    ["bold", "italic", "underline", "link", "image"],
                ],
            },
            //theme: 'bubble',
            theme: "snow",
            formats: ["bold", "underline", "header", "italic", "link", "image"],
            placeholder: "Type something in here!",
        });
        this.editor.root.innerHTML = this.modelValue;
        this.editor.on("text-change", function () {
            return _this.update();
        });
    },
    methods: {
        update: function update() {
            this.$emit(
                "update:modelValue",
                this.editor.getText() ? this.editor.root.innerHTML : ""
            );
        },
        async generateblog() {
            try {
                const tokenlogin = VueCookies.get('tokenlogin')
                const url = 'https://elgeka-web-api-production.up.railway.app/api/v1/blog/generate'
                const response = await axios.post(url, { prompt: this.prompt }, { headers: { 'Authorization': `Bearer ${tokenlogin}` } });
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
        // QuillEditor,
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
                    <button class="px-8 py-2 bg-orange text-white font-poppins rounded-md my-2"
                        @click="generateblog">Generate blog</button>
                    <div class="bg-orange text-white font-bold font-poppins px-2" v-if="blog">{{ blog.generated_blog
                    }}</div>
                    <div v-else>(Hasil Generate blog akan tampil disini)</div>
                </div>

            </div>

    <div>
        <div class="flex flex-col justify-end ">
            <div id="editor" class=" border-2 border-[#8B1A0FCC] mt-24 mx-8 mb-8 rounded-lg p-4 bg-grey">
                <p class="text-red font-bold">Judul Cerita</p>
                <input class="w-full" type="text" name="judul cerita" id="">
                <!-- <QuillEditor class="bg-white" :modules="modules" toolbar="essential" /> -->
            </div>

            <div class="border-2 border-[#8B1A0FCC] m-8 rounded-lg p-4 bg-grey">
                <p class="text-red font-bold">Tuliskan Cerita anda</p>
                <div class="bg-white" ref="editor"></div>
                <!-- <QuillEditor class="bg-white" :modules="modules" toolbar="full" /> -->
            </div>

            <div class="flex justify-end pr-8">
                <router-link to="/komentar"><button
                        class="bg-orange font-bold font-poppins text-[20px] text-white rounded-md py-[10px] px-12">Kirim</button></router-link>
            </div>

        </div>
    </div>
</template>

