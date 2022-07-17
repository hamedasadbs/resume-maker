/*css*/
import style from "./skillsPage.module.scss";
/*child components*/
import { Header } from "../../Layouts/Header/header";
import { NavBar } from "../../Layouts/NavBar/navBar";
import { Footer } from "../../Layouts/Footer/footer";
import { Skills } from "./Skills/skills";
import { Interests } from "./Interests/interests";
import { General } from "./General/general";
import { Technology } from "./Technology/technology";
import { useState } from "react";
/*MUI*/
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const SkillsPage = (props) => {
  const [value, setValue] = useState(3);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={"span"}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  /*render component*/
  return (
    <article className={style.skillsPage}>
      <Header
        title={props.title}
        subTitle={value}
        setDashboard={props.setDashboard}
      />
      <h1 className={style.title}>داشبورد/{props.title}</h1>
      <main>
        <div className={style.information}>
          <Tabs
            className={style.tabs}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              className={style.tab}
              label="تکنولوژی های کاری"
              {...a11yProps(3)}
            />
            <Tab className={style.tab} label="علایق پژوهشی" {...a11yProps(2)} />
            <Tab
              className={style.tab}
              label="مهارت ها و توانمندی ها"
              {...a11yProps(1)}
            />
            <Tab
              className={style.tab}
              label="توانایی های عمومی"
              {...a11yProps(0)}
            />
          </Tabs>
          <TabPanel className={style.tabContent} value={value} index={3}>
            <General />
          </TabPanel>
          <TabPanel className={style.tabContent} value={value} index={2}>
            <Skills />
          </TabPanel>
          <TabPanel className={style.tabContent} value={value} index={1}>
            <Interests />
          </TabPanel>
          <TabPanel className={style.tabContent} value={value} index={0}>
            <Technology setIsModalOpen={props.setIsModalOpen} />
          </TabPanel>
        </div>
        <NavBar dashboard={props.setDashboard} />
      </main>
      <Footer />
    </article>
  );
};
