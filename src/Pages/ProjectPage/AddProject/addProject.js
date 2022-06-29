/*css*/
import style from "./addProject.module.scss";
/*inner components*/
import { useState } from "react";
/*library*/
import { projects } from "../../../Middleware/Data/projectData";
import { Input } from "../../../Components/Input/input";
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

export const AddProject = (props) => {
  const [title, setTitle] = useState(null);
  const [date, setDate] = useState(null);
  const [role, setRole] = useState(null);
  const [desc, setDesc] = useState(null);
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
  /*render component*/
  return (
    <div className={style.addProject}>
      <div className={style.addProjectForm}>
        <Input
          onchange={(e, newValue) => {
            setTitle(newValue);
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
          onchange={(e, newValue) => {
            setDate(newValue);
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
          onchange={(e, newValue) => {
            setRole(newValue);
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
          onchange={(e, newValue) => {
            setDesc(newValue);
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
                {projects.map((project, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell className={style.tbl}>
                      <Checkbox {...label} />
                    </StyledTableCell>
                    <StyledTableCell className={style.tbl}>
                      <h1>{project.desc}</h1>
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
          <Button className={style.save} variant="contained">
            <span>ذخیره تغییرات</span>
            <SaveOutlinedIcon className={style.icon} />
          </Button>
          <Button className={style.remove} variant="contained">
            <span>حذف پروژه</span>
            <DeleteOutlineIcon className={style.icon} />
          </Button>
        </div>
      </div>
    </div>
  );
};
