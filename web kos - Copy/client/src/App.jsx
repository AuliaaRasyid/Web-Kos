import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AdminInput from './pages/admin/AdminInput';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminKeluhan from './pages/admin/AdminKeluhan';
import PenghuniProfile from './pages/penghuni/PenghuniProfile';
import PenghuniDashboard from './pages/penghuni/PenghuniDashboard';
import LoginPage from './pages/LoginPage';
import AdminEdit from './pages/admin/AdminEdit';
import AdminDetail from './pages/admin/AdminDetail';
import PenghuniKeluhan from './pages/penghuni/PenghuniKeluhan';
import PrivateRoute from './components/PrivateRoute';
import AdminKeluhanDetail from './pages/admin/AdminKeluhanDetail';
import PenghuniOrderStatus from './pages/penghuni/PenghuniOrderStatus';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/PenghuniOrderStatus" element={<PenghuniOrderStatus />} />

        <Route path="/AdminDashboard" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>
        } />
        <Route path="/AdminInput" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminInput />
          </PrivateRoute>
        } />
        <Route path="/AdminDetail/:id" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminDetail />
          </PrivateRoute>
        } />
        <Route path="/AdminEdit/:id" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminEdit />
          </PrivateRoute>
        } />
        <Route path="/AdminKeluhan" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminKeluhan />
          </PrivateRoute>
        } />
        <Route path="/AdminKeluhanDetail/:userId/:complaintId" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminKeluhanDetail />
          </PrivateRoute>
        } />

        <Route path="/PenghuniProfile/:id" element={
          <PrivateRoute allowedRoles={['user']}>
            <PenghuniProfile />
          </PrivateRoute>
        } />
        <Route path="/PenghuniDashboard/:id" element={
          <PrivateRoute allowedRoles={['user']}>
            <PenghuniDashboard />
          </PrivateRoute>
        } />
        <Route path="/PenghuniKeluhan/:id" element={
          <PrivateRoute allowedRoles={['user']}>
            <PenghuniKeluhan />
          </PrivateRoute>
        } />
        {/* <Route path="/PenghuniOrderStatus/" element={
          <PrivateRoute allowedRoles={['user']}>
            <PenghuniOrderStatus />
          </PrivateRoute>
        } /> */}
      </Routes>
    </div>
  );
};

export default App;
