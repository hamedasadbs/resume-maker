/*inner components*/
import { useState, useEffect } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
/*child components*/
import { AdminPage } from "./Pages/AdminPage/adminPage";
import { PersonalPage } from "./Pages/PersonalPage/personalPage";
import { LearningPage } from "./Pages/LearningPage/learningPage";
import { EducationPage } from "./Pages/EducationPage/educationPage";
import { SkillsPage } from "./Pages/SkillsPage/skillsPage";
import { ProjectPage } from "./Pages/ProjectPage/projectPage";
import { LoginPage } from "./Pages/LoginPage/loginPage";
import { LoadingPage } from "./Pages/LoadingPage/loadingPage";
import { PreviewPage } from "./Pages/PreviewPage/previewPage";
import { TechModal } from "./Pages/SkillsPage/Technology/DeviceTable/TechModal/techModal";
/*css*/
import style from "./app.module.scss";
/*library*/
import * as cookie from "./Middleware/Library/cookie";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import { Pdf } from "./pdf";

export const App = () => {
  /*states*/
  const [loaded, setLoaded] = useState(false);
  const [dashboard, setDashboard] = useState("صفحه اصلی");

  const [isModalOpen, setIsModalOpen] = useState({ bool: false, title: "" });
  /*loading screen*/
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);
  /*when refresh page go to root*/
  window.onbeforeunload = function () {
    window.setTimeout(function () {
      window.location.href = "/";
    }, 0);
    window.onbeforeunload = null;
  };
  /*render component*/
  return (
    <div className={style.app}>
      {isModalOpen.bool && (
        <style jsx global>
          {`
            body {
              overflow: hidden;
            }
          `}
        </style>
      )}
      <Router>
        <Switch>
          {cookie.getCookie("login") ? (
            loaded ? (
              cookie.getCookie("superUser") == 1 ? (
                <>
                  <Route path="/administration">
                    <AdminPage />
                  </Route>
                  <Route path="/">
                    <Redirect to="/administration" />
                  </Route>
                </>
              ) : (
                <>
                  <Route path="/personal_info">
                    <PersonalPage
                      setDashboard={setDashboard}
                      title={dashboard}
                    />
                  </Route>
                  <Route path="/learning_info">
                    <LearningPage
                      setDashboard={setDashboard}
                      title={dashboard}
                    />
                  </Route>
                  <Route path="/education_history">
                    <EducationPage
                      setDashboard={setDashboard}
                      title={dashboard}
                    />
                  </Route>
                  <Route path="/skills">
                    <SkillsPage
                      setIsModalOpen={setIsModalOpen}
                      setDashboard={setDashboard}
                      title={dashboard}
                    />
                    {isModalOpen.bool && (
                      <TechModal
                        title={isModalOpen.title}
                        setIsModalOpen={setIsModalOpen}
                      />
                    )}
                  </Route>
                  <Route path="/projects">
                    <ProjectPage
                      setDashboard={setDashboard}
                      title={dashboard}
                    />
                  </Route>
                  <Route path="/preview">
                    <PreviewPage
                      setDashboard={setDashboard}
                      title={dashboard}
                    />
                  </Route>
                  <Route path="/">
                    <Redirect to="/personal_info" />
                  </Route>
                </>
              )
            ) : (
              <LoadingPage />
            )
          ) : (
            <>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/">
                <Redirect to="/login" />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
};
