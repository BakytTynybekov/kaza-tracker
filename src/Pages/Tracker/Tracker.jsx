import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralFirebaseContext } from "../../context/GeneralFirebaseContext";
import { Button, Dialog } from "@mui/material";
import { Gauge } from "@mui/x-charts";

import "./tracker.css";

function Tracker() {
  const namazdar = [
    "Багымдат",
    "Бешим",
    "Аср",
    "Шам",
    "Куптан",
    "Витр",
    "Орозо",
  ];
  const [open, setOpen] = React.useState(false);
  const [activeNamaz, setActiveNamaz] = useState({
    namaz: "",
    done: 0,
    all: 0,
  });
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
  const { user, getUserData, userData, changeUserData } = useContext(
    GeneralFirebaseContext
  );
  const navigate = useNavigate();

  const handleClickOpen = (namaz, done, all) => {
    setActiveNamaz({ namaz: namaz, done: done, all: all });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!user) navigate("/");
    if (user) getUserData(user?.uid);
  }, [user]);
  useEffect(() => {
    setData(userData);

    console.log("asdf");
  }, [userData]);

  const handleChange = (type, namaz) => {
    if (type === "plus") {
      setData({
        ...data,
        [namaz]: { ...data[namaz], all: +data[namaz].all - 1 },
        done: data.done + 1,
        all: data.all - 1,
      });
    } else if (type === "minus") {
      setData({
        ...data,
        [namaz]: { ...data[namaz], all: +data[namaz].all + 1 },
        all: data.all + 1,
      });
    }
  };

  const handleSubmit = () => {
    changeUserData(user.uid, data);
    setOpen(false);
  };
  return (
    <div className="tracker">
      {userData && (
        <div className="container">
          <div className="tracker__inner">
            {user && (
              <div className="main-kaza">
                <Dialog
                  PaperProps={{
                    style: {
                      borderRadius: 20,
                      maxWidth: 350,
                      padding: 20,
                    },
                  }}
                  className="kaza-dialog"
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <div className="kaza-dialog__inner">
                    <div className="kaza-dialog__title">
                      <h2 className="kaza-dg__name">{activeNamaz.namaz}</h2>
                      <div className="kaza-dg-descr">
                        <p>{data ? data[activeNamaz.namaz]?.all : 100}</p>
                        <span>Калган казалар</span>
                      </div>
                    </div>
                    <div className="kaza-dialog__change">
                      <button
                        onClick={() => handleChange("minus", activeNamaz.namaz)}
                        className="minus"
                      >
                        <h4>+1 Каза</h4>
                        <span>Кошулду</span>
                      </button>
                      <button
                        onClick={() => handleChange("plus", activeNamaz.namaz)}
                        className="plus"
                      >
                        <h4>+1 Каза</h4>
                        <span>Окулду</span>
                      </button>
                    </div>
                    <Button
                      onClick={() => handleSubmit(data)}
                      fullWidth
                      variant="outlined"
                    >
                      Сактоо
                    </Button>
                  </div>
                </Dialog>
                <h2>Сиздин каза намаздарыныз</h2>
                <div className="kaza_review">
                  <div className="kaza-review__item">
                    <h4>{data?.done}</h4>
                    <p>Окулган казалар</p>
                  </div>
                  <div className="kaza-review__item">
                    <h4>{data?.all - data?.done}</h4>
                    <p>Калган казалар</p>
                  </div>
                </div>
                <div className="main-kaza__inner">
                  <div className="kazalar">
                    {namazdar.map((namaz, i) => (
                      <div key={i} className="kaza-block">
                        <h3>{namaz}</h3>
                        <Gauge
                          width={120}
                          height={130}
                          value={data ? data[namaz]?.done : 100}
                          valueMax={data ? data[namaz]?.all : 100}
                          text={({ value, valueMax }) =>
                            `${value} / ${valueMax}`
                          }
                        />
                        <Button
                          sx={{ borderRadius: "20px" }}
                          onClick={() =>
                            handleClickOpen(
                              namaz,
                              data[namaz].done,
                              data[namaz].all
                            )
                          }
                          variant={"contained"}
                        >
                          Озгортуу
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Tracker;
