/*inner components*/
import { useEffect, useState } from "react";
import axios from "axios";
/*css*/
import style from "./deviceTable.module.scss";
/*MUI*/
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CircularProgress from "@mui/material/CircularProgress";

import * as cookie from "../../../../Middleware/Library/cookie";

export const DeviceTable = (props) => {
  const [techTitle, setTechTitle] = useState([]);
  const [technology, setTechnology] = useState([]);

  const StyledTableCell1 = styled(TableCell)(({ theme }) => ({
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

  const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "rgba(26, 55, 130,0.8)",
      color: theme.palette.common.white,
      fontSize: 16,
      textAlign: "center",
    },
    [`&.${tableCellClasses.body}`]: {
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

  const getTechTitleHandler = () => {
    axios
      .get(
        `http://localhost:8080/techTitle?username=${cookie.getCookie(
          "username"
        )}`
      )
      .then((res) => {
        setTechTitle(res.data.dataset);
      })
      .catch(() => {
        alert("متاسفانه مشکلی در دریافت اطلاعات عنوان به وجود آمد");
      });
  };

  const getTechnologyHandler = () => {
    axios
      .get(
        `http://localhost:8080/technology?username=${cookie.getCookie(
          "username"
        )}`
      )
      .then((res) => {
        setTechTitle(res.data.dataset);
      })
      .catch(() => {
        alert("متاسفانه مشکلی در دریافت اطلاعات تکنولوژی به وجود آمد");
      });
  };

  useEffect(() => {
    getTechTitleHandler();
    getTechnologyHandler();

    return () => {
      setTechTitle([]);
      setTechnology([]);
    };
  }, []);

  return (
    <article className={style.tableContainer}>
      {/*DEVICE TABLE----------------------------------------------*/}
      <main>
        <h1 className={style.fileDetails}>اطلاعات فایل های دستگاه اسکن شده</h1>
        {techTitle.map((title, index) => (
          <Accordion className={style.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography color="black" fontSize={20}>
                <InsertDriveFileIcon className={style.icon} />
                {title.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/*FILES INFORMATION TABLE---------------------------------------------*/}
              <Typography marginBottom={0}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell2 className={style.tbl} width={100}>
                          میزان تسلط
                        </StyledTableCell2>
                        <StyledTableCell2 className={style.tbl} width={100}>
                          ورژن
                        </StyledTableCell2>
                        <StyledTableCell2 className={style.tbl} width={100}>
                          تکنولوژی
                        </StyledTableCell2>
                        <StyledTableCell2 className={style.tbl} width={10}>
                          #
                        </StyledTableCell2>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {technology.map((tech, i) => {
                        if (tech.title == title.name)
                          return (
                            <StyledTableRow>
                              <StyledTableCell2>
                                {tech.ability}
                              </StyledTableCell2>
                              <StyledTableCell2>
                                {tech.version}
                              </StyledTableCell2>
                              <StyledTableCell2>{tech.name}</StyledTableCell2>
                              <StyledTableCell2>{i + 1}</StyledTableCell2>
                            </StyledTableRow>
                          );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </main>
    </article>
  );
};
