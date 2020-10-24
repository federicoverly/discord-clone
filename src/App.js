import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import ChatComponent from './ChatComponent';
import Sidebar from './Sidebar';
import { selectUser } from './features/userSlice';
import Login from './Login';
import { auth } from './firebase';
import { login, logOut } from './features/userSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  useEffect ( () => {
    auth.onAuthStateChanged ((authUser) => {
      if (authUser) {
        // User is logged in
        dispatch(
          login({
          uId: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }))
      } else {
        // User is logged out
        dispatch(logOut());
      }
    })
  }, [dispatch])
  
  return (
    // BEM Convention
    <div className="app">
      { /* Check if there is a User */ }
      { user ? (
      <>
        { /* Side Bar Component */ }
        <Sidebar />
        { /* Chat Component */ }
        <ChatComponent />
      </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
