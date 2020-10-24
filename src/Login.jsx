import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import { auth, provider } from './firebase';

function Login() {

    const signIn = () => {
        //Login Functionality
        auth.signInWithPopup(provider).catch( (error) => alert(error.message));
    }; 

    return (
        <div className="login">

            <div className="div login__logo">
                <img src="
               https://cdn.vox-cdn.com/thumbor/MELSd11Iyq4TsNQfMSayVW76tA4=/0x0:2400x1600/1200x800/filters:focal(1008x608:1392x992)/cdn.vox-cdn.com/uploads/chorus_image/image/66509680/discord_logo_wordmark_2400.0.jpg" alt=""/>
            </div>

            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
