import React from 'react';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Header from "./components/header/Header";
import HomePage from "./pages/HomePage/HomePage";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import CreateArticlePage from "./pages/CreateArticlePage/CreateArticlePage";
import UpdateArticlePage from './pages/UpdateArticlePage/UpdateArticlePage';
import Footer from "./components/footer/Footer"

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" theme="colored" />

      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles/:id" element={<ArticlesPage />} />
        <Route path="/articles/new" element={<CreateArticlePage />} />
        <Route path="/articles/:id/edit" element={<UpdateArticlePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;