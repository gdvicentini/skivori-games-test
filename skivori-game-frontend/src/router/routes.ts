import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HomePage.vue') }],
  },
  {
    path: '/games',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/GamesPage.vue') }],
  },
  {
    path: '/slot-machine',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/SlotMachinePage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
