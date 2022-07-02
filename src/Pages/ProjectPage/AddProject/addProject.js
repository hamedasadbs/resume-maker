/*css*/
import style from "./addProject.module.scss";
/*inner components*/
import { useState, useEffect } from "react";
import axios from "axios";
/*library*/
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const AddProject = (props) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [role, setRole] = useState("");
  const [desc, setDesc] = useState("");

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
        `http://localhost:8080/projects?username=${cookie.getCookie(
          "username"
        )}`
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

  const addProjectHandler = () => {
    if (title === "" || date === "" || role === "" || desc === "")
      alert("لطفا تمام بخش های مورد نیاز را پر کنید");
    else {
      setTitle("");
      setDate("");
      setRole("");
      setDesc("");
      axios
        .post("http://localhost:8080/projects", {
          title,
          date,
          role,
          desc,
          username: cookie.getCookie("username"),
        })
        .then(() => {
          getDataHandler();
        })
        .catch(() => {
          alert("پروژه مورد نظر اضافه نشد");
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

  const removeProjectHandler = () => {
    if (checkbox.length) {
      for (let i = 0; i < checkbox.length; i++) {
        axios
          .delete(
            `http://localhost:8080/projects?username=${cookie.getCookie(
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
    <div className={style.addProject}>
      <div className={style.addProjectForm}>
        <Input
          onchange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          align="right"
          direction="rtl"
          id={0}
          value={title}
          label="عنوان پروژه"
          width="20%"
        />
        <Input
          onchange={(e) => {
            setDate(e.target.value);
          }}
          type="text"
          align="left"
          direction="ltr"
          id={1}
          value={date}
          label="تاریخ انجام پروژه"
          width="20%"
        />
        <Input
          onchange={(e) => {
            setRole(e.target.value);
          }}
          type="text"
          align="center"
          direction="ltr"
          id={2}
          value={role}
          label="نقش در پروژه"
          width="20%"
        />
        <Input
          onchange={(e) => {
            setDesc(e.target.value);
          }}
          type="text"
          align="right"
          direction="rtl"
          id={3}
          value={desc}
          label="توضیحات پروژه"
          width="20%"
        />
        <Button
          className={style.save}
          variant="contained"
          endIcon={<AddIcon />}
          onClick={addProjectHandler}
        >
          افزودن پروژه
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
                  <StyledTableCell className={style.tbl} width={300}>
                    توضیحات پروژه
                  </StyledTableCell>
                  <StyledTableCell className={style.tbl} width={150}>
                    نقش در پروژه
                  </StyledTableCell>
                  <StyledTableCell className={style.tbl} width={200}>
                    بازه زمانی انجام پروژه
                  </StyledTableCell>
                  <StyledTableCell className={style.tbl} width={150}>
                    عنوان پروژه
                  </StyledTableCell>
                  <StyledTableCell className={style.tbl} width={10}>
                    #
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataset.map((project, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell className={style.tbl}>
                      <Checkbox
                        id={project.title}
                        onChange={checkHandler}
                        {...label}
                      />
                    </StyledTableCell>
                    <StyledTableCell className={style.tbl}>
                      <h1>{project.description}</h1>
                    </StyledTableCell>
                    <StyledTableCell className={style.tbl}>
                      <h1>{project.role}</h1>
                    </StyledTableCell>
                    <StyledTableCell className={style.tbl}>
                      <h1 style={{ direction: "ltr" }}>{project.date}</h1>
                    </StyledTableCell>
                    <StyledTableCell className={style.tbl}>
                      <h1>{project.title}</h1>
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
            onClick={removeProjectHandler}
            className={style.remove}
            variant="contained"
          >
            <span>حذف پروژه</span>
            <DeleteOutlineIcon className={style.icon} />
          </Button>
        </div>
      </div>
    </div>
  );
};
