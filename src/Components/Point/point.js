/*inner components*/
import { useEffect, useState } from "react";
/*css*/
import style from "./point.module.scss";
/*MUI*/
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

export const Point = (props) => {
  const [pointTags, setPointTags] = useState([]);
  let checked = [];

  const points = () => {
    let points = [];
    for (let i = 0; i < 5; i++) {
      points.push(
        <span key={i} id={i} onClick={pointHandler} className={style.point}>
          {checked.includes(i) ? (
            <RadioButtonCheckedIcon
              className={`${style.icon} ${style.activeIcon}`}
            />
          ) : (
            <RadioButtonUncheckedIcon className={style.icon} />
          )}

          <p>{i + 1}</p>
        </span>
      );
    }

    setPointTags(points);
  };

  const pointHandler = (e) => {
    props.setAbility(parseInt(e.currentTarget.id) + 1);
    for (let i = 0; i < checked.length; i++) checked.pop();
    for (let i = 0; i < parseInt(e.currentTarget.id) + 1; i++) checked.push(i);

    points();
  };

  useEffect(() => {
    points();

    return () => {
      setPointTags([]);
    };
  }, []);

  /*render component*/
  return (
    <>
      <div className={style.pointContainer}>
        <span className={style.label}>{props.label}</span>
        <main>{pointTags}</main>
      </div>
    </>
  );
};
