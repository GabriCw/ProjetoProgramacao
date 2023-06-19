import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ForgotPasswordView from './views/forgotPasswordView/ForgotPasswordView';
import HomePageView from './views/homePageView/HomePageView';
import InsertCodeView from './views/insertCodeView/insertCodeView';
import LoginView from './views/loginView/LoginView';
import NewPasswordView from './views/newPasswordView/newPasswordView';
import RegisterView from './views/registerView/RegisterView';
import { ToastContainer, Zoom } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<LoginView />} />
      <Route path="login" element={<LoginView />} />
      <Route path="register" element={<RegisterView />} />
      <Route path="forgotPassword" element={<ForgotPasswordView />} />
      <Route path="home" element={<HomePageView />} />
      <Route path="code" element={<InsertCodeView />} />
      <Route path="newPassword" element={<NewPasswordView />} />
    </Routes>
    <ToastContainer
    theme='colored'
    autoClose={2000}
    transition={Zoom}
    newestOnTop/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
