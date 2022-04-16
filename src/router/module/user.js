const userRoutes = [
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/MyRegister.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/MyLogin.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      auth: true,
    },
    component: () => import('@/views/profile/MyProfile.vue'),
  },
];

export default userRoutes;
