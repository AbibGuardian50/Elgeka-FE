<script>
import Navbar from './Navbar.vue'
export default {
    components: {
        Navbar
    },
}
</script>

<template class="overflow-y-hidden">
    <!-- component -->
    <div class="bg-gray-100 flex flex-row-reverse">
        <!-- Right: Image -->
        <div class="w-1/2 h-screen hidden lg:block">
            <router-link to="/"><img src="../assets/sign.png" alt="Placeholder Image"
                    class="object-cover w-full h-full"></router-link>
        </div>
        <!-- left: Forget Password Form -->
        <div class="flex flex-col lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <img class="w-[120px] pb-20" src="../assets/Logo_elgeka.png" alt="Logo">
            <h1 class="text-2xl font-bold font-[verdana] text-[32px] mb-4">Buat Kata Sandi Baru</h1>
            <form action="#" method="POST">
                <!-- Email Input -->
                <div class="mb-4">
                    <label for="username"
                        class="block font-[verdana] font-normal text-[14px] text-[#344054] mb-2">Email</label>
                    <input type="text" id="username" name="username"
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter your email address">
                </div>
                <!-- kata Sandi Baru Input -->
                <div class="mb-4">
                    <label for="Kata Sandi" class="block font-[verdana] font-normal text-[14px] text-[#344054] mb-2">Kata Sandi Baru</label>
                    <input type="password" id="password" name="password"
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter new password">
                </div>

                <!-- Ulang Kata Sandi Baru Input -->
                <div class="mb-4">
                    <label for="Ulang Kata Sandi baru" class="block font-[verdana] font-normal text-[14px] text-[#344054] mb-2">Ulang Kata Sandi Baru</label>
                    <input type="Ulang Kata Sandi baru" id="Ulang Kata Sandi baru" name="Ulang Kata Sandi baru"
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter password">
                </div>
                <!-- Login Button -->
                <div class="flex items-center flex-col">
                    <button type="submit" class="bg-teal text-white font-semibold rounded-md py-2 px-4 w-full">Kirim</button>
                </div>

            </form>
           

    </div>
</div></template>