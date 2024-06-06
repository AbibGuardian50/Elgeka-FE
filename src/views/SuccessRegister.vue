<script>
export default {
    data() {
    },
    methods: {
    },
}
</script>

<template>
    <!-- component -->
    <div class="bg-gray-100 flex flex-row-reverse min-[2200px]:overflow-hidden">
        <!-- Left: Image -->
        <div class="w-1/2 h-screen min-[2200px]:h-full hidden lg:block">
            <router-link to="/"><img src="../assets/sign.png" alt="Placeholder Image"
                    class="object-cover w-full h-full"></router-link>
        </div>
        <!-- Right: Login Form -->
        <div class="flex flex-col lg:p-36 md:p-52 min-[2200px]:items-center sm:20 p-2 w-full lg:w-1/2">
            <img class="w-[120px] mb-20" src="../assets/LogoElgekaHijau.png" alt="Logo">
            <h1 class="text-2xl font-bold font-[verdana] text-[32px] mb-4">Akun berhasil dibuat!</h1>
            <div class="my-8 flex flex-col gap-4">
                <div>
                    <p class="font-poppins font-normal text-base text-silvergray">Selamat Akun barumu berhasil dibuat
                        Silahkan login untuk melanjutkan</p>

                </div>
                <div class="flex flex-col items-center mt-8">
                    <img src="../assets/success-logo.png" class="max-w-[242px] max-h-[242px]" alt="Success Logo" />
                    <router-link to="/login"><button
                            class="w-full min-w-[650px] max-w-[700px] bg-orange py-2 font-verdana font-normal text-white text-base rounded-lg mt-8">Login
                            sekarang</button></router-link>
                </div>
            </div>


        </div>
    </div>
</template>

<style></style>