<script>
import Navbar from './Navbar.vue'
export default {
    components: {
        Navbar
    },
    data() {
        return {
            komentar: [
                { user: 'Joni Bravo', content: 'Cerita ini patut kita tiru di kehidupan sehari-hari.' },
                { user: 'Joni Charlie', content: 'Cerita yang menyentuh hati.' },
                { user: 'Joni Delta', content: 'Semoga sang penulis cerita dapat terus diberikan kesabaran dalam menjalankan kehidupannya.' },
            ]
        }
    }
}
</script>

<template>
    <Navbar />

    <div>
        <div class="flex flex-col pb-12 pt-20">
            <p class="text-center font-poppins font-bold text-[40px] pt-2 pb-4 mt-16">Cerita</p>
            <p class="px-16 text-[#000000B2] font-base">Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et
                sem. Neque elementum non facilisi eget.
                Eget quis et tortor cras sed. Nec vulputate neque non mi. Lorem ipsum dolor sit amet consectetur. Commodo
                adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec vulputate
                neque non mi. Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non
                facilisi eget. Eget quis et tortor cras sed. Nec vulputate neque non mi. Lorem ipsum dolor sit amet
                consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras
                sed. Nec vulputate neque non mi.</p>
            <div class="px-16 pt-4 flex gap-2 justify-between">
                <input class="bg-grey w-4/5 px-4 placeholder:text-[#000000B2] border border-orange" type="text" name="komentar" id=""
                    placeholder="Berikan Komentar.......">
                <button
                    class="bg-orange font-bold font-poppins text-[20px] text-white rounded-md py-[10px] px-12">kirim</button>
            </div>
        </div>

        <p class="pl-16 font-poppins font-bold text-[24px] text-black">Komentar :</p>

        <div class="pt-2 flex flex-col items-start mx-16" v-for="kolomkomentar in komentar" name="kolom komentar">
            <div class="flex flex-col gap-2 py-4  bg-grey rounded-lg justify-start items-start">
                <p class="max-w-[673px] px-4 text-black font-poppins font-bold text-base"> {{ kolomkomentar.user }} </p>
                <p class="max-w-[673px] px-4 text-[#000000D9] font-poppins font-base">{{ kolomkomentar.content }}</p>
            </div>

        </div>
</div></template>