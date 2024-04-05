<script>
import Navbar from './Navbar.vue'
import VueCookies from 'vue-cookies';
import Cookies from 'js-cookie';
import axios from 'axios'

export default {
    async created() {
        try {
            const url = 'https://elgeka-mobile-production.up.railway.app/api/user/profile'
            const tokenlogin = await VueCookies.get(response.headers['set-cookie'])
            const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${tokenlogin}`
                    },
                })
                this.profiluser = response.data
                console.log(this.profiluser)
        } catch (error) {
            console.log(error)
        }
    },
    components: {
        Navbar,
    },
    data() {
        return {
            profiluser: '',
        }
    },
}
</script>

<template>
    <Navbar />

    <div class="pt-20">
        <p class="pt-[4rem] ml-4 font-poppins font-semibold text-orange text-[32px]">Informasi Tentang anda</p>
        <div class="flex gap-16">
            <div v-if="profiluser" class="border border-orange mt-4 ml-4 px-8">
                <div class="flex my-8 gap-8 items-center">
                    <img src="../assets/pp.png" alt="">
                    <div class="flex flex-col">
                        <p class="font-poppins font-bold text-2xl text-orange">{{ profiluser.Message }}</p>
                        <p class="font-poppins font-medium text-xl text-lightorange">user2321412@gmail.com</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-8">
                    <div class="w-96 pb-8 border border-orange flex flex-col">
                        <p class="pl-8 py-8 font-poppins font-bold text-2xl text-orange text-left">Tentang Saya</p>
                        <p class="pl-8 text-lightorange font-poppins font-medium">Seorang pasien yang sedang berjuang</p>
                    </div>

                    <div class="w-96 pb-8 border border-orange flex flex-col">
                        <p class="pl-8 py-8 font-poppins font-bold text-2xl text-orange text-left">Instagram</p>
                        <p class="pl-8 text-lightorange font-poppins font-medium">@user2321412</p>
                    </div>

                    <div class="w-96 pb-8 border border-orange flex flex-col">
                        <p class="pl-8 py-8 font-poppins font-bold text-2xl text-orange text-left">Twitter</p>
                        <p class="pl-8 text-lightorange font-poppins font-medium">@user2321412</p>
                    </div>

                    <div class="w-96 pb-8 border border-orange flex flex-col">
                        <p class="pl-8 py-8 font-poppins font-bold text-2xl text-orange text-left">Facebook</p>
                        <p class="pl-8 text-lightorange font-poppins font-medium">@user2321412</p>
                    </div>
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


                <div class="flex flex-col items-center gap-4">
                    <div class="w-full flex flex-col">
                        <p class="font-poppins font-bold text-[16px] text-orange text-center">Tentang saya</p>
                        <input type="text" name="" id="" placeholder=" Seorang pasien yang sedang berjuang"
                            class="border border-black py-1 px-2">
                    </div>

                    <div class="w-full flex flex-col">
                        <p class="font-poppins font-bold text-[16px] text-orange text-center">Akun Instagram</p>
                        <input type="text" name="" id="" placeholder=" @user2321412" class=" py-1 px-2 border border-black">
                    </div>

                    <div class="w-full flex flex-col">
                        <p class="font-poppins font-bold text-[16px] text-orange text-center">Akun Twitter</p>
                        <input type="text" name="" id="" placeholder=" @user2321412" class="py-1 px-2 border border-black">
                    </div>

                    <div class="w-full flex flex-col">
                        <p class="font-poppins font-bold text-[16px] text-orange text-center">Akun Facebook</p>
                        <input type="text" name="" id="" placeholder=" user2321412" class=" py-1 px-2 border border-black">
                    </div>

                    <button class="bg-orange mt-4 py-1 px-6">Ganti</button>
                </div>

            </div>
        </div>
</div></template>