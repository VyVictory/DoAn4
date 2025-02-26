import "./index.css";
import "typeface-roboto";
import "typeface-open-sans";
import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./components/context/AuthProvider";
import { ModuleProvider } from "./components/context/Module";

import { GoogleOAuthProvider } from "@react-oauth/google";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
serviceWorkerRegistration.register();
ReactDOM.render(
  <AuthProvider>
    <GoogleOAuthProvider clientId="203504945599-3v9h0goil9ni43kamqesphfrarjfu440.apps.googleusercontent.com">
      <ModuleProvider>
        <AppRouter />
      </ModuleProvider>
    </GoogleOAuthProvider>
  </AuthProvider>,
  document.getElementById("root")
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
