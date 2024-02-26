<template>
    <div>
        <div class="container">
            <div v-if="chooseOption === 'perkembanganKomunitas'">
                <div v-for="berita in received_beritaKomunitas" :key="berita.id" class="flex items-center flex-col">
                    <img src="../assets/Rectangle179.png" alt="" srcset="">
                    <p class="font-poppins font-semibold text-4xl text-center text-red">{{ berita.title }}</p>
                    <p class="font-poppins font-normal leading-6 text-base text-center py-4 mx-8">{{ berita.content }}.</p>
                    <button type="button" class="bg-red text-white py-2 px-16 rounded-full">Detailed View</button>
                </div>
            </div>

            <div v-if="chooseOption === 'perkembanganCML'">
                <div v-for="berita in received_beritaCML" :key="berita.id" class="flex items-center flex-col">
                    <img src="../assets/Rectangle179.png" alt="" srcset="">
                    <p class="font-poppins font-semibold text-4xl text-center text-red">{{ berita.title }}</p>
                    <p class="font-poppins font-normal leading-6 text-base text-center py-4 mx-8">{{ berita.content }}.</p>
                    <button type="button" class="bg-red text-white py-2 px-16 rounded-full">Detailed View</button>
                </div>
            </div>

            <div v-if="chooseOption === 'umum'">
                <div v-for="berita in received_beritaumum" :key="berita.id" class="flex items-center flex-col">
                    <!-- <div v-for="">
                        aaaaa
                    </div> -->
                    <img :src="'https://elgeka-web-api-production.up.railway.app/' + berita.image_url" alt="">
                    <p class="font-poppins font-semibold text-4xl text-center text-red">{{ berita.title }}</p>
                    <p class="font-poppins font-normal leading-6 text-base text-center py-4 mx-8">{{ berita.content }}.</p>
                    <button type="button" class="bg-red text-white py-2 px-16 rounded-full">Detailed View</button>
                </div>
            </div>
        </div>

        <select class="form-select" v-model="chooseOption">
            <option value="umum">Pilih Kategori</option>
            <option  value="perkembanganKomunitas" selected>Komunitas</option>
            <option value="perkembanganCML">CML</option>
        </select>

        <select name="Piilih trial" id="" v-model="pilihtral">
            <option value="" selected>anjay</option>
            <option value="">berisik</option>
            <option value="">apa aja deh</option>
        </select>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        path: 'https://elgeka-web-api-production.up.railway.app'
        return {
            chooseOption: null,
            received_beritaumum: [],
        }
        
    },
    async created() {
        try {
            const response_beritaumum = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/berita');
            const response_beritaCML = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/berita/kategori/perkembanganCML');
            const response_beritaKomunitas = await axios.get('https://elgeka-web-api-production.up.railway.app/api/v1/berita/kategori/perkembanganKomunitas');
            this.received_beritaumum = response_beritaumum.data.result.data
            this.received_beritaCML = response_beritaCML.data.result.data
            this.received_beritaKomunitas = response_beritaKomunitas.data.result.data
            this.received_imgberitaumum = response_beritaumum.data.result.data[0].image_url.split(('/')[1]);
            console.log(this.received_imgberitaumum)
        } catch (error) {
            console.error(error);
        }
    }
};
</script>
  
<style scoped>
a {
    color: #42b983;
    font-weight: bold;
    font-size: 20px;
}

.form-select {
    margin-top: 20px;
    height: 40px;
    width: 175px;
    border-radius: 5px;
    border: solid 2px #42b983;
    font-size: 20px;
}

.container {
    height: 50px;
}
</style>