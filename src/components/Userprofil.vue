<script>
import Navbar from './Navbar.vue'
import VueCookies from 'vue-cookies';
import Cookies from 'js-cookie';
import axios from 'axios'
import { format } from 'date-fns';
import idLocale from 'date-fns/locale/id';


export default {
    async created() {
        try {
            const url = 'https://elgeka-mobile-production.up.railway.app/api/user/profile'
            // const tokenlogin = VueCookies.get('Authentication')
            axios.defaults.withCredentials = true;
            const response = axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                this.profiluser = response.data.Data[0]
                console.log(this.profiluser)
            });

        } catch (error) {
            console.log(error)
        }
    },
    components: {
        Navbar,
    },
    data() {
        return {
            profiluser: [],
        }
    },
    methods: {
        formatDate(dateString) {
        if (dateString) {
            // Ubah format tanggal
            return format(new Date(dateString), 'dd MMMM yyyy', { locale: idLocale });
        } else {
            return "Tanggal lahir tidak tersedia";
        }
    }
    }
}
</script>

<template>
    <Navbar />

    <div class="pt-20 max-w-[1440px] m-auto">
        <p class="pt-[4rem] ml-4 font-poppins font-semibold text-orange text-[32px]">Informasi Tentang anda</p>
        <div class="flex gap-16">
            <div v-if="profiluser" class="border border-orange mt-4 ml-4 px-8">
                <div class="flex my-8 gap-8 items-center">
                    <img src="../assets/pp.png" alt="">
                    <div class="flex flex-col">
                        <p class="font-poppins font-bold text-2xl text-orange">{{ profiluser.Name }}</p>
                        <p class="font-poppins font-medium text-xl text-lightorange">{{ profiluser.Email }}</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-8 mb-8">
                    <div class="w-96 pb-8 border border-orange flex flex-col">
                        <p class="pl-8 py-8 font-poppins font-bold text-2xl text-orange text-left">Nama</p>
                        <p class="pl-8 text-lightorange font-poppins font-medium">{{ profiluser.Name }}</p>
                    </div>

                    <div class="w-96 pb-8 border border-orange flex flex-col">
                        <p class="pl-8 py-8 font-poppins font-bold text-2xl text-orange text-left">Email</p>
                        <p class="pl-8 text-lightorange font-poppins font-medium">{{ profiluser.Email }}</p>
                    </div>

                    <div class="w-96 pb-8 border border-orange flex flex-col">
                        <p class="pl-8 py-8 font-poppins font-bold text-2xl text-orange text-left">Nomor HP</p>
                        <p class="pl-8 text-lightorange font-poppins font-medium">{{ profiluser.PhoneNumber }}</p>
                    </div>

                    <div class="w-96 pb-8 border border-orange flex flex-col">
                        <p class="pl-8 py-8 font-poppins font-bold text-2xl text-orange text-left">Gender</p>
                        <p class="pl-8 text-lightorange font-poppins font-medium">{{ profiluser.Gender }}</p>
                    </div>

                    <div class="w-96 pb-8 border border-orange flex flex-col">
                        <p class="pl-8 py-8 font-poppins font-bold text-2xl text-orange text-left">Golongan Darah</p>
                        <p class="pl-8 text-lightorange font-poppins font-medium">{{ profiluser.BloodGroup }}</p>
                    </div>

                    <div class="w-96 pb-8 border border-orange flex flex-col">
                        <p class="pl-8 py-8 font-poppins font-bold text-2xl text-orange text-left">Tanggal Lahir</p>
                        <p class="pl-8 text-lightorange font-poppins font-medium">{{ formatDate(profiluser.BirthDate) }}</p>
                    </div>
                </div>

                <div class="w-[97%] pb-8 border border-orange flex flex-col mb-4">
                        <p class="pl-8 py-8 font-poppins font-bold text-2xl text-orange text-left">Alamat</p>
                        <p class="px-8 text-lightorange font-poppins font-medium">{{ profiluser.Address }} Provinsi {{ profiluser.Province }} Kabupaten {{ profiluser.District }} Kecamatan {{ profiluser.SubDistrict }} Desa {{ profiluser.Village }}</p>
                    </div>



            </div>

            <div>
                <div>
                    <p class="text-center text-black text-2xl font-poppins font-medium">Foto Profile</p>
                    <img src="../assets/rectanglepp.png" alt="foto profil">

                    <div class="flex justify-around items-center mt-2 mb-4">
                        <button
                            class="bg-orange py-1 px-6 text-white font-medium font-poppins rounded-[4px] border border-black">Ganti</button>
                        <button
                            class="bg-white py-1 px-6 font-medium font-poppins rounded-md rounded-[4px] border border-black">Hapus</button>
                    </div>
                </div>


                <div v-if="profiluser" class="flex flex-col items-center gap-4">
                    <div class="w-full flex flex-col">
                        <p class="font-poppins font-bold text-[16px] text-orange text-center">Nama</p>
                        <input type="text" name="" id="" v-model= profiluser.Name
                            class="border border-black py-1 px-2">
                    </div>

                    <div class="w-full flex flex-col">
                        <p class="font-poppins font-bold text-[16px] text-orange text-center">Email</p>
                        <input type="text" name="" id="" v-model= profiluser.Email class=" py-1 px-2 border border-black">
                    </div>

                    <div class="w-full flex flex-col">
                        <p class="font-poppins font-bold text-[16px] text-orange text-center">Nomor HP</p>
                        <input type="text" name="" id="" v-model= profiluser.PhoneNumber class="py-1 px-2 border border-black">
                    </div>

                    <div class="w-full flex flex-col">
                        <p class="font-poppins font-bold text-[16px] text-orange text-center">Gender</p>
                        <input type="text" name="" id="" v-model= profiluser.Gender class=" py-1 px-2 border border-black">
                    </div>

                    <div class="w-full flex flex-col">
                        <p class="font-poppins font-bold text-[16px] text-orange text-center">Tanggal Lahir</p>
                        <input type="text" name="" id="" v-model= profiluser.BirthDate class=" py-1 px-2 border border-black">
                    </div>

                    <div class="w-full flex flex-col">
                        <p class="font-poppins font-bold text-[16px] text-orange text-center">Golongan Darah</p>
                        <input type="text" name="" id="" v-model= profiluser.BloodGroup class=" py-1 px-2 border border-black">
                    </div>

                    <div class="w-full flex flex-col">
                        <p class="font-poppins font-bold text-[16px] text-orange text-center">Alamat</p>
                        <input type="text" name="" id="" v-model= profiluser.PhoneNumber class=" py-1 px-2 border border-black">
                    </div>

                    <div class="w-full flex flex-col">
                        <p class="font-poppins font-bold text-[16px] text-orange text-center">Provinsi</p>
                        <input type="text" name="" id="" v-model= profiluser.Province class=" py-1 px-2 border border-black">
                    </div>

                    <div class="w-full flex flex-col">
                        <p class="font-poppins font-bold text-[16px] text-orange text-center">Kabupaten/Kota</p>
                        <input type="text" name="" id="" v-model= profiluser.District class=" py-1 px-2 border border-black">
                    </div>

                    <div class="w-full flex flex-col">
                        <p class="font-poppins font-bold text-[16px] text-orange text-center">Kecamatan</p>
                        <input type="text" name="" id="" v-model= profiluser.SubDistrict class=" py-1 px-2 border border-black">
                    </div>

                    <div class="w-full flex flex-col">
                        <p class="font-poppins font-bold text-[16px] text-orange text-center">Desa</p>
                        <input type="text" name="" id="" v-model= profiluser.Village class=" py-1 px-2 border border-black">
                    </div>

                    <button class="bg-orange mt-4 py-1 px-6">Ganti</button>
                </div>

            </div>
        </div>
    </div>
</template>