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
        SendOtpEmail() {
            try {
                const user_id = VueCookies.get('user_id');
                const url = `https://elgeka-mobile-production.up.railway.app/api/user/email_otp/${user_id}`
                axios.post(url)
                    .then(response =>
                        console.log(response),
                        this.$router.push('sendotpemail')
                    )
            } catch (error) {
                console.log(error)
            }
        },
        SendOtpWhatsapp() {
            try {
                const user_id = VueCookies.get('user_id');
                const url = `https//elgeka-mobile-production.up.railway.app/api/user/whatsapp_otp/${user_id}`
                axios.post(url)
                    .then(response =>
                        console.log(response),
                        this.$router.push('sendotpwhatsapp')
                    )
            } catch (error) {
                console.log(error)
            }
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
            <h1 class="text-2xl font-bold font-[verdana] text-[32px] mb-4">Pilih Metode OTP yang diinginkan</h1>
                <!-- Email Input -->
                <div class="my-8 flex flex-col gap-4">
                    
                        <button @click="SendOtpEmail()"
                            class="bg-orange text-white font-semibold rounded-md py-2 px-4 w-full max-w-[470px]">Kirim OTP
                            Lewat Email</button>
                    
                    <h1>Atau</h1>
                    <a href="/sendotpwhatsapp">
                        <p @click="SendOtpWhatsapp()"
                            class="bg-orange text-white font-semibold rounded-md py-2 px-4 w-full max-w-[470px]">Kirim OTP
                            Lewat Whatsapp</p></a>
                </div>
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