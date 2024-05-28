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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Aturancerita.vue'),
      meta: {
        title: 'Aturan Cerita Elgeka Jawa Barat'
      }
    },

    {
      path: '/BuatKataSandiBaru',
      name: 'BuatKataSandiBaru',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/BuatKataSandiBaru.vue'),
      meta: {
        title: 'BuatKataSandiBaru'
      }
    },

    {
      path: '/cerita',
      name: 'cerita',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Cerita.vue'),
      meta: {
        title: 'Cerita'
      }
    },

    {
      path: '/CheckingOTPForgotPassword',
      name: 'CheckingOTPForgotPassword',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/CheckingOTPForgotPassword.vue'),
      meta: {
        title: 'Forgot Password'
      }
    },

    {
      path: '/createcerita',
      name: 'createcerita',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Donasi.vue'),
      meta: {
        title: 'Donasi Elgeka Jawa Barat'
      }
    },

    {
      path: '/gantipasswordsukses',
      name: 'gantipasswordsukses',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Gantipasswordsukses.vue'),
      meta: {
        title: 'Sukses Ganti Password'
      }
    },

    {
      path: '/infoRS',
      name: 'infoRS',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/InfoRS.vue'),
      meta: {
        title: 'Info Rumah Sakit'
      }
    },

    {
      path: '/komunitaskegiatan',
      name: 'komunitaskegiatan',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/KomunitasKegiatan.vue')
    },

    // {
    //   path: '/komentar/:id',
    //   name: 'komentar',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visitedcd .
    //   component: () => import('../views/Komentar.vue')
    // },

    {
      path: '/detailblog/:id',
      name: 'detailblog',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/DetailBlog.vue')
    },

    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Login.vue')
    },

    {
      path: '/lupapassword',
      name: 'lupapassword',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Lupapassword.vue')
    },

    {
      path: '/perkembangancml',
      name: 'perkembangancml',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/PerkembanganCML.vue')
    },

    {
      path: '/Detailkegiatan/:id',
      name: 'Detailkegiatan',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Detailkegiatan.vue')
    },

    {
      path: '/detailberita/:id',
      name: 'detailberita',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Detailberita.vue')
    },

    {
      path: '/Notfound',
      name: 'Notfound',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Notfound.vue')
    },

    {
      path: '/Optionotp',
      name: 'Optionotp',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/OptionOTP.vue'),
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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/SendOtpEmail.vue'),
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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/SendOtpWhatsapp.vue'),
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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/SuccessRegister.vue')
    },

    {
      path: '/userprofil',
      name: 'userprofil',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Userprofil.vue')
    },

    {
      path: '/profilkomunitas',
      name: 'profilkomunitas',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Profilkomunitas.vue')
    },

    {
      path: '/Quotes',
      name: 'Quotes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Quotes.vue')
    },

    {
      path: '/Register',
      name: 'Register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Register.vue')
    },
    
  ],
  
})
router.beforeEach((to,from ) => {
    document.title = to.meta?.title ?? 'ELGEKA JAWA BARAT 2024'
})

export default router
