import { Routes, Route } from 'react-router-dom';
import Login from '@pages/login';
import Layout from '@components/layout';

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/*" element={<Layout />}></Route>
    </Routes>
  );
}

export default Router;
