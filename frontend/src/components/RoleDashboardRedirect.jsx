import { Navigate } from 'react-router-dom';

const ROUTES = { TEACHER: '/me/teacher', STUDENT: '/me/student', ADMIN: '/me/admin' };

export default function RoleDashboardRedirect() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!token || ['undefined', 'null'].includes(token)) return <Navigate to="/login" replace />;
  return <Navigate to={ROUTES[user.role] || '/login'} replace />;
}
