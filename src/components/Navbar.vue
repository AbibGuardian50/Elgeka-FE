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
        }
    },
}
</script>

<template>
    <nav class="bg-teal backdrop-blur-xl w-full fixed z-10">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-32 items-center justify-between">
                <div>
                    <router-link to="/">
                        <img class="rounded-md" src="../assets/logoElgekaPutih1.png" alt="Logo">
                    </router-link>
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch">
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <router-link to="/komunitaskegiatan">
                                <p class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">
                                    Komunitas
                                </p>
                            </router-link>
                            <router-link to="/perkembangancml">
                                <p class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">
                                    Berita
                                </p>
                            </router-link>
                            <router-link to="/infors">
                                <p class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">
                                    Info RS
                                </p>
                            </router-link>
                            <router-link to="/cerita">
                                <p class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">
                                    Cerita
                                </p>
                            </router-link>
                            <router-link to="/donasi">
                                <p class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">
                                    Donasi
                                </p>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-y-1.5">
                    <div v-if="!profiluser && !isLoading">
                        <router-link to="/login">
                            <button type="button" class="font-inter font-extrabold leading-5 text-white text-xl bg-teal mr-4 border border-white py-2 px-5 rounded-md">Login</button>
                        </router-link>
                        <router-link to="/register">
                            <button type="button" class="font-inter font-extrabold leading-5 bg-white text-teal border border-teal text-xl py-2 px-5 rounded-md">Daftar</button>
                        </router-link>
                    </div>
                    <div v-else-if="profiluser" class="flex flex-row-reverse items-center border-2 border-white gap-2 py-1 px-4">
                        <img class="w-[39px] h-[39px]" src="../assets/pp.png" alt="Profile Picture">
                        <router-link to="/userprofil">
                            <p class="font-inter font-black text-white">{{ profiluser.Name }}</p>
                        </router-link>
                    </div>
                    <router-link v-if="profiluser" to="/">
                                <p @click="logout" class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-inter font-medium">
                                    Logout
                                </p>
                            </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
/* Tambahkan gaya custom Anda di sini */
</style>
