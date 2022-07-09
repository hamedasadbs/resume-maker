import axios from "axios";
import { useEffect, useState } from "react";
import style from "./pdf.module.scss";
import * as cookie from "./Middleware/Library/cookie";

export const PDFFile = () => {
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/preview?username=${cookie.getCookie("username")}`
      )
      .then((res) => {
        setDataset(res.data.dataset);
      });
  }, []);

  /*render component*/
  return (
    <main className={style.divToPrint} id="divToPrint">
      {dataset && (
        <>
          <div className={style.topPage}>
            <aside>
              <img
                src={
                  require(`./Assets/Images/${dataset.profile[0].image}`).default
                }
                alt="avatar"
              />
              <div className={style.profile}>
                <h1 className={style.title}>پروفایل</h1>
                <p>{dataset.profile[0].title}</p>
              </div>
              <div className={style.contactInfo}>
                <h1 className={style.title}>اطلاعات تماس</h1>
                <span>
                  <div className={style.contact}>
                    <label>موبایل</label>
                    <h1>{dataset.profile[0].mobile}</h1>
                  </div>
                  {/* <SettingsCellIcon className={style.icon} /> */}
                </span>
                <span>
                  <div className={style.contact}>
                    <label>ایمیل</label>
                    <h1>{dataset.profile[0].email}</h1>
                  </div>
                  {/* <EmailIcon className={style.icon} /> */}
                </span>
                <span>
                  <div className={style.contact}>
                    <label>محل سکونت</label>
                    <h1>
                      {dataset.profile[0].state}/{dataset.profile[0].city}
                    </h1>
                  </div>
                  {/* <MapIcon className={style.icon} /> */}
                </span>
                <span>
                  <div className={style.contact}>
                    <label>آدرس وبسایت</label>
                    <h1>{dataset.profile[0].website}</h1>
                  </div>
                  {/* <LanguageIcon className={style.icon} /> */}
                </span>
              </div>
              <div className={style.interests}>
                <h1 className={style.title}>علایق پژوهشی</h1>
                {dataset.interests.map((interest, index) => (
                  <span key={index}>- {interest.interest}</span>
                ))}
              </div>
              <div className={style.lang}>
                <h1 className={style.title}>زبان</h1>
                {dataset.general.map((lang, index) => (
                  <main key={index}>
                    <label>- {lang.langName}</label>
                    {/* <span>{langPoints(lang.ability)}</span> */}
                  </main>
                ))}
              </div>
            </aside>
            <article>
              <span className={style.name}>
                <h1>
                  {dataset.profile[0].fname} {dataset.profile[0].lname}
                </h1>
              </span>
              <div className={style.education}>
                <h1 className={style.title}>تحصیلات</h1>
                <span>{dataset.education[0].last_grade}</span>
                <span>{dataset.education[0].university}</span>
                <span>عنوان پایان نامه: {dataset.education[0].thesis}</span>
                <span>سال {dataset.education[0].year}</span>
              </div>
              <div className={style.courses}>
                <h1 className={style.title}>دوره های آموزشی طی شده</h1>
                {dataset.learning.map((course, index) => (
                  <span key={index}>
                    - {course.name} در وبسایت {course.website} به مدت{" "}
                    {course.time} ساعت
                  </span>
                ))}
              </div>
              <div className={style.skills}>
                <h1 className={style.title}>مهارت و توانمندی ها</h1>
                {dataset.skills.map((skill, index) => (
                  <span key={index}>- {skill.skill}</span>
                ))}
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
                {dataset.projects.map((project, index) => (
                  <div key={index} className={style.projectContainer}>
                    <span>- {project.description}</span>
                    <div className={style.projectTitle}>
                      <h1>{project.title}</h1>
                    </div>
                    <div className={style.projectDate}>
                      <h1>{project.date}</h1>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </>
      )}
    </main>
  );
};
