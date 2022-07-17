/*inner components*/
import { useRef, useEffect, useState } from "react";
import axios from "axios";
/*css*/
import style from "./techModal.module.scss";
/*MUI*/
import InfoIcon from "@mui/icons-material/Info";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
/*library*/
import * as cookie from "../../../../../Middleware/Library/cookie";
/*child components*/
import { Point } from "../../../../../Components/Point/point";
import { Input } from "../../../../../Components/Input/input";

export const TechModal = (props) => {
  const techModal = useRef();

  const [tech, setTech] = useState("");
  const [ability, setAbility] = useState("");
  const [version, setVersion] = useState("");

  useEffect(() => {
    techModal.current.classList.add(style.growTechModal);
  }, []);

  const closeModal = () => {
    props.setIsModalOpen(false);
  };

  const addTechHandler = () => {
    if (tech === "" || ability === "" || version === "")
      alert("لطفا تمام بخش های مورد نیاز را پر کنید");
    else {
      setTech("");
      setAbility("");
      setVersion("");
      axios
        .post("http://localhost:8080/technology", {
          title: props.title,
          name: tech,
          ability,
          version,
          username: cookie.getCookie("username"),
        })
        .then(() => {
          // getDataHandler();
        })
        .catch(() => {
          alert("تکنولوژی مورد نظر اضافه نشد");
        });
    }
  };

  /*render component*/
  return (
    <main className={style.techModalContainer}>
      <article ref={techModal} className={style.techModal}>
        <div className={style.title}>
          <button onClick={closeModal}>
            <CancelIcon className={style.closeIcon} />
          </button>
          <h1>جزئیات</h1>
          <InfoIcon className={style.icon} />
        </div>
        <div className={style.body}>
          <Point label="میزان تسلط" ability={ability} setAbility={setAbility} />
          <Input
            type="username"
            align="left"
            direction="ltr"
            id={0}
            label="تکنولوژی"
            width="45%"
            value={tech}
            onchange={(e) => {
              setTech(e.target.value);
            }}
          />
          <Button
            className={style.add}
            variant="contained"
            endIcon={<AddIcon />}
            onClick={addTechHandler}
          >
            افزودن تکنولوژی
          </Button>
          <Input
            type="username"
            align="left"
            direction="ltr"
            id={1}
            label="نسخه"
            width="45%"
            value={version}
            onchange={(e) => {
              setVersion(e.target.value);
            }}
          />
        </div>
      </article>
    </main>
  );
};
