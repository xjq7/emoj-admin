import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = function () {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/user');
  }, []);
  return <div>Dashboard</div>;
};
export default Dashboard;
