<script>
import Navbar from './Navbar.vue'
export default {
    components: {
        Navbar
    }
}
</script>

<template>
    <Navbar />

    <div class="flex flex-col p-8 min-[1600px]:max-w-[1440px]">
        <img class="max-h-[404px]" src="../assets/Rectangle4208.png" alt="">
        <div class="bg-[#FF914C]">
            <div class="w-8/12 m-auto pt-8 pb-16 flex flex-col justify-center items-center">
                <p class="text-5xl text-center text-white font-poppins font-semibold leading-[3.875rem]">Quotes</p>
                <p class="text-5xl text-center text-white font-poppins font-semibold leading-[3.875rem]">Komunitas ELGEKA Jawa Barat</p>

                <p class="text-base text-center text-white font-poppins font-normal leading-6">Lorem ipsum dolor sit amet
                    consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor
                    cras sed. Nec vulputate neque non mi.</p>
            </div>

        </div>
    </div>
</template>