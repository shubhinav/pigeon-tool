import LogInForm from './Pages/LogInPage';
import SignUpForm from './Pages/SignUpPage';
import Dashboard from './Pages/Dashboard';
import ProjectsList from './Pages/ProjectsList';
import TasksList from './Pages/TasksList';
import ManagePage from './Pages/ManagePage';
import ErrorMessage from './Components/Utils/ErrorMessage';
import CreateProjectForm from './Pages/CreateProjectForm';
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogInForm/>}/>
        <Route path="sign-up" element={<SignUpForm/>}/>
        <Route path="dashboard" element={<Dashboard/>}>
          <Route index element={<ProjectsList/>}/>
          <Route path="projects" element={<ProjectsList/>}/>
          <Route path="tasks" element={<TasksList/>}/>
          <Route path="manage" element={<ManagePage/>}/>
          <Route path="create-project" element={<CreateProjectForm/>}/>
        </Route>
        <Route path="*" element={<ErrorMessage />} />
      </Routes>
    </div>
  );
}

export default App;
