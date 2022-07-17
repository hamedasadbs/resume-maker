/*css*/
import style from "./technology.module.scss";
/*inner components*/
import { useEffect, useState } from "react";
import axios from "axios";
/*inner components*/
import { DeviceTable } from "./DeviceTable/deviceTable";
import { Input } from "../../../Components/Input/input";
/*MUI*/
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
/*library*/
import * as cookie from "../../../Middleware/Library/cookie";

export const Technology = (props) => {
  const [title, setTitle] = useState("");
  const [techTitle, setTechTitle] = useState([]);
  const [technology, setTechnology] = useState([]);

  const addTechTitleHandler = () => {
    if (title === "") alert("لطفا تمام بخش های مورد نیاز را پر کنید");
    else {
      console.log("title is:" + title);
      console.log("username is:" + cookie.getCookie("username"));
      axios
        .post("http://localhost:8080/techTitle", {
          title,
          username: cookie.getCookie("username"),
        })
        .then(() => {
          setTitle("");
          getTechTitleHandler();
          getTechnologyHandler();
        })
        .catch(() => {
          alert("عنوان تکنولوژی اضافه نشد");
        });
    }
  };

  const getTechTitleHandler = () => {
    axios
      .get(
        `http://localhost:8080/techTitle?username=${cookie.getCookie(
          "username"
        )}`
      )
      .then((res) => {
        setTechTitle(res.data.dataset);
      })
      .catch(() => {
        alert("متاسفانه مشکلی در دریافت اطلاعات عنوان به وجود آمد");
      });
  };

  const getTechnologyHandler = () => {
    axios
      .get(
        `http://localhost:8080/technology?username=${cookie.getCookie(
          "username"
        )}`
      )
      .then((res) => {
        setTechnology(res.data.dataset);
      })
      .catch(() => {
        alert("متاسفانه مشکلی در دریافت اطلاعات تکنولوژی به وجود آمد");
      });
  };

  useEffect(() => {
    getTechTitleHandler();
    getTechnologyHandler();

    return () => {
      setTechTitle([]);
      setTechnology([]);
    };
  }, []);

  const removeTechTitleHandler = (item) => {
    axios
      .delete(
        `http://localhost:8080/techTitle?username=${cookie.getCookie(
          "username"
        )}&item=${item}`
      )
      .then(() => {
        getTechTitleHandler();
        getTechnologyHandler();
      })
      .catch(() => {
        alert("عنوان مورد نظر حذف نشد");
      });
  };

  const removeTechnologyHandler = (item) => {
    axios
      .delete(
        `http://localhost:8080/technology?username=${cookie.getCookie(
          "username"
        )}&item=${item}`
      )
      .then(() => {
        getTechTitleHandler();
        getTechnologyHandler();
      })
      .catch(() => {
        alert("تکنولوژی مورد نظر حذف نشد");
      });
  };

  /*render component*/
  return (
    <div className={style.technology}>
      <div className={style.addTechnology}>
        <Input
          type="username"
          align="center"
          direction="ltr"
          id={0}
          label="عنوان تکنولوژی"
          width="70%"
          value={title}
          onchange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Button
          className={style.save}
          variant="contained"
          endIcon={<AddIcon />}
          onClick={addTechTitleHandler}
        >
          افزودن عنوان تکنولوژی
        </Button>
      </div>
      <div className={style.table}>
        <DeviceTable
          techTitle={techTitle}
          technology={technology}
          removeTechTitleHandler={removeTechTitleHandler}
          removeTechnologyHandler={removeTechnologyHandler}
          setIsModalOpen={props.setIsModalOpen}
        />
      </div>
    </div>
  );
};
