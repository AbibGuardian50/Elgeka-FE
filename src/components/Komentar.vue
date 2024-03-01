<script>
import Navbar from './Navbar.vue'
export default {
    components: {
        Navbar
    },
    data() {
        return {
            komentar: [
                {content:'Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec vulputate neque non mi.'},
                {content:'Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec vulputate neque non mi.'},
                {content:'Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec vulputate neque non mi.'},
            ]
        }
    }
}
</script>

<template>
    <Navbar />

    <div>
        <div class="flex flex-col pb-12">
            <p class="text-center font-poppins font-bold text-[40px] pt-2 pb-4">Cerita</p>
            <p class="px-16 text-[#000000B2] font-base">Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget.
                Eget quis et tortor cras sed. Nec vulputate neque non mi. Lorem ipsum dolor sit amet consectetur. Commodo
                adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec vulputate
                neque non mi. Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non
                facilisi eget. Eget quis et tortor cras sed. Nec vulputate neque non mi. Lorem ipsum dolor sit amet
                consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras
                sed. Nec vulputate neque non mi.</p>
            <div class="px-16 pt-4 flex gap-2 justify-between">
                <input class="bg-grey w-4/5 px-4 placeholder:text-[#000000B2]" type="text" name="komentar" id="" placeholder="Berikan Komentar.......">
                <button class="bg-red font-bold font-poppins text-[20px] text-white rounded-md py-[10px] px-12">kirim</button>
            </div>
        </div>

        <p class="pl-16 font-poppins font-bold text-[24px] text-black">Komentar :</p>

        <div class="pt-2" v-for="kolomkomentar in komentar" name="kolom komentar">
            
            <p class="w-6/12 px-16 text-[#000000B2] font-base">{{ kolomkomentar.content }}</p>
        </div>
    </div>
</template>