/*css*/
import style from "./skills.module.scss";
/*inner components*/
import { useState, useEffect } from "react";
import axios from "axios";
/*child components*/
import { Input } from "../../../Components/Input/input";
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

export const Skills = (props) => {
  const [skill, setSkill] = useState("");

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
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const getDataHandler = () => {
    axios
      .get(
        `http://localhost:8080/skills?username=${cookie.getCookie("username")}`
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

  const addSkillHandler = () => {
    if (skill === "") alert("لطفا تمام بخش های مورد نیاز را پر کنید");
    else {
      setSkill("");
      axios
        .post("http://localhost:8080/skills", {
          skill,
          username: cookie.getCookie("username"),
        })
        .then(() => {
          getDataHandler();
        })
        .catch(() => {
          alert("مهارت مورد نظر اضافه نشد");
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

  const removeSkillHandler = () => {
    if (checkbox.length) {
      for (let i = 0; i < checkbox.length; i++) {
        axios
          .delete(
            `http://localhost:8080/skills?username=${cookie.getCookie(
              "username"
            )}&item=${checkbox[i]}`
          )
          .then(() => {
            getDataHandler();
          })
          .catch(() => {
            alert("مهارت مورد نظر حذف نشد");
          });
      }
    } else alert("لطفا حداقل یک مورد را برای حذف انتخاب کنید");
  };
  /*render component*/
  return (
    <div className={style.skills}>
      <div className={style.addSkill}>
        <Input
          onchange={(e) => {
            setSkill(e.target.value);
          }}
          type="username"
          align="right"
          direction="rtl"
          id={0}
          value={skill}
          label="مهارت"
          width="78%"
        />
        <Button
          className={style.save}
          variant="contained"
          endIcon={<AddIcon />}
          onClick={addSkillHandler}
        >
          افزودن مهارت
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
                  <StyledTableCell className={style.tbl}>
                    توضیحات
                  </StyledTableCell>
                  <StyledTableCell className={style.tbl} width={10}>
                    #
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataset.map((skill, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell className={style.tbl}>
                      <Checkbox
                        {...label}
                        id={skill.skill}
                        onChange={checkHandler}
                      />
                    </StyledTableCell>
                    <StyledTableCell className={style.tbl}>
                      <h1>{skill.skill}</h1>
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
            onClick={removeSkillHandler}
            className={style.remove}
            variant="outlined"
          >
            <span>حذف مهارت</span>
            <DeleteOutlineIcon className={style.icon} />
          </Button>
        </div>
      </div>
    </div>
  );
};
