import { Routes, Route } from 'react-router-dom';
import User from '@pages/user';
import Dashboard from '@pages/dashboard';
import Emoj from '@pages/emoj';
import EmojGroup from '@pages/emojGroup';
import Book from '@pages/book';
import CreateBook from '@pages/createBook';

const Router = function () {
  return (
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="user" element={<User />} />
      <Route path="emoj" element={<Emoj />} />
      <Route path="emojGroup" element={<EmojGroup />} />
      <Route path="book" element={<Book />} />
      <Route path="createBook" element={<CreateBook />} />
    </Routes>
  );
};

export default Router;
