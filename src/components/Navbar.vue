<script>
import VueCookies from 'vue-cookies';
import axios from 'axios';

export default {
    async created() {
        try {
            const url = 'https://elgeka-mobile-production.up.railway.app/api/user/profile'
            // const tokenlogin = VueCookies.get('Authentication')
            axios.defaults.withCredentials = true;
            // console.log(this.username)
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
    methods: {
        changeRoute(e) {
            this.$router.push(e.target.value);
        },
        logout() {
        // Hapus token dari localStorage atau dari state aplikasi
        window.location.reload();
        VueCookies.remove('Message'); // Contoh jika token disimpan di localStorage atau cookies
        VueCookies.remove('Name');
        VueCookies.remove('token');
        // Lakukan langkah lain yang diperlukan saat logout
    },
    },
    data() {
        return {
            StatusUser: '',
            profiluser: '',
            username: '',
        }
    },
}
</script>

<template>
    <nav class="bg-orange backdrop-blur-xl w-full fixed z-10">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-32 items-center justify-between">
                <div>
                    <router-link to="/">
                        <img class="bg-white rounded-md" src="../assets/Logo_elgeka.png" alt="">
                    </router-link>
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch">
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                            <router-link to="/komunitaskegiatan">
                                <p
                                    class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">
                                    Komunitas</p>
                            </router-link>

                            <!-- <select v-on:change="changeRoute($event)"
                                class="bg-orange text-white rounded-md px-3 py-2 text-xl font-medium" name="" id="">
                                <option selected>Berita</option>
                            </select> -->

                            <router-link to="/perkembangancml">
                                <p
                                    class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">
                                    Berita</p>
                            </router-link>

                            <a
                                class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">Info
                                RS</a>
                            <!--Ada bug dimana info RS mengarah ke /perkembangancml padahal tidak ada router-link atau href tpi dah solved hehe -->
                            <router-link to="/cerita">
                                <p
                                    class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">
                                    Cerita</p>
                            </router-link>
                            <router-link to="/donasi">
                                <p
                                    class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">
                                    Donasi</p>
                            </router-link>

                            <router-link v-if="profiluser" to="/">
                                <p @click="logout"
                                    class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">Logout</p>
                            </router-link>

                            <!-- <router-link to="/userprofil">
                                <p
                                    class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">
                                    userprofil</p>
                            </router-link> -->
                        </div>
                    </div>
                </div>
                <div
                    class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-y-1.5">

                    <div v-if="!profiluser"
                        >
                        <router-link to="/login"><button type="button"
                                class="font-inter font-extrabold leading-5 text-white text-xl bg-orange mr-4 border border-white py-2 px-5 rounded-md">Login</button></router-link>
                        <router-link to="/register"><button type="button"
                                class="font-inter font-extrabold leading-5 bg-white text-orange border border-orange text-xl py-2 px-5 rounded-md">Daftar</button></router-link>
                    </div>
                    <div v-else class="flex flex-row-reverse items-center border-2 border-white gap-2 py-1 px-4">
                        <img class="w-[39px] h-[39px]" src="../assets/pp.png" alt="">
                        <router-link to="/userprofil">
                            <p class="font-inter font-black text-white">{{ profiluser.Name }}</p>
                        </router-link>
                    </div>
                    <!-- Profile dropdown -->
                    <div class="relative ml-3">

                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile menu, show/hide based on menu state. -->
        <!--<div class="sm:hidden" id="mobile-menu">
    <div class="space-y-1 px-2 pb-3 pt-2">
       Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" 
      <a href="#" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
      <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
      <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
      <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
    </div
  </div>>-->
    </nav>
</template>