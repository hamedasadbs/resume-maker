/*inner components*/
import { useState } from "react";
/*css*/
import style from "./personalPage.module.scss";
/*child components*/
import { Header } from "../../Layouts/Header/header";
import { NavBar } from "../../Layouts/NavBar/navBar";
import { Footer } from "../../Layouts/Footer/footer";
import { Input } from "../../Components/Input/input";
/*images*/
import userPhoto from "../../Assets/Images/no_photo.png";
/*MUI*/
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

export const PersonalPage = (props) => {
  const [fname, setFname] = useState("حامد");
  const [lname, setLname] = useState("اسداللهی");
  const [title, setTitle] = useState("کارشناس توسعه دهنده فرانت اند");
  const [city, setCity] = useState("اردبیل");
  const [state, setState] = useState("اردبیل");
  const [mobile, setMobile] = useState("09338599015");
  const [email, setEmail] = useState("h_asadollahi@uma.ac.ir");
  const [website, setWebsite] = useState("www.multiav.cert.ir");
  /*render component*/
  return (
    <article className={style.personalPage}>
      <Header title={props.title} setDashboard={props.setDashboard} />
      <h1 className={style.title}>داشبورد/{props.title}</h1>
      <main>
        <div className={style.information}>
          <div className={style.profileImage}>
            <Button className={style.button} variant="contained">
              <span>آپلود تصویر پروفایل</span>
              <FileUploadOutlinedIcon className={style.icon} />
            </Button>
            <img src={userPhoto} alt="profile" />
          </div>
          <Input
            onchange={(e, newValue) => {
              setFname(newValue);
            }}
            type="username"
            value={fname}
            label="نام"
            align="right"
            direction="rtl"
            id={0}
          />
          <Input
            onchange={(e, newValue) => {
              setLname(newValue);
            }}
            type="username"
            value={lname}
            label="نام خانوادگی"
            align="right"
            direction="rtl"
            id={1}
          />
          <Input
            onchange={(e, newValue) => {
              setTitle(newValue);
            }}
            type="username"
            value={title}
            label="عنوان"
            align="right"
            direction="rtl"
            id={2}
          />
          <Input
            onchange={(e, newValue) => {
              setCity(newValue);
            }}
            type="username"
            value={city}
            label="شهر محل سکونت"
            align="right"
            direction="rtl"
            id={3}
          />
          <Input
            onchange={(e, newValue) => {
              setState(newValue);
            }}
            type="username"
            value={state}
            label="استان محل سکونت"
            align="right"
            direction="rtl"
            id={4}
          />
          <Input
            onchange={(e, newValue) => {
              setMobile(newValue);
            }}
            type="username"
            value={mobile}
            label="شماره موبایل"
            align="left"
            direction="ltr"
            id={5}
          />
          <Input
            onchange={(e, newValue) => {
              setEmail(newValue);
            }}
            type="username"
            value={email}
            label="ایمیل"
            align="left"
            direction="ltr"
            id={6}
          />
          <Input
            onchange={(e, newValue) => {
              setWebsite(newValue);
            }}
            type="username"
            value={website}
            label="آدرس وبسایت"
            align="left"
            direction="ltr"
            id={7}
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
