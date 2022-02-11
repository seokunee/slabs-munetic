import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/lesson/CategoryPage';
import ClassPage from './pages/lesson/ClassPage';
import ClassListPage from './pages/lesson/ClassListPage';
import ManageClassPage from './pages/lesson/ManageClassPage';
import WriteClassPage from './pages/lesson/WriteClassPage';
import ViewProfilePage from './pages/profile/ViewProfilePage';
import ManageProfilePage from './pages/profile/ManageProfilePage';
import EditProfilePage from './pages/profile/EditProfilePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ViewCommentPage from './pages/comment/ViewCommentPage';

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lesson/category" element={<CategoryPage />} />
      <Route path="/lesson/classes" element={<ClassListPage />} />
      <Route path="/lesson/class/:id" element={<ClassPage />} />
      <Route path="/lesson/manage" element={<ManageClassPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/lesson/write" element={<WriteClassPage />} />
      <Route path="/lesson/write/:id" element={<WriteClassPage />} />
      <Route path="/profile/:id" element={<ViewProfilePage />} />
      <Route path="/profile/comment/:id" element={<ViewCommentPage />} />
      <Route path="/profile/manage" element={<ManageProfilePage />} />
      <Route path="/profile/edit/:id" element={<EditProfilePage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
    </Routes>
  );
}
