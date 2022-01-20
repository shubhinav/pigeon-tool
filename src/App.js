import LogInForm from './Pages/LogInPage';
import SignUpForm from './Pages/SignUpPage';
import Dashboard from './Pages/Dashboard';
import ProjectsList from './Components/ProjectsList/ProjectsList';
import TasksList from './Components/TasksList/TasksList';
import ErrorMessage from './Components/Utils/ErrorMessage';
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogInForm/>}/>
        <Route path="sign-up" element={<SignUpForm/>}/>
        <Route path="dashboard/*" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
