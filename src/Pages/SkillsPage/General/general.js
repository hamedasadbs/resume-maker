/*css*/
import style from "./general.module.scss";
/*inner components*/
import axios from "axios";
import { useState, useEffect } from "react";
/*child components*/
import { Input } from "../../../Components/Input/input";
import { Point } from "../../../Components/Point/point";
/*library*/
import * as cookie from "../../../Middleware/Library/cookie";
/*MUI*/
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const General = (props) => {
  const [langName, setLangName] = useState("");
  const [ability, setAbility] = useState(0);

  const [dataset, setDataset] = useState([]);

  let checkbox = [];

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "rgb(26, 55, 130)",
      color: "white",
      fontSize: 16,
      textAlign: "center",
    },
    [`&.${tableCellClasses.body}`]: {
      color: "black",
      backgroundColor: "whitesmoke",
      fontSize: 14,
      textAlign: "center",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "red",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const getDataHandler = () => {
    axios
      .get(
        `http://localhost:8080/general?username=${cookie.getCookie("username")}`
      )
      .then((res) => {
        setDataset(res.data.dataset);
      })
      .catch(() => {
        alert("متاسفانه مشکلی در دریافت اطلاعات به وجود آمد");
      });
  };

  useEffect(() => {
    getDataHandler();

    return () => {
      setDataset([]);
    };
  }, []);

  const addLanguageHandler = () => {
    if (langName === "" || ability === 0)
      alert("لطفا تمام بخش های مورد نیاز را پر کنید");
    else {
      setLangName("");
      setAbility("");
      axios
        .post("http://localhost:8080/general", {
          langName,
          ability,
          username: cookie.getCookie("username"),
        })
        .then(() => {
          getDataHandler();
        })
        .catch(() => {
          alert("زبان مورد نظر اضافه نشد");
        });
    }
  };

  const checkHandler = (e) => {
    if (e.target.checked) {
      checkbox.push(e.target.id);
    } else {
      const index = checkbox.indexOf(e.target.id);
      if (index > -1) {
        checkbox.splice(index, 1);
      }
    }
  };

  const removeLanguageHandler = () => {
    if (checkbox.length) {
      for (let i = 0; i < checkbox.length; i++) {
        axios
          .delete(
            `http://localhost:8080/general?username=${cookie.getCookie(
              "username"
            )}&item=${checkbox[i]}`
          )
          .then(() => {
            getDataHandler();
          })
          .catch(() => {
            alert("دوره مورد نظر اضافه نشد");
          });
      }
    } else alert("لطفا حداقل یک مورد را برای حذف انتخاب کنید");
  };
  /*render component*/
  return (
    <div className={style.general}>
      <div className={style.addLang}>
        <Input
          onchange={(e) => {
            setLangName(e.target.value);
          }}
          type="username"
          align="right"
          direction="rtl"
          id={0}
          label="نام زبان"
          width="40%"
          value={langName}
        />
        <Point label="میزان تسلط" ability={ability} setAbility={setAbility} />
        <Button
          onClick={addLanguageHandler}
          className={style.save}
          variant="contained"
          endIcon={<AddIcon />}
        >
          افزودن زبان
        </Button>
      </div>
      <div className={style.table}>
        <Typography component={"span"} marginBottom={0}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className={style.tbl} width={10}>
                    انتخاب
                  </StyledTableCell>
                  <StyledTableCell className={style.tbl} width={150}>
                    میزان تسلط
                  </StyledTableCell>
                  <StyledTableCell className={style.tbl} width={150}>
                    نام زبان
                  </StyledTableCell>
                  <StyledTableCell className={style.tbl} width={10}>
                    #
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataset.map((lang, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell className={style.tbl}>
                      <Checkbox
                        id={lang.langName}
                        onChange={checkHandler}
                        {...label}
                      />
                    </StyledTableCell>
                    <StyledTableCell className={style.tbl}>
                      {lang.ability === 1 && <h1>بسیار کم</h1>}
                      {lang.ability === 2 && <h1>کم</h1>}
                      {lang.ability === 3 && <h1>متوسط</h1>}
                      {lang.ability === 4 && <h1>خوب</h1>}
                      {lang.ability === 5 && <h1>مسلط</h1>}
                    </StyledTableCell>
                    <StyledTableCell className={style.tbl}>
                      <h1>{lang.langName}</h1>
                    </StyledTableCell>
                    <StyledTableCell className={style.tbl}>
                      {index + 1}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Typography>
        <div className={style.btnContainer}>
          <Button
            onClick={removeLanguageHandler}
            className={style.remove}
            variant="outlined"
          >
            <span>حذف زبان</span>
            <DeleteOutlineIcon className={style.icon} />
          </Button>
        </div>
      </div>
    </div>
  );
};
