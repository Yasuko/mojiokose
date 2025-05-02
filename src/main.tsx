import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gpt from './pages/Gpt'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={ <Gpt page="" /> }></Route>
        <Route path="/Whisper" element={ <Gpt page="whisper" /> }></Route>
    </Routes>
  </BrowserRouter>
)
