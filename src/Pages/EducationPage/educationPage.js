/*inner components*/
import { useState, useEffect } from "react";
import axios from "axios";
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
/*library*/
import * as cookie from "../../Middleware/Library/cookie";

export const EducationPage = (props) => {
  const [university, setUniversity] = useState("");
  const [lastGrade, setLastGrade] = useState("");
  const [thesis, setThesis] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/education?username=${cookie.getCookie(
          "username"
        )}`
      )
      .then((res) => {
        setUniversity(res.data.university);
        setLastGrade(res.data.lastGrade);
        setThesis(res.data.thesis);
        setYear(res.data.year);
      });

    return () => {
      setUniversity("");
      setLastGrade("");
      setThesis("");
      setYear("");
    };
  }, []);

  const saveChangesHandler = () => {
    if (university === "" || lastGrade === "" || thesis === "" || year === "")
      alert("لطفا تمام بخش های مورد نیاز را پر کنید");
    else {
      axios
        .post(`http://localhost:8080/education`, {
          username: cookie.getCookie("username"),
          university,
          lastGrade,
          thesis,
          year,
        })
        .then(() => {
          alert("اطلاعات شما با موفقیت ذخیره شد");
        })
        .catch(() => {
          alert("متاسفانه مشکلی در ذخیره اطلاعات به وجود آمد");
        });
    }
  };
  /*render component*/
  return (
    <article className={style.educationPage}>
      <Header title={props.title} setDashboard={props.setDashboard} />
      <main>
        <div className={style.information}>
          <Input
            onchange={(e) => {
              setUniversity(e.target.value);
            }}
            type="username"
            value={university}
            label="دانشگاه محل تحصیل"
            align="right"
            direction="rtl"
            id={0}
          />
          <Input
            onchange={(e) => {
              setLastGrade(e.target.value);
            }}
            type="username"
            value={lastGrade}
            label="آخرین مدرک تحصیلی"
            align="right"
            direction="rtl"
            id={1}
          />
          <Input
            onchange={(e) => {
              setThesis(e.target.value);
            }}
            type="username"
            value={thesis}
            label="عنوان پایان نامه"
            align="right"
            direction="rtl"
            id={2}
          />
          <Input
            onchange={(e) => {
              setYear(e.target.value);
            }}
            type="username"
            value={year}
            label="سال تحصیل"
            align="left"
            direction="ltr"
            id={3}
          />
          <Input
            onchange={(e) => {
              setYear(e.target.value);
            }}
            type="username"
            value={year}
            label="سال تحصیل"
            align="left"
            direction="ltr"
            id={4}
          />
          <Input
            onchange={(e) => {
              setYear(e.target.value);
            }}
            type="username"
            value={year}
            label="سال تحصیل"
            align="left"
            direction="ltr"
            id={5}
          />
          <div className={style.saveBtnContainer}>
            <Button
              onClick={saveChangesHandler}
              className={style.save}
              variant="contained"
            >
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
