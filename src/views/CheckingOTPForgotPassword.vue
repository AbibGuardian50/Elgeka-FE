<template>
    <!-- component -->
    <div class="bg-gray-100 flex flex-row-reverse">
        <!-- Left: Image -->
        <div class="w-1/2 hidden lg:block">
            <router-link to="/"><img src="../assets/sign.png" alt="Placeholder Image"
                    class="object-cover w-full h-full"></router-link>
        </div>
        <!-- Right: Login Form -->
        <div class="flex flex-col lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <img class="w-[120px] bg-teal rounded-md mb-20" src="../assets/logoElgekaPutih1.png" alt="Logo">
            <h1 class="text-2xl font-bold font-[verdana] text-[32px] mb-4">Masukan kode Autentikasi</h1>
            <p>Masukan 4 digit angka yang telah dikirimkan ke email</p>
            <form @submit.prevent="CheckOTP">
                <!-- OTP Inputs -->
                <div class="my-8 flex flex-col">
                    <div class="otp-input">
                        <input v-for="(digit, index) in OtpCodeDigits" :key="index" type="text" v-model="OtpCode[index]"
                            maxlength="1" class="otp-digit w-[90px] h-[90px] border border-[#B2B2B2]"
                            @input="focusNextInput(index)" ref="OtpCodeInput" />
                    </div>
                </div>
                <!-- Login Button -->
                <div class="flex flex-col">
                    <button type="submit"
                        class="bg-teal text-white font-semibold rounded-md py-2 px-4 w-full max-w-[470px]">Lanjutkan</button>
                </div>
            </form>
            <button @click="ReSendOtp"
                class="text-[#A5A6A6] font-semibold rounded-md py-2 px-4 w-full max-w-[470px]">Kirim Ulang code</button>
            <!-- Forgot Password Link -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import VueCookies from 'vue-cookies';
import { useToast } from 'vue-toastification';

export default {
    data() {
        return {
            email: '',
            OtpCode: Array(4).fill(''), // Array untuk menyimpan setiap digit OTP
            OtpCodeDigits: 4, // Jumlah digit OTP
            // userdata: '',
        }
    },
    methods: {
        CheckOTP() {
            const toast = useToast();
            const user_id = localStorage.getItem('User_ID-forgot_password');
            const OtpCodeValue = this.OtpCode.join(''); // Gabungkan digit OTP menjadi satu string
            const formData = new FormData();
            formData.append('OtpCode', OtpCodeValue);
            const url = `https://elgeka-mobile-production.up.railway.app/api/user/check_otp/${user_id}`;
            axios.post(url, formData)
                .then(response => {
                    if (response.data.Message === "Check Otp Successfully") {
                        toast.success('OTP Benar')
                        localStorage.setItem('OTPCode-forgot_password', response.data.OtpData[0].OtpCode)
                        this.$router.push('/BuatKataSandiBaru')
                    }
                })
                .catch(error => {
                    console.log(error)
                    if (error.response.data.ErrorMessage === "Incorrect OTP code") {
                        toast.error('OTP Salah, mohon masukkan lagi')
                    }
                });
        },
        focusNextInput(index) {
            // Fokus ke input berikutnya setelah mengisi digit pada input saat ini
            if (index < this.OtpCodeDigits - 1 && this.OtpCode[index]) {
                this.$refs.OtpCodeInput[index + 1].focus();
            }
        },
        ReSendOtp() {
            try {
                const toast = useToast();
                const user_id = localStorage.getItem('User_ID-forgot_password');
                const url = `https://elgeka-mobile-production.up.railway.app/api/user/refresh_code/forgot_password/${user_id}`;
                axios.post(url)
                    .then(response => {
                        if (response.data.Message === "Success to Send Otp Code") {
                            toast.success('OTP berhasil dikirim kembali, mohon cek email anda')
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        toast.error('OTP gagal dikirim kembali, mohon coba lagi')
                    } );
            } catch (error) {
                const toast = useToast();
                toast.error('OTP gagal dikirim kembali, mohon coba lagi')
                console.log(error);
            }
        },
    },
    mounted() {
        this.$refs.OtpCodeInput[0].focus(); // Fokus pada input pertama saat komponen dimuat
    },
}
</script>

<style>
.otp-input {
    display: flex;
}

.otp-digit {
    margin: 0 5px;
    text-align: center;
}
</style>
