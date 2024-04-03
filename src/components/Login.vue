<script>
import Navbar from './Navbar.vue'
import axios from 'axios'
import VueCookies from 'vue-cookies';
export default {
    components: {
        Navbar
    },
    data() {
        return {
            email: '',
            password: '',
            error: '',
            rememberMe: false,
            rememberedUsername: '',
            rememberedPassword: ''
        }
    },
    methods: {
        async login() {
            try {
                // const token = this.$cookies.get('Authorization',Authorization);
                // const session = await getServerAuthSession()
                // const token = session?.user.Authorization
                const url = 'https://elgeka-mobile-production.up.railway.app/api/user/login'
                const response = await axios.post(url, {
                    email: this.email,
                    password: this.password
                })
                        if (response.status === 200) {
                            console.log(response)
                            // console.log(response.headers.setAuthorization)
                            // console.log(response.headers["Authorization"])
                            VueCookies.set('isLoggedIn',response.data.Message)
                            
                            
                            // VueCookies.set()
                        }
            } catch (error) {
                this.error = 'ada kesalahan dari sistem, mohon coba lagi'
            }
        },
        handleResponse(response) {
            const cookies = response.headers['set-cookie'];

            // Lakukan pemeriksaan apakah cookies tidak kosong
            if (cookies && cookies.length > 0) {
                // Loop melalui cookies untuk menemukan token
                cookies.forEach(cookie => {
                    // Anda harus menyesuaikan ini dengan cara bagaimana server Anda mengirimkan cookie token
                    if (cookie.includes('token')) {
                        // Ekstrak token dari cookie
                        const Authorization = cookie.split(';')[0].split('=')[1];

                        // Simpan token di sini, misalnya ke Local Storage
                        localStorage.setItem('token', Authorization);

                        // Jika token diperlukan di seluruh aplikasi, Anda bisa juga menyimpannya di Vuex Store
                        // this.$store.commit('setToken', token); // contoh jika menggunakan Vuex
                    }
                });
            }
        }

    },
    mounted() {
        const rememberedUsername = localStorage.getItem('rememberedUsername');
        const rememberedPassword = localStorage.getItem('rememberedPassword');
        if (rememberedUsername && rememberedPassword) {
            this.email = rememberedUsername; // Perbaikan disini
            this.password = rememberedPassword;
            this.rememberMe = true;
        }
    }
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
        <div class="flex flex-col lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <img class="w-[120px] pb-20" src="../assets/Logo_elgeka.png" alt="Logo">
            <h1 class="text-2xl font-bold font-[verdana] text-[32px] mb-4">Selamat Datang !</h1>
            <form @submit.prevent="login()">
                <!-- Email Input -->
                <div class="mb-4">
                    <label for="Email"
                        class="block font-[verdana] font-normal text-[14px] text-[#344054] mb-2">Email</label>
                    <input type="email" id="Email" name="Email" v-model="email"
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter your email address">
                </div>
                <!-- Password Input -->
                <div class="mb-4">
                    <label for="password" class="block text-[#344054] mb-2">Password</label>
                    <input type="password" id="password" name="password" v-model="password"
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter password">
                </div>
                <!-- Remember Me Checkbox -->
                <div class="mb-4 flex flex-col">
                    <div>
                        <input type="checkbox" id="remember" name="remember" class="outline-[#D4A02C]">
                        <label for="remember" class="font-[verdana] text-[#344054] font-normal text[14px] ml-2">Remember
                            Me</label>
                    </div>
                    <p class="pl-5 font-[verdana] font-normal text[14px] text-[#667085]">Save my login details for next
                        time.</p>
                </div>
                <!-- Login Button -->
                <div class="flex items-center flex-col">
                    <button type="submit"
                        class="bg-orange text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
                    <div class="mt-6 text-blue-500">
                        <router-link to="/lupapassword">
                            <a target="_blank"
                                class="hover:underline font-[verdana] font-normal text-[14px] text-[#4D4D4F]">Forgot
                                Password?</a>
                        </router-link>
                    </div>
                </div>

            </form>
            <!-- Forgot Password Link -->

        </div>
    </div>
</template>