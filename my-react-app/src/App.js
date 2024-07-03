import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ChatRoom from './pages/ChatRoom';
import Messenger from './pages/Messenger';
import UserProfile from './pages/UserProfile';
import FriendRequests from './pages/FriendRequests';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home/>}/>
          <Route path='signup' element={<SignUp />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='messenger' element={<Messenger />} />
          <Route path='messenger/:id' element={<ChatRoom />} />
          <Route path='messenger/friend-requests' element={<FriendRequests/>} />
          <Route path='messenger/user-profile' element={<UserProfile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}