/*inner components*/
import { useState, useEffect, createRef } from "react";
import axios from "axios";
/*css*/
import style from "./previewPage.module.scss";
/*child components*/
import { Header } from "../../Layouts/Header/header";
/*library*/
import * as cookie from "../../Middleware/Library/cookie";
import * as base64Lib from "../../Middleware/Library/base64Lib";
/*image*/
import noPhoto from "../../Assets/Images/no_photo.png";

import "font-awesome/css/font-awesome.min.css";

export const PreviewPage = (props) => {
  const [dataset, setDataset] = useState(null);
  const [image, setImage] = useState(noPhoto);

  const getDataHandler = () => {
    axios
      .get(
        `http://localhost:8080/preview?username=${cookie.getCookie("username")}`
      )
      .then((res) => {
        setDataset(res.data.dataset);
      });
  };

  useEffect(() => {
    if (dataset) {
      if (dataset.profile[0].image) {
        let myImg = base64Lib.toFile(
          dataset.profile[0].image,
          dataset.profile[0].image_name
        );
        setImage(URL.createObjectURL(myImg));
      }
    }
  }, [dataset]);

  useEffect(() => {
    getDataHandler();
    getDataHandler();
  }, []);

  const langPoints = (num) => {
    let points = [];

    for (let i = 0; i < num; i++) {
      points.push(<i key={i} className={`${style.icon} fa fa-circle`}></i>);
    }
    return points;
  };

  const ref = createRef();
  /*render component*/
  return (
    <div className={style.preview}>
      <Header title={props.title} setDashboard={props.setDashboard} />
      {dataset && (
        <main ref={ref} id="divToPrint">
          <div className={style.topPage}>
            <aside>
              <img src={image} alt="avatar" />
              <div className={style.profile}>
                <h1 className={style.title}>پروفایل</h1>
                <p>
                  {dataset.profile[0].title
                    ? dataset.profile[0].title
                    : "عنوان"}
                </p>
              </div>
              <div className={style.contactInfo}>
                <h1 className={style.title}>اطلاعات تماس</h1>
                <span>
                  <div className={style.contact}>
                    <label>موبایل</label>
                    <h1>
                      {dataset.profile[0].mobile
                        ? dataset.profile[0].mobile
                        : "*********09"}
                    </h1>
                  </div>
                  <div className={style.iconContainer}>
                    <i className={`${style.icon} fa fa-mobile`}></i>
                  </div>
                </span>
                <span>
                  <div className={style.contact}>
                    <label>ایمیل</label>
                    <h1>
                      {dataset.profile[0].email
                        ? dataset.profile[0].email
                        : "example@yahoo.com"}
                    </h1>
                  </div>
                  <div className={style.iconContainer}>
                    <i className={`${style.icon} fa fa-envelope-o`}></i>
                  </div>
                </span>
                <span>
                  <div className={style.contact}>
                    <label>محل سکونت</label>
                    <h1>
                      {dataset.profile[0].state ? dataset.profile[0].state : ""}{" "}
                      /{" "}
                      {dataset.profile[0].city
                        ? dataset.profile[0].city
                        : "استان و شهر"}
                    </h1>
                  </div>
                  <div className={style.iconContainer}>
                    <i className={`${style.icon} fa fa-map-marker`}></i>
                  </div>
                </span>
                <span>
                  <div className={style.contact}>
                    <label>آدرس وبسایت</label>
                    <h1>
                      {dataset.profile[0].website
                        ? dataset.profile[0].website
                        : "www.example.com"}
                    </h1>
                  </div>
                  <div className={style.iconContainer}>
                    <i className={`${style.icon} fa fa-globe`}></i>
                  </div>
                </span>
              </div>

              <div className={style.interests}>
                <h1 className={style.title}>علایق پژوهشی</h1>
                {dataset.interests.length ? (
                  dataset.interests.map((interest, index) => (
                    <span key={index}>- {interest.interest}</span>
                  ))
                ) : (
                  <span></span>
                )}
              </div>

              <div className={style.lang}>
                <h1 className={style.title}>زبان</h1>
                {dataset.general.length ? (
                  dataset.general.map((lang, index) => (
                    <main key={index}>
                      <label>- {lang.langName}</label>
                      <span>{langPoints(lang.ability)}</span>
                    </main>
                  ))
                ) : (
                  <span></span>
                )}
              </div>
            </aside>
            <article>
              <span className={style.name}>
                <h1>
                  {dataset.profile[0].fname
                    ? dataset.profile[0].fname
                    : "نام و"}{" "}
                  {dataset.profile[0].lname
                    ? dataset.profile[0].lname
                    : "نام خانوادگی"}
                </h1>
              </span>
              <div className={style.education}>
                <h1 className={style.title}>تحصیلات</h1>
                {dataset.education[0].university ? (
                  <>
                    <span>{dataset.education[0].last_grade}</span>
                    <span>{dataset.education[0].university}</span>
                    <span>عنوان پایان نامه: {dataset.education[0].thesis}</span>
                    <span>سال {dataset.education[0].year}</span>
                  </>
                ) : (
                  <span></span>
                )}
              </div>

              <div className={style.courses}>
                <h1 className={style.title}>دوره های آموزشی طی شده</h1>
                {dataset.learning.length ? (
                  dataset.learning.map((course, index) => (
                    <span key={index}>
                      - {course.name} در وبسایت {course.website} به مدت{" "}
                      {course.time} ساعت
                    </span>
                  ))
                ) : (
                  <span></span>
                )}
              </div>
              <div className={style.skills}>
                <h1 className={style.title}>مهارت و توانمندی ها</h1>
                {dataset.skills.length ? (
                  dataset.skills.map((skill, index) => (
                    <span key={index}>- {skill.skill}</span>
                  ))
                ) : (
                  <span></span>
                )}
              </div>

              <div className={style.technology}>
                <h1 className={style.title}>تکنولوژی های کاری</h1>
                {dataset.techTitle.length ? (
                  dataset.techTitle.map((title, index) => (
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
                  ))
                ) : (
                  <span></span>
                )}
              </div>
            </article>
          </div>

          <div className={style.bottomPage}>
            <aside>
              <div className={style.title}>
                سامانه ها و محصولات طراحی و توســـعه یافته
              </div>
            </aside>
            <article>
              <div className={style.projects}>
                {dataset.projects.length ? (
                  dataset.projects.map((project, index) => (
                    <div key={index} className={style.projectContainer}>
                      <span>- {project.description}</span>
                      <div className={style.projectTitle}>
                        <h1>{project.title}</h1>
                      </div>
                      <div className={style.projectDate}>
                        <h1>{project.date}</h1>
                      </div>
                    </div>
                  ))
                ) : (
                  <span></span>
                )}
              </div>
            </article>
          </div>
        </main>
      )}
    </div>
  );
};
