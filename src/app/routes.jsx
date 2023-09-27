import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import Register from '../app/views/student/register';
import Students from '../app/views/student/students';
import Viewone from './views/student/viewone';
import Staffs from './views/staffs/Staffs';
import Batches from './views/Batches/batches';
import CreateBatch from './views/Batches/CreateBatch';
import Timetable from './views/timetable/timetable';
import StaffRegister from './views/staffs/Register';
import ViewStaff from './views/staffs/view';
import Fees from './views/fees_receipt/Fees';
import QuetechBatches from './views/Batches/QuetechBatches';
import PrintFeesReceipt from './views/material-kit/forms/PrintFeesReciept';
import Ongoing from './views/report/ongoing/ongoing';
import Completed from './views/report/completed/completed';
import Discontinued from './views/report/discontinued/discontinued';
import OngoingByCollege from './views/material-kit/tables/reports/ongoing/OngoingStudentsByCollege';
import StudentsByBatch from './views/material-kit/tables/BatchTables/StudentsByBatches';
// session pages
const AppForm = Loadable(lazy(() => import('../app/views/material-kit/forms/AppForm')));

const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.admin
      },

      // e-chart rooute
      {
        path: '/charts/echarts',
        element: <AppEchart />,
        auth: authRoles.editor
      }
    ]
  },

  // session pages route
  { path: '/student/register', element: <Register /> },
  { path: '/student/students', element: <Students /> },
  { path: '/student/students', element: <Students /> },
  { path: '/student/students/view/:id', element: <Viewone /> },
  { path: '/staffs', element: <Staffs /> },
  { path: '/staffs/register', element: <StaffRegister /> },
  { path: '/staffs/view/:id', element: <ViewStaff /> },
  { path: '/fees/view/:id', element: <PrintFeesReceipt /> },
  { path: '/fees', element: <Fees /> },
  { path: '/staffs/register', element: <StaffRegister /> },

  { path: '/batches', element: <Batches /> },
  { path: '/batches/create', element: <CreateBatch /> },
  { path: '/batches/qtech_create', element: <QuetechBatches /> },
  { path: '/timetable', element: <Timetable /> },
  { path: '/report/ongoing', element: <Ongoing /> },
  { path: '/report/ongoing/viewByCollege/:id', element: <OngoingByCollege /> },
  { path: '/report/completed', element: <Completed /> },
  { path: '/report/discontinued', element: <Discontinued /> },
  { path: '/batches/viewStudents/:id', element: <StudentsByBatch /> },
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },

  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
