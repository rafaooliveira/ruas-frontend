
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'login',
        component: () => import('pages/Login.vue'),
        name: 'Login'
      },
	  {
        path: 'home',
        component: () => import('pages/Home.vue'),
        name: 'Home'
      }
    ]
  },
  {
    path: '/registros',
    component: () => import('layouts/LayoutDefault.vue'),
    children: [
      {
        path: 'eventos',
        component: () => import('pages/registros/Eventos.vue'),
        name: 'Cadastrar Evento'
      },
      {
        path: 'teste',
        component: () => import('pages/registros/Teste.vue'),
        name: 'Teste'
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
