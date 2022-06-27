/*css*/
import style from "./interests.module.scss";
/*inner components*/
import { useState } from "react";
/*library*/
import { interests } from "../../../Middleware/Data/interestData";
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

export const Interests = (props) => {
  const [time, setTime] = useState(0);
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
    <div className={style.interests}>
      <div className={style.addServer}>
        <Input
          type="username"
          align="right"
          direction="rtl"
          id={0}
          label="علاقه پژوهشی"
          width="100%"
        />
        <Button
          className={style.save}
          variant="contained"
          endIcon={<AddIcon />}
        >
          افزودن دوره
        </Button>
      </div>
      <div className={style.table}>
        <Typography marginBottom={0}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className={style.tbl} width={100}>
                    انتخاب
                  </StyledTableCell>
                  <StyledTableCell className={style.tbl} width={200}>
                    علایق پژوهشی
                  </StyledTableCell>
                  <StyledTableCell className={style.tbl} width={10}>
                    #
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {interests.map((interest, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell className={style.tbl}>
                      <Checkbox {...label} />
                    </StyledTableCell>
                    <StyledTableCell className={style.tbl}>
                      <h1>{interest}</h1>
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
            <span>حذف علایق پژوهشی</span>
            <DeleteOutlineIcon className={style.icon} />
          </Button>
        </div>
      </div>
    </div>
  );
};
