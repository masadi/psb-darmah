export default [
  {
    path: '/',
    name: 'homepage',
    component: () => import('@/views/psb/Index.vue'),
    meta: {
      resource: 'Auth',
    }
  },
  {
    path: '/informasi-pendaftaran',
    name: 'informasi-pendaftaran',
    component: () => import('@/views/psb/Informasi.vue'),
    meta: {
      resource: 'Auth',
    }
  },
  {
    path: '/daftar',
    name: 'daftar',
    component: () => import('@/views/psb/Daftar.vue'),
    meta: {
      resource: 'Auth',
    }
  },
]
