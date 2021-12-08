import { Routes, Route } from 'react-router-dom';
import User from '@pages/user';
import Dashboard from '@pages/dashboard';
import Emoj from '@pages/emoj';
import EmojGroup from '@pages/emojGroup';

function Router() {
  return (
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="user" element={<User />} />
      <Route path="emoj" element={<Emoj />} />
      <Route path="emojGroup" element={<EmojGroup />} />
    </Routes>
  );
}

export default Router;
