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
      component: () => import('../views/HomePage.vue')
    },

    {
      path: '/aturancerita',
      name: 'aturancerita',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Aturancerita.vue')
    },

    {
      path: '/cerita',
      name: 'cerita',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Cerita.vue')
    },

    {
      path: '/createcerita',
      name: 'createcerita',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Createcerita.vue')
    },

    {
      path: '/donasi',
      name: 'donasi',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Donasi.vue')
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
      path: '/perkembangancml',
      name: 'perkembangancml',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/PerkembanganCML.vue')
    },

    {
      path: '/Detailkegiatan',
      name: 'Detailkegiatan',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Detailkegiatan.vue')
    },

    {
      path: '/detailberita',
      name: 'detailberita',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Detailberita.vue')
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
      path: '/detailprofil',
      name: 'detailprofil',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Detailprofil.vue')
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
    
  ]
})

export default router
