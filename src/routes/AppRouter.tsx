import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '@/components/layout/AdminLayout';
import Login from '@/components/pages/Login';
import EmployeeList from '@/components/pages/EmployeeList';
import EmployeeForm from '@/components/pages/EmployeeForm';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Navigate to="/employee" replace />} />

          <Route path="/employee" element={<EmployeeList />} />
          <Route path="/employee/new" element={<EmployeeForm />} />
          <Route path="/employee/:id/edit" element={<EmployeeForm />} />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
