export const navigations = [{
    name: 'Dashboard',
    path: '/dashboard/default',
    icon: 'dashboard'
  },
  {
    label: 'Operations',
    type: 'label'
  },
  // {
  //   name: 'Students',
  //   icon: 'persons',
  //   children: [{
  //       name: 'Register',
  //       iconText: 'SI',
  //       path: '/student/register'
  //     },
  //     {
  //       name: 'Students',
  //       iconText: 'SU',
  //       path: '/student/students'
  //     }
  // {
  //   name: 'Forgot Password',
  //   iconText: 'FP',
  //   path: '/session/forgot-password'
  // },
  // {
  //   name: 'Error',
  //   iconText: '404',
  //   path: '/session/404'
  // }
  //   ]
  // },
  {
    name: 'Students',
    icon: 'persons',
    path: '/student/students'

  },

  {
    name: 'Staffs',
    icon: 'person_pin',
    path: '/staffs'

  },
  {
    name: 'Fees Receipt',
    icon: 'receipt',
    path: '/fees'

  },
  {
    name: 'Batches',
    icon: 'table',
    path: '/batches'

  },
  {
    name: 'Student Reports',
    icon: 'storage',
    children: [{
        name: 'Ongoing',
        iconText: 'SI',
        path: '/report/ongoing'
      },
      {
        name: 'Completed',
        iconText: 'SU',
        path: '/report/completed'
      },
      {
        name: 'Discontinued',
        iconText: 'FP',
        path: '/report/discontinued'
      }
    ]
  },
  // {
  //   label: 'Components',
  //   type: 'label'
  // },
  // {
  //   name: 'Session/Auth',
  //   icon: 'security',
  //   children: [{
  //       name: 'Sign in',
  //       iconText: 'SI',
  //       path: '/session/signin'
  //     },
  //     {
  //       name: 'Sign up',
  //       iconText: 'SU',
  //       path: '/session/signup'
  //     },
  //     {
  //       name: 'Forgot Password',
  //       iconText: 'FP',
  //       path: '/session/forgot-password'
  //     },
  //     {
  //       name: 'Error',
  //       iconText: '404',
  //       path: '/session/404'
  //     }
  //   ]
  // },
  // {
  //   name: 'Components',
  //   icon: 'favorite',
  //   badge: {
  //     value: '30+',
  //     color: 'secondary'
  //   },
  //   children: [{
  //       name: 'Auto Complete',
  //       path: '/material/autocomplete',
  //       iconText: 'A'
  //     },
  //     {
  //       name: 'Buttons',
  //       path: '/material/buttons',
  //       iconText: 'B'
  //     },
  //     {
  //       name: 'Checkbox',
  //       path: '/material/checkbox',
  //       iconText: 'C'
  //     },
  //     {
  //       name: 'Dialog',
  //       path: '/material/dialog',
  //       iconText: 'D'
  //     },
  //     {
  //       name: 'Expansion Panel',
  //       path: '/material/expansion-panel',
  //       iconText: 'E'
  //     },
  //     {
  //       name: 'Form',
  //       path: '/material/form',
  //       iconText: 'F'
  //     },
  //     {
  //       name: 'Icons',
  //       path: '/material/icons',
  //       iconText: 'I'
  //     },
  //     {
  //       name: 'Menu',
  //       path: '/material/menu',
  //       iconText: 'M'
  //     },
  //     {
  //       name: 'Progress',
  //       path: '/material/progress',
  //       iconText: 'P'
  //     },
  //     {
  //       name: 'Radio',
  //       path: '/material/radio',
  //       iconText: 'R'
  //     },
  //     {
  //       name: 'Switch',
  //       path: '/material/switch',
  //       iconText: 'S'
  //     },
  //     {
  //       name: 'Slider',
  //       path: '/material/slider',
  //       iconText: 'S'
  //     },
  //     {
  //       name: 'Snackbar',
  //       path: '/material/snackbar',
  //       iconText: 'S'
  //     },
  //     {
  //       name: 'Table',
  //       path: '/material/table',
  //       iconText: 'T'
  //     }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   icon: 'trending_up',
  //   children: [{
  //     name: 'Echarts',
  //     path: '/charts/echarts',
  //     iconText: 'E'
  //   }]
  // },
  // {
  //   name: 'Documentation',
  //   icon: 'launch',
  //   type: 'extLink',
  //   path: 'http://demos.ui-lib.com/matx-react-doc/'
  // }
];