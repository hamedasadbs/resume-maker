/*css*/
import style from "./projectPage.module.scss";
/*child components*/
import { Header } from "../../Layouts/Header/header";
import { NavBar } from "../../Layouts/NavBar/navBar";
import { Footer } from "../../Layouts/Footer/footer";
import { AddProject } from "./AddProject/addProject";

export const ProjectPage = (props) => {
  /*render component*/
  return (
    <article className={style.projectPage}>
      <Header title={props.title} setDashboard={props.setDashboard} />
      <h1 className={style.title}>داشبورد/{props.title}</h1>
      <main>
        <div className={style.information}>
          <AddProject />
        </div>
        <NavBar dashboard={props.setDashboard} />
      </main>
      <Footer />
    </article>
  );
};
