import Header from "./components/Header/Header";
import Login from "./pages/Forms/Login";
import Register from "./pages/Forms/Register";

import Home from "./pages/home/Home.jsx";


import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Posts from "./pages/Post/Posts";
import CreatePost from "./pages/create-post/CreatePost.jsx";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import PostDetails from "./pages/post-details/postDetails.jsx";
import Category from "./pages/category/Category.jsx";
import Profile from "./pages/profile/Profile.jsx";
import AdminDashboard from "./pages/Admin/AdminDashBoard";
import UsersTable from "./pages/Admin/UsersTable.jsx";
import PostsTable from "./pages/Admin/PostsTable.jsx";
import CategoriesTable from "./pages/Admin/CategoriesTable.jsx";
import CommentsTable from "./pages/Admin/CommentsTable.jsx";
import { useSelector } from "react-redux";


function App() {
 const {user} = useSelector(state => state.auth);
  return (
    <BrowserRouter>
    <ToastContainer />
  <div className="App">
    <Header />

    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
    <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
    <Route path="/posts" element={<Posts />} />
    <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/" />} />
    <Route path="/posts/details/:id" element={<PostDetails />} />
    <Route path="/posts/categories/:category" element={<Category />} />
    {/* <Route path="/admin-dashboard" element={<AdminDashBoard />} /> */}
    <Route path="/profile/:id" element={<Profile />} />

      <Route path="admin-dashboard">
          <Route index element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" /> } />
          <Route path="users-table" element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />} />
          <Route path="posts-table" element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />} />
          <Route path="categories-table" element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />} />
          <Route path="comments-table" element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />} />
        </Route>
    </Routes>

    <Footer />

  </div>
  </BrowserRouter>
 );

}

export default App;
