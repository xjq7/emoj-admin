import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/user');
  }, []);
  return <div>Dashboard</div>;
}
export default Dashboard;
