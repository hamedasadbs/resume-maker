/*css*/
import { useState, useEffect } from "react";
import style from "./header.module.scss";
import { Pulse } from "../../Components/Pulse/pulse";
import { Link } from "react-router-dom";
/*image*/
import logo from "../../Assets/Images/dade-baan.png";
/*library*/
import * as cookie from "../../Middleware/Library/cookie";
/*MUI*/
import Button from "@mui/material/Button";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export const Header = (props) => {
  const [subTitle, setSubTitle] = useState(null);
  const logoutHandler = () => {
    cookie.setCookie("login", "", -100);
    cookie.setCookie("username", "", -100);
    cookie.setCookie("password", "", -100);
    cookie.setCookie("role", "", -100);
    window.location.href = "/login";
  };

  useEffect(() => {
    switch (props.subTitle) {
      case 0:
        setSubTitle("تکنولوژی های کاری");
        break;
      case 1:
        setSubTitle("علایق پژوهشی");
        break;
      case 2:
        setSubTitle("مهارت ها و توانمندی ها");
        break;
      case 3:
        setSubTitle("توانایی های عمومی");
        break;
      default:
        break;
    }
  }, [props.subTitle]);

  /*render component*/
  return (
    <header className={style.header}>
      <div className={style.headerLeftSide}>
        <Button className={`${style.button} ${style.fill}`} variant="contained">
          <span>دریافت فایل رزومه</span>
          <CloudDownloadOutlinedIcon className={style.icon} />
        </Button>
        {window.location.href === "http://localhost:3000/preview" ? (
          <Link to="/personal_info" className={style.link}>
            <Button
              className={`${style.button} ${style.outlined}`}
              variant="outlined"
            >
              <span>صفحه اصلی</span>
              <HomeOutlinedIcon className={style.icon} />
            </Button>
          </Link>
        ) : (
          <Link to="/preview" className={style.link}>
            <Button
              className={`${style.button} ${style.outlined}`}
              variant="outlined"
            >
              <span>مشاهده رزومه</span>
              <RemoveRedEyeOutlinedIcon className={style.icon} />
            </Button>
          </Link>
        )}

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
        <h1 className={style.title}>
          {props.title}
          {subTitle && " / " + subTitle}
        </h1>
      </div>
    </header>
  );
};
