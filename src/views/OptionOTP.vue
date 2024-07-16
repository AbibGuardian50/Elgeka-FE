<script>
import axios from 'axios'
import VueCookies from 'vue-cookies';
import { useToast } from 'vue-toastification';

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
                const toast = useToast();
                const user_id = VueCookies.get('user_id');
                const url = `https://elgeka-mobile-production.up.railway.app/api/user/email_otp/${user_id}`
                axios.post(url)
                    .then(response => {
                        console.log(response)
                        if (response.data.Message === "Send Email OTP Successfully") {
                            toast.success('OTP berhasil dikirim ke Email')
                            this.$router.push('/sendotpemail')
                        }
                    }
                    )
            } catch (error) {
                console.log(error)
            }
        },
        SendOtpWhatsapp() {
            try {
                const toast = useToast();
                const user_id = VueCookies.get('user_id');
                const url = `https://elgeka-mobile-production.up.railway.app/api/user/whatsapp_otp/${user_id}`
                axios.post(url)
                    .then(response => {
                        console.log(response)
                        if (response.data.Message === "Send Whatsapp OTP Successfully") {
                            toast.success('OTP berhasil dikirim ke Whatsapp')
                            this.$router.push('/sendotpwhatsapp')
                        }
                    }
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
    <div class="bg-gray-100 flex h-screen flex-row-reverse">
        <!-- Left: Image -->
        <div class="w-1/2 h-screen hidden lg:block">
            <router-link to="/"><img src="../assets/sign.png" alt="Placeholder Image"
                    class="object-cover w-full h-full"></router-link>
        </div>
        <!-- Right: Login Form -->
        <div class="flex flex-col lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <img class="w-[120px] mb-20" src="../assets/LogoElgekaHijau.png" alt="Logo">
            <h1 class="text-2xl font-bold font-[verdana] text-[32px] mb-4">Pilih Metode OTP yang diinginkan</h1>
            <img src="../assets/OTP-security.png" class="max-w-[400px] max-h-[360px]" alt="OTP Ilustration">
            <!-- Email Input -->
            <div class="my-8 flex flex-col gap-4">
                <p class="font-poppins text-base text-silvergray">OTP akan dikirim melalui Email</p>
                <button @click="SendOtpEmail()"
                    class="bg-teal text-white font-semibold rounded-md py-2 px-4 w-full max-w-[470px]">Kirim OTP
                    Lewat Email</button>

                <h1>Atau</h1>
                <p class="font-poppins text-base text-silvergray">OTP akan dikirim melalui Whatsapp</p>
                <button @click="SendOtpWhatsapp()"
                    class="bg-teal text-white font-semibold rounded-md py-2 px-4 w-full max-w-[470px]">Kirim OTP
                    Lewat Whatsapp</button>
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