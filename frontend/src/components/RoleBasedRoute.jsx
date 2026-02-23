import { Navigate } from 'react-router-dom';

export default function RoleBasedRoute({ teacherComponent, studentComponent }) {
  const role = JSON.parse(localStorage.getItem('user') || '{}').role;
  if (role === 'TEACHER') return teacherComponent;
  if (role === 'STUDENT') return studentComponent;
  return <Navigate to="/" replace />;
}
