import React, { useEffect, useState } from 'react';
import '../styles/SignupLogin.css';
import Navbar from './Navbar';
import AuthService from '../utils/auth';
import API from '../utils/api'; // Adjust the path accordingly

const SignInLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [signInSuccess, setSignInSuccess] = useState(false);
    const [signInError, setSignInError] = useState(false);
    const [username, setUsername] = useState('');
    const [emailExistsError, setEmailExistsError] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(AuthService.loggedIn()); // Check if user is already logged in
    const [showWelcomeBack, setShowWelcomeBack] = useState(false);

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        const handleSignUpClick = () => container.classList.add("right-panel-active");
        const handleSignInClick = () => container.classList.remove("right-panel-active");

        signUpButton.addEventListener('click', handleSignUpClick);
        signInButton.addEventListener('click', handleSignInClick);
        // Update the isLoggedIn state when the user logs in or out
        setIsLoggedIn(AuthService.loggedIn());
        return () => {
            signUpButton.removeEventListener('click', handleSignUpClick);
            signInButton.removeEventListener('click', handleSignInClick);
        };
    }, []);

	const handleSignUp = async (e) => {
		e.preventDefault();
		try {
			const response = await API.signupUser(username, email, password);
	
			if (response && response.data && response.data.token) {
				AuthService.login(response.data.token);
				setSignUpSuccess(true);
				setEmailExistsError(false); // Reset the error state if sign up is successful
			} else if (response && response.data && response.data.message === 'Email already exists!') {
				setEmailExistsError(true); // Set the error state if email already exists
			} else {
				// Handle other signup errors
				console.error("Error signing up:", response);
			}
		} catch (error) {
			console.error("API call failed:", error);
			if (error.response && error.response.data && error.response.data.message === 'Email already exists!') {
				setEmailExistsError(true);
			}
		}
	}	

    const handleSignIn = async (e) => {
        e.preventDefault();
      
        const response = await API.loginUser(email, password);
      
        if (response && response.error) {
          setSignInError(true);
        } else if (response && response.token) {
          // Use AuthService to handle login
          AuthService.login(response.token);
          setSignInSuccess(true);
          setSignInError(false);
          setShowWelcomeBack(true); // Set showWelcomeBack to true here
        } else {
          // Handle unexpected cases where response is undefined or doesn't have expected properties
          console.error("Unexpected response from loginUser:", response);
        }
    };    

    return (
        <>
            <Navbar />
            <div className="signin-login-wrapper">
                <h2>Welcome to MusicVerse</h2>
                {isLoggedIn ? (
                    // Render components or UI for a logged-in user
                    <div>
                        <p>You are logged in as {AuthService.getLoggedInUser()}</p>
                        {/* Add any additional UI for logged-in users */}
                    </div>
                ) : (
                    // Render the sign-up and sign-in forms for non-logged-in users
                    <div className="container" id="container">
                        <div className="form-container sign-up-container">
                            <form onSubmit={handleSignUp}>
                                <h1>Create Account</h1>
                                <span>Use your email for registration</span>
                                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <button type="submit">Sign Up</button>
                                {signUpSuccess && <p style={{ color: 'green' }}>Successfully signed up!</p>}
                                {emailExistsError && <p style={{ color: 'red' }}>Email already exists!</p>}
                                {signUpSuccess && <p style={{ color: 'green' }}>Successfully signed up!</p>}
                            </form>
                        </div>
                        <div className="form-container sign-in-container">
                            <form onSubmit={handleSignIn}>
                                <h1>Sign in</h1>
                                <span>Use your account</span>
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                                <a href="#">Forgot your password?</a>
                                <button type="submit">Sign In</button>
                                {signInSuccess && <p style={{ color: 'green' }}>Sign In Successful!</p>}
                                {signInError && <p style={{ color: 'red' }}>Incorrect password or E-mail</p>}
                            </form>
                        </div>
                        <div className="overlay-container">
                            <div className="overlay">
                                <div className="overlay-panel overlay-left">
                                    {showWelcomeBack && (
                                        <div style={{ color: 'green', textAlign: 'center' }}>
                                            Welcome Back!
                                        </div>
                                    )}
                                    <h1>Welcome Back!</h1>
                                    <p>To keep connected with us, please login with your personal info</p>
                                    <button className="ghost" id="signIn">Sign In</button>
                                </div>
                                <div className="overlay-panel overlay-right">
                                    <h1>Hello, Friend!</h1>
                                    <p>Enter your personal details and start the journey with us</p>
                                    <button className="ghost" id="signUp">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <footer>
                    {/* ... footer content ... */}
                </footer>
            </div>
        </>
    );    
}

export default SignInLogin;
