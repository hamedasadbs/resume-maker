/*inner components*/
import { useEffect, useRef } from "react";
/*css*/
import style from "./input.module.scss";
/*library*/
import * as dark from "../../Middleware/Library/darkMode";

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
          if (event.target !== ref) {
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
    if (input.current.value === "") inputResetActiveHandler();
    else inputSetActiveHandler();
  }, []);

  useEffect(() => {
    inputContainer.current.style.margin = props.margin;
    input.current.style.textAlign = props.align;
    input.current.style.direction = props.direction;
  }, []);

  useOutsideAlerter(input.current);
  /*render component*/
  return (
    <>
      <div ref={inputContainer} className={style.inputContainer}>
        <span ref={label} className={style.label}>
          {props.label}
        </span>
        <input
          type={props.type}
          value={props.value}
          onClick={inputSetActiveHandler}
          className={style.input}
          onChange={props.onchange}
          placeholder={props.placeholder && props.placeholder}
          ref={input}
        />
      </div>
      {props.error && <span className={style.error}>{props.error}</span>}
    </>
  );
};
