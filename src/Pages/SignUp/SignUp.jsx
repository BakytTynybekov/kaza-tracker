import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GeneralFirebaseContext } from "../../context/GeneralFirebaseContext";
import "./signUp.css";
export default function SignUp() {
  const { signUpWithEmail, user } = useContext(GeneralFirebaseContext);
  const navigate = useNavigate();
  const [logInfo, setLogInfo] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    signUpWithEmail(logInfo.email, logInfo.password);
  };

  useEffect(() => {
    if (user) {
      navigate("/kazaAnketa");
    }
  }, [user]);

  return (
    <div>
      <div className="login">
        <div className="container">
          <div className="login__inner">
            <h1>Регистрация</h1>
            <form action="" className="form">
              <input
                value={logInfo.email}
                onChange={(e) =>
                  setLogInfo({ ...logInfo, email: e.target.value })
                }
                type="email"
                placeholder="Почта адресиниз..."
                required
              />
              <input
                value={logInfo.password}
                onChange={(e) =>
                  setLogInfo({ ...logInfo, password: e.target.value })
                }
                type="password"
                placeholder="Пароль"
                required
              />
              <button onClick={(e) => handleSubmit(e)}>Аккаунт ач</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
