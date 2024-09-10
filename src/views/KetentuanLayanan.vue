<template>
    <div id="app" class="bg-gray-100 p-6">
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">Syarat dan Ketentuan</h1>

            <!-- Pendahuluan -->
            <section class="mb-6">
                <h2 class="text-xl font-semibold text-gray-700">1. Pendahuluan</h2>
                <p class="text-gray-600">
                    Selamat datang di aplikasi Sahabat CGI. Dengan menggunakan aplikasi ini, Anda setuju untuk terikat oleh
                    Syarat dan Ketentuan ini. Mohon untuk membaca syarat ini dengan cermat, karena penggunaan aplikasi ini
                    dianggap sebagai persetujuan Anda terhadap seluruh ketentuan yang berlaku.
                </p>
            </section>

            <!-- Privasi dan Perlindungan Data Pribadi -->
            <section class="mb-6">
                <h2 class="text-xl font-semibold text-gray-700">2. Privasi dan Perlindungan Data Pribadi</h2>
                <p class="text-gray-600 mb-2">Sahabat CGI sangat menghargai privasi Anda dan berkomitmen untuk mematuhi
                    peraturan yang berlaku terkait perlindungan data pribadi, termasuk Undang-Undang Perlindungan Data
                    Pribadi (PDP) Indonesia. Informasi pribadi yang kami kumpulkan dari Anda akan digunakan dan dilindungi
                    sesuai dengan ketentuan berikut:</p>
                <ul class="list-disc list-inside text-gray-600">
                    <li>Pengumpulan Data: Kami mengumpulkan data pribadi seperti nama, alamat email, dan informasi lain yang
                        diperlukan untuk keperluan layanan aplikasi Sahabat CGI.</li>
                    <li>Penggunaan Data: Data pribadi Anda akan digunakan untuk keperluan operasional aplikasi seperti
                        pengingat, komunikasi, serta pengembangan layanan yang lebih baik.</li>
                    <li>Penyimpanan Data: Data Anda akan disimpan dengan aman dan hanya akan diakses oleh pihak yang
                        berwenang sesuai dengan kepentingan yang telah disetujui.</li>
                    <li>Pembagian Data: Kami tidak akan membagikan informasi pribadi Anda kepada pihak ketiga tanpa
                        persetujuan Anda, kecuali diharuskan oleh hukum atau peraturan yang berlaku.</li>
                    <li>Keamanan Data: Kami menggunakan langkah-langkah keamanan yang memadai untuk melindungi data pribadi
                        Anda dari akses tidak sah, penggunaan yang salah, atau kehilangan data.</li>
                </ul>
            </section>

            <!-- Hak dan Kewajiban Pengguna -->
            <section class="mb-6">
                <h2 class="text-xl font-semibold text-gray-700">3. Hak dan Kewajiban Pengguna</h2>
                <p class="text-gray-600">Sebagai pengguna, Anda bertanggung jawab untuk:</p>
                <ul class="list-disc list-inside text-gray-600">
                    <li>Menyediakan informasi yang akurat dan tidak menyesatkan saat mendaftar atau menggunakan aplikasi.
                    </li>
                    <li>Tidak menyalahgunakan layanan, seperti melakukan aktivitas yang melanggar hukum atau merusak
                        reputasi aplikasi.</li>
                </ul>
            </section>

            <!-- Hak dan Kewajiban Sahabat CGI -->
            <section class="mb-6">
                <h2 class="text-xl font-semibold text-gray-700">4. Hak dan Kewajiban Sahabat CGI</h2>
                <p class="text-gray-600">Kami berhak untuk:</p>
                <ul class="list-disc list-inside text-gray-600">
                    <li>Mengakses, memproses, dan menggunakan data Anda sesuai dengan kebijakan privasi ini.</li>
                    <li>Mengubah atau menghentikan layanan tanpa pemberitahuan sebelumnya apabila diperlukan.</li>
                </ul>
            </section>

            <!-- Perubahan pada Kebijakan -->
            <section class="mb-6">
                <h2 class="text-xl font-semibold text-gray-700">5. Perubahan pada Kebijakan</h2>
                <p class="text-gray-600">Sahabat CGI berhak untuk memperbarui atau mengubah Syarat dan Ketentuan ini
                    sewaktu-waktu, dengan pemberitahuan melalui aplikasi. Kami menyarankan pengguna untuk secara berkala
                    meninjau syarat ini.</p>
            </section>

            <!-- Kontak -->
            <section class="mb-6">
                <h2 class="text-xl font-semibold text-gray-700">6. Kontak</h2>
                <p class="text-gray-600">Jika Anda memiliki pertanyaan tentang kebijakan ini atau ingin menanyakan tentang
                    perlindungan data pribadi, Anda dapat menghubungi kami di [alamat email atau nomor telepon].</p>
            </section>

            <!-- Hukum yang Berlaku -->
            <section class="mb-6">
                <h2 class="text-xl font-semibold text-gray-700">7. Hukum yang Berlaku</h2>
                <p class="text-gray-600">Syarat dan Ketentuan ini diatur oleh hukum Republik Indonesia. Setiap sengketa yang
                    timbul sehubungan dengan penggunaan aplikasi akan diselesaikan sesuai dengan hukum yang berlaku di
                    Indonesia.</p>
            </section>

            <!-- Persetujuan -->
            <section class="mt-6">
                <label class="flex items-center">
                    <input type="checkbox" class="h-5 w-5 text-blue-600" v-model="isChecked">
                    <span class="ml-2 text-gray-700">Dengan menggunakan aplikasi Sahabat CGI, Anda menyatakan bahwa Anda
                        telah membaca, memahami, dan menyetujui seluruh isi dari Syarat dan Ketentuan ini.</span>
                </label>
            </section>

            <!-- Submit Button -->
            <div class="mt-6">
                <button 
                    class="bg-teal text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-grey disabled:cursor-no-drop"
                    :disabled="!isChecked"
                    @click="redirectToRegister"
                >
                    Lanjutkan
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isChecked: false, // Default tidak dicentang
        };
    },
    methods: {
        redirectToRegister() {
            if (this.isChecked) {
                window.location.href = "/register"; // Ganti dengan URL halaman register
            }
        },
    },
};
</script>
