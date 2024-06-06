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
            <img class="w-[120px] mb-20" src="../assets/LogoElgekaHijau.png" alt="Logo">
            <div class="max-w-[470px]">
                <h1 class="font-bold font-[verdana] max-sm:text-center text-[32px] mb-4">Akun Berhasil Dibuat!</h1>
                <p class="font-poppins font-normal max-sm:text-center text-xl text-silvergray">Silahkan Login untuk melanjutkan</p>
                <div class="flex flex-col items-center my-20">
                    <img src="../assets/SecurityLogo.png" alt="success logo">
                </div>
                <div class="flex flex-col items-center">
                    <a href="/login"><button type="submit"
                            class="bg-teal text-white font-semibold rounded-md py-2 px-4 w-full max-w-[470px]">Login
                            Sekarang</button></a>

                </div>
            </div>

        </div>
    </div>
</template>

<style></style>