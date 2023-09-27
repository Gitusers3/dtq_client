import {
  lazy
} from 'react';
import Loadable from 'app/components/Loadable';
import CodelabBatches from '../Batches/CodelabBatches';

const Register = Loadable(lazy(() => import('../../views/student/register')));
const StaffRegister = Loadable(lazy(() => import('../../views/staffs/Register')));
const Students = Loadable(lazy(() => import('../../views/student/students')));
const ViewOne = Loadable(lazy(() => import('../../views/student/viewone')));
const Staffs = Loadable(lazy(() => import('../../views/staffs/Staffs')));
const ViewStaff = Loadable(lazy(() => import('../../views/staffs/view')));
const Fees = Loadable(lazy(() => import('../../views/fees_receipt/Fees')));
const Batches = Loadable(lazy(() => import('../../views/Batches/batches')));
const CreateBatch = Loadable(lazy(() => import('../../views/Batches/CreateBatch')));
const QuetechBatch = Loadable(lazy(() => import('../../views/Batches/QuetechBatches')));
const Timetable = Loadable(lazy(() => import('../../views/timetable/timetable')));
const Print = Loadable(lazy(() => import('../../views/material-kit/forms/PrintFeesReciept')));
const Ongoing = Loadable(lazy(() => import('../report/ongoing/ongoing')));
const OngoingByCollege = Loadable(lazy(() => import('../../views/material-kit/tables/reports/ongoing/OngoingStudentsByCollege')));
const Completed = Loadable(lazy(() => import('../report/completed/completed')));
const Discontinued = Loadable(lazy(() => import('../report/discontinued/discontinued')));
const AppTable = Loadable(lazy(() => import('./tables/AppTable')));
const AppForm = Loadable(lazy(() => import('./forms/AppForm')));
const AppButton = Loadable(lazy(() => import('./buttons/AppButton')));
const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')));
const AppProgress = Loadable(lazy(() => import('./AppProgress')));
const AppMenu = Loadable(lazy(() => import('./menu/AppMenu')));
const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')));
const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')));
const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')));
const AppSlider = Loadable(lazy(() => import('./slider/AppSlider')));
const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')));
const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')));
const AppAutoComplete = Loadable(lazy(() => import('./auto-complete/AppAutoComplete')));
const AppExpansionPanel = Loadable(lazy(() => import('./expansion-panel/AppExpansionPanel')));
const Cognitive_TimeTable = Loadable(lazy(() => import('./tables/TimeTable/Cognitive_TimeTable')))
const AddCogTimeTable = Loadable(lazy(() => import('./tables/TimeTable/AddCogTimeTable.jsx')))

const CodeLab_Timetable = Loadable(lazy(() => import('./tables/TimeTable/Codelab_Timetable')))
const AddCodeTimeTable = Loadable(lazy(() => import('./tables/TimeTable/AddCodeTimetable')))
const Qtech_Timetable = Loadable(lazy(() => import('./tables/TimeTable/Qtech_Timetable')))
const AddQTimeTable = Loadable(lazy(() => import('./tables/TimeTable/AddQTimeTable')))
const CodeLabStudents = Loadable(lazy(() => import('./tables/BatchTables/StudentsByBatches')))
const materialRoutes = [{
    path: '/material/table',
    element: < AppTable / >
  },
  {
    path: 'student/register',
    element: < Register / >
  },
  {
    path: 'student/students',
    element: < Students / >
  },
  {
    path: 'staffs/register',
    element: < StaffRegister / >
  },
  {
    path: 'staffs/view/:id',
    element: < ViewStaff / >
  },
  {
    path: 'student/students/view/:id',
    element: < ViewOne / >
  },
  {
    path: 'fees/view/:id',
    element: < Print / >
  },
  {
    path: 'batches',
    element: < Batches / >
  },
  {
    path: 'batches/create',
    element: < CreateBatch / >
  },
  {
    path: 'batches/qtech_create',
    element: < QuetechBatch / >
  },
  {
    path: 'batches/time_table',
    element: < Cognitive_TimeTable / >
  },
  {
    path: 'time_table/cognitive',
    element: < AddCogTimeTable / >
  },

  {
    path: 'batches/time_table/codelab',
    element: < CodeLab_Timetable / >
  },

  {
    path: 'time_table/codelab',
    element: < AddCodeTimeTable / >
  },

  {
    path: 'batches/time_table/qtech',
    element: < Qtech_Timetable / >
  },
  {
    path: 'time_table/qtech',
    element: < AddQTimeTable / >
  },
  {
    path: 'timetable',
    element: < Timetable / >
  },
  {
    path: 'report/ongoing',
    element: < Ongoing / >
  },
  {
    path: 'report/ongoing/viewByCollege/:id',
    element: < OngoingByCollege / >
  },
  {
    path: 'report/completed',
    element: < Completed / >
  },
  {
    path: 'report/discontinued',
    element: < Discontinued / >
  },
  {
    path: '/material/form',
    element: < AppForm / >
  },
  {
    path: '/batches/viewStudents/:id',
    element: < CodeLabStudents / >
  },
  {
    path: '/staffs',
    element: < Staffs / >
  },
  {
    path: '/fees',
    element: < Fees / >
  }, {
    path: '/material/buttons',
    element: < AppButton / >
  }, {
    path: '/material/icons',
    element: < AppIcon / >
  }, {
    path: '/material/progress',
    element: < AppProgress / >
  }, {
    path: '/material/menu',
    element: < AppMenu / >
  }, {
    path: '/material/checkbox',
    element: < AppCheckbox / >
  }, {
    path: '/material/switch',
    element: < AppSwitch / >
  }, {
    path: '/material/radio',
    element: < AppRadio / >
  }, {
    path: '/material/slider',
    element: < AppSlider / >
  }, {
    path: '/material/autocomplete',
    element: < AppAutoComplete / >
  }, {
    path: '/material/expansion-panel',
    element: < AppExpansionPanel / >
  }, {
    path: '/material/dialog',
    element: < AppDialog / >
  }, {
    path: '/material/snackbar',
    element: < AppSnackbar / >
  }
];

export default materialRoutes;