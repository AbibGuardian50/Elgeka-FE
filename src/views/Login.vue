<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
import VueCookies from 'vue-cookies';
import Cookies from 'js-cookie';
import { useToast } from 'vue-toastification';
export default {
    components: {
        Navbar
    },
    data() {
        return {
            EmailOrPhoneNumber: '',
            password: '',
            error: '',
            rememberMe: false,
            rememberedUsername: '',
            rememberedPassword: '',
            profiledata: '',
            showPassword: false
        }
    },
    methods: {
        async login() {
            const toast = useToast();
            try {
                axios.defaults.withCredentials = true;
                const url = 'https://elgeka-mobile-production.up.railway.app/api/user/login_website'
                const response = await axios.post(url, {
                    EmailOrPhoneNumber: this.EmailOrPhoneNumber,
                    password: this.password
                },
                )
                console.log(response)
                if (response.data.Message === "Login Success") {
                    console.log(response)
                    toast.success('Berhasil Login')
                    // VueCookies.set('Authentication',response.data.Token)
                    VueCookies.set('Name', response.data.Data[0].Name)
                    VueCookies.set('Message', response.data.Message)
                    const token = ('Authentication', response.data.Token);
                    this.setTokenCookie(token);
                    this.$router.push('/')
                }
            } catch (error) {
                console.log(error)
                if (error.response.data.ErrorMessage === "Invalid password") {
                    toast.error("Password salah")
                } else if (error.response.data.ErrorMessage === "Invalid email or phone number") {
                    toast.error('Email atau password yang dimasukkan salah')
                } else {
                    toast.error('Terdapat kesalahan sistem, mohon coba lagi')
                }
            }
        },
        setTokenCookie(token) {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 30);
            // Mengatur cookie dengan nama "token" dan nilai token yang diberikan bersama dengan tanggal kedaluwarsa 30 hari dari saat ini
            Cookies.set('token', token, { expires: expirationDate });
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        }
    },
    mounted() {
        const rememberedUsername = localStorage.getItem('rememberedUsername');
        const rememberedPassword = localStorage.getItem('rememberedPassword');
        if (rememberedUsername && rememberedPassword) {
            this.EmailOrPhoneNumber = rememberedUsername; // Perbaikan disini
            this.password = rememberedPassword;
            this.rememberMe = true;
        }
    }
}
</script>

<template>
    <!-- component -->
    <div
        class="bg-sign md:bg-none md:h-full h-screen md:bg-white bg-transparentblack bg-blend-darken md:bg-blend-normal flex flex-row-reverse ">
        <!-- Left: Image -->
        <div class="w-1/2 hidden lg:block">
            <router-link to="/"><img src="../assets/sign.png" alt="Placeholder Image"
                    class="object-cover w-full h-full"></router-link>
        </div>
        <!-- Right: Login Form -->
        <div class="flex flex-col lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <img class="w-[120px] md:hidden rounded-md mb-20" src="../assets/logoElgekaPutih1.png" alt="Logo">
            <img class="w-[120px] hidden md:block rounded-md mb-20" src="../assets/LogoElgekaHijau.png" alt="Logo">
            <h1 class="text-2xl text-white md:text-black font-bold font-[verdana] text-[32px] mb-4">Selamat Datang !</h1>
            <form @submit.prevent="login">
                <!-- Email Input -->
                <div class="mb-4">
                    <label for="Email"
                        class="block font-[verdana] text-white md:text-black font-normal text-[14px] text-[#344054] mb-2">Email
                        atau Nomor HP</label>
                    <input type="text" id="Email" name="Email" v-model="EmailOrPhoneNumber" required
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter your email or phone number">
                </div>
                <!-- Password Input -->
                <div class="mb-4">
                    <label for="password" class="block text-[#344054] mb-2 text-white md:text-black">Password</label>
                    <div class="relative">
                        <input :type="showPassword ? 'text' : 'password'" id="password" name="password" v-model="password"
                            required
                            class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autocomplete="off" placeholder="enter password">
                        <button type="button" @click="togglePasswordVisibility"
                            class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 focus:outline-none">
                            <span v-if="showPassword"><svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 2L22 22" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
                                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
                                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg></span>
                            <span v-else><svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <circle cx="12" cy="12" r="3" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg></span>
                        </button>
                    </div>
                </div>
                <!-- Remember Me Checkbox -->
                <div class="mb-4 flex flex-col">
                    <div>
                        <input type="checkbox" id="remember" name="remember" class="outline-[#D4A02C]">
                        <label for="remember"
                            class="font-[verdana] md:text-[#344054] text-white font-normal text[14px] ml-2">Remember
                            Me</label>
                    </div>
                    <p class="pl-5 font-[verdana] font-normal text[14px] text-white md:text-[#667085]">Save my login details
                        for next
                        time.</p>
                </div>
                <!-- Login Button -->
                <div class="flex items-center flex-col">
                    <button type="submit" class="bg-teal text-white font-semibold rounded-md py-2 px-4 w-full">Log
                        in</button>
                    <div class="mt-6 text-blue-500">
                        <router-link to="/lupapassword">
                            <a target="_blank"
                                class="hover:underline font-[verdana] font-normal text-[14px] text-white md:text-[#4D4D4F]">Forgot
                                Password?</a>
                        </router-link>
                    </div>
                </div>

        </form>
    </div>
</div></template>