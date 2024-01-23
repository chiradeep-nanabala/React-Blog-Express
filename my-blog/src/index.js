import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkNmIPtcseXMgixccjzZ6_-WUmzTLGIoA",
  authDomain: "my-react-blog-bafb4.firebaseapp.com",
  projectId: "my-react-blog-bafb4",
  storageBucket: "my-react-blog-bafb4.appspot.com",
  messagingSenderId: "199691531600",
  appId: "1:199691531600:web:f669cf461f00f92f926855"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
