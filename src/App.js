import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home } from './components/Home';

import CommentState from './context/comment/CommentState';
import WorkState from './context/work/WorkState';
import CoordieState from './context/coordie/coordieState';
import VenueState from './context/venue/venueState';

import CgLogin from './components/cgs/CgLogin';
import Signup from './components/cgs/CgSignup';
import CgPage from './components/cgs/CgPage';
import CoordiePage from './components/coordies/CoordiePage';

function App() {
    return (
      <>
      {/* <Navbar/> */}
      <VenueState>
        <CoordieState>
        <WorkState>
          <CommentState>
          <BrowserRouter>
            <Navbar />
            <div className="container">
            <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route exact path='/cg' element={<CgPage/>} />
              <Route exact path='/coordie' element={<CoordiePage/>} />
              <Route exact path='/cg/login' element={<CgLogin/>} />
              <Route exact path='/cg/signup' element={<Signup/>} />
            </Routes>
            </div>
          </BrowserRouter>
          </CommentState>
        </WorkState>
        </CoordieState>
        </VenueState>
      </>
    )
}

export default App