import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './auth/signin';
import Signup from './auth/signup';
import Accept from './admin/accept';
import List from './admin/list';
import Book from './student/book';
import All from './student/all';
import Status from './student/status';

import './App.css';
import UsedContext from './auth/usercontext';

function App() {
  return (
    <div className="App">
    <UsedContext>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/accept/:id" element={<Accept />} />
          <Route path="/list" element={<List />} />
          <Route path="/book" element={<Book />} />
          <Route path="/all" element={<All />} />
          <Route path="/status/:id" element={<Status />} />
        </Routes>
      </BrowserRouter>
      </UsedContext>
    </div>
  );
}

export default App;
