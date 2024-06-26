/*css*/
import style from "./loginPage.module.scss";
/*child components*/
import { Pulse } from "./Pulse/pulse";
/*inner components*/
import { useState } from "react";
import axios from "axios";
/*library*/
import * as cookie from "../../Middleware/Library/cookie";
/*MUI*/
import LockIcon from "@mui/icons-material/Lock";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import { Input } from "./Input/input";
/*image*/
import logo from "../../Assets/Images/dade-baan-dark.png";

export const LoginPage = () => {
  const [user, setUser] = useState(
    localStorage.getItem("username") ? localStorage.getItem("username") : ""
  );
  const [pass, setPass] = useState(
    localStorage.getItem("password") ? localStorage.getItem("password") : ""
  );
  const [rmCheck, setRmCheck] = useState(false);

  const [userErr, setUserErr] = useState(false);
  const [passErr, setPassErr] = useState(false);

  /*login*/
  const loginHandler = () => {
    if (user === "") setUserErr(true);
    else setUserErr(false);
    if (pass === "") setPassErr(true);
    else setPassErr(false);

    if (user !== "" && pass !== "") {
      setUserErr(false);
      setPassErr(false);
      axios
        .post("http://localhost:8080/auth", { username: user, password: pass })
        .then((res) => {
          if (rmCheck) {
            localStorage.setItem("username", user);
            localStorage.setItem("password", pass);
          }
          cookie.setCookie("login", true, 60);
          cookie.setCookie("username", user, 60);
          cookie.setCookie("superUser", res.data.superUser, 60);
          if (res.data.superUser == 1) window.location.href = "/administration";
          else window.location.href = "/";
        })
        .catch(() => {
          alert("نام کاربری یا رمز وارد شده اشتباه است");
        });
    }
  };

  const userHandler = (e) => {
    setUser(e.target.value);
  };

  const passHandler = (e) => {
    setPass(e.target.value);
  };

  const rmCheckHandler = (e) => {
    setRmCheck(e.target.value);
  };
  /*render component*/
  const label = {
    inputProps: { "aria-label": "Checkbox demo" },
  };
  return (
    <article className={style.loginContainer}>
      <div className={style.loginDesign}>
        <div className={style.logo}>
          <Pulse title="start" />
          <img src={logo} alt="دژافزار داده بان" />
          <Pulse title="end" />
        </div>
        <h1 className={style.title}>دژافزار داده بان سبلان سریر</h1>
        <p className={style.desc}>
          رزومه ساز اختصاصی کارکنان شرکت داده بان سبلان سریر
        </p>
        <span className={style.version}>1.0.0 نسخه</span>
        <div className={style.contacts}>
          <span id="about" className={style.link}>
            <label>
              تلفن تماس
              <PhoneEnabledIcon className={style.icon} />
            </label>
            <span>045-31505718</span>
          </span>
          <span id="versions" className={style.link}>
            <label>
              ایمیل
              <EmailIcon className={style.icon} />
            </label>
            <span>cert@uma.ac.ir</span>
          </span>
          <span id="recent" className={style.link}>
            <label>
              آدرس وبسایت
              <LanguageIcon className={style.icon} />
            </label>
            <span>www.dadehbaan.ir</span>
          </span>
        </div>
      </div>
      <div className={style.loginFormContainer}>
        <div className={style.loginForm}>
          <LockIcon className={style.lockIcon} />
          <h1>ورود به پنل</h1>
          <Input
            onchange={userHandler}
            type="username"
            value={user}
            label="نام کاربری"
            id={0}
            error={userErr && "لطفا نام کاربری را وارد کنید"}
          />
          <Input
            onchange={passHandler}
            type="password"
            value={pass}
            label="رمز عبور"
            id={1}
            error={passErr && "لطفا رمز عبور را وارد کنید"}
          />
          <div className={style.rememberMe}>
            <span>مرا به خاطر بسپار</span>
            <Checkbox onChange={rmCheckHandler} checked={rmCheck} {...label} />
          </div>
          <Button
            onClick={loginHandler}
            className={style.enterBtn}
            variant="contained"
          >
            ورود
          </Button>
          <a href="/" className={style.forgetPass}>
            فراموشی رمز عبور
          </a>
        </div>
      </div>
    </article>
  );
};
