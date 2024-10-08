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
        title: 'Halaman Utama Sahabat CGI'
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
      path: '/AturanBlog',
      name: 'AturanBlog',
      component: () => import('../views/AturanBlog.vue'),
      meta: {
        title: 'Aturan Blog Sahabat CGI'
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
      path: '/Blog',
      name: 'Blog',
      component: () => import('../views/Blog.vue'),
      meta: {
        title: 'Blog'
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
      path: '/KetentuanLayanan',
      name: 'KetentuanLayanan',
      component: () => import('../views/KetentuanLayanan.vue'),
      meta: {
        title: 'Ketentuan Layanan'
      }
    },

    {
      path: '/CreateBlog',
      name: 'CreateBlog',
      component: () => import('../views/CreateBlog.vue'),
      meta: {
        title: 'Buat Blog'
      },
      beforeEnter: (to, from, next) => {
        const tokenlogin = VueCookies.get('token');
        if (!tokenlogin) {
          window.location.href = '/login';
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
        title: 'Donasi Sahabat CGI'
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
        title: 'Komunitas Kegiatan Sahabat CGI'
      }
    },

    {
      path: '/detailblog/:id',
      name: 'detailblog',
      component: () => import('../views/DetailBlog.vue'),
      meta: {
        title: 'Detail Blog Sahabat CGI'
      }
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: {
        title: 'Login Sahabat CGI'
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
        title: 'Perkembangan CML Sahabat CGI'
      }
    },

    {
      path: '/Detailkegiatan/:id',
      name: 'Detailkegiatan',
      component: () => import('../views/Detailkegiatan.vue'),
      meta: {
        title: 'Detail Kegiatan Sahabat CGI'
      }
    },

    {
      path: '/detailberita/:id',
      name: 'detailberita',
      component: () => import('../views/Detailberita.vue'),
      meta: {
        title: 'Detail Berita Sahabat CGI'
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
        title: 'User Profil Sahabat CGI'
      },
    },

    {
      path: '/profilkomunitas',
      name: 'profilkomunitas',
      component: () => import('../views/Profilkomunitas.vue'),
      meta: {
        title: 'Profil Komunitas Sahabat CGI'
      },
    },

    {
      path: '/Quotes',
      name: 'Quotes',
      component: () => import('../views/Quotes.vue'),
      meta: {
        title: 'Quotes Sahabat CGI'
      },
    },

    {
      path: '/Register',
      name: 'Register',
      component: () => import('../views/Register.vue'),
      meta: {
        title: 'Register akun Sahabat CGI'
      },
    },
    
  ],
  
})
router.beforeEach((to,from ) => {
    document.title = to.meta?.title ?? 'Sahabat CGI 2024'
})

export default router
