<template>
    <nav class="bg-red">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div>
                    <a href="#" class="bg-white text-white rounded-md px-3 py-2 text-sm font-medium"
                        aria-current="page">ELGEKA
                        JABAR</a>
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch">
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                            <router-link to="/" class="text-white rounded-md px-3 py-2 text-sm font-medium"
                                aria-current="page">Komunitas</router-link>
                            <router-link to="/perkembangan"
                                class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Berita</router-link>
                            <a href="#"
                                class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Info
                                RS</a>
                            <a href="#"
                                class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Cerita</a>
                            <a href="#"
                                class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Galeri</a>
                            <a href="#"
                                class="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Donasi</a>
                        </div>
                    </div>
                </div>
                <div
                    class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-y-1.5">
                    <button type="button"
                        class="font-inter font-extrabold leading-5 text-white bg-red mr-4 border border-white py-1 px-4 rounded-md">Login</button>
                    <button type="button"
                        class="font-inter font-extrabold leading-5 bg-white py-1 px-4 rounded-md">Daftar</button>

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

    <div class="flex flex-col p-8 min-[1600px]:max-w-[1440px]">
        <img class="max-h-[404px]" src="../assets/Rectangle4208.png" alt="">
        <div class="bg-red">
            <div class="pt-8 pl-20 pr-4 pb-12">
                <p class="text-5xl text-white font-poppins font-semibold leading-[3.875rem]">BERITA</p>
                <p class="text-5xl text-white font-poppins font-semibold leading-[3.875rem]">Perkembangan ELGEKA Jawa Barat
                </p>
                <p class="text-base text-white font-poppins font-normal leading-6 pr-48">Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi
                    eget.
                    Eget quis et tortor cras sed.
                    Nec vulputate neque non mi. Lorem ipsum dolor sit amet consectetur. Commodo adipiscing massa et sem.
                    Neque
                    elementum non facilisi eget.
                    Eget quis et tortor cras sed. Nec vulputate neque non mi. Lorem ipsum dolor sit amet consectetur.
                    Commodo
                    adipiscing massa et sem.
                    Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec vulputate neque non mi. Lorem ipsum
                    dolor sit amet consectetur.
                    Commodo adipiscing massa et sem. Neque elementum non facilisi eget. Eget quis et tortor cras sed. Nec
                    vulputate neque non mi.</p>
            </div>

    </div>
</div></template>