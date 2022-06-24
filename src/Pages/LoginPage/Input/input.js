/*inner components*/
import { useEffect, useRef } from "react";
/*css*/
import style from "./input.module.scss";

export const Input = (props) => {
  const inputContainer = useRef();
  const input = useRef();
  const label = useRef();

  const inputSetActiveHandler = () => {
    label.current.classList.add(style.activeLabel);
    inputContainer.current.classList.add(style.activeInput);
  };

  const inputResetActiveHandler = () => {
    label.current.classList.remove(style.activeLabel);
    inputContainer.current.classList.remove(style.activeInput);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref && !ref.contains(event.target)) {
          if (event.target.id !== "input" + props.id) {
            if (input.current.value === "") inputResetActiveHandler();
          }
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useEffect(() => {
    if (input.current.value !== "") {
      inputSetActiveHandler();
    } else {
      inputResetActiveHandler();
    }
  }, []);

  useEffect(() => {
    inputContainer.current.style.width = props.width;
  }, [props.width]);

  useOutsideAlerter(inputContainer.current);
  /*render component*/
  return (
    <>
      <div ref={inputContainer} className={style.inputContainer}>
        <span ref={label} className={style.label}>
          {props.label}
        </span>
        <input
          ref={input}
          type={props.type}
          value={props.value}
          id={"input" + props.id}
          onClick={inputSetActiveHandler}
          className={style.input}
          onChange={props.onchange}
          placeholder={props.placeholder && props.placeholder}
        />
      </div>
      {props.error && <span className={style.error}>{props.error}</span>}
    </>
  );
};
