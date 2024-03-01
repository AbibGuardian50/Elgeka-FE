<script>
import Navbar from './Navbar.vue'
export default {
    components: {
        Navbar,
    }
}
</script>

<template>
    <Navbar />

    <div
        class="flex gap-8 p-8 min-[1440px]:max-w-screen-2xl m-auto  min-[240px]:max-lg:flex-wrap min-[240px]:max-lg:justify-center">
        <img src="../assets/Rectangle4209.png" alt="">
        <div class="flex flex-col justify-center ">
            <div class="flex flex-col">
                <p class="font-poppins text-base">kegiatan terbaru</p>
                <p class="font-poppins font-bold text-5xl pt-4">Gathering 2 Januari 2024</p>
                <p class="font-poppins font-bold text-5xl pb-8">Komunitas ELGEKA Jawa Barat</p>
            </div>

            <div class="flex gap-8">
                <p class="font-poppins font-normal text-[12px]">Lorem ipsum dolor sit amet consectetur. Commodo adipiscing
                    massa
                    et sem. Neque elementum non facilisi eget.
                    Eget
                    quis et tortor cras sed.
                    Nec vulputate neque non mi.Lorem ipsum dolor sit amet consectetur.
                    Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec
                    vulputate
                    neque non mi.</p>
            </div>


        </div>
    </div>
</template>