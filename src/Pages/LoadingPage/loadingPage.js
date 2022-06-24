/*inner components*/
import { useEffect } from "react";
import ReactLoading from "react-loading";
/*css*/
import style from "./loadingPage.module.scss";
/*library*/
import * as dark from "../../Middleware/Library/darkMode";

export const LoadingPage = (props) => {
  /*dark mode*/
  useEffect(() => {
    dark.darkMode(style.loading, style.loading_dark, props.darkMode);
  }, [props.darkMode]);
  /*render component*/
  return (
    <div className={style.loading}>
      <ReactLoading
        className={style.loadBar}
        type="bars"
        color={props.darkMode ? "#EEEEEE" : "rgb(99, 99, 99)"}
      />
      <h1 className={style.loadTitle}>...در حال بارگذاری</h1>
    </div>
  );
};
