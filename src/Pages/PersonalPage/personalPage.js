/*inner components*/
import { useEffect, useState, useRef } from "react";
import axios from "axios";
/*css*/
import style from "./personalPage.module.scss";
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
import * as base64Lib from "../../Middleware/Library/base64Lib";
/*image*/
import noPhoto from "../../Assets/Images/no_photo.png";

export const PersonalPage = (props) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [imageName, setImageName] = useState("no_photo.png");
  const [image, setImage] = useState(noPhoto);
  /*refs*/
  const inputFile = useRef();

  const fileUploadArea = useRef();
  /*file handler*/
  async function fileHandler(x) {
    const files = x.files;
    if ("files" in x) {
      if (files.length === 0) {
        alert("لطفا یک فایل را انتخاب کنید");
      } else {
        if (files[0].size < 100000) {
          setImageName(files[0].name);

          let base64 = await base64Lib.toBase64(files[0]);
          setImage(base64);
        } else alert("حجم تصویر انتخابی باید کمتر از 100 کبلوبایت باشد");
      }
    }
  }
  /*upload handler*/
  const uploadFileHandler = () => {
    fileHandler(inputFile.current);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/profile?username=${cookie.getCookie("username")}`
      )
      .then((res) => {
        setFname(res.data.fname);
        setLname(res.data.lname);
        setTitle(res.data.title);
        setCity(res.data.city);
        setState(res.data.state);
        setMobile(res.data.mobile);
        setEmail(res.data.email);
        setWebsite(res.data.website);
        setImageName(res.data.imageName && res.data.imageName);
        if (res.data.image) {
          let myImg = base64Lib.toFile(res.data.image, res.data.imageName);
          setImage(URL.createObjectURL(myImg));
        }
      });
  }, []);

  const saveChangesHandler = () => {
    axios
      .post(`http://localhost:8080/profile`, {
        username: cookie.getCookie("username"),
        fname,
        lname,
        title,
        city,
        state,
        mobile,
        email,
        website,
        imageName,
        image,
      })
      .then(() => {
        alert("اطلاعات شما با موفقیت ذخیره شد");
      })
      .catch(() => {
        alert("متاسفانه مشکلی در ذخیره اطلاعات به وجود آمد");
      });
  };

  /*render component*/
  return (
    <article className={style.personalPage}>
      <Header title={props.title} setDashboard={props.setDashboard} />
      <main>
        <div className={style.information}>
          <div className={style.profileImage}>
            <div ref={fileUploadArea} className={style.fileUploadArea}>
              <label htmlFor="inputFile" className={style.customUploadInput}>
                <i className="fa fa-cloud-upload"></i> آپلود تصویر پروفایل
              </label>
              <input
                onChange={uploadFileHandler}
                className={style.upload}
                type="file"
                id="inputFile"
                ref={inputFile}
              />
            </div>
            <img src={image} alt="profile" />
          </div>
          <Input
            onchange={(e) => {
              setFname(e.target.value);
            }}
            type="username"
            value={fname}
            label="نام"
            align="right"
            direction="rtl"
            id={0}
          />
          <Input
            onchange={(e) => {
              setLname(e.target.value);
            }}
            type="username"
            value={lname}
            label="نام خانوادگی"
            align="right"
            direction="rtl"
            id={1}
          />
          <Input
            onchange={(e) => {
              setTitle(e.target.value);
            }}
            type="username"
            value={title}
            label="عنوان"
            align="right"
            direction="rtl"
            id={2}
          />
          <Input
            onchange={(e) => {
              setCity(e.target.value);
            }}
            type="username"
            value={city}
            label="شهر محل سکونت"
            align="right"
            direction="rtl"
            id={3}
          />
          <Input
            onchange={(e) => {
              setState(e.target.value);
            }}
            type="username"
            value={state}
            label="استان محل سکونت"
            align="right"
            direction="rtl"
            id={4}
          />
          <Input
            onchange={(e) => {
              setMobile(e.target.value);
            }}
            type="username"
            value={mobile}
            label="شماره موبایل"
            align="left"
            direction="ltr"
            id={5}
          />
          <Input
            onchange={(e) => {
              setEmail(e.target.value);
            }}
            type="username"
            value={email}
            label="ایمیل"
            align="left"
            direction="ltr"
            id={6}
          />
          <Input
            onchange={(e) => {
              setWebsite(e.target.value);
            }}
            type="username"
            value={website}
            label="آدرس وبسایت"
            align="left"
            direction="ltr"
            id={7}
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
