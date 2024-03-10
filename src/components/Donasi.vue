<script>
import Navbar from './Navbar.vue'

export default {
    components: {
        Navbar,
    }
}
</script>

<template>
    <div class="overflow-y-hidden">
        <Navbar />

        <div class="flex flex-col justify-center items-center p-40 m-auto w-7/12">
            <p class="font-poppins font-bold text-[40px] text-orange text-center">Donasi untuk membantu komunitas ELGEKA</p>
            <img class="border-8 border-orange my-4" src="../assets/QR Code.png" alt="" srcset="">
            <p class="font-poppins font-bold text-[40px] text-center">KITABISA.COM/CMLELGEKA</p>
            <p class="font-poppins font-normal w-[673px] text-center text-[16px] text-[#000000B2]">Lorem ipsum dolor sit
                amet consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget
                quis et tortor cras sed. Nec vulputate neque non mi.</p>
        </div>
    </div>
</template>