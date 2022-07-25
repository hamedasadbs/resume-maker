/*inner components*/
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
/*css*/
import style from "./navBar.module.scss";
/*MUI*/
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SchoolIcon from "@mui/icons-material/School";

import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

// import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
// import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonIcon from "@mui/icons-material/Person";

import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import HandymanIcon from "@mui/icons-material/Handyman";

export const NavBar = (props) => {
  /*variables*/
  let location = useLocation();

  const navigation = [
    "اطلاعات فردی",
    "اطلاعات آموزشی",
    "سوابق تحصیلی",
    "مهارت ها",
    "پروژه ها",
    "لینک ها",
    "دستاورد ها",
  ];

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
        hrefNavHandler(navigation[0]);
        break;
      case "/learning_info":
        hrefNavHandler(navigation[1]);
        break;
      case "/education_history":
        hrefNavHandler(navigation[2]);
        break;
      case "/skills":
        hrefNavHandler(navigation[3]);
        break;
      case "/projects":
        hrefNavHandler(navigation[4]);
        break;
      case "/links":
        hrefNavHandler(navigation[5]);
        break;
      case "/awards":
        hrefNavHandler(navigation[6]);
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
          id={navigation[0]}
          onClick={navHandler}
          className={style.link}
          to="/personal_info"
        >
          <span>{navigation[0]}</span>
          {location.pathname === "/personal_info" ? (
            <PersonIcon className={style.icon} />
          ) : (
            <PersonOutlineIcon className={style.icon} />
          )}
          <div className={style.tooltip}>{navigation[0]}</div>
        </Link>
        <Link
          id={navigation[1]}
          onClick={navHandler}
          className={style.link}
          to="/learning_info"
        >
          <span>{navigation[1]}</span>
          {location.pathname === "/learning_info" ? (
            <LocalLibraryIcon className={style.icon} />
          ) : (
            <LocalLibraryOutlinedIcon className={style.icon} />
          )}
          <div className={style.tooltip}>{navigation[1]}</div>
        </Link>
        <Link
          id={navigation[2]}
          onClick={navHandler}
          className={style.link}
          to="/education_history"
        >
          <span>{navigation[2]}</span>
          {location.pathname === "/education_history" ? (
            <SchoolIcon className={style.icon} />
          ) : (
            <SchoolOutlinedIcon className={style.icon} />
          )}
          <div className={style.tooltip}>{navigation[2]}</div>
        </Link>
        <Link
          id={navigation[3]}
          onClick={navHandler}
          className={style.link}
          to="/skills"
        >
          <span>{navigation[3]}</span>
          {location.pathname === "/skills" ? (
            <HandymanIcon className={style.icon} />
          ) : (
            <HandymanOutlinedIcon className={style.icon} />
          )}
          <div className={style.tooltip}>{navigation[3]}</div>
        </Link>
        <Link
          id={navigation[4]}
          onClick={navHandler}
          className={style.link}
          to="/projects"
        >
          <span>{navigation[4]}</span>
          {location.pathname === "/projects" ? (
            <AccountTreeIcon className={style.icon} />
          ) : (
            <AccountTreeOutlinedIcon className={style.icon} />
          )}
          <div className={style.tooltip}>{navigation[4]}</div>
        </Link>
        {/* <Link
          id={navigation[5]}
          onClick={navHandler}
          className={style.link}
          to="/links"
        >
          <span>{navigation[5]}</span>
          <AttachmentOutlinedIcon className={style.icon} />
          <div className={style.tooltip}>{navigation[5]}</div>
        </Link> */}
        {/* <Link
          id={navigation[6]}
          onClick={navHandler}
          className={style.link}
          to="/awards"
        >
          <span>{navigation[6]}</span>
          <EmojiEventsOutlinedIcon className={style.icon} />
          <div className={style.tooltip}>{navigation[6]}</div>
        </Link> */}
      </nav>
    </div>
  );
};
