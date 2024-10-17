import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FirebaseProvider } from "./context/GeneralFirebaseContext";
import GeneralContextProvider from "./context/generalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirebaseProvider>
      <GeneralContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GeneralContextProvider>
    </FirebaseProvider>
  </React.StrictMode>
);
