import {
  Navigate,
  Link,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useContext, useEffect, useState } from "react";
// import { GeneralAuthContext } from "../../context/GeneralContext";
import "./login.css";
import { GeneralFirebaseContext } from "../../context/GeneralFirebaseContext";

function Login() {
  const { loginWithEmail, user } = useContext(GeneralFirebaseContext);
  const navigate = useNavigate();
  const [logInfo, setLogInfo] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    loginWithEmail(logInfo.email, logInfo.password);

    console.log(user);
  };

  useEffect(() => {
    if (user) {
      navigate("/tracker");
    }
  }, [user]);

  return (
    <div>
      <div className="login">
        <div className="container">
          <div className="login__inner">
            <h1>Авторизация</h1>
            <form action="" className="form">
              <input
                value={logInfo.email}
                onChange={(e) =>
                  setLogInfo({ ...logInfo, email: e.target.value })
                }
                type="email"
                placeholder="Почта адресиниз..."
              />
              <input
                value={logInfo.password}
                onChange={(e) =>
                  setLogInfo({ ...logInfo, password: e.target.value })
                }
                type="password"
                placeholder="Пароль"
              />
              <button onClick={(e) => handleSubmit(e)}>Войти</button>
              <p className="newAkk">
                Аккаунтунуз жокбу? Анда -{" "}
                <Link to={"/signup"} className="newAkk-link">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
