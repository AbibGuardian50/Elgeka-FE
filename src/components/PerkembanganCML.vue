<script>
import axios from 'axios';
import Navbar from './Navbar.vue'

export default {
    components: {
        Navbar
    },
    data() {
        return {
            pilih_kategori: null,
            received_beritaCML: [],
            received_beritaKomunitas: [],
            received_beritaumum: [],
        };
    },
    async created() {
        try {
            const response_beritaumum = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/berita');
            const response_beritaCML = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/berita/kategori/perkembanganCML');
            const response_beritaKomunitas = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/berita/kategori/perkembanganKomunitas');
            this.received_beritaumum = response_beritaumum.data.result.data
            this.received_beritaCML = response_beritaCML.data.result.data
            this.received_beritaKomunitas = response_beritaKomunitas.data.result.data
            console.log(this.received_beritaCML)
        } catch (error) {
            console.error(error);
        }
    }
};
</script>

<template>
    <Navbar />

    <div>
        <div class="flex flex-col gap-2 items-end pt-8 ml-auto mr-10 ">
            <select autocomplete="off" name="Pilih Kategori"
                class="form-select focus:bg-white focus:text-red text-white flex bg-orange items-center gap-2 p-2 mb-4 font-medium marker:content-none hover:cursor-pointer rounded-lg"
                v-model="pilih_kategori">
                <option class="bg-white text-red" :value="null" selected>Pilih Kategori</option>
                <option class="bg-white text-red" value="perkembanganKomunitas">Komunitas</option>
                <option class="bg-white text-red" value="perkembanganCML">CML</option>
            </select>
            <!-- <details class="group ">
                <summary
                    class="flex bg-orange items-center gap-2 p-2 font-medium marker:content-none hover:cursor-pointer rounded-lg  w-[105.61px]">
                    <span class="flex gap-2">
                        <span class="text-white">
                            Kategori
                        </span>
                    </span>
                    <svg class="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="white" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                        </path>
                    </svg>
                </summary> 

                <article class="pb-4  bg-white absolute w-[105.61px] max-w-[105.61px]">
                    <ul class="flex flex-col gap-4 pl-2  ">
                        <li class="flex gap-2 pt-2">
                            <a class="text-red font-medium font-inter" href="http://127.0.0.1:8000/user/dashboard">
                                Komunitas
                            </a>
                        </li>
                        <li class="flex gap-2">
                            <a class="text-red font-medium font-inter" href="http://127.0.0.1:8000/user/study-lists">
                                CML
                            </a>
                        </li> -->

            <!-- <li class="flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z">
                                    </path>
                                </svg>


                                <a href="http://127.0.0.1:8000/user/contribution">
                                    Your contribution
                                </a>
                            </li>


                            <li class="flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z">
                                    </path>
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                                    </path>
                                </svg>


                                <a href="http://127.0.0.1:8000/user/settings">
                                    Settings
                                </a>
                            </li>


                            <form action="http://127.0.0.1:8000/auth/logout" method="POST">
                                <input type="hidden" name="_token" value="ymEkCLBFpgkdaSbidUArRsdHbER5DkT6ByS3eJYb">
                                <button type="submit" class="text-red-500 text-sm px-2 py-1 hover:bg-orange-200 rounded-md">
                                    Log Out
                                </button>
                            </form> -->

            <!-- </ul>

                </article> 

            </details> -->


        </div>

        <div>

            <div class="grid grid-cols-2 gap-8 pb-4" v-show="pilih_kategori === null">
                <div v-for="berita in received_beritaumum" :key="berita.id" class="flex items-center flex-col">
                    <img class="w-[619px] h-[320px]"
                        :src="'https://elgeka-web-api-production.up.railway.app/' + berita.image_url" alt="" srcset="">
                    <p class="font-poppins font-semibold text-4xl text-center text-red">{{ berita.title }}</p>
                    <p class="font-poppins font-normal leading-6 text-base text-center py-4 mx-8">{{ berita.content }}.</p>
                    <router-link to="/detailberita"><button type="button"
                            class="bg-orange text-white py-2 px-16 rounded-full">Tampilan Detail</button></router-link>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-8 pb-4" v-show="pilih_kategori === 'perkembanganKomunitas'">
                <div v-for="berita in received_beritaKomunitas" :key="berita.id" class="flex items-center flex-col">
                    <img class="w-[619px] h-[320px]"
                        :src="'https://elgeka-web-api-production.up.railway.app/' + berita.image_url" alt="" srcset="">
                    <p class="font-poppins font-semibold text-4xl text-center text-red">{{ berita.title }}</p>
                    <p class="font-poppins font-normal leading-6 text-base text-center py-4 mx-8">{{ berita.content }}.</p>
                    <router-link to="/detailberita"><button type="button"
                            class="bg-orange text-white py-2 px-16 rounded-full">Tampilan Detail</button></router-link>
                </div>
                
            </div>

            <div class="grid grid-cols-2 gap-8 pb-4" v-show="pilih_kategori === 'perkembanganCML'">
                <div v-for="berita in received_beritaCML" :key="berita.id" class="flex items-center flex-col">
                    <img class="w-[619px] h-[320px]"
                        :src="'https://elgeka-web-api-production.up.railway.app/' + berita.image_url" alt="" srcset="">
                    <p class="font-poppins font-semibold text-4xl text-center text-red">{{ berita.title }}</p>
                    <p class="font-poppins font-normal leading-6 text-base text-center py-4 mx-8">{{ berita.content }}.</p>
                    <router-link to="/detailberita"><button type="button"
                            class="bg-orange text-white py-2 px-16 rounded-full">Tampilan Detail</button></router-link>
                </div>
            </div>


            <!-- <div>
    <div class="flex items-center flex-col">
        <img src="../assets/Rectangle179.png" alt="" srcset="">
        <p class="font-poppins font-semibold text-4xl text-red">Perkembangan CML 2023</p>
        <p class="font-poppins font-normal leading-6 text-base text-center py-4">Lorem ipsum dolor sit amet
            consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget.
            Eget quis et tortor cras sed. Nec vulputate neque non mi.</p>
        <button type="button" class="bg-orange text-white py-2 px-16 rounded-full">Detailed View</button>
    </div>

    <div class="flex items-center flex-col">
        <img src="../assets/Rectangle179.png" alt="" srcset="">
        <p class="font-poppins font-semibold text-4xl text-red">Perkembangan CML 2023</p>
        <p class="font-poppins font-normal leading-6 text-base text-center py-4">Lorem ipsum dolor sit amet
            consectetur. Commodo adipiscing massa et sem. Neque elementum non facilisi eget.
            Eget quis et tortor cras sed. Nec vulputate neque non mi.</p>
        <button type="button" class="bg-orange text-white py-2 px-16 rounded-full">Detailed View</button>
    </div>
</div> -->


        </div>
    </div>
</template>

<style scoped></style>
