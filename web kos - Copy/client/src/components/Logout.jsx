import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/LoginPage');
  };

  return (
    <a href="/loginPage" onClick={handleLogout} className="text-[28px] md:text-[32px]">Log Out</a>
  );
};

export default Logout;
