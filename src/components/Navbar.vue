<script>
import VueCookies from 'vue-cookies';
import axios from 'axios';

export default {
    async created() {
        this.isLoading = true;
        try {
            const url = 'https://elgeka-mobile-production.up.railway.app/api/user/profile';
            axios.defaults.withCredentials = true;
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            this.profiluser = response.data.Data[0];
            this.isLoading = false;
            console.log(this.profiluser);
        } catch (error) {
            console.error(error);
            this.isLoading = false;
        }
    },
    methods: {
        toggleHamburgerMenu() {
            this.isHamburgerMenuOpen = !this.isHamburgerMenuOpen;
            const menu = document.querySelector('#menu');
            menu.classList.toggle('hidden');
        },
        toggleUserMenu() {
            this.isUserMenuOpen = !this.isUserMenuOpen;
        },
        changeRoute(e) {
            this.$router.push(e.target.value);
        },
        async logout() {
            try {
                const url = 'https://elgeka-mobile-production.up.railway.app/api/user/logout';
                const token = VueCookies.get('token');
                const response = await axios.post(url, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });
                console.log(response);
                VueCookies.remove('token');
                VueCookies.remove('Message');
                VueCookies.remove('Name');
                this.$router.push('/');
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        },
    },
    data() {
        return {
            isLoading: true,
            StatusUser: '',
            profiluser: null,
            username: '',
            isOpen: false,
            isHamburgerMenuOpen: false,
            isUserMenuOpen: false
        }
    }
}
</script>

<template>
    <nav
        class="flex flex-row-reverse min-[965px]:flex-row flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-700 bg-teal fixed z-10">
        <div  v-if="profiluser" class="relative inline-block text-left min-[965px]:hidden" id="user">
            <div>
                <button @click="toggleUserMenu" class="flex items-center">
                    <p class="font-inter font-black text-white">{{ profiluser.Name }}</p>
                </button>
            </div>
            <div>
                <transition enter-active-class="transition ease-out duration-100" enter-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
                leave-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <div v-if="isUserMenuOpen"
                    class="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a href="/userprofil" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem">User Profile</a>
                        <router-link to="/">
                            <p @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem">Logout</p>
                        </router-link>

                    </div>
                </div>
            </transition>
            </div>
            
        </div>
        <div>
            <router-link to="/">
                <img class="md:hidden" src="../assets/LogoElgekaMobileSize.png" alt="logo">
                <img class="rounded-md hidden md:block w-[100px]" src="../assets/logoElgekaPutih1.png" alt="Logo">
            </router-link>
        </div>

        <div class="hidden min-[965px]:flex flex-1 items-center justify-center sm:items-stretch">
            <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">
                    <router-link to="/komunitaskegiatan">
                        <p
                            class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">
                            Komunitas</p>
                    </router-link>
                    <router-link to="/perkembangancml">
                        <p
                            class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">
                            Berita</p>
                    </router-link>
                    <router-link to="/infors">
                        <p
                            class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">
                            Info Rumah Sakit</p>
                    </router-link>
                    <router-link to="/blog">
                        <p
                            class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">
                            Blog</p>
                    </router-link>
                    <router-link to="/donasi">
                        <p
                            class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">
                            Donasi</p>
                    </router-link>
                </div>
            </div>
        </div>

        <div
            class="hidden absolute inset-y-0 right-0 min-[965px]:flex items-center pr-2 sm:static sm:inset-auto sm:pr-0 gap-y-1.5">
            <div v-if="!profiluser && !isLoading">
                <a href="/login">
                    <button type="button"
                        class="font-inter font-extrabold leading-5 text-white text-xl bg-teal mr-4 border border-white py-2 px-5 rounded-md">Login</button>
                </a>
                <a href="/register">
                    <button type="button"
                        class="font-inter font-extrabold leading-5 bg-white text-teal border border-teal text-xl py-2 px-5 rounded-md">Daftar</button>
                </a>
            </div>
            <div v-else-if="profiluser" class="flex flex-row-reverse items-center border-2 border-white gap-2 py-1 px-4">
                <router-link to="/userprofil">
                    <p class="font-inter font-black text-white">{{ profiluser.Name }}</p>
                </router-link>
            </div>
            <router-link v-if="profiluser" to="/">
                <p @click="logout"
                    class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">
                    Logout</p>
            </router-link>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" id="menu-button" @click="toggleHamburgerMenu"
            class="h-6 w-6 cursor-pointer min-[965px]:hidden block border border-white w-[50px] rounded-md h-[50px]"
            fill="none" viewBox="0 0 24 24" stroke="#FFFFFF">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>

        <!-- Muncul ketika ukuran tablet/mobile -->
        <div class="hidden w-full min-[965px]:hidden" id="menu">
            <ul class="pt-4 text-base text-gray-700 flex flex-col items-center md:pt-0 w-full list-none justify-center">
                <!-- Tambahkan justify-center untuk menjaga li tetap di tengah -->
                <li class="w-full border-b border-white"> <!-- Tambahkan w-full, border-b, border-white -->
                    <a href="/komunitaskegiatan"
                        class="md:p-4 py-2 flex justify-center text-white hover:bg-gray-700 hover:text-white rounded-md md:px-3 md:py-2 md:text-xl font-inter font-medium">Komunitas</a>
                </li>
                <li class="w-full border-b border-white"> <!-- Tambahkan w-full, border-b, border-white -->
                    <a href="/perkembangancml"
                        class="md:p-4 py-2 flex justify-center text-white hover:bg-gray-700 hover:text-white rounded-md md:px-3 md:py-2 md:text-xl font-inter font-medium">Berita</a>
                </li>
                <li class="w-full border-b border-white"> <!-- Tambahkan w-full, border-b, border-white -->
                    <a href="/infors"
                        class="md:p-4 py-2 flex justify-center text-white hover:bg-gray-700 hover:text-white rounded-md md:px-3 md:py-2 md:text-xl font-inter font-medium">Info Rumah Sakit</a>
                </li>
                <li class="w-full border-b border-white"> <!-- Tambahkan w-full, border-b, border-white -->
                    <a href="/blog"
                        class="md:p-4 py-2 flex justify-center text-white hover:bg-gray-700 hover:text-white rounded-md md:px-3 md:py-2 md:text-xl font-inter font-medium">Blog</a>
                </li>
                <li class="w-full border-b border-white"> <!-- Tambahkan w-full, border-b, border-white -->
                    <a href="/donasi"
                        class="md:p-4 py-2 flex justify-center text-white hover:bg-gray-700 hover:text-white rounded-md md:px-3 md:py-2 md:text-xl font-inter font-medium">Donasi</a>
                </li>
                <div v-if="!profiluser && !isLoading" class="w-full">
                    <li class="w-full border-b border-white"> <!-- Tambahkan w-full, border-b, border-white -->
                        <a href="/login"
                            class="md:p-4 py-2 flex justify-center text-white hover:bg-gray-700 hover:text-white rounded-md md:px-3 md:py-2 md:text-xl font-inter font-medium">Login</a>
                    </li>
                    <li class="w-full border-b border-white"> <!-- Tambahkan w-full, border-b, border-white -->
                        <a href="/register"
                            class="md:p-4 py-2 flex justify-center text-white hover:bg-gray-700 hover:text-white rounded-md md:px-3 md:py-2 md:text-xl font-inter font-medium">Daftar</a>
                    </li>
                </div>

            </ul>
        </div>
    </nav>
</template>


