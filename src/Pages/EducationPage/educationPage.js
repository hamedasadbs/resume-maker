/*inner components*/
import { useState } from "react";
/*css*/
import style from "./educationPage.module.scss";
/*child components*/
import { Header } from "../../Layouts/Header/header";
import { NavBar } from "../../Layouts/NavBar/navBar";
import { Footer } from "../../Layouts/Footer/footer";
import { Input } from "../../Components/Input/input";
/*MUI*/
import Button from "@mui/material/Button";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

export const EducationPage = (props) => {
  const [university, setUniversity] = useState("دانشگاه محقق اردبیلی");
  const [grade, setGrade] = useState("کارشناس مهندسی نرم افزار");
  const [subject, setSubject] = useState(
    "طراحی و پیاده¬سازی داشبورد مدیریتی سازگار با گذرگاه سرویس سازمانی (ESB) تحت استاندارد IEC61968"
  );
  const [date, setDate] = useState("1396-1400");
  /*render component*/
  return (
    <article className={style.educationPage}>
      <Header title={props.title} setDashboard={props.setDashboard} />
      <h1 className={style.title}>داشبورد/{props.title}</h1>
      <main>
        <div className={style.information}>
          <Input
            onchange={(e, newValue) => {
              setUniversity(newValue);
            }}
            type="username"
            value={university}
            label="دانشگاه محل تحصیل"
            align="right"
            direction="rtl"
            id={10}
          />
          <Input
            onchange={(e, newValue) => {
              setGrade(newValue);
            }}
            type="username"
            value={grade}
            label="آخرین مدرک تحصیلی"
            align="right"
            direction="rtl"
            id={1}
          />
          <Input
            onchange={(e, newValue) => {
              setSubject(newValue);
            }}
            type="username"
            value={subject}
            label="عنوان پایان نامه"
            align="right"
            direction="rtl"
            id={2}
          />
          <Input
            onchange={(e, newValue) => {
              setDate(newValue);
            }}
            type="username"
            value={date}
            label="سال تحصیل"
            align="left"
            direction="ltr"
            id={3}
          />
          <Input
            onchange={(e, newValue) => {
              setDate(newValue);
            }}
            type="username"
            value={date}
            label="سال تحصیل"
            align="left"
            direction="ltr"
            id={4}
          />
          <Input
            onchange={(e, newValue) => {
              setDate(newValue);
            }}
            type="username"
            value={date}
            label="سال تحصیل"
            align="left"
            direction="ltr"
            id={5}
          />
          <div className={style.saveBtnContainer}>
            <Button className={style.save} variant="contained">
              <span>ذخیره تغییرات</span>
              <SaveOutlinedIcon className={style.icon} />
            </Button>
          </div>
        </div>
        <NavBar dashboard={props.setDashboard} />
      </main>
      <Footer />
    </article>
  );
};
