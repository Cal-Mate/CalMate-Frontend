export default [
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/layout/DefualtLayout.vue'),
    
    children: [
      {
        path: 'dashboard',
        name: 'main-dashboard', 
        component: () => import('@/views/dashBoard/DashBoard.vue'), // lazy
      }
    ],
  },
];
