/*inner components*/
import ReactLoading from "react-loading";
/*css*/
import style from "./loadingPage.module.scss";

export const LoadingPage = (props) => {
  /*render component*/
  return (
    <div className={style.loading}>
      <ReactLoading
        className={style.loadBar}
        type="spinningBubbles"
        color={props.darkMode ? "#EEEEEE" : "rgb(99, 99, 99)"}
      />
      <h1 className={style.loadTitle}>...در حال بارگذاری</h1>
    </div>
  );
};
