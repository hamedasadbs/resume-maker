/*inner components*/
import { useEffect } from "react";
/*css*/
import style from "./pulse.module.scss";
/*library*/
import * as dark from "../../Middleware/Library/darkMode";

export const Pulse = (props) => {
  /*dark mode*/
  useEffect(() => {
    dark.darkMode(style.heartRate, style.heartRate_dark, props.darkMode);
  }, [props.darkMode]);
  /*render component*/
  return (
    <div className={style.heartRate}>
      {props.title === "start" ? (
        <>
          <svg height="200" width="500">
            <polyline
              points="0,
                    45.486 18.514,
                    45.486 24.595,
                    45.486 30.676,
                    45.486 37.771,
                    45.486 42.838,
                    45.486 51.959,
                    45.486 60.067,
                    45.486 70,
                    45.486 100,
                    45.486"
              style={{
                fill: "none",
                stroke: "rgb(226, 39, 79)",
                strokeWidth: 4,
              }}
            />
          </svg>
          <div className={style.fadeIn}></div>
          <div className={style.fadeOut}></div>
        </>
      ) : (
        <>
          <svg height="200" width="500">
            <polyline
              points="0,
                    45.486 18.514,
                    45.486 24.595,
                    33.324 30.676,
                    45.486 37.771,
                    45.486 42.838,
                    55.622 51.959,
                    20 60.067,
                    45.486 70,
                    45.486 100,
                    45.486"
              style={{
                fill: "none",
                stroke: "rgb(226, 39, 79)",
                strokeWidth: 4,
                boxShadow: "box-shadow: 1px 2px 3px red",
              }}
            />
          </svg>
          <div className={`${style.fadeIn} ${style.delay}`}></div>
          <div className={`${style.fadeOut} ${style.delay}`}></div>
        </>
      )}
    </div>
  );
};
