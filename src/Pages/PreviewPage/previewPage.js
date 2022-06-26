/*inner components*/
import { Header } from "../../Layouts/Header/header";
/*css*/
import style from "./previewPage.module.scss";

export const PreviewPage = (props) => {
  /*render component*/
  return (
    <div className={style.preview}>
      <Header title={props.title} setDashboard={props.setDashboard} />
      <main></main>
    </div>
  );
};
