<script>
import axios from 'axios'
import VueCookies from 'vue-cookies';
import { useToast } from 'vue-toastification';

export default {
    data() {
        return {
            email: '',
            form: {
                Password: '',
                PasswordConfirmation: '',
            },
            passwordError: '',
            showPassword: false,
            showConfirmationPassword: false,
        }
    },
    methods: {
        async ChangePassword() {
            const toast = useToast();
            try {
                axios.defaults.withCredentials = true;
                const otp_code = localStorage.getItem('OTPCode-forgot_password')
                const user_id = localStorage.getItem('User_ID-forgot_password')
                const formData = new FormData();
                formData.append('Password', this.form.Password);
                formData.append('PasswordConfirmation', this.form.PasswordConfirmation);
                const url = `https://elgeka-mobile-production.up.railway.app/api/user/change_password/${user_id}/${otp_code}`
                const response = await axios.post(url, formData)
                if (response.data.Message === "Update Password Successfully") {
                    toast.success('Kata sandi berhasil diubah, halaman akan otomatis dialihkan ke login')
                    localStorage.removeItem("OTPCode-forgot_password");
                    localStorage.removeItem("User_ID-forgot_password");
                    this.$router.push('/login')
                }
            } catch (error) {
                if (error.response.data.ErrorMessage === "Password Confirmation Must Same as Password") {
                    toast.error('Kata sandi harus sama dengan konfirmasi kata sandi')
                }
                console.log(error)
            }
        },
        validatePassword() {
            if (this.form.Password !== this.form.PasswordConfirmation) {
                this.passwordError = 'Password dan confirmation password harus sama';
            } else {
                this.passwordError = '';
            }
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        toggleConfirmationPasswordVisibility() {
            this.showConfirmationPassword = !this.showConfirmationPassword;
        },
    },
    watch: {
        'form.Password': 'validatePassword',
        'form.PasswordConfirmation': 'validatePassword'
    },
}
</script>

<template class="overflow-y-hidden">
    <!-- component -->
    <div class="bg-gray-100 flex flex-row-reverse h-full">
        <!-- Right: Image -->
        <div class="w-1/2 hidden lg:block h-full">
            <router-link to="/"><img src="../assets/sign.png" alt="Placeholder Image"
                    class="object-cover w-full"></router-link>
        </div>
        <!-- left: Forget Password Form -->
        <div class="flex flex-col lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <img class="w-[120px] rounded-md bg-teal mb-20" src="../assets/logoElgekaPutih1.png" alt="Logo">
            <h1 class="text-2xl font-bold font-[verdana] text-[32px] mb-4">Buat Kata Sandi Baru</h1>
            <p class="font-poppins font-normal text-silvergray text-[14px] mb-8">Silahkan masukkan kata sandi baru anda</p>
            <form @submit.prevent="ChangePassword()">
                <!-- kata Sandi Baru Input -->
                <div class="mb-4">
                    <label for="Kata Sandi" class="block font-[verdana] font-normal text-[14px] text-[#344054] mb-2">Kata
                        Sandi Baru</label>
                        <div class="relative">
                            <input :type="showPassword ? 'text' : 'password'" id="password" name="password"
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="Masukkan kata sandi baru" v-model="form.Password">
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
                <!-- Konfirmasi kata Sandi Baru Input -->
                <div class="mb-4">
                    <label for="Kata Sandi"
                        class="block font-[verdana] font-normal text-[14px] text-[#344054] mb-2">Konfirmasi Kata
                        Sandi Baru</label>
                    <div class="relative">
                        <input :type="showConfirmationPassword ? 'text' : 'password'" id="password" name="password"
                            class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autocomplete="off" placeholder="Masukkan konfirmasi kata sandi baru"
                            v-model="form.PasswordConfirmation">

                        <button type="button" @click="toggleConfirmationPasswordVisibility"
                            class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 focus:outline-none">
                            <span v-if="showConfirmationPassword"><svg width="25px" height="25px" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
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

                    <p v-if="passwordError" class="error text-red">{{ passwordError }}</p>
                </div>
                <!-- Login Button -->
                <div class="flex items-center flex-col mt-12">
                    <button type="submit"
                        class="bg-teal text-white font-semibold rounded-md py-2 px-4 w-full">Kirim</button>
                </div>

            </form>


        </div>
    </div>
</template>