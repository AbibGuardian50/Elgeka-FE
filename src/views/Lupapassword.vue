<script>
import Navbar from "../components/Navbar.vue" 
import axios from 'axios'
import VueCookies from 'vue-cookies';
import { useToast } from 'vue-toastification';

export default {
    components: {
        Navbar
    },
    data () {
        return {
            email: '',
        }
    },
    methods: {
        async forgotpassword() {
            try {
                const toast = useToast();
                axios.defaults.withCredentials = true;
                const url = 'https://elgeka-mobile-production.up.railway.app/api/user/forgot_password'
                const response = await axios.post(url, {
                    email: this.email,
                },
                )
                if (response.data.Message === "Success to Send Otp Code") {
                    toast.success('OTP Code berhasil dikirim, cek email anda')
                    this.$router.push('/CheckingOTPForgotPassword')
                    localStorage.setItem('User_ID-forgot_password', response.data.Data[0].ID)
                }
                console.log(response)
            } catch (error) {
                const toast = useToast(); 
                console.log(error)
                toast.error('OTP Code gagal dikirim, mohon coba lagi')
            }
        }
    }
}
</script>

<template class="overflow-y-hidden">
    <!-- component -->
    <div class="bg-gray-100 flex flex-row-reverse">
        <!-- Right: Image -->
        <div class="w-1/2 hidden lg:block">
            <router-link to="/"><img src="../assets/sign.png" alt="Placeholder Image"
                    class="object-cover w-full h-full"></router-link>
        </div>
        <!-- left: Forget Password Form -->
        <div class="flex flex-col lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <img class="w-[120px] mb-20" src="../assets/LogoElgekaHijau.png" alt="Logo">
            <h1 class="text-2xl font-bold font-[verdana] text-[32px] mb-4">Buat Kata Sandi Baru</h1>
            <p class="font-poppins font-normal text-silvergray text-[14px] mb-8">Silahkan masukan email anda untuk menerima
                kode verifikasi</p>
            <form @submit.prevent="forgotpassword()">
                <!-- Email Input -->
                <div class="mb-4">
                    <label for="username"
                        class="block font-[verdana] font-normal text-[14px] text-[#344054] mb-2">Email</label>
                    <input type="text" id="username" name="username"
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="Masukkan alamat email" v-model="email">
                </div>
                <!-- kata Sandi Baru Input -->
                <!-- <div class="mb-4">
                    <label for="Kata Sandi" class="block font-[verdana] font-normal text-[14px] text-[#344054] mb-2">Kata
                        Sandi Baru</label>
                    <input type="password" id="password" name="password"
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter new password">
                </div> -->
                <!-- Login Button -->
                <div class="flex items-center flex-col mt-12">
                    <button type="submit"
                        class="bg-teal text-white font-semibold rounded-md py-2 px-4 w-full">Kirim</button>
                </div>

            </form>


        </div>
    </div>
</template>