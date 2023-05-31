import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './views/login/Login';
import Cadastro from './views/cadastro/Cadastro';
import EscSenha from './views/escSenha/EscSenha';

import{ BrowserRouter, Routes, Route } from "react-router-dom"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route index element={<Login/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/cadastro" element={<Cadastro/>} />
    <Route path="/escsenha" element={<EscSenha/>} />
  </Routes>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
