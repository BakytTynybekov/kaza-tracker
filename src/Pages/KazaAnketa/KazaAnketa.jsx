import React, { useContext, useEffect, useState } from "react";
import "./kazaAnketa.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Box, Button, Input } from "@mui/material";
import { GeneralFirebaseContext } from "../../context/GeneralFirebaseContext";
import { useNavigate } from "react-router-dom";

export default function KazaAnketa() {
  const [startDate, setStartDate] = useState(dayjs());
  const [value, setValue] = useState(dayjs("12/10/1999"));
  const [balagat, setBalagat] = useState("");

  const { user, addOrder } = useContext(GeneralFirebaseContext);
  const navigate = useNavigate();

  function daysBetweenDates(start, end) {
    const differenceInMs = end - start;
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const differenceInDays = differenceInMs / millisecondsInADay;

    return Math.abs(Math.round(differenceInDays));
  }

  const handleSubmit = (e) => {
    let temp = value;
    let year = value.$d.getFullYear() + +balagat;
    const diff = daysBetweenDates(startDate.$d, temp.$d.setFullYear(year));
    addOrder(
      {
        Багымдат: {
          done: 0,
          all: diff,
        },
        Бешим: {
          done: 0,
          all: diff,
        },
        Аср: {
          done: 0,
          all: diff,
        },
        Шам: {
          done: 0,
          all: diff,
        },
        Куптан: {
          done: 0,
          all: diff,
        },
        Витр: {
          done: 0,
          all: diff,
        },

        Орозо: {
          done: 0,
          all: diff,
        },

        all: diff * 6,
        done: 0,
      },
      user.uid
    );

    navigate("/tracker");
    console.log(diff, user.uid);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="kazaAnketa">
      <h1>Каза намазды эсептоо</h1>
      <h3>Туулган кунунуз</h3>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
          label="Туулган кунунуз"
        />
      </LocalizationProvider>
      <h3>Балагатка канча жашынызда жеттиниз?</h3>
      <Input
        value={balagat}
        onChange={(e) => setBalagat(e.target.value)}
        type="number"
        placeholder="Балагат..."
      />
      <h3>Качан Намаз окуп баштагансыз?</h3>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          label="Качан Намаз..."
        />
      </LocalizationProvider>
      <Box mt={"10px"}>
        <Button
          onClick={(e) => handleSubmit(e)}
          className="btn-anketa"
          mt="10px"
          size=""
          variant="contained"
        >
          Эсептоо
        </Button>
      </Box>
    </div>
  );
}
