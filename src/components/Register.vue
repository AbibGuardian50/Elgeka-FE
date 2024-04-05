<script>
import axios from 'axios'
import VueCookies from 'vue-cookies';
export default {
    data() {
        return {
            form: {
                Name: '',
                Address: '',
                PhoneNumber: '628',
                Gender: '',
                BirthDate: '',
                BloodGroup: '',
                Email: '',
                Password: '',
                confirmpassword: '',
            },
            error: '',
        }
    },
    methods: {
        createuser() {
            const url = 'https://elgeka-mobile-production.up.railway.app/api/user/register'
            const formData = new FormData();
            formData.append('Name', this.form.Name);
            formData.append('Address', this.form.Address);
            formData.append('PhoneNumber', this.form.PhoneNumber);
            formData.append('Gender', this.form.Gender);
            formData.append('BirthDate', this.form.BirthDate);
            formData.append('BloodGroup', this.form.BloodGroup);
            formData.append('Email', this.form.Email);
            formData.append('Password', this.form.Password);
            axios.post(url, formData)
                .then(response => {
                    console.log(response.data);
                    VueCookies.set('user_id',response.data.Data[0].ID)
                    
                })
                .catch(error => {
                    console.log(error)
                })
        },
    }
}
</script>

<template>
    <!-- component -->
    <div class="bg-gray-100 flex flex-row-reverse">
        <!-- Left: Image -->
        <div class="w-1/2 hidden lg:block">
            <img src="../assets/sign.png" alt="Placeholder Image" class="object-cover w-full h-full">
        </div>
        <!-- Right: Login Form -->
        <div class="flex flex-col lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <img class="w-[120px] pb-20" src="../assets/Logo_elgeka.png" alt="Logo">
            <h1 class="text-2xl font-bold font-[verdana] text-[32px] mb-4">Lets Create your account</h1>
            <form @submit.prevent="createuser()">
                <!-- nama lengkap Input -->
                <div class="mb-4">
                    <label for="namalengkap" class="block font-[verdana] font-normal text-[14px] text-[#344054] mb-2">nama
                        lengkap</label>
                    <input type="text" id="namalengkap" name="namalengkap" required
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter your full name" v-model="form.Name">
                </div>
                <!-- Email Input -->
                <div class="mb-4">
                    <label for="username" class="block font-[verdana] font-normal text-[14px] text-[#344054] mb-2">
                        Email</label>
                    <input type="email" id="username" name="username" required
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="email" v-model="form.Email">
                </div>
                <!-- No telepon Input -->
                <div class="mb-4">
                    <label for="phonenumber" class="block text-[#344054] mb-2">Nomor Telepon</label>
                    <input type="number" id="phone number" name="phone number" required
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="No telepon" v-model="form.PhoneNumber">
                </div>
                <!-- Tanggal Lahir Input -->
                <div class="mb-4">
                    <label for="Tanggal Lahir" class="block text-[#344054] mb-2">Tanggal Lahir</label>
                    <input type="date" id="date" name="date" required
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="yyyy-mm-dd" min="1997-01-01" max="2030-12-31"
                        v-model="form.BirthDate">
                </div>
                <!-- Alamat Input -->
                <div class="mb-4">
                    <label for="Alamat" class="block text-[#344054] mb-2">Alamat</label>
                    <input type="text" id="kota-domisili" name="Alamat" required
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter Alamat" v-model="form.Address">
                </div>
                <!-- jenis Kelamin Input -->
                <div class="mb-4">
                    <label for="jeniskelamin" class="block text-[#344054] mb-2">Jenis Kelamin</label>
                    <select id="jeniskelamin" name="Jenis Kelamin" required v-model="form.Gender"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="jeniskelamin">
                        <option value="male">laki-Laki</option>
                        <option value="female">Perempuan</option>
                    </select>
                </div>
                <!-- FORMULIR -->
                <div class="mb-4">
                    <label for="Formulir" class="block text-[#344054] text-black font-bold mb-2">Formulir</label>
                </div>
                <!-- Golongan Darah Input -->
                <div class="mb-4">
                    <label for="Golongan Darah" class="block text-[#344054] mb-2">Golongan Darah</label>
                    <select id="Golongan Darah" name="Golongan Darah" required v-model="form.BloodGroup"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter Golongan Darah">
                        <option value="A">A</option>
                        <option value="AB">AB</option>
                        <option value="B">B</option>
                        <option value="O">O</option>
                    </select>
                </div>
                <!-- Password Input -->
                <div class="mb-4">
                    <label for="Password" class="block text-[#344054] mb-2">Password</label>
                    <input type="password" id="password" name="Password" required v-model="form.Password"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter password">
                </div>
                <!-- Password confirmation Input -->
                <div class="mb-4">
                    <label for="Password" class="block text-[#344054] mb-2">Confirmation Password</label>
                    <input type="password" id="PasswordConfirmation" name="Password" required v-model="form.confirmpassword"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="enter password">
                    <p v-if="error" class="error text-red">{{ error }}</p>
                </div>
                <div class="flex items-center flex-col">
                    <button type="submit"
                        class="bg-orange text-white font-semibold rounded-md py-2 px-4 w-full">Register</button>
                    <p class="mt-4 font-[verdana] font-normal text-[14px]">Already have an account ? <span
                            class="font-bold text-[#4D4D4F]">Sign in</span> </p>
                </div>

            </form>
            <!-- Forgot Password Link -->

        </div>
    </div>
</template>