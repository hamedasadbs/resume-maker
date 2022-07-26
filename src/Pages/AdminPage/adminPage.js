/*css*/
import style from "./adminPage.module.scss";
/*child components*/
import { Header } from "../../Layouts/Header/header";
import { NavBar } from "../../Layouts/NavBar/navBar";
import { Footer } from "../../Layouts/Footer/footer";
import { AddUser } from "./AddUser/addUser";

export const AdminPage = () => {
  /*render component*/
  return (
    <article className={style.adminPage}>
      <Header title={"پنل مدیریت کاربران"} />
      <main>
        <div className={style.information}>
          <AddUser />
        </div>
      </main>
      <Footer />
    </article>
  );
};
