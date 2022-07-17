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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

export const DeviceTable = (props) => {
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

  const removeTechTitleHandler = (e) => {
    props.removeTechTitleHandler(e.currentTarget.id);
  };

  const removeTechnologyHandler = (e) => {
    props.removeTechnologyHandler(e.currentTarget.id);
  };

  return (
    <article className={style.tableContainer}>
      <h1 className={style.fileDetails}>تکنولوژی ها</h1>
      {props.techTitle.map((title) => (
        <Accordion className={style.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              className={style.typography}
              color="black"
              fontSize={20}
            >
              <IconButton
                id={title.name}
                onClick={removeTechTitleHandler}
                className={style.remove}
              >
                <DeleteOutlineIcon />
              </IconButton>
              {title.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/*FILES INFORMATION TABLE---------------------------------------------*/}
            <Typography marginBottom={0}>
              {props.technology.length > 0 ? (
                <>
                  <Button
                    onClick={() => {
                      props.setIsModalOpen({ bool: true, title: title.name });
                    }}
                    className={style.noData}
                  >
                    <h1>افزودن تکنولوژی جدید</h1>
                  </Button>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell2 className={style.tbl} width={20}>
                            حذف
                          </StyledTableCell2>
                          <StyledTableCell2 className={style.tbl} width={100}>
                            میزان تسلط
                          </StyledTableCell2>
                          <StyledTableCell2 className={style.tbl} width={100}>
                            نسخه
                          </StyledTableCell2>
                          <StyledTableCell2 className={style.tbl} width={200}>
                            تکنولوژی
                          </StyledTableCell2>
                          <StyledTableCell2 className={style.tbl} width={10}>
                            #
                          </StyledTableCell2>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.technology.map((tech, i) => {
                          if (tech.title == title.name)
                            return (
                              <StyledTableRow>
                                <StyledTableCell2
                                  className={style.removeContainer}
                                >
                                  <IconButton
                                    id={tech.name}
                                    onClick={removeTechnologyHandler}
                                    className={style.remove}
                                  >
                                    <DeleteOutlineIcon
                                      className={style.removeIcon}
                                    />
                                  </IconButton>
                                </StyledTableCell2>
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
                </>
              ) : (
                <Button
                  onClick={() => {
                    props.setIsModalOpen({ bool: true, title: title.name });
                  }}
                  className={style.noData}
                >
                  <h1>افزودن تکنولوژی جدید</h1>
                </Button>
              )}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </article>
  );
};
