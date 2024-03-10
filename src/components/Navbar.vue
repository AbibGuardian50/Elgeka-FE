<script>
export default {
    methods: {
        changeRoute(e) {
            this.$router.push(e.target.value);
        },
    },
}
</script>

<template>
    <nav class="bg-orange w-full fixed z-10">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div>
                    <router-link to="/">
                        <p href="#" class="bg-white text-black rounded-md px-3 py-2 text-sm font-medium"
                            aria-current="page">ELGEKA
                            JABAR</p>
                    </router-link>
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch">
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                            <select v-on:change="changeRoute($event)"
                                class="bg-orange text-white rounded-md px-3 py-2 text-sm font-medium font-inter" name="" id="">
                                <option value="/"><router-view to="/" class="" aria-current="page">Komunitas</router-view>
                                </option>
                                <option value="/komunitaskegiatan"><router-view to="/kegiatan">Kegiatan</router-view>
                                </option>

                            </select>

                            <!-- <select v-on:change="changeRoute($event)"
                                class="bg-orange text-white rounded-md px-3 py-2 text-sm font-medium" name="" id="">
                                <option selected>Berita</option>
                            </select> -->

                            <router-link to="/perkembangancml">
                                <p
                                    class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-inter font-medium">
                                    Berita</p>
                            </router-link>

                            <a
                                class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-inter font-medium">Info
                                RS</a>
                            <!--Ada bug dimana info RS mengarah ke /perkembangancml padahal tidak ada router-link atau href tpi dah solved hehe -->
                            <router-link to="/cerita">
                                <p
                                    class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-inter font-medium">
                                    Cerita</p>
                            </router-link>
                            <router-link to="/donasi">
                                <p
                                    class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-inter font-medium">
                                    Donasi</p>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div
                    class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-y-1.5">
                    <router-link to="/login"><button type="button"
                            class="font-inter font-extrabold leading-5 text-white bg-orange mr-4 border border-white py-1 px-4 rounded-md">Login</button></router-link>
                    <router-link to="/register"><button type="button"
                            class="font-inter font-extrabold leading-5 bg-white py-1 px-4 rounded-md">Daftar</button></router-link>

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
</nav></template>