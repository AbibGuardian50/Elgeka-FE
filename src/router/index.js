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
      path: '/detailkegiatan',
      name: 'detailkegiatan',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/Detailkegiatan.vue')
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
      path: '/KegiatanKomunitas',
      name: 'KegiatanKomunitas',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visitedcd .
      component: () => import('../views/KegiatanKomunitas.vue')
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
    
  ]
})

export default router
