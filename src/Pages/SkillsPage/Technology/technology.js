/*css*/
import style from "./technology.module.scss";
/*inner components*/
import { useState } from "react";
/*library*/
import { courses } from "../../../Middleware/Data/coursesData";
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

export const Technology = (props) => {
  const [time, setTime] = useState(0);
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
  /*render component*/
  return (
    <div className={style.technology}>
      <div className={style.addTechnology}>
        <Input
          type="username"
          align="right"
          direction="rtl"
          id={0}
          label="نام دوره آموزشی"
          width="25%"
        />
        <Input
          type="username"
          align="left"
          direction="ltr"
          id={1}
          label="وبسایت دوره"
          width="25%"
        />
        <Input
          onchange={(e, newValue) => {
            setTime(newValue);
          }}
          type="number"
          align="center"
          direction="ltr"
          id={2}
          value={time}
          label="مدت زمان دوره"
          width="25%"
        />
        <Button
          className={style.save}
          variant="contained"
          endIcon={<AddIcon />}
        >
          افزودن تکنولوژی
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
                  <StyledTableCell className={style.tbl} width={150}>
                    مدت زمان دوره
                  </StyledTableCell>
                  <StyledTableCell className={style.tbl} width={150}>
                    وبسایت دوره
                  </StyledTableCell>
                  <StyledTableCell className={style.tbl} width={200}>
                    نام دوره آموزشی
                  </StyledTableCell>
                  <StyledTableCell className={style.tbl} width={10}>
                    #
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell className={style.tbl}>
                      <Checkbox {...label} />
                    </StyledTableCell>
                    <StyledTableCell className={style.tbl}>
                      <h1>{course.time} ساعت</h1>
                    </StyledTableCell>
                    <StyledTableCell className={style.tbl}>
                      <h1>{course.website}</h1>
                    </StyledTableCell>
                    <StyledTableCell className={style.tbl}>
                      <h1>{course.courseName}</h1>
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
            <span>حذف تکنولوژی</span>
            <DeleteOutlineIcon className={style.icon} />
          </Button>
        </div>
      </div>
    </div>
  );
};
