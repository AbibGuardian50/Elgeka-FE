import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/HomePage.vue'),
      meta: {
        title: 'Halaman Utama Elgeka Jawa Barat'
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
      path: '/createcerita',
      name: 'createcerita',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Createcerita.vue'),
      meta: {
        title: 'Buat Cerita Blog'
      }
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
      path: '/komunitaskegiatan',
      name: 'komunitaskegiatan',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/KomunitasKegiatan.vue')
    },

    {
      path: '/komentar',
      name: 'komentar',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Komentar.vue')
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
      path: '/playground',
      name: 'playground',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/playground.vue')
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
