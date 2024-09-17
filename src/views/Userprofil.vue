<script>
import Navbar from '../components/Navbar.vue';
import axios from 'axios';
import { format } from 'date-fns';
import idLocale from 'date-fns/locale/id';
import VueCookies from 'vue-cookies';
import { useToast } from 'vue-toastification';

export default {
    async created() {
        const toast = useToast()
        try {
            const url = 'https://elgeka-mobile-production.up.railway.app/api/user/profile';
            axios.defaults.withCredentials = true;
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.Message === "Success Get Profile") {
                toast.success('Data profil user berhasil dimuat')
            }
            this.profiluser = response.data.Data[0];
            await this.fetchRegionData();
            this.fetchProvinces();
        } catch (error) {
            toast.error('Data profil user gagal dimuat, mohon coba lagi')
            console.log(error);
        }
    },
    components: {
        Navbar,
    },
    data() {
        return {
            profiluser: [],
            provinces: [],
            districts: [],
            subDistricts: [],
            villages: [],
            provinceName: '',
            districtName: '',
            subDistrictName: '',
            villageName: '',
        };
    },
    methods: {
        async fetchRegionData() {
            try {
                const provinceResponse = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/location/provinces');
                const provinces = Object.entries(provinceResponse.data).map(([id, name]) => ({ id, name }));
                this.provinces = provinces;

                const province = provinces.find(p => p.id === this.profiluser.Province);
                this.provinceName = province ? province.name : 'Unknown';

                const districtResponse = await axios.get(`https://elgeka-web-api-production.up.railway.app/api/v1/location/regencies/${this.profiluser.Province}`);
                const districts = Object.entries(districtResponse.data).map(([id, name]) => ({ id, name }));
                this.districts = districts;

                const district = districts.find(d => d.id === this.profiluser.District);
                this.districtName = district ? district.name : 'Unknown';

                const subDistrictResponse = await axios.get(`https://elgeka-web-api-production.up.railway.app/api/v1/location/districts/${this.profiluser.District}`);
                const subDistricts = Object.entries(subDistrictResponse.data).map(([id, name]) => ({ id, name }));
                this.subDistricts = subDistricts;

                const subDistrict = subDistricts.find(sd => sd.id === this.profiluser.SubDistrict);
                this.subDistrictName = subDistrict ? subDistrict.name : 'Unknown';

                const villageResponse = await axios.get(`https://elgeka-web-api-production.up.railway.app/api/v1/location/villages/${this.profiluser.SubDistrict}`);
                const villages = Object.entries(villageResponse.data).map(([id, name]) => ({ id, name }));
                this.villages = villages;

                const village = villages.find(v => v.id === this.profiluser.Village);
                this.villageName = village ? village.name : 'Unknown';
            } catch (error) {
                console.log(error);
            }
        },
        async editprofiluser() {
            axios.defaults.withCredentials = true;
            const url = 'https://elgeka-mobile-production.up.railway.app/api/user/profile/edit';
            const token = VueCookies.get('token');
            const formData = new FormData();
            const toast = useToast();
            formData.append('Name', this.profiluser.Name);
            formData.append('Address', this.profiluser.Address);
            formData.append('Province', this.profiluser.Province);
            formData.append('District', this.profiluser.District);
            formData.append('SubDistrict', this.profiluser.SubDistrict);
            formData.append('Village', this.profiluser.Village);
            formData.append('PhoneNumber', this.profiluser.PhoneNumber);
            formData.append('Gender', this.profiluser.Gender);
            formData.append('BirthDate', this.profiluser.BirthDate);
            formData.append('DiagnosisDate', this.profiluser.DiagnosisDate);
            formData.append('BloodGroup', this.profiluser.BloodGroup);
            formData.append('Email', this.profiluser.Email);
            try {
                const response = await axios.put(url, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.Message === "Success Update User") {
                    toast.success('Data profil user berhasil diubah')
                }
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        },
        formatDate(dateString) {
            if (dateString) {
                // Ubah format tanggal
                return format(new Date(dateString), 'dd MMMM yyyy', { locale: idLocale });
            } else {
                return 'Tanggal lahir tidak tersedia';
            }
        },
        async fetchProvinces() {
            try {
                const response = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/location/provinces');
                const provinces = Object.entries(response.data).map(([id, name]) => ({ id, name }));
                this.provinces = provinces;
            } catch (error) {
                console.error('Error fetching provinces:', error);
                const toast = useToast();
                toast.error('Error fetching province, please refresh the page');
            }
        },
        async fetchRegencies(RegenciesId) {
            axios.get(`https://elgeka-web-api-production.up.railway.app/api/v1/location/regencies/${RegenciesId}`)
                .then(response => {
                    const districts = Object.entries(response.data).map(([id, name]) => ({ id, name }));
                    this.districts = districts;
                })
                .catch(error => {
                    console.error('Error fetching districts:', error);
                    const toast = useToast();
                    toast.error('Error fetching Districts, please refresh the page');
                });
        },
        async fetchDistricts(DistrictsId) {
            axios.get(`https://elgeka-web-api-production.up.railway.app/api/v1/location/districts/${DistrictsId}`)
                .then(response => {
                    const subDistricts = Object.entries(response.data).map(([id, name]) => ({ id, name }));
                    this.subDistricts = subDistricts;
                })
                .catch(error => {
                    console.error('Error fetching subDistricts:', error);
                    const toast = useToast();
                    toast.error('Error fetching Sub Districts, please refresh the page');
                });
        },
        async fetchVillages(VillagesId) {
            axios.get(`https://elgeka-web-api-production.up.railway.app/api/v1/location/villages/${VillagesId}`)
                .then(response => {
                    const villages = Object.entries(response.data).map(([id, name]) => ({ id, name }));
                    this.villages = villages;
                })
                .catch(error => {
                    console.error('Error fetching villages:', error);
                    const toast = useToast();
                    toast.error('Error fetching Villages, please refresh the page');
                });
        },
    },
    watch: {
        'profiluser.Province'(newProvince) { // Ketika profiluser.Province berubah, fungsi ini dipanggil dengan parameter newProvince yang merupakan nilai baru dari Province.
            if (newProvince) { // Jika newProvince ada (tidak null atau undefined), maka fungsi this.fetchRegencies(newProvince) dipanggil untuk mengambil data kabupaten/kota berdasarkan ID provinsi yang baru.
                this.fetchRegencies(newProvince); // Mengambil data kabupaten/kota berdasarkan ID provinsi.
            }
        },
        'profiluser.District'(newDistrict) {
            if (newDistrict) {
                this.fetchDistricts(newDistrict); // Mengambil data kecamatan berdasarkan ID kabupaten/kota.
            }
        },
        'profiluser.SubDistrict'(newSubDistrict) {
            if (newSubDistrict) {
                this.fetchVillages(newSubDistrict); // Mengambil data desa berdasarkan ID kecamatan.
            }
        },
    },
};
</script>




<template>
    <Navbar />

    <div class="pt-20 max-w-[1440px] m-auto pb-4">
        <p class="pt-[4rem] ml-4 font-poppins font-semibold text-teal max-[800px]:hidden text-[32px]">Informasi Tentang anda
        </p>
        <div class="flex gap-16 max-[800px]:justify-center">
            <div v-if="profiluser" class="border border-teal mt-4 ml-4 px-8 max-[800px]:hidden">
                <div class="flex my-8 gap-8 items-center">
                    <div class="flex flex-col">
                        <p class="font-poppins font-bold text-2xl text-teal">{{ profiluser.Name }}</p>
                        <p class="font-poppins font-medium text-xl text-lightteal">{{ profiluser.Email }}</p>
                    </div>
                </div>

                <div class="grid max-[1200px]:grid-cols-1 grid-cols-2 gap-8 mb-8">
                    <div class="w-96 pb-8 border border-teal flex flex-col">
                        <p class="pl-8 py-8 font-poppins font-bold text-2xl text-teal text-left">Nama</p>
                        <p class="pl-8 text-lightteal font-poppins font-medium">{{ profiluser.Name }}</p>
                    </div>

                    <div class="w-96 pb-8 border border-teal flex flex-col">
                        <p class="pl-8 py-8 font-poppins font-bold text-2xl text-teal text-left">Email</p>
                        <p class="pl-8 text-lightteal font-poppins font-medium">{{ profiluser.Email }}</p>
                    </div>

                    <div class="w-96 pb-8 border border-teal flex flex-col">
                        <p class="pl-8 py-8 font-poppins font-bold text-2xl text-teal text-left">Nomor HP</p>
                        <p class="pl-8 text-lightteal font-poppins font-medium">{{ profiluser.PhoneNumber }}</p>
                    </div>

                    <div class="w-96 pb-8 border border-teal flex flex-col">
                        <p class="pl-8 py-8 font-poppins font-bold text-2xl text-teal text-left">Gender</p>
                        <p v-if="profiluser.Gender === 'male'" class="pl-8 text-lightteal font-poppins font-medium">
                            Laki-Laki</p>
                        <p v-else-if="profiluser.Gender === 'female'" class="pl-8 text-lightteal font-poppins font-medium">
                            Perempuan</p>
                    </div>

                    <div class="w-96 pb-8 border border-teal flex flex-col">
                        <p class="pl-8 py-8 font-poppins font-bold text-2xl text-teal text-left">Golongan Darah</p>
                        <p class="pl-8 text-lightteal font-poppins font-medium">{{ profiluser.BloodGroup }}</p>
                    </div>

                    <div class="w-96 pb-8 border border-teal flex flex-col">
                        <p class="pl-8 py-8 font-poppins font-bold text-2xl text-teal text-left">Tanggal Lahir</p>
                        <p class="pl-8 text-lightteal font-poppins font-medium">{{ formatDate(profiluser.BirthDate) }}</p>
                    </div>
                </div>

                <div class="w-[97%] pb-8 border border-teal flex flex-col mb-4">
                    <p class="pl-8 py-8 font-poppins font-bold text-2xl text-teal text-left">Alamat</p>
                    <p class="px-8 text-lightteal font-poppins font-medium">{{ profiluser.Address }} Provinsi {{
                        provinceName }} {{ districtName }} Kecamatan {{ subDistrictName }} Desa {{ villageName }}
                    </p>
                </div>
            </div>

            <div class="mr-4 max-[800px]:mt-12">
                <div>
                    <p class="text-center text-black text-2xl font-poppins font-bold">Data Profile</p>
                </div>
                <div v-if="profiluser">
                    <form @submit.prevent="editprofiluser()" class="flex flex-col items-center gap-4">
                        <div class="w-full flex flex-col">
                            <p class="font-poppins font-bold text-[16px] text-teal text-center">Nama</p>
                            <input type="text" name="" id="" v-model="profiluser.Name"
                                class="border border-black py-1 px-2">
                        </div>

                        <div class="w-full flex flex-col">
                            <p class="font-poppins font-bold text-[16px] text-teal text-center">Email</p>
                            <input type="text" name="" id="" v-model="profiluser.Email" disabled
                                class="border border-black py-1 px-2 cursor-not-allowed opacity-50">
                        </div>

                        <div class="w-full flex flex-col">
                            <p class="font-poppins font-bold text-[16px] text-teal text-center">Nomor Telepon</p>
                            <input type="text" name="" id="" v-model="profiluser.PhoneNumber" disabled
                                class="border border-black py-1 px-2 cursor-not-allowed opacity-50">
                        </div>

                        <div class="w-full flex flex-col">
                            <p class="font-poppins font-bold text-[16px] text-teal text-center">Gender</p>
                            <!-- <input type="text" name="" id="" v-model="profiluser.Gender"
                                class=" py-1 px-2 border border-black"> -->
                            <select id="jeniskelamin" name="jeniskelamin" required v-model="profiluser.Gender"
                                class="w-full bg-white border border-gray-300 py-2 px-3 focus:outline-none focus:border-blue-500">
                                <option value="male">Laki-Laki</option>
                                <option value="female">Perempuan</option>
                            </select>
                        </div>

                        <div class="w-full flex flex-col">
                            <p class="font-poppins font-bold text-[16px] text-teal text-center">Tanggal Lahir</p>
                            <!-- <input type="text" name="" id="" v-model="profiluser.BirthDate"
                                class=" py-1 px-2 border border-black"> -->
                            <input type="date" id="tanggalLahir" name="tanggalLahir" required
                                class="w-full border border-gray-300 py-2 px-3 focus:outline-none focus:border-blue-500"
                                autocomplete="off" placeholder="yyyy-mm-dd" min="1997-01-01" max="2030-12-31"
                                v-model="profiluser.BirthDate">
                        </div>

                        <!-- <div class="w-full flex flex-col">
                            <p class="font-poppins font-bold text-[16px] text-teal text-center">Golongan Darah</p>
                            <input type="text" name="" id="" v-model="profiluser.BloodGroup"
                                class=" py-1 px-2 border border-black">
                        </div> -->

                        <div class="w-full flex flex-col">
                            <p class="font-poppins font-bold text-[16px] text-teal text-center">Golongan Darah</p>
                            <select id="golonganDarah" name="golonganDarah" required v-model="profiluser.BloodGroup"
                                class="w-full bg-white border border-gray-300 py-2 px-3 focus:outline-none focus:border-blue-500">
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

                        <div class="w-full flex flex-col">
                            <p class="font-poppins font-bold text-[16px] text-teal text-center">Alamat</p>
                            <input type="text" name="" id="" v-model="profiluser.Address"
                                class=" py-1 px-2 border border-black">
                        </div>

                        <div class="w-full flex flex-col">
                            <p class="font-poppins font-bold text-[16px] text-teal text-center">Provinsi</p>
                            <select v-model="profiluser.Province" @change="fetchRegencies(profiluser.Province)"
                                class="py-1 px-2 border border-black bg-white">
                                <option v-for="province in provinces" :key="province.id" :value="province.id">{{
                                    province.name }}</option>
                            </select>
                        </div>

                        <div class="w-full flex flex-col">
                            <p class="font-poppins font-bold text-[16px] text-teal text-center">Kabupaten/Kota</p>
                            <select v-model="profiluser.District" @change="fetchDistricts(profiluser.District)"
                                class="py-1 px-2 border border-black bg-white">
                                <option v-for="district in districts" :key="district.id" :value="district.id">{{
                                    district.name }}</option>
                            </select>
                        </div>

                        <div class="w-full flex flex-col">
                            <p class="font-poppins font-bold text-[16px] text-teal text-center">Kecamatan</p>
                            <select v-model="profiluser.SubDistrict" @change="fetchVillages(profiluser.SubDistrict)"
                                class="py-1 px-2 border border-black bg-white">
                                <option v-for="subDistrict in subDistricts" :key="subDistrict.id" :value="subDistrict.id">{{
                                    subDistrict.name }}</option>
                            </select>
                        </div>

                        <div class="w-full flex flex-col">
                            <p class="font-poppins font-bold text-[16px] text-teal text-center">Desa</p>
                            <select v-model="profiluser.Village" class="py-1 px-2 border border-black bg-white">
                                <option v-for="village in villages" :key="village.id" :value="village.id">{{ village.name }}
                                </option>
                            </select>
                        </div>

                        <button type="submit" class="bg-teal text-white mt-4 py-1 px-6">Ganti</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>