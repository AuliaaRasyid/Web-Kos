import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

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

  if (!token) {
    return (
      <>
        {showAlert && (
          <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            You have not logged in. Please log in to access this page.
          </Alert>
        )}
        <Navigate to="/LoginPage" state={{ from: location }} replace />
      </>
    );
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PrivateRoute;