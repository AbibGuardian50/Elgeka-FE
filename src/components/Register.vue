<script>
import axios from 'axios';
import VueCookies from 'vue-cookies';

export default {
    data() {
        return {
            form: {
                Name: '',
                Address: '',
                Province: '',
                District: '',
                SubDistrict: '',
                Village: '',
                PhoneNumber: '628',
                Gender: '',
                BirthDate: '',
                DiagnosisDate: '',
                BloodGroup: '',
                Email: '',
                Password: '',
                confirmpassword: '',
            },
            error: '',
            passwordError: '',
            provinces: [],
            districts: [],
            subDistricts: [],
            villages: [],
        }
    },
    created() {
        this.fetchProvinces();
    },
    methods: {
        fetchProvinces() {
            axios.get('https://abibguardian50.github.io/api-wilayah-indonesia/api/provinces.json')
                .then(response => {
                    this.provinces = response.data;
                })
                .catch(error => {
                    console.error('Error fetching provinces:', error);
                });
        },
        fetchDistricts(provinceId) {
            axios.get(`https://abibguardian50.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`)
                .then(response => {
                    this.districts = response.data;
                    this.subDistricts = [];
                    this.villages = [];
                })
                .catch(error => {
                    console.error('Error fetching districts:', error);
                });
        },
        fetchSubDistricts(districtId) {
            axios.get(`https://abibguardian50.github.io/api-wilayah-indonesia/api/districts/${districtId}.json`)
                .then(response => {
                    this.subDistricts = response.data;
                    this.villages = [];
                })
                .catch(error => {
                    console.error('Error fetching subDistricts:', error);
                });
        },
        fetchVillages(subDistrictId) {
            axios.get(`https://abibguardian50.github.io/api-wilayah-indonesia/api/villages/${subDistrictId}.json`)
                .then(response => {
                    this.villages = response.data;
                })
                .catch(error => {
                    console.error('Error fetching villages:', error);
                });
        },
        createuser() {
            const url = 'https://elgeka-mobile-production.up.railway.app/api/user/register';
            const formData = new FormData();
            formData.append('Name', this.form.Name);
            formData.append('Address', this.form.Address);
            formData.append('Province', this.form.Province);
            formData.append('District', this.form.District);
            formData.append('SubDistrict', this.form.SubDistrict);
            formData.append('Village', this.form.Village);
            formData.append('PhoneNumber', this.form.PhoneNumber);
            formData.append('Gender', this.form.Gender);
            formData.append('BirthDate', this.form.BirthDate);
            formData.append('DiagnosisDate', this.form.DiagnosisDate);
            formData.append('BloodGroup', this.form.BloodGroup);
            formData.append('Email', this.form.Email);
            formData.append('Password', this.form.Password);
            formData.append('PasswordConfirmation', this.form.confirmpassword);

            axios.post(url, formData)
                .then(response => {
                    console.log(response.data);
                    VueCookies.set('user_id', response.data.Data[0].ID);
                    if (response.data.Message === 'Register Success') {
                        this.$router.push('/optionotp');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        validatePassword() {
            if (this.form.Password !== this.form.confirmpassword) {
                this.passwordError = 'Password dan confirmation password harus sama';
            } else {
                this.passwordError = '';
            }
        },
    },
    watch: {
        'form.Password': 'validatePassword',
        'form.confirmpassword': 'validatePassword'
    },
}
</script>


<template>
    <div class="bg-gray-100 flex flex-row-reverse">
        <div class="w-1/2 hidden lg:block">
            <img src="../assets/sign.png" alt="Placeholder Image" class="object-cover w-full h-full">
        </div>
        <div class="flex flex-col lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <img class="w-[120px] bg-teal mb-20" src="../assets/logoElgekaPutih1.png" alt="Logo">
            <h1 class="text-2xl font-bold font-[verdana] text-[32px] mb-4">Let's Create your account</h1>
            <form @submit.prevent="createuser()">
                <!-- Nama Lengkap Input -->
                <div class="mb-4">
                    <label for="namalengkap" class="block font-[verdana] font-normal text-[14px] text-[#344054] mb-2">Nama
                        Lengkap</label>
                    <input type="text" id="namalengkap" name="namalengkap" required
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="Enter your full name" v-model="form.Name">
                </div>
                <!-- Email Input -->
                <div class="mb-4">
                    <label for="username"
                        class="block font-[verdana] font-normal text-[14px] text-[#344054] mb-2">Email</label>
                    <input type="email" id="username" name="username" required
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="Email" v-model="form.Email">
                </div>
                <!-- No Telepon Input -->
                <div class="mb-4">
                    <label for="phonenumber" class="block text-[#344054] mb-2">Nomor Telepon</label>
                    <input type="number" id="phonenumber" name="phonenumber" required
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="No telepon" v-model="form.PhoneNumber">
                </div>
                <!-- Tanggal Lahir Input -->
                <div class="mb-4">
                    <label for="tanggalLahir" class="block text-[#344054] mb-2">Tanggal Lahir</label>
                    <input type="date" id="tanggalLahir" name="tanggalLahir" required
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="yyyy-mm-dd" min="1997-01-01" max="2030-12-31"
                        v-model="form.BirthDate">
                </div>
                <!-- Tanggal Diagnosis Input -->
                <div class="mb-4">
                    <label for="tanggalDiagnosis" class="block text-[#344054] mb-2">Tanggal Diagnosis</label>
                    <input type="date" id="tanggalDiagnosis" name="tanggalDiagnosis" required
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="yyyy-mm-dd" min="1997-01-01" max="2030-12-31"
                        v-model="form.DiagnosisDate">
                </div>
                <!-- Alamat Input -->
                <div class="mb-4">
                    <label for="alamat" class="block text-[#344054] mb-2">Alamat</label>
                    <input type="text" id="alamat" name="alamat" required
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="Enter Alamat" v-model="form.Address">
                </div>
                <!-- Provinsi Input -->
                <div class="mb-4">
                    <label for="provinsi" class="block text-[#344054] mb-2">Provinsi</label>
                    <select id="provinsi" name="provinsi" required
                        class="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        v-model="form.Province" @change="fetchDistricts(form.Province)">
                        <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name }}
                        </option>
                    </select>
                </div>
                <!-- Kabupaten Input -->
                <div class="mb-4">
                    <label for="kabupaten" class="block text-[#344054] mb-2">Kabupaten</label>
                    <select id="kabupaten" name="kabupaten" required
                        class="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        v-model="form.District" @change="fetchSubDistricts(form.District)">
                        <option v-for="district in districts" :key="district.id" :value="district.id">{{ district.name }}
                        </option>
                    </select>
                </div>
                <!-- Kecamatan Input -->
                <div class="mb-4">
                    <label for="kecamatan" class="block text-[#344054] mb-2">Kecamatan</label>
                    <select id="kecamatan" name="kecamatan" required
                        class="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        v-model="form.SubDistrict" @change="fetchVillages(form.SubDistrict)">
                        <option v-for="subDistrict in subDistricts" :key="subDistrict.id" :value="subDistrict.id">{{
                            subDistrict.name }}</option>
                    </select>
                </div>
                <!-- Desa/Kelurahan Input -->
                <div class="mb-4">
                    <label for="desaKelurahan" class="block text-[#344054] mb-2">Desa/Kelurahan</label>
                    <select id="desaKelurahan" name="desaKelurahan" required
                        class="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        v-model="form.Village">
                        <option v-for="village in villages" :key="village.id" :value="village.id">{{ village.name }}
                        </option>
                    </select>
                </div>
                <!-- Jenis Kelamin Input -->
                <div class="mb-4">
                    <label for="jeniskelamin" class="block text-[#344054] mb-2">Jenis Kelamin</label>
                    <select id="jeniskelamin" name="jeniskelamin" required v-model="form.Gender"
                        class="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
                        <option value="male">Laki-Laki</option>
                        <option value="female">Perempuan</option>
                    </select>
                </div>
                <!-- Golongan Darah Input -->
                <div class="mb-4">
                    <label for="golonganDarah" class="block text-[#344054] mb-2">Golongan Darah</label>
                    <select id="golonganDarah" name="golonganDarah" required v-model="form.BloodGroup"
                        class="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
                        <option value="A">A</option>
                        <option value="AB">AB</option>
                        <option value="B">B</option>
                        <option value="O">O</option>
                    </select>
                </div>
                <!-- Password Input -->
                <div class="mb-4">
                    <label for="password" class="block text-[#344054] mb-2">Password</label>
                    <input type="password" id="password" name="password" required v-model="form.Password"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="Enter password">
                </div>
                <!-- Password Confirmation Input -->
                <div class="mb-4">
                    <label for="passwordConfirmation" class="block text-[#344054] mb-2">Confirmation Password</label>
                    <input type="password" id="passwordConfirmation" name="passwordConfirmation" required
                        v-model="form.confirmpassword"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="Enter password">
                    <p v-if="passwordError" class="error text-red">{{ passwordError }}</p>
                </div>

                <div class="flex items-center flex-col">
                    <button type="submit"
                        class="bg-teal text-white font-semibold rounded-md py-2 px-4 w-full">Register</button>
                    <p class="mt-4 font-[verdana] font-normal text-[14px]">Already have an account? <span
                            class="font-bold text-[#4D4D4F]">Sign in</span></p>
                </div>
            </form>
    </div>
</div></template>
