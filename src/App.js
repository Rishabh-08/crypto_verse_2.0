import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar, Footer, Homepage, Cryptocurrencies, CryptoDetails, News } from './components';

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route exact path='/home' element={<Homepage />} />
          <Route exact path='/cryptocurrencies' element={<Cryptocurrencies />} />
          <Route exact path='/crypto/:coinId' element={<CryptoDetails />} />
          <Route exact path='/news' element={<News />} />
        </Routes>
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  )
}

export default App