import React, { useContext } from "react"
import LogInForm from './Pages/LogInPage';
import SignUpForm from './Pages/SignUpPage';
import Dashboard from './Pages/Dashboard';
import ProjectsList from './Pages/ProjectsList';
import TasksList from './Pages/TasksList';
import ManagePage from './Pages/ManagePage';
import ErrorMessage from './Components/Utils/ErrorMessage';
import CreateProjectForm from './Pages/CreateProjectForm';
import ProjectPage from './Pages/ProjectPage';
import TaskPage from "./Pages/TaskPage"
import { Routes, Route } from "react-router-dom"
import ChangePassword from "./Pages/ChangePassword";
import ChangeUsername from "./Pages/ChangeUsername"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="App">

      <ToastContainer position="bottom-right"
        theme= "colored" 
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false} />

      <Routes>
        <Route path="/" element={<LogInForm />} />
        <Route path="sign-up" element={<SignUpForm />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="change-username" element={<ChangeUsername />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<ProjectsList />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="project-page" element={<ProjectPage />} />
          <Route path="task-page" element={<TaskPage />} />
          <Route path="tasks" element={<TasksList />} />
          <Route path="manage" element={<ManagePage />} />
          <Route path="create-project" element={<CreateProjectForm />} />
        </Route>
        <Route path="*" element={<ErrorMessage />} />
      </Routes>
    </div>
  );
}

export default App;
