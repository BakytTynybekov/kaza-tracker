import "./App.css";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Header from "./components/Header/Header";
import KazaAnketa from "./Pages/KazaAnketa/KazaAnketa";
import KazaNamazdar from "./Pages/HelloPage/KazaNamazdar";
import SignUp from "./Pages/SignUp/SignUp";
import { Suspense } from "react";
import loadingImg from "./images/loading.svg";
import Tracker from "./Pages/Tracker/Tracker";

function App() {
  console.log(process.env.REACT_APP_API_KEY);

  return (
    <div className="App">
      <Header />
      {/* <header className="App-header">
        <h1> Kaza Namaz </h1>
      </header> */}
      <Routes>
        <Route
          path="/"
          element={
            <Suspense
              fallback={
                <div className="loading">
                  <img src={loadingImg} alt="" />
                </div>
              }
            >
              <Home />
            </Suspense>
          }
        />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/kazaNamazdar" element={<KazaNamazdar />} />
        <Route path="/kazaAnketa" element={<KazaAnketa />} />
      </Routes>
    </div>
  );
}

export default App;
