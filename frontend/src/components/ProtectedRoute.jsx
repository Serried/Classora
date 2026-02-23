import { Navigate, useLocation, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRole }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const loc = useLocation();
  if (!token || ['undefined', 'null'].includes(token)) return <Navigate to="/login" state={{ from: loc }} replace />;
  if (allowedRole && !allowedRole.includes(user.role)) return <Navigate to="/" replace />;
  return <Outlet />;
}
