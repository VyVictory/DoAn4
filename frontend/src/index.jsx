import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/AppRouter';
import './styles/tailwind.css';
import './index.css';
import 'typeface-roboto';
import 'typeface-open-sans';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
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
