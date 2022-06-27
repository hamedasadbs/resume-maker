/*inner components*/
import { Header } from "../../Layouts/Header/header";
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

export const PreviewPage = (props) => {
  /*render component*/
  return (
    <div className={style.preview}>
      <Header title={props.title} setDashboard={props.setDashboard} />
      <main>
        <div className={style.topPage}>
          <aside>
            <img src={avatar} alt="avatar" />
            <div className={style.profile}>
              <h1 className={style.title}>پروفایل</h1>
              <p>{users[0].role}</p>
            </div>
            <div className={style.contactInfo}>
              <h1 className={style.title}>اطلاعات تماس</h1>
              {users[0].contacts.map((ct) => (
                <span>
                  <div className={style.contact}>
                    <label>{ct.label}</label>
                    <h1>{ct.value}</h1>
                  </div>
                  {ct.label === "موبایل" && (
                    <SettingsCellIcon className={style.icon} />
                  )}
                  {ct.label === "ایمیل" && <EmailIcon className={style.icon} />}
                  {ct.label === "محل سکونت" && (
                    <MapIcon className={style.icon} />
                  )}
                  {ct.label === "آدرس وبسایت" && (
                    <LanguageIcon className={style.icon} />
                  )}
                </span>
              ))}
            </div>
            <div className={style.interests}>
              <h1 className={style.title}>علایق پژوهشی</h1>
              {interests.map((interest) => (
                <span>- {interest}</span>
              ))}
            </div>
            <div className={style.lang}>
              <h1 className={style.title}>زبان</h1>
              {general.lang.map((lg) => (
                <>
                  <label>{lg.langName}</label>
                  <h1>{lg.ability}</h1>
                </>
              ))}
            </div>
          </aside>
          <article>
            <span className={style.name}>
              <h1>
                {users[0].fname} {users[0].lname}
              </h1>
            </span>
            <div className={style.education}>
              <h1 className={style.title}>تحصیلات</h1>
              <span>{education[0].lastGrade}</span>
              <span>{education[0].university}</span>
              <span>عنوان پایان نامه: {education[0].thesis}</span>
              <span>سال {education[0].year}</span>
            </div>
            <div className={style.courses}>
              <h1 className={style.title}>دوره های آموزشی طی شده</h1>
              {courses.map((course) => (
                <span>
                  - {course.courseName} در وبسایت {course.website} به مدت{" "}
                  {course.time} ساعت
                </span>
              ))}
            </div>
            <div className={style.skills}>
              <h1 className={style.title}>مهارت و توانمندی ها</h1>
              {skills.map((skill) => (
                <span>- {skill}</span>
              ))}
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};
