import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AlbumsPage from './pages/AlbumsPage'
import AlbumDetailPage from './pages/AlbumDetailPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/albuns" element={<AlbumsPage />} />
        <Route path="/albuns/:id" element={<AlbumDetailPage />} />
      </Routes>
    </Router>
  )
}

export default App
