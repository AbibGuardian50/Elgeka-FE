<script>
import Navbar from '../components/Navbar.vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import Cookies from 'js-cookie';
import { useToast } from 'vue-toastification';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'etrh940945hj945hg409j';

export default {
    components: {
        Navbar,
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
            showPassword: false,
        };
    },
    methods: {
        async login() {
            const toast = useToast();
            try {
                axios.defaults.withCredentials = true;
                const url = 'https://elgeka-mobile-production.up.railway.app/api/user/login_website';
                const formattedEmailOrPhoneNumber = this.formatPhoneNumber(this.EmailOrPhoneNumber);
                const response = await axios.post(url, {
                    EmailOrPhoneNumber: formattedEmailOrPhoneNumber,
                    password: this.password,
                });
                console.log(response);
                if (response.data.Message === 'Login Success') {
                    console.log(response);
                    toast.success('Berhasil Login');
                    const name = response.data.Data[0].Name;
                    const message = response.data.Message;
                    const token = response.data.Token;
                    this.setCookies(name, message, token);
                    // Simpan username dan password jika rememberMe diaktifkan
                    if (this.rememberMe) {
                        localStorage.setItem('rememberedUsername', this.EmailOrPhoneNumber);
                        const encryptedPassword = CryptoJS.AES.encrypt(this.password, ENCRYPTION_KEY).toString();
                        localStorage.setItem('rememberedPassword', encryptedPassword);
                    } else {
                        localStorage.removeItem('rememberedUsername');
                        localStorage.removeItem('rememberedPassword');
                    }

                    this.$router.push('/');
                }
            } catch (error) {
                console.log(error);
                if (error.response.data.ErrorMessage === 'Invalid password') {
                    toast.error('Password salah');
                } else if (error.response.data.ErrorMessage === 'Invalid email or phone number') {
                    toast.error('Email atau nomor telepon yang dimasukkan salah');
                } else {
                    toast.error('Terdapat kesalahan sistem, mohon coba lagi');
                }
            }
        },
        setCookies(name, message, token) {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 30);
            Cookies.set('Name', name, { expires: expirationDate });
            Cookies.set('Message', message, { expires: expirationDate });
            Cookies.set('token', token, { expires: expirationDate });
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        formatPhoneNumber(input) {
            if (input.startsWith('0')) {
                return '62' + input.substring(1);
            }
            return input;
        },
    },
    mounted() {
        const rememberedUsername = localStorage.getItem('rememberedUsername');
        const encryptedPassword = localStorage.getItem('rememberedPassword');
        if (rememberedUsername && encryptedPassword) {
            this.EmailOrPhoneNumber = rememberedUsername;
            const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
            this.password = decryptedPassword;
            this.rememberMe = true;
        }
    },
};
</script>

<template>
    <div
        class="bg-sign md:bg-none md:h-full h-screen md:bg-white bg-transparentblack bg-blend-darken md:bg-blend-normal flex flex-row-reverse">
        <div class="w-1/2 hidden lg:block">
            <router-link to="/">
                <img src="../assets/sign.png" alt="Placeholder Image" class="object-cover w-full h-full">
            </router-link>
        </div>
        <div class="flex flex-col lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <img class="w-[120px] md:hidden rounded-md mb-20" src="../assets/logoElgekaPutih1.png" alt="Logo">
            <img class="w-[120px] hidden md:block rounded-md mb-20" src="../assets/LogoElgekaHijau.png" alt="Logo">
            <h1 class="text-2xl text-white md:text-black font-bold font-[verdana] text-[32px] mb-4">Selamat Datang!</h1>
            <form @submit.prevent="login">
                <div class="mb-4">
                    <label for="Email"
                        class="block font-[verdana] text-white md:text-black font-normal text-[14px] text-[#344054] mb-2">Email
                        atau Nomor Telepon</label>
                    <input type="text" id="Email" name="Email" v-model="EmailOrPhoneNumber" required
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="Masukkan email atau nomor telepon">
                </div>
                <div class="mb-4">
                    <label for="Kata Sandi" class="block text-[#344054] mb-2 text-white md:text-black">Kata Sandi</label>
                    <div class="relative">
                        <input :type="showPassword ? 'text' : 'password'" id="Kata Sandi" name="Kata Sandi"
                            v-model="password" required
                            class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autocomplete="off" placeholder="Masukkan Kata Sandi">
                        <button type="button" @click="togglePasswordVisibility"
                            class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 focus:outline-none">
                            <span v-if="showPassword">
                                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 2L22 22" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
                                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
                                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                            <span v-else>
                                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <circle cx="12" cy="12" r="3" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
                <div class="mb-4 flex flex-col">
                    <div>
                        <input type="checkbox" id="remember" name="remember" v-model="rememberMe" class="outline-[#D4A02C]">
                        <label for="remember"
                            class="font-[verdana] md:text-[#344054] text-white font-normal text[14px] ml-2">Ingat Akun
                            ini</label>
                    </div>
                    <p class="pl-5 font-[verdana] font-normal text[14px] text-white md:text-[#667085]">Simpan detail login
                        saya untuk lain kali.</p>
                </div>
                <div class="flex items-center flex-col">
                    <button type="submit"
                        class="bg-teal text-white font-semibold rounded-md py-2 px-4 w-full">Masuk</button>
                    <div class="mt-6 text-blue-500">
                        <router-link to="/lupapassword">
                            <a target="_blank"
                                class="hover:underline font-[verdana] font-normal text-[14px] text-white md:text-[#4D4D4F]">Lupa
                                kata sandi? klik disini</a>
                        </router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
