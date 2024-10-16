import { Routes,Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React from 'react'
import Main from "./Main";
import Dashboard from './Dashboard/Dashboard'
import Login from './Auth/Login/Login'
import Register from './Auth/Register/Register'

export default function Pages() {
    const location= useLocation()

    return (
    <Routes location={location}>
      <Route path="/" element={<Main/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
  )
}