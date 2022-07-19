/*css*/
import style from "./header.module.scss";
import styles from "../../pdf.module.scss";
/*inner components*/
import { useState, useEffect, createRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
/*child components*/
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
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsCellIcon from "@mui/icons-material/SettingsCell";
import EmailIcon from "@mui/icons-material/Email";
import MapIcon from "@mui/icons-material/Map";
import LanguageIcon from "@mui/icons-material/Language";
import CircleIcon from "@mui/icons-material/Circle";

import ReactToPdf from "react-to-pdf";

export const Header = (props) => {
  const [subTitle, setSubTitle] = useState(null);
  const logoutHandler = () => {
    cookie.setCookie("login", "", -100);
    cookie.setCookie("username", "", -100);
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

  const ref = createRef();
  const options = {
    orientation: "portrait",
    unit: "in",
    format: [8.3, 11.7],
  };

  const [dataset, setDataset] = useState(null);

  const getDataHandler = () => {
    axios
      .get(
        `http://localhost:8080/preview?username=${cookie.getCookie("username")}`
      )
      .then((res) => {
        setDataset(res.data.dataset);
      })
      .catch(() => {
        alert("متاسفانه مشکلی در دریافت اطلاعات به وجود آمد");
      });
  };

  useEffect(() => {
    getDataHandler();
    getDataHandler();
  }, []);

  const langPoints = (num) => {
    let points = [];

    for (let i = 0; i < num; i++) {
      points.push(<CircleIcon key={i} className={style.icon} />);
    }
    return points;
  };

  /*render component*/
  return (
    <header className={style.header}>
      <div className={style.headerLeftSide}>
        <ReactToPdf
          targetRef={props.ref}
          filename={`${cookie.getCookie("username")}_CV.pdf`}
          options={options}
          x={0.5}
          y={0.5}
          scale={0.8}
        >
          {({ toPdf }) => (
            <Button
              onClick={toPdf}
              className={`${style.button} ${style.fill}`}
              variant="contained"
            >
              <span>دریافت فایل رزومه</span>
              <CloudDownloadOutlinedIcon className={style.icon} />
            </Button>
          )}
        </ReactToPdf>

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
