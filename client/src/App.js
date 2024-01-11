import React from 'react';
import {Container } from '@material-ui/core'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';


import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () =>{

  const user = JSON.parse(localStorage.getItem("profile"));

  return(
    <GoogleOAuthProvider  clientId ="438298336792-4jlsl75uis4ve9v1lbscpdscojkfvebn.apps.googleusercontent.com" >
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar/>
          <Routes>
            <Route path="/" exact element={<Navigate to="/posts"/>} />
            <Route path="/posts" exact element = {<Home/>}/ >
            <Route path="/posts/search" exact element = {<Home/>}/ >
            <Route path="/posts/:id" exact element={<PostDetails/>} />
            <Route path="/auth" exact element={!user? <Auth/> : <Navigate to="/posts"/>}/>
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

  
  

export default App;