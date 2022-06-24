/*css*/
import style from "./header.module.scss";
import { Pulse } from "../../Components/Pulse/pulse";
/*image*/
import logo from "../../Assets/Images/dade-baan.png";
/*library*/
import * as cookie from "../../Middleware/Library/cookie";
/*MUI*/
import Button from "@mui/material/Button";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export const Header = (props) => {
  const logoutHandler = () => {
    cookie.setCookie("login", "", -100);
    cookie.setCookie("username", "", -100);
    cookie.setCookie("password", "", -100);
    cookie.setCookie("role", "", -100);
    window.location.href = "/login";
  };

  /*render component*/
  return (
    <header className={style.header}>
      <div className={style.headerLeftSide}>
        <Button className={`${style.button} ${style.fill}`} variant="contained">
          <span>دریافت فایل رزومه</span>
          <CloudDownloadOutlinedIcon className={style.icon} />
        </Button>
        <Button
          className={`${style.button} ${style.outlined}`}
          variant="outlined"
        >
          <span>مشاهده رزومه</span>
          <RemoveRedEyeOutlinedIcon className={style.icon} />
        </Button>
        <Button
          onClick={logoutHandler}
          className={`${style.button} ${style.texted}`}
          variant="text"
        >
          <span>خروج</span>
          <LogoutOutlinedIcon className={style.icon} />
        </Button>
      </div>
      <div className={style.mainLogo}>
        <Pulse title="start" />
        <img src={logo} alt="دژافزار داده بان" />
        <Pulse title="end" />
      </div>
      <div id="dashboard" className={style.titleContainer}>
        <h1 className={style.title}>{props.title}</h1>
      </div>
    </header>
  );
};
