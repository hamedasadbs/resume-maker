/*inner components*/
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
/*css*/
import style from "./navBar.module.scss";
/*MUI*/
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonIcon from "@mui/icons-material/Person";

import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";

export const NavBar = (props) => {
  /*variables*/
  let location = useLocation();

  const nav = useRef();
  /*initialize slide nav links*/
  useEffect(() => {
    nav.current.classList.add(style.activeLink);
  }, []);
  /*set slide nav links*/
  useEffect(() => {
    const hrefNavHandler = (e) => {
      const nav = document.getElementById(e);
      const otherId = `:not([id^='${e}'])`;
      const others = document.querySelectorAll(otherId);
      for (let i = 0; i < others.length; i++) {
        others[i].classList.remove(style.activeLink);
      }
      nav.classList.add(style.activeLink);
      props.dashboard(e);
    };

    switch (location.pathname) {
      case "/personal_info":
        hrefNavHandler("اطلاعات فردی");
        break;
      case "/learning_info":
        hrefNavHandler("اطلاعات آموزشی");
        break;
      case "/education_history":
        hrefNavHandler("سوابق تحصیلی");
        break;
      case "/skills":
        hrefNavHandler("مهارت ها");
        break;
      case "/projects":
        hrefNavHandler("پروژه ها");
        break;
      case "/links":
        hrefNavHandler("لینک ها");
        break;
      case "/awards":
        hrefNavHandler("دستاورد ها");
        break;
      default:
        break;
    }
  }, [location.pathname, props]);
  /*set navigation*/
  const navHandler = (e) => {
    props.dashboard(e.currentTarget.id);
  };
  /*render component*/
  return (
    <div className={style.navContainer}>
      <nav className={style.navBar}>
        <Link
          ref={nav}
          id="اطلاعات فردی"
          onClick={navHandler}
          className={style.link}
          to="/personal_info"
        >
          <span>اطلاعات فردی</span>
          {location.pathname === "/personal_info" ? (
            <PersonIcon className={style.icon} />
          ) : (
            <PersonOutlineIcon className={style.icon} />
          )}
        </Link>
        <Link
          id="اطلاعات آموزشی"
          onClick={navHandler}
          className={style.link}
          to="/learning_info"
        >
          <span>اطلاعات آموزشی</span>
          {location.pathname === "/learning_info" ? (
            <LocalLibraryIcon className={style.icon} />
          ) : (
            <LocalLibraryOutlinedIcon className={style.icon} />
          )}
        </Link>
        <Link
          id="سوابق تحصیلی"
          onClick={navHandler}
          className={style.link}
          to="/education_history"
        >
          <span>سوابق تحصیلی</span>
          <SchoolOutlinedIcon className={style.icon} />
        </Link>
        <Link
          id="مهارت ها"
          onClick={navHandler}
          className={style.link}
          to="/skills"
        >
          <span>مهارت ها</span>
          <IntegrationInstructionsOutlinedIcon className={style.icon} />
        </Link>
        <Link
          id="پروژه ها"
          onClick={navHandler}
          className={style.link}
          to="/projects"
        >
          <span>پروژه ها</span>
          <AccountTreeOutlinedIcon className={style.icon} />
        </Link>
        <Link
          id="لینک ها"
          onClick={navHandler}
          className={style.link}
          to="/links"
        >
          <span>لینک ها</span>
          <AttachmentOutlinedIcon className={style.icon} />
        </Link>
        <Link
          id="دستاورد ها"
          onClick={navHandler}
          className={style.link}
          to="/awards"
        >
          <span>دستاوردها</span>
          <EmojiEventsOutlinedIcon className={style.icon} />
        </Link>
      </nav>
    </div>
  );
};
