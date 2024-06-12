import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const PrivateRoute = ({ children, allowedRoles }) => {
  const [showAlert, setShowAlert] = useState(false);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      setShowAlert(true);
    }
  }, [token]);

  useEffect(() => {
    if (showAlert) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to login first!',
      });
    }
  }, [showAlert]);

  if (!token) {
    return (
      <>
        {showAlert && (
          <Navigate to="/LoginPage" state={{ from: location }} replace />
        )}
      </>
    );
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;