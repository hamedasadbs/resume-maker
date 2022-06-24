/*css*/
import style from "./learningPage.module.scss";
/*child components*/
import { Header } from "../../Layouts/Header/header";
import { NavBar } from "../../Layouts/NavBar/navBar";
import { Footer } from "../../Layouts/Footer/footer";
import { AddCourse } from "./AddCourse/addCourse";

export const LearningPage = (props) => {
  /*render component*/
  return (
    <article className={style.learningPage}>
      <Header title={props.title} setDashboard={props.setDashboard} />
      <h1 className={style.title}>داشبورد/{props.title}</h1>
      <main>
        <div className={style.information}>
          <AddCourse />
        </div>
        <NavBar dashboard={props.setDashboard} />
      </main>
      <Footer />
    </article>
  );
};
