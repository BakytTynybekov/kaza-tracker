import React, { useContext, useEffect } from "react";
import "./home.css";
import Typewriter from "typewriter-effect";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import { GeneralFirebaseContext } from "../../context/GeneralFirebaseContext";

export default function Home() {
  const namazdar = ["Багымдат", "Бешим", "Аср", "Шам", "Куптан"];
  const [open, setOpen] = React.useState(false);
  const { user } = useContext(GeneralFirebaseContext);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (user) {
      navigate("/tracker");
    } else {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="home">
      {!user && (
        <div className="container">
          <div className="home__inner">
            {!user && (
              <main className="main">
                <h1>Ассаламу Алейкум!</h1>
                <p>
                  <Typewriter
                    options={{
                      strings: [
                        "Бул сайт сизге каза намаздарынызды окуунуз учун жардамчы болот",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 70,
                      deleteSpeed: 10,
                    }}
                  />
                </p>

                <Button
                  onClick={() => navigate("login")}
                  style={{
                    borderRadius: 15,
                  }}
                  variant="contained"
                >
                  Башта
                </Button>
              </main>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
