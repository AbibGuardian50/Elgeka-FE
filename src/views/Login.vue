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
                    toast.error ('Email atau password yang dimasukkan salah')
                } else {
                    toast.error ('Terdapat kesalahan sistem, mohon coba lagi')
                }
            }
        },
        setTokenCookie(token) {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 30);
            // Mengatur cookie dengan nama "token" dan nilai token yang diberikan bersama dengan tanggal kedaluwarsa 30 hari dari saat ini
            Cookies.set('token', token, { expires: expirationDate });
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
    <div class="bg-sign md:bg-none md:h-full h-screen md:bg-white bg-transparentblack bg-blend-darken md:bg-blend-normal flex flex-row-reverse ">
        <!-- Left: Image -->
        <div class="w-1/2 hidden lg:block">
            <router-link to="/"><img src="../assets/sign.png" alt="Placeholder Image"
                    class="object-cover w-full h-full"></router-link>
        </div>
        <!-- Right: Login Form -->
        <div class="flex flex-col lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <img class="w-[120px] md:bg-teal rounded-md mb-20" src="../assets/logoElgekaPutih1.png" alt="Logo">
            <h1 class="text-2xl text-white md:text-black font-bold font-[verdana] text-[32px] mb-4">Selamat Datang !</h1>
            <form @submit.prevent="login">
                <!-- Email Input -->
                <div class="mb-4">
                    <label for="Email"
                        class="block font-[verdana] text-white md:text-black font-normal text-[14px] text-[#344054] mb-2">Email atau Nomor HP</label>
                    <input type="text" id="Email" name="Email" v-model="EmailOrPhoneNumber"
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter your email or phone number">
                </div>
                <!-- Password Input -->
                <div class="mb-4">
                    <label for="password" class="block text-[#344054] mb-2 text-white md:text-black">Password</label>
                    <input type="password" id="password" name="password" v-model="password"
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter password">
                </div>
                <!-- Remember Me Checkbox -->
                <div class="mb-4 flex flex-col">
                    <div>
                        <input type="checkbox" id="remember" name="remember" class="outline-[#D4A02C]">
                        <label for="remember" class="font-[verdana] md:text-[#344054] text-white font-normal text[14px] ml-2">Remember
                            Me</label>
                    </div>
                    <p class="pl-5 font-[verdana] font-normal text[14px] text-white md:text-[#667085]">Save my login details for next
                        time.</p>
                </div>
                <!-- Login Button -->
                <div class="flex items-center flex-col">
                    <button type="submit"
                        class="bg-teal text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
                    <div class="mt-6 text-blue-500">
                        <router-link to="/lupapassword">
                            <a target="_blank"
                                class="hover:underline font-[verdana] font-normal text-[14px] text-white md:text-[#4D4D4F]">Forgot
                                Password?</a>
                        </router-link>
                    </div>
                </div>

            </form>
            <!-- Forgot Password Link -->
        </div>
    </div>
</template>