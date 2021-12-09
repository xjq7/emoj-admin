import { Routes, Route } from 'react-router-dom';
import Login from '@pages/login';
import Layout from '@components/layout';

const Router = function () {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Layout />} />
    </Routes>
  );
};

export default Router;
