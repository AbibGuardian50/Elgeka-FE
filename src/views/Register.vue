<script>
import axios from 'axios';
import VueCookies from 'vue-cookies';
import { useToast } from 'vue-toastification';
import { isValid, isBefore, parseISO, formatISO } from 'date-fns';

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
            maxDate: '', // Untuk menyimpan tanggal maksimal (hari ini)
            error: '',
            passwordError: '',
            phoneError: '',
            dateError: '',
            ageError: '',
            addressError: '',
            provinces: [],
            districts: [],
            subDistricts: [],
            villages: [],
            showPassword: false,
            showConfirmationPassword: false,
            isChecked: false, // Default tidak dicentang
        }
    },

    created() {
        this.fetchProvinces();
        // Setel nilai maxDate dengan tanggal hari ini dalam format ISO
        this.maxDate = formatISO(new Date(), { representation: 'date' });
    },
    computed: {
        isValidForm() {
            return this.validatePhoneNumber() &&
                this.validateDates() &&
                this.validateAddress() &&
                this.validatePassword() &&
                !this.dateError &&
                !this.ageError &&
                !this.addressError &&
                !this.passwordError;
        }
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        toggleConfirmationPasswordVisibility() {
            this.showConfirmationPassword = !this.showConfirmationPassword;
        },
        validatePhoneNumber() {
            const phonePattern = /^[0-9]{10,14}$/;
            if (!phonePattern.test(this.form.PhoneNumber)) {
                this.phoneError = 'Nomor HP harus memiliki panjang 10 hingga 14 digit.';
                return false;
            } else {
                this.phoneError = '';
            }
            return true;
        },
        fetchProvinces() {
            const toast = useToast();
            axios.get('https://abibguardian50.github.io/api-wilayah-indonesia/api/provinces.json')
                .then(response => {
                    this.provinces = response.data;
                })
                .catch(error => {
                    toast.error('Error fetching provinces, mohon refresh halaman');
                    console.error('Error fetching provinces:', error);
                });
        },
        fetchDistricts(provinceId) {
            const toast = useToast();
            axios.get(`https://abibguardian50.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`)
                .then(response => {
                    this.districts = response.data;
                    this.subDistricts = [];
                    this.villages = [];
                })
                .catch(error => {
                    toast.error('Error fetching districts, mohon refresh halaman');
                    console.error('Error fetching districts:', error);
                });
        },
        fetchSubDistricts(districtId) {
            const toast = useToast();
            axios.get(`https://abibguardian50.github.io/api-wilayah-indonesia/api/districts/${districtId}.json`)
                .then(response => {
                    this.subDistricts = response.data;
                    this.villages = [];
                })
                .catch(error => {
                    toast.error('Error fetching subDistricts, mohon refresh halaman');
                    console.error('Error fetching subDistricts:', error);
                });
        },
        fetchVillages(subDistrictId) {
            const toast = useToast();
            axios.get(`https://abibguardian50.github.io/api-wilayah-indonesia/api/villages/${subDistrictId}.json`)
                .then(response => {
                    this.villages = response.data;
                })
                .catch(error => {
                    toast.error('Error fetching villages, mohon refresh halaman');
                    console.error('Error fetching villages:', error);
                });
        },

        validateDates() {
            const birthDate = parseISO(this.form.BirthDate);
            const diagnosisDate = parseISO(this.form.DiagnosisDate);
            const today = new Date();

            this.dateError = '';
            this.ageError = '';

            // Check if birth date and diagnosis date are valid dates
            if (!isValid(birthDate) || !isValid(diagnosisDate)) {
                this.dateError = 'Tanggal lahir dan tanggal diagnosis harus valid.';
                return false;
            }

            // Check if birth date is before diagnosis date
            if (!isBefore(birthDate, diagnosisDate)) {
                this.dateError = 'Tanggal lahir harus sebelum tanggal diagnosis.';
                return false;
            }

            // Check if dates are in the future
            if (!isBefore(birthDate, today) || !isBefore(diagnosisDate, today)) {
                this.dateError = 'Tanggal lahir dan tanggal diagnosis tidak boleh melebihi tanggal saat ini.';
                return false;
            }

            return true;
        },

        validateAddress() {
            const toast = useToast();
            if (this.form.Address.length < 10) {
                this.addressError = 'Alamat harus memiliki minimal 10 karakter.';
                toast.error(this.addressError);
                return false;
            } else {
                this.addressError = '';
                return true;
            }
        },
        validatePassword() {
            const password = this.form.Password;
            const confirmPassword = this.form.confirmpassword;

            // Check if passwords match
            if (password !== confirmPassword) {
                this.passwordError = 'Password dan konfirmasi password harus sama';
                return false;
            }

            // Check for at least one uppercase letter
            const hasUppercase = /[A-Z]/.test(password);
            if (!hasUppercase) {
                this.passwordError = 'Password harus mengandung minimal 1 huruf kapital';
                return false;
            }

            // Check for at least one number
            const hasNumber = /[0-9]/.test(password);
            if (!hasNumber) {
                this.passwordError = 'Password harus mengandung minimal 1 angka';
                return false;
            }

            // Check for at least one special character
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            if (!hasSpecialChar) {
                this.passwordError = 'Password harus mengandung minimal 1 simbol';
                return false;
            }

            // If all checks pass
            this.passwordError = '';
            return true;
        },
        createuser() {
            const toast = useToast();
            if (!this.isValidForm) {
                toast.error(this.dateError || this.ageError || this.addressError || this.passwordError || 'Invalid phone number');
                return;
            }
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
                    VueCookies.set('user_id', response.data.Data[0].ID);
                    if (response.data.Message === 'Register Success') {
                        this.$router.push('/optionotp');
                        toast.success('Registrasi sukses');
                    }
                })
                .catch(error => {
                    if (error.response.data.ErrorMessage === "Email Already Use") {
                        toast.error('Registrasi gagal karena email sudah digunakan, mohon gunakan email yang lain');
                    } else if (error.response.data.ErrorMessage === "Phone Number Already Use") {
                        toast.error('Registrasi gagal karena nomor telepon sudah digunakan, mohon gunakan nomor yang lain');
                    }
                });
        },
    },
    watch: {
        'form.PhoneNumber': 'validatePhoneNumber',
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
            <img class="w-[120px] mb-20" src="../assets/LogoElgekaHijau.png" alt="Logo">
            <h1 class="text-2xl font-bold font-[verdana] text-[32px] mb-4">Ayo buat akun terlebih dahulu</h1>
            <form @submit.prevent="createuser()">
                <!-- Nama Lengkap Input -->
                <div class="mb-4">
                    <label for="namalengkap" class="block font-[verdana] font-normal text-[14px] text-[#344054] mb-2">Nama
                        Lengkap</label>
                    <input type="text" id="namalengkap" name="namalengkap" required
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="Masukkan Nama Lengkap Kamu" v-model="form.Name">
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
                    <input type="text" id="phonenumber" name="phonenumber" required
                        class="w-full border border-lightgrayish rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="No telepon" v-model="form.PhoneNumber" @input="validatePhoneNumber">
                    <p v-if="phoneError" class="error text-red">{{ phoneError }}</p>
                </div>
                <!-- Tanggal Lahir Input -->
                <div class="mb-4">
                    <label for="tanggalLahir" class="block text-[#344054] mb-2">Tanggal Lahir</label>
                    <input type="date" id="tanggalLahir" name="tanggalLahir" required
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="yyyy-mm-dd" min="1945-01-01" :max="maxDate"
                        v-model="form.BirthDate">
                </div>
                <!-- Tanggal Diagnosis Input -->
                <div class="mb-4">
                    <label for="tanggalDiagnosis" class="block text-[#344054] mb-2">Tanggal Diagnosis</label>
                    <input type="date" id="tanggalDiagnosis" name="tanggalDiagnosis" required
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="yyyy-mm-dd" min="1945-01-01" :max="maxDate"
                        v-model="form.DiagnosisDate">
                </div>
                <!-- Alamat Input -->
                <div class="mb-4">
                    <label for="alamat" class="block text-[#344054] mb-2">Alamat</label>
                    <input type="text" id="alamat" name="alamat" required
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" placeholder="Masukkan Alamat" v-model="form.Address">
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
                        <option value="A-">A-</option>
                        <option value="A+">A+</option>
                        <option value="AB-">AB-</option>
                        <option value="AB+">AB+</option>
                        <option value="B-">B-</option>
                        <option value="B+">B+</option>
                        <option value="O-">O-</option>
                        <option value="O+">O+</option>
                    </select>
                </div>
                <!-- Password Input -->
                <div class="mb-4">
                    <label for="Kata Sandi" class="block text-[#344054] mb-2">Kata Sandi</label>
                    <div class="relative">
                        <input :type="showPassword ? 'text' : 'password'" id="password" name="Kata Sandi" required
                            v-model="form.Password"
                            class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autocomplete="off" placeholder="Masukkan Kata Sandi">

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
                <!-- Password Confirmation Input -->
                <div class="mb-4">
                    <label for="passwordConfirmation" class="block text-[#344054] mb-2">Konfirmasi Kata Sandi</label>
                    <div class="relative">
                        <input :type="showConfirmationPassword ? 'text' : 'password'" id="passwordConfirmation"
                            name="passwordConfirmation" required v-model="form.confirmpassword"
                            class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autocomplete="off" placeholder="Masukkan Konfirmasi Kata Sandi">

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

                <div class="flex items-center flex-col">
                    <button type="submit" :disabled="!isChecked"
                        class="bg-teal text-white font-semibold rounded-md py-2 px-4 w-full disabled:bg-grey disabled:cursor-no-drop">Register</button>
                    <a href="/login" class="mt-4 font-[verdana] font-normal text-[14px]">Sudah punya akun? bisa masuk <span
                            class="font-bold text-[#4D4D4F]">disini</span></a>
                </div>

                <div class="flex items-center justify-center gap-2 mt-4">
                    <input type="checkbox" class="h-5 w-5 text-blue-600" v-model="isChecked">
                    <a href="/ketentuanlayanan" class="font-[verdana] font-normal text-[14px]">Baca <span
                            class="font-bold text-[#4D4D4F]">Ketentuan Layanan</span></a>
                </div>

                
            </form>
        </div>
    </div>
</template>
