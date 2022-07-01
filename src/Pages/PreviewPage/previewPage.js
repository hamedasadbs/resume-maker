/*inner components*/
import { useState, useEffect } from "react";
import axios from "axios";
/*css*/
import style from "./previewPage.module.scss";
import avatar from "../../Assets/Images/profile-avatar.png";
/*dataset*/
import { users } from "../../Middleware/Data/profileData";
import { interests } from "../../Middleware/Data/interestData";
import { general } from "../../Middleware/Data/generalData";
import { education } from "../../Middleware/Data/educationData";
import { courses } from "../../Middleware/Data/coursesData";
import { skills } from "../../Middleware/Data/skillsData";
/*MUI*/
import SettingsCellIcon from "@mui/icons-material/SettingsCell";
import EmailIcon from "@mui/icons-material/Email";
import MapIcon from "@mui/icons-material/Map";
import LanguageIcon from "@mui/icons-material/Language";
import CircleIcon from "@mui/icons-material/Circle";
/*child components*/
import { Header } from "../../Layouts/Header/header";
/*library*/
import * as cookie from "../../Middleware/Library/cookie";

export const PreviewPage = (props) => {
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
      points.push(<CircleIcon className={style.icon} />);
    }
    return points;
  };
  /*render component*/
  return (
    <div className={style.preview}>
      <Header title={props.title} setDashboard={props.setDashboard} />
      {dataset && (
        <main>
          <div className={style.topPage}>
            <aside>
              <img src={avatar} alt="avatar" />
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
                  <SettingsCellIcon className={style.icon} />
                </span>
                <span>
                  <div className={style.contact}>
                    <label>ایمیل</label>
                    <h1>{dataset.profile[0].email}</h1>
                  </div>
                  <EmailIcon className={style.icon} />
                </span>
                <span>
                  <div className={style.contact}>
                    <label>محل سکونت</label>
                    <h1>
                      {dataset.profile[0].state}/{dataset.profile[0].city}
                    </h1>
                  </div>
                  <MapIcon className={style.icon} />
                </span>
                <span>
                  <div className={style.contact}>
                    <label>آدرس وبسایت</label>
                    <h1>{dataset.profile[0].website}</h1>
                  </div>
                  <LanguageIcon className={style.icon} />
                </span>
              </div>
              <div className={style.interests}>
                <h1 className={style.title}>علایق پژوهشی</h1>
                {dataset.interests.map((interest) => (
                  <span>- {interest.interest}</span>
                ))}
              </div>
              <div className={style.lang}>
                <h1 className={style.title}>زبان</h1>
                {dataset.general.map((lang) => (
                  <main>
                    <label>- {lang.langName}</label>
                    <span>{langPoints(lang.ability)}</span>
                    {/* {lang.ability === 1 && <h1>بسیار کم</h1>}
                    {lang.ability === 2 && <h1>کم</h1>}
                    {lang.ability === 3 && <h1>متوسط</h1>}
                    {lang.ability === 4 && <h1>خوب</h1>}
                    {lang.ability === 5 && <h1>مسلط</h1>} */}
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
                {dataset.learning.map((course) => (
                  <span>
                    - {course.name} در وبسایت {course.website} به مدت{" "}
                    {course.time} ساعت
                  </span>
                ))}
              </div>
              <div className={style.skills}>
                <h1 className={style.title}>مهارت و توانمندی ها</h1>
                {dataset.skills.map((skill) => (
                  <span>- {skill.skill}</span>
                ))}
              </div>
            </article>
          </div>
        </main>
      )}
    </div>
  );
};
