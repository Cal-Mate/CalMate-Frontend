export default [
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/layout/DefaultLayout.vue'),

    children: [
      {
        path: 'dashboard',
        name: 'main-dashboard',
        component: () => import('@/views/defaultPage/DashBoard.vue'), // lazy
      },
      {
        path: 'diary',
        name: 'diary',
        component: () => import('@/views/diary/Diary.vue'),
      },
      // ▼▼▼ 여기에 '{'가 빠졌었습니다. ▼▼▼
      {
        path: 'exerciseRecords',
        name: 'main-exerciseRecords',
        component: () => import('@/views/defaultPage/ExerciseRecords.vue'),
      }, // ▲▲▲ 여기에 '}'가 빠졌었습니다. ▲▲▲
      {
        path: 'dietmanagement',
        name: 'main-dietmanagement',
        component: () => import('@/views/defaultPage/DietManagement.vue'),
        
        // ▼▼▼ 'children' 배열이 이 객체 안으로 이동했습니다. ▼▼▼
        children: [
          {
            path: 'breakfast',
            name: 'diet-breakfast',
            component: () => import('@/components/dietManagement/Breakfast.vue'),
          },
          {
            path: 'lunch',
            name: 'diet-lunch',
            component: () => import('@/components/dietManagement/Lunch.vue'),
          },
          {
            path: 'dinner',
            name: 'diet-dinner',
            component: () => import('@/components/dietManagement/Dinner.vue'),
          },
          {
            path: 'snack',
            name: 'diet-snack',
            component: () => import('@/components/dietManagement/Snack.vue'),
          },
        ],
      }, 
    ],
  },
];