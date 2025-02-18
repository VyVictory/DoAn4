import './styles/tailwind.css';
import './index.css';
import 'typeface-roboto';
import 'typeface-open-sans';
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/AppRouter';
import { AuthProvider } from './components/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider clientId="203504945599-3v9h0goil9ni43kamqesphfrarjfu440.apps.googleusercontent.com">
        <AppRouter />
      </GoogleOAuthProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

//render one
// import React from 'react';
// import ReactDOM from 'react-dom';
// import AppRouter from './router/AppRouter';

// import './index.css';

// ReactDOM.render(
//   <AppRouter />,
//   document.getElementById('root')
// );
