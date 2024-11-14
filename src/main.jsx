import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CreateUserForm from './CreateUsersForm'
import CreateProjectForm from './CreateProjectForm'
import GetAllProjectsByUser from './GetProjectByOwner'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='App'>
    <CreateUserForm />
    <CreateProjectForm />
    <GetAllProjectsByUser />
    </div>
  </StrictMode>,
)
