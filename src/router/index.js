import { createRouter, createWebHistory } from 'vue-router'
import VueCookies from 'vue-cookies';

// const cookieParser = require('cookie-parser'); 
// app.use(cookieParser());

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue'),
      meta: {
        title: 'Halaman Utama Elgeka Jawa Barat'
      }
    },

    {
      path: '/akunsukses',
      name: 'akunsukses',
      component: () => import('../views/Akunsukses.vue'),
      meta: {
        title: 'Akun Berhasil Dibuat'
      }
    },

    {
      path: '/aturancerita',
      name: 'aturancerita',
      component: () => import('../views/Aturancerita.vue'),
      meta: {
        title: 'Aturan Cerita Elgeka Jawa Barat'
      }
    },

    {
      path: '/BuatKataSandiBaru',
      name: 'BuatKataSandiBaru',
      component: () => import('../views/BuatKataSandiBaru.vue'),
      meta: {
        title: 'BuatKataSandiBaru'
      }
    },

    {
      path: '/cerita',
      name: 'cerita',
      component: () => import('../views/Cerita.vue'),
      meta: {
        title: 'Cerita'
      }
    },

    {
      path: '/CheckingOTPForgotPassword',
      name: 'CheckingOTPForgotPassword',
      component: () => import('../views/CheckingOTPForgotPassword.vue'),
      meta: {
        title: 'Forgot Password'
      }
    },

    {
      path: '/createcerita',
      name: 'createcerita',
      component: () => import('../views/Createcerita.vue'),
      meta: {
        title: 'Buat Cerita Blog'
      },
      beforeEnter: (to, from, next) => {
        const tokenlogin = VueCookies.get('token');
        if (!tokenlogin) {
          next('/login')
        } else {
          next()
        }
      },
      
    },

    {
      path: '/donasi',
      name: 'donasi',
      component: () => import('../views/Donasi.vue'),
      meta: {
        title: 'Donasi Elgeka Jawa Barat'
      }
    },

    {
      path: '/gantipasswordsukses',
      name: 'gantipasswordsukses',
      component: () => import('../views/Gantipasswordsukses.vue'),
      meta: {
        title: 'Sukses Ganti Password'
      }
    },

    {
      path: '/infoRS',
      name: 'infoRS',
      component: () => import('../views/InfoRS.vue'),
      meta: {
        title: 'Info Rumah Sakit'
      }
    },

    {
      path: '/komunitaskegiatan',
      name: 'komunitaskegiatan',
      component: () => import('../views/KomunitasKegiatan.vue'),
      meta: {
        title: 'Komunitas Kegiatan Elgeka Jawa Barat'
      }
    },

    {
      path: '/detailblog/:id',
      name: 'detailblog',
      component: () => import('../views/DetailBlog.vue'),
      meta: {
        title: 'Detail Blog Elgeka Jawa Barat'
      }
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: {
        title: 'Login Elgeka Jawa Barat'
      }
    },

    {
      path: '/lupapassword',
      name: 'lupapassword',
      component: () => import('../views/Lupapassword.vue'),
      meta: {
        title: 'Lupa Password'
      }
    },

    {
      path: '/perkembangancml',
      name: 'perkembangancml',
      component: () => import('../views/PerkembanganCML.vue'),
      meta: {
        title: 'Perkembangan CML Elgeka Jawa Barat'
      }
    },

    {
      path: '/Detailkegiatan/:id',
      name: 'Detailkegiatan',
      component: () => import('../views/Detailkegiatan.vue'),
      meta: {
        title: 'Detail Kegiatan Elgeka Jawa Barat'
      }
    },

    {
      path: '/detailberita/:id',
      name: 'detailberita',
      component: () => import('../views/Detailberita.vue'),
      meta: {
        title: 'Detail Berita Elgeka Jawa Barat'
      }
    },

    {
      path: '/Notfound',
      name: 'Notfound',
      component: () => import('../views/Notfound.vue')
    },

    {
      path: '/Optionotp',
      name: 'Optionotp',
      component: () => import('../views/OptionOTP.vue'),
      meta: {
        title: 'Pilih OTP'
      },
      beforeEnter: (to, from, next) => {
        const tokenlogin = VueCookies.get('user_id');
        if (!tokenlogin) {
          next('/register')
        } else {
          next()
        }
      }
    },

    {
      path: '/sendotpemail',
      name: 'sendotpemail',
      component: () => import('../views/SendOtpEmail.vue'),
      meta: {
        title: 'Kirim OTP Email'
      },
      beforeEnter: (to, from, next) => {
        const tokenlogin = VueCookies.get('user_id');
        if (!tokenlogin) {
          next('/register')
        } else {
          next()
        }
      }
    },

    {
      path: '/sendotpwhatsapp',
      name: 'sendotpWhatsapp',
      component: () => import('../views/SendOtpWhatsapp.vue'),
      meta: {
        title: 'Kirim OTP Whatsapp'
      },
      beforeEnter: (to, from, next) => {
        const tokenlogin = VueCookies.get('user_id');
        if (!tokenlogin) {
          next('/register')
        } else {
          next()
        }
      }
    },

    {
      path: '/successregister',
      name: 'successregister',
      component: () => import('../views/SuccessRegister.vue'),
      meta: {
        title: 'Berhasil Register'
      },
    },

    {
      path: '/userprofil',
      name: 'userprofil',
      component: () => import('../views/Userprofil.vue'),
      meta: {
        title: 'User Profil Elgeka Jawa Barat'
      },
    },

    {
      path: '/profilkomunitas',
      name: 'profilkomunitas',
      component: () => import('../views/Profilkomunitas.vue'),
      meta: {
        title: 'Profil Komunitas Elgeka Jawa Barat'
      },
    },

    {
      path: '/Quotes',
      name: 'Quotes',
      component: () => import('../views/Quotes.vue'),
      meta: {
        title: 'Quotes Elgeka Jawa Barat'
      },
    },

    {
      path: '/Register',
      name: 'Register',
      component: () => import('../views/Register.vue'),
      meta: {
        title: 'Register akun Elgeka Jawa Barat'
      },
    },
    
  ],
  
})
router.beforeEach((to,from ) => {
    document.title = to.meta?.title ?? 'ELGEKA JAWA BARAT 2024'
})

export default router
