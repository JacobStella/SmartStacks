import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CardPage from './pages/CardPage';
import CreateStackPage from './pages/CreateStackPage';
import ForgorPage from './pages/ForgorPage';
import GamePage from './pages/GamePage';
import LandingPage from './pages/LandingPage';
import LibraryPage from './pages/LibraryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudyPage from './pages/StudyPage';
import UserSettingsPage from './pages/UserSettingsPage';
import ViewStackPage from './pages/ViewStackPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cards" element={<CardPage />} />
        <Route path="/create" element={<CreateStackPage />} />
        <Route path="/forgor" element={<ForgorPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/study" element={<StudyPage />} />
        <Route path="/settings" element={<UserSettingsPage />} />
        <Route path="/view" element={<ViewStackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
