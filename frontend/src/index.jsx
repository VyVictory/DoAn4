import './styles/tailwind.css';
import './index.css';
import 'typeface-roboto';
import 'typeface-open-sans';
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/AppRouter';
import { AuthProvider } from './components/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
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
