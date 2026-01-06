import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Ficha from './Ficha'
import './index.css' // Ou App.css

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ficha/:id" element={<Ficha />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)