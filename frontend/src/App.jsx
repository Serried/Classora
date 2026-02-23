import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRoute from './components/RoleBasedRoute';
import RoleDashboardRedirect from './components/RoleDashboardRedirect';
import Login from './components/Login';
import BugReport from './components/BugReport';
import TeacherDash from './components/TeacherDash';
import StudentDash from './components/StudentDash';
import AdminDash from './components/AdminDash';
import T_Kormoon from './components/T_Kormoon';
import T_News from './components/T_News';
import T_Schedule from './components/T_Schedule';
import T_ManageScore from './components/T_ManageScore';
import S_Kormoon from './components/S_Kormoon';
import S_News from './components/S_News';
import S_Schedule from './components/S_Schedule';
import S_ContactStaff from './components/S_ContactStaff';
import S_ViewScore from './components/S_ViewScore';
import A_ManageSubject from './components/A_ManageSubject';
import A_ManageNews from './components/A_ManageNews';
import A_AddStudent from './components/A_AddStudent';
import A_AddTeacher from './components/A_AddTeacher';
import A_ManageReport from './components/A_ManageReport';
import A_ManageClassroom from './components/A_ManageClassroom';

const RB = (T, S) => <RoleBasedRoute teacherComponent={<T />} studentComponent={<S />} />;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleDashboardRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/bug-report" element={<BugReport />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/me/teacher" element={<TeacherDash />} />
        <Route path="/me/student" element={<StudentDash />} />
        <Route path="/me/data" element={RB(T_Kormoon, S_Kormoon)} />
        <Route path="/me/news" element={RB(T_News, S_News)} />
        <Route path="/me/schedule" element={RB(T_Schedule, S_Schedule)} />
        <Route element={<ProtectedRoute allowedRole={['STUDENT']} />}>
          <Route path="/me/help" element={<S_ContactStaff />} />
          <Route path="/me/score" element={<S_ViewScore />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute allowedRole={['TEACHER']} />}>
        <Route path="/me/manage-score" element={<T_ManageScore />} />
      </Route>
      <Route element={<ProtectedRoute allowedRole={['ADMIN']} />}>
        <Route path="/me/admin" element={<AdminDash />} />
        <Route path="/me/manage-subject" element={<A_ManageSubject />} />
        <Route path="/me/manage-news" element={<A_ManageNews />} />
        <Route path="/me/add-student" element={<A_AddStudent />} />
        <Route path="/me/add-teacher" element={<A_AddTeacher />} />
        <Route path="/me/manage-reports" element={<A_ManageReport />} />
        <Route path="/me/manage-classroom" element={<A_ManageClassroom />} />
      </Route>
    </Routes>
  );
}
