<script>
import axios from 'axios'
import VueCookies from 'vue-cookies';
export default {

}
</script>

<template>
    <!-- component -->
    <div class="bg-gray-100 flex flex-row-reverse">
        <!-- Left: Image -->
        <div class="w-1/2 h-screen hidden lg:block">
            <router-link to="/"><img src="../assets/sign.png" alt="Placeholder Image"
                    class="object-cover w-full h-full"></router-link>
        </div>
        <!-- Right: Login Form -->
        <div class="flex flex-col lg:p-36 md:p-52 sm:20 w-full lg:w-1/2">
            <img class="w-[120px] pb-20" src="../assets/Logo_elgeka.png" alt="Logo">
            <div class="max-w-[470px]">
                <h1 class="font-bold font-[verdana] text-[32px] mb-4">Kata Sandi Berhasil diubah!</h1>
                <p class="font-poppins font-normal text-xl text-silvergray">Selamat Password kamu berhasil diubah</p>
                <p class="font-poppins font-normal text-xl text-silvergray">Silahkan Login untuk melanjutkan</p>
                <div class="flex flex-col items-center my-20">
                    <img src="../assets/success-logo.png" alt="success logo">
                </div>
                <div class="flex flex-col">
                    <a href="/login"><button type="submit"
                            class="bg-orange text-white font-semibold rounded-md py-2 px-4 w-full max-w-[470px]">Login
                            Sekarang</button></a>

                </div>
            </div>

        </div>
    </div>
</template>

<style></style>