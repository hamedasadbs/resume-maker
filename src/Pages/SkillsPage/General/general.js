/*css*/
import style from "./general.module.scss";
/*inner components*/
import axios from "axios";
import { useState, useEffect } from "react";
/*library*/
import { general } from "../../../Middleware/Data/generalData";
import { Input } from "../../../Components/Input/input";
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
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const General = (props) => {
  const [langName, setLangName] = useState("");
  const [ability, setAbility] = useState("");
  const [certificateCode, setCertificateCode] = useState("");

  const [dataset, setDataset] = useState([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: props.darkMode ? "gray" : "rgb(26, 55, 130)",
      color: theme.palette.common.white,
      fontSize: 16,
      textAlign: "center",
    },
    [`&.${tableCellClasses.body}`]: {
      color: props.darkMode && "white",
      backgroundColor: !props.darkMode && "rgb(230, 230, 230)",
      fontSize: 14,
      textAlign: "center",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: props.darkMode ? "#202124" : theme.palette.action.hover,
    },
    "&:nth-of-type(even)": {
      backgroundColor: props.darkMode && "rgb(25, 25, 25)",
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
  }, []);

  const addLanguageHandler = () => {
    if (langName === "" || ability === "" || certificateCode === "")
      alert("لطفا تمام بخش های مورد نیاز را پر کنید");
    else {
      axios
        .post("http://localhost:8080/general", {
          langName,
          ability,
          certificateCode,
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
          width="25%"
        />
        <Input
          onchange={(e) => {
            setAbility(e.target.value);
          }}
          type="username"
          align="right"
          direction="rtl"
          id={1}
          label="میزان تسلط به زبان"
          width="25%"
        />
        <Input
          onchange={(e) => {
            setCertificateCode(e.target.value);
          }}
          type="username"
          align="left"
          direction="ltr"
          id={2}
          label="کد مدرک زبان"
          width="25%"
        />
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
        <Typography marginBottom={0}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className={style.tbl} width={10}>
                    انتخاب
                  </StyledTableCell>
                  <StyledTableCell className={style.tbl} width={200}>
                    کد مدرک زبان
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
                      <Checkbox {...label} />
                    </StyledTableCell>
                    <StyledTableCell className={style.tbl}>
                      <h1>{lang.certificateCode}</h1>
                    </StyledTableCell>
                    <StyledTableCell className={style.tbl}>
                      <h1>{lang.ability}</h1>
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
          <Button className={style.save} variant="contained">
            <span>ذخیره تغییرات</span>
            <SaveOutlinedIcon className={style.icon} />
          </Button>
          <Button className={style.remove} variant="contained">
            <span>حذف زبان</span>
            <DeleteOutlineIcon className={style.icon} />
          </Button>
        </div>
      </div>
    </div>
  );
};
