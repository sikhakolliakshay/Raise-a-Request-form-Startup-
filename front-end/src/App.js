import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import './App.css'
  // Adjust the import path according to your folder structure
      //css file misaindiraa
      //a file lo rasavu

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define the routes */}
        <Route path="/" element={<MainPage />} />
        
      </Routes>
    </Router>
  );
};

export default App;
