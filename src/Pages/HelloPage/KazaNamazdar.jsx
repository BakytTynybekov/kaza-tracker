import React, { useContext, useEffect, useState } from "react";
import "./kazaNamazdar.css";
import { Button, TextField } from "@mui/material";
import { GeneralFirebaseContext } from "../../context/GeneralFirebaseContext";
import { useNavigate } from "react-router-dom";

export default function KazaNamazdar() {
  const namazdar = [
    "Багымдат",
    "Бешим",
    "Аср",
    "Шам",
    "Куптан",
    "Витр",
    "Орозо",
  ];
  const { userData, getUserData, user, changeUserData } = useContext(
    GeneralFirebaseContext
  );

  const navigate = useNavigate();
  const [data, setData] = useState({
    Багымдат: { done: 0, all: 0 },
    Бешим: { done: 0, all: 0 },
    Аср: { done: 0, all: 0 },
    Шам: { done: 0, all: 0 },
    Куптан: { done: 0, all: 0 },
    Витр: { done: 0, all: 0 },
    Орозо: { done: 0, all: 0 },
    all: 0,
    done: 0,
  });

  const handleChange = (type, namaz) => {
    if (type === "plus") {
      setData({
        ...data,
        [namaz]: { ...data[namaz], all: +data[namaz].all + 1 },
      });
    } else if (type === "minus") {
      setData({
        ...data,
        [namaz]: { ...data[namaz], all: +data[namaz].all - 1 },
      });
    }
  };

  const handleSubmit = () => {
    changeUserData(user.uid, data);
    getUserData(user.uid);

    navigate("/tracker");
  };

  useEffect(() => {
    if (user) {
      getUserData(user.uid);
    }
  }, [user]);

  useEffect(() => {
    setData(userData);

    console.log("asdf");
  }, [userData]);

  return (
    <div className="helloPage">
      <h2>Сиздин каза намаздарыныз</h2>
      {namazdar.map((namaz, i) => (
        <div key={i} className="kaza-item">
          <div className="kaza-name">{namaz}</div>
          <div className="kaza-quantity">
            <Button onClick={() => handleChange("minus", namaz)} size="small">
              -
            </Button>
            <TextField
              className="input"
              id="outlined-basic"
              variant="outlined"
              value={data ? data[namaz].all : 0}
              onChange={(e) =>
                setData({
                  ...data,
                  [namaz]: { ...data[namaz], all: e.target.value },
                })
              }
              size="small"
              style={{
                width: 80,
              }}
            />

            <Button onClick={() => handleChange("plus", namaz)} size="small">
              +
            </Button>
          </div>
        </div>
      ))}

      <Button
        onClick={() => handleSubmit()}
        style={{ margin: "20px 0" }}
        size="large"
        variant="contained"
        fullWidth
        className="anketa-btn"
      >
        Сактоо
      </Button>
    </div>
  );
}
