<script>
import axios from 'axios'
import VueCookies from 'vue-cookies';
export default {
    data() {
        return {
            email: '',
            otp: ['', '', '', ''], // Array untuk menyimpan setiap digit OTP
            otpDigits: 4 // Jumlah digit OTP

        }
    },
    methods: {
        async login() {
            const User_Id = VueCookies.get('user_id')
            const url = `https://elgeka-mobile-production.up.railway.app/api/user/whatsapp_otp/:${User_Id}`
            axios.post(url, this.form)
                .then(response => {
                    console.log(response.data);
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error)
                })
        },
        focusNextInput(index) {
            // Fokus ke input berikutnya setelah mengisi digit pada input saat ini
            if (index < this.otpDigits - 1 && this.otp[index]) {
                this.$refs[`otpInput${index + 1}`].focus();
            }
        },
        verifyOTP() {
            // Menggabungkan digit-digit OTP menjadi satu string untuk verifikasi
            const otpValue = this.otp.join('');
            // Lakukan verifikasi dengan nilai otpValue
            console.log('Kode OTP:', otpValue);
        }
    },
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
            <h1 class="text-2xl font-bold font-[verdana] text-[32px] mb-4">Masukan kode Autentikasi</h1>
            <p>Masukan 4 digit angka yang telah dikirimkan ke email a*****02@gmail.com</p>
            <form @submit.prevent="login()">
                <!-- Email Input -->
                <div class="my-8 flex flex-col">
                    <div class="otp-input">
                        <input v-for="(digit, index) in otpDigits" :key="index" type="text" class="otp-digit w-[90px] h-[90px] border border-[#B2B2B2]"
                            v-model="otp[index]" maxlength="1" @input="focusNextInput(index)" />
                    </div>

                </div>
                <!-- Login Button -->
                <div class="flex flex-col">
                    <button type="submit"
                        class="bg-orange text-white font-semibold rounded-md py-2 px-4 w-full max-w-[470px]">Lanjutkan</button>
                </div>

            </form>
            <!-- Forgot Password Link -->

        </div>
    </div>
</template>

<style>
.otp-input {
    display: flex;
}

.otp-digit {
    margin: 0 5px;
    text-align: center;
}
</style>