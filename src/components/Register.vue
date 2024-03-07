<script>
import Navbar from './Navbar.vue'
export default {
    components: {
        Navbar
    },
}
</script>

<template>
    <!-- component -->
    <div class="bg-gray-100 flex flex-row-reverse">
        <!-- Left: Image -->
        <div class="w-1/2 hidden lg:block">
            <img src="../assets/sign.png" alt="Placeholder Image" class="object-cover w-full h-full">
        </div>
        <!-- Right: Login Form -->
        <div class="flex flex-col lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <img class="w-[120px]" src="../assets/rectangle.png" alt="Logo">
            <h1 class="text-2xl font-bold font-[verdana] text-[32px] mb-4">Lets Create your account</h1>
            <form action="#" method="POST">
                <!-- nama lengkap Input -->
                <div class="mb-4">
                    <label for="namalengkap"
                        class="block font-[verdana] font-normal text-[14px] text-[#344054] mb-2">nama lengkap</label>
                    <input type="text" id="namalengkap" name="namalengkap"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter your email address">
                </div>
                <!-- Email Input -->
                <div class="mb-4">
                    <label for="username" class="block font-[verdana] font-normal text-[14px] text-[#344054] mb-2">
                        Email</label>
                    <input type="text" id="username" name="username"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="email">
                </div>
                <!-- No telepon Input -->
                <div class="mb-4">
                    <label for="number" class="block text-[#344054] mb-2">Nomor Telepon</label>
                    <input type="number" id="password" name="password"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="No telepon">
                </div>
                <!-- Tanggal Lahir Input -->
                <div class="mb-4">
                    <label for="Tanggal Lahir" class="block text-[#344054] mb-2">Tanggal Lahir</label>
                    <input type="date" id="date" name="date"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter date">
                </div>
                <!-- Kota Domisili Input -->
                <div class="mb-4">
                    <label for="Kota Domisili" class="block text-[#344054] mb-2">Kota Domisili</label>
                    <input type="text" id="kota-domisili" name="kota domisili"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter kota domisili">
                </div>
                <!-- jenis Kelamin Input -->
                <div class="mb-4">
                    <label for="Kota Domisili" class="block text-[#344054] mb-2">Jenis Kelamin</label>
                    <Select type="text" id="kota-domisili" name="kota domisili"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter kota domisili">
                        <option value="Laki-laki">laki-Laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </Select>
                </div>
                <!-- FORMULIR -->
                <div class="mb-4">
                    <label for="Formulir" class="block text-[#344054] text-black font-bold mb-2">Formulir</label>
                </div>
                <!-- Golongan Darah Input -->
                <div class="mb-4">
                    <label for="Kota Domisili" class="block text-[#344054] mb-2">Golongan Darah</label>
                    <Select type="text" id="kota-domisili" name="kota domisili"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter kota domisili">
                        <option value="A">A</option>
                        <option value="AB">AB</option>
                        <option value="B">B</option>
                    </Select>
                </div>
                <!-- Password Input -->
                <div class="mb-4">
                    <label for="Password" class="block text-[#344054] mb-2">Password</label>
                    <input type="password" id="kota-domisili" name="Password"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter password">
                </div>
                <!-- Remember Me Checkbox 
                <div class="mb-4 flex flex-col">
                    <div>
                        <input type="checkbox" id="remember" name="remember" class="outline-[#D4A02C]">
                        <label for="remember" class="font-inter text-[#344054] font-normal text[14px] ml-2">By signing
                            up, I have read an agree to Untitled UI’s <span class="font-bold text-[#040503]">Terms</span>
                            and <span class="font-bold text-[#040503]">Privacy Policy</span></label>
                    </div>
                    <p class="pl-5 font-[verdana] font-normal text[14px] text-[#667085]">Save my login details for next
                        time.</p>
                </div> -->
                <!-- Login Button -->
                <div class="flex items-center flex-col">
                    <button type="submit"
                        class="bg-orange text-white font-semibold rounded-md py-2 px-4 w-full">Register</button>
                    <!-- <div class="flex items-center gap-1 my-6 text-blue-500">
                        <img src="../assets/Vector.png" alt="">
                        <a href="#" class="hover:underline font-[verdana] font-normal text-[14px] text-[#B1B3B5]">Or, sign
                            up with</a>
                        <img src="../assets/Vector.png" alt="">
                    </div> -->
                    <!-- <button type="submit"
                        class="flex justify-center gap-2 bg-white border border-[#D0D5DD] text-[#344054] font-inter font-semibold rounded-md py-2 px-4 w-full">
                        <span><img src="../assets/google-icon.png" alt="" srcset=""></span> Sign up with Google</button> -->
                    <p class="mt-4 font-[verdana] font-normal text-[14px]">Already have an account ? <span class="font-bold text-[#4D4D4F]">Sign in</span> </p>
                </div>

            </form>
            <!-- Forgot Password Link -->

    </div>
</div></template>