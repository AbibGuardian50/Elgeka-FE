<script>
import Navbar from './Navbar.vue'
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";
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

    <div>
        <div class="flex flex-col justify-end">
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

