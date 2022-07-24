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

import "font-awesome/css/font-awesome.min.css";

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
    format: [8.3, 18],
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
      points.push(<i key={i} className={`${styles.icon} fa fa-circle`}></i>);
    }
    return points;
  };

  const showPdfHandler = () => {
    ref.current.style.display = "flex";
  };

  const hidePdfHandler = () => {
    setTimeout(() => {
      ref.current.style.display = "none";
    }, 50);
  };

  /*render component*/
  return (
    <header className={style.header}>
      <div className={style.headerLeftSide}>
        <ReactToPdf
          targetRef={ref}
          filename={`${cookie.getCookie("username")}_CV.pdf`}
          options={options}
          x={0.1}
          scale={0.9}
        >
          {({ toPdf }) => (
            <Button
              onClick={() => {
                showPdfHandler();
                toPdf();
                hidePdfHandler();
              }}
              className={`${style.button} ${style.fill}`}
              variant="contained"
            >
              <span>دریافت فایل رزومه</span>
              <CloudDownloadOutlinedIcon className={style.icon} />
            </Button>
          )}
        </ReactToPdf>
        <div ref={ref} className={styles.pdf}>
          {dataset && (
            <main className={styles.main} id="divToPrint">
              <div className={styles.topPage}>
                <aside>
                  <img
                    src={
                      require(`../../Assets/Images/${dataset.profile[0].image_name}`)
                        .default
                    }
                    alt="avatar"
                  />
                  <div className={styles.profile}>
                    <h1 className={styles.title}>پروفایل</h1>
                    <p>{dataset.profile[0].title}</p>
                  </div>
                  <div className={styles.contactInfo}>
                    <h1 className={styles.title}>اطلاعات تماس</h1>
                    <span>
                      <div className={styles.contact}>
                        <label>موبایل</label>
                        <h1>{dataset.profile[0].mobile}</h1>
                      </div>
                      <div className={styles.iconContainer}>
                        <i className={`${styles.icon} fa fa-mobile`}></i>
                      </div>
                    </span>
                    <span>
                      <div className={styles.contact}>
                        <label>ایمیل</label>
                        <h1>{dataset.profile[0].email}</h1>
                      </div>
                      <div className={styles.iconContainer}>
                        <i className={`${styles.icon} fa fa-envelope-o`}></i>
                      </div>
                    </span>
                    <span>
                      <div className={styles.contact}>
                        <label>محل سکونت</label>
                        <h1>
                          {dataset.profile[0].state}/{dataset.profile[0].city}
                        </h1>
                      </div>
                      <div className={styles.iconContainer}>
                        <i className={`${styles.icon} fa fa-map-marker`}></i>
                      </div>
                    </span>
                    <span>
                      <div className={styles.contact}>
                        <label>آدرس وبسایت</label>
                        <h1>{dataset.profile[0].website}</h1>
                      </div>
                      <div className={styles.iconContainer}>
                        <i className={`${styles.icon} fa fa-globe`}></i>
                      </div>
                    </span>
                  </div>
                  <div className={styles.interests}>
                    <h1 className={styles.title}>علایق پژوهشی</h1>
                    {dataset.interests.map((interest, index) => (
                      <span key={index}>- {interest.interest}</span>
                    ))}
                  </div>
                  <div className={styles.lang}>
                    <h1 className={styles.title}>زبان</h1>
                    {dataset.general.map((lang, index) => (
                      <main key={index}>
                        <label>- {lang.langName}</label>
                        <span>{langPoints(lang.ability)}</span>
                      </main>
                    ))}
                  </div>
                </aside>
                <article>
                  <span className={styles.name}>
                    <h1>
                      {dataset.profile[0].fname} {dataset.profile[0].lname}
                    </h1>
                  </span>
                  <div className={styles.education}>
                    <h1 className={styles.title}>تحصیلات</h1>
                    <span>{dataset.education[0].last_grade}</span>
                    <span>{dataset.education[0].university}</span>
                    <span>عنوان پایان نامه: {dataset.education[0].thesis}</span>
                    <span>سال {dataset.education[0].year}</span>
                  </div>
                  <div className={styles.courses}>
                    <h1 className={styles.title}>دوره های آموزشی طی شده</h1>
                    {dataset.learning.map((course, index) => (
                      <span key={index}>
                        - {course.name} در وبسایت {course.website} به مدت{" "}
                        {course.time} ساعت
                      </span>
                    ))}
                  </div>
                  <div className={styles.skills}>
                    <h1 className={styles.title}>مهارت و توانمندی ها</h1>
                    {dataset.skills.map((skill, index) => (
                      <span key={index}>- {skill.skill}</span>
                    ))}
                  </div>
                  <div className={styles.technology}>
                    <h1 className={styles.title}>تکنولوژی های کاری</h1>
                    {dataset.techTitle.map((title, index) => (
                      <ul key={index}>
                        <h1>{title.name}:</h1>
                        {dataset.technology.map(
                          (tech, i) =>
                            tech.title === title.name && (
                              <li key={i}>
                                {tech.name} [v{tech.version}]{" "}
                                <span className={style.techAbility}>
                                  {tech.ability == 1
                                    ? "Starter"
                                    : tech.ability == 2
                                    ? "Basic"
                                    : tech.ability == 3
                                    ? "Average"
                                    : tech.ability == 4
                                    ? "Master"
                                    : "Professor"}
                                </span>
                              </li>
                            )
                        )}
                      </ul>
                    ))}
                  </div>
                </article>
              </div>
              <div className={styles.bottomPage}>
                <aside>
                  <div className={styles.title}>
                    سامانه ها و محصولات طراحی و توســـعه یافته
                  </div>
                </aside>
                <article>
                  <div className={styles.projects}>
                    {dataset.projects.map((project, index) => (
                      <div key={index} className={styles.projectContainer}>
                        <span>- {project.description}</span>
                        <div className={styles.projectTitle}>
                          <h1>{project.title}</h1>
                        </div>
                        <div className={styles.projectDate}>
                          <h1>{project.date}</h1>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </main>
          )}
        </div>
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
