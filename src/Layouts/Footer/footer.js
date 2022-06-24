/*css*/
import style from "./footer.module.scss";
/*MUI*/
import CopyrightIcon from "@mui/icons-material/Copyright";

export const Footer = (props) => {
  return (
    /*render component*/
    <footer className={style.footer}>
      <h1 className={style.version}>نسخه 3.2.1</h1>
      <div className={style.license}>
        <h1>
          <CopyrightIcon className={style.icon} />
          طراحی و توسعه توسط شرکت دژافزار داده بان سبلان سریر 1400-1394
        </h1>
      </div>
    </footer>
  );
};
