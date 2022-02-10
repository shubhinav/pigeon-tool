import React, { useContext } from "react"
import LogInForm from './Pages/LogInPage';
import SignUpForm from './Pages/SignUpPage';
import Account from "./Pages/Account/Account";
import Dashboard from './Pages/Dashboard/Dashboard';
import ProjectsList from './Pages/Dashboard/ProjectsList';
import TasksList from './Pages/Dashboard/TasksList';
import ManagePage from './Pages/Dashboard/ManagePage';
import ErrorMessage from './Components/Utils/ErrorMessage';
import CreateProjectForm from './Pages/Dashboard/CreateProjectForm';
import ProjectPage from './Pages/Dashboard/ProjectPage';
import TaskPage from "./Pages/Dashboard/TaskPage"
import { Routes, Route } from "react-router-dom"
import ChangePassword from "./Pages/Account/ChangePassword";
import ChangeUsername from "./Pages/Account/ChangeUsername"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const userType = localStorage.getItem('userType')

  return (
    
      <div className="App">

        <ToastContainer position="bottom-right"
          theme="colored"
          autoClose={6000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover/>

        <Routes>
          <Route path="/" element={<LogInForm />} />
          <Route path="sign-up" element={<SignUpForm />} />

          <Route path="account" element={<Account/>}>
            <Route index element={<ChangePassword />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="change-username" element={<ChangeUsername />} />
          </Route>

          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<ProjectsList />} />
            <Route path="projects" element={<ProjectsList />} />
            <Route path="projects/:projectName" element={<ProjectPage />} />
            <Route path="task-page" element={<TaskPage />} />
            <Route path="tasks" element={<TasksList />} />
            {userType === "admin" && <Route path="manage" element={<ManagePage />} />}
            {userType !== "student" && <Route path="create-project" element={<CreateProjectForm />} />}
          </Route>

          <Route path="*" element={<ErrorMessage />} />

        </Routes>
      </div>
  );
}

export default App;
