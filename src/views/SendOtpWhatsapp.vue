<script>
import axios from 'axios'
import VueCookies from 'vue-cookies';
export default {
    data() {
        return {
            email: '',
            OtpCode: [], // Array untuk menyimpan setiap digit OTP
            otpDigits: 4, // Jumlah digit OTP
            // userdata: '',
        }
    },
    methods: {
        activateaccount() {
            const User_Id = VueCookies.get('user_id')
            const formData = new FormData();
            formData.append('OtpCode', this.OtpCode);
            const url = `https://elgeka-mobile-production.up.railway.app/api/user/activate/${User_Id}`
            axios.post(url,formData)
                .then(response => {
                    console.log(response.data);
                    VueCookies.remove('user_id');
                    // if (response.data.Message === )
                    // this.userdata = response.data.Data[0].Email
                    // console.log(this.userdata);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        focusNextInput(index) {
            // Fokus ke input berikutnya setelah mengisi digit pada input saat ini
            if (index < this.OtpCodeDigits - 1 && this.OtpCode[index]) {
                this.$refs[`OtpCodeInput${index + 1}`].focus();
            }
        },
        verifyOTP() {
            // Menggabungkan digit-digit OTP menjadi satu string untuk verifikasi
            const OtpCodeValue = this.OtpCode.join('');
            // Lakukan verifikasi dengan nilai OtpCodeValue
            console.log('Kode OtpCode:', OtpCodeValue);
        },
        SendOtpWhatsapp() {
            try {
                const user_id = VueCookies.get('user_id');
                const url = `https://elgeka-mobile-production.up.railway.app/api/user/whatsapp_otp/${user_id}`
                axios.post(url)
                    .then(response =>
                        console.log(response),
                        this.$router.push('/sendotpwhatsapp')
                        // this.$router.push('sendotpwhatsapp')
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
            <h1 class="text-2xl font-bold font-[verdana] text-[32px] mb-4">Masukan kode Autentikasi</h1>
            <p>Masukan 4 digit angka yang telah dikirimkan ke email</p>
            <form @submit.prevent="activateaccount()">
                <!-- Email Input -->
                <div class="my-8 flex flex-col">
                    <div class="otp-input">
                        <input type="text"
                            class="otp-digit w-[90px] h-[90px] border border-[#B2B2B2]" v-model="OtpCode"
                            />
                    </div>

                </div>
                <!-- Login Button -->
                <div class="flex flex-col">
                    <button type="submit"
                        class="bg-orange text-white font-semibold rounded-md py-2 px-4 w-full max-w-[470px]">Lanjutkan</button>
                </div>
            </form>
            <button @click="SendOtpWhatsapp()"
                class="text-[#A5A6A6] font-semibold rounded-md py-2 px-4 w-full max-w-[470px]">Kirim Ulang code</button>
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