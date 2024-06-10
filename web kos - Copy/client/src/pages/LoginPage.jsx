import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import './styles/Login.css';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const navigateTo = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token, user ID, and role to local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('role', data.role);  // Store role

        Swal.fire({
          position: "top-middle",
          icon: "success",
          title: `Logged in as ${data.name}`,  // Display user's name
          showConfirmButton: false,
          timer: 1500
        });
        // Redirect based on role
        if (data.role === 'admin') {
          navigateTo('/AdminDashboard');
        } else if (data.role === 'user') {
          navigateTo(`/PenghuniDashboard/${data.userId}`);
        } else {
          setError('Unknown user role');
        }
      } else {
        // Handle errors
        setError(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="login-page">
      <Container className="login-container">
        <h2 className="login-title">Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formUsername" className="pt-4">
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="pb-3">
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            Login
          </button>

          <p className="backto"><a href="/">Back to login page</a></p>
        </Form>
      </Container>
      <div className="login-bg"></div>
    </div>
  );
};

export default LoginPage;
