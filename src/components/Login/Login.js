import React from 'react';
import {Button} from "@material-ui/core";
import "./Login.css"
import {auth, provider} from "../../firebase/firebase";

const Login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider)
            .catch( error => alert(error.message) )
    }
    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://upload.wikimedia.org/wikipedia/ru/thumb/b/b7/Discord_logo_svg.svg/2560px-Discord_logo_svg.svg.png" alt=""/>
            </div>
            <Button onClick={signIn}> Sign In </Button>
        </div>
    );
};

export default Login;
