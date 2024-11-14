import { useState, useEffect } from "react"
import { CreateProjectRequest, GetAllUsers } from "../request"
import UserDropdown from "./OwnerSelector"

function createProject(name, owner, isPublic) {
  if (!name || !owner || !owner.ID) {
    console.error("Name and owner are required")
    return
  }
  const projectData = {
    name,
    owner,
    isPublic,
    groups: [],
    nominations: []
  }

  CreateProjectRequest(projectData)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })
}

function genericOnChange(event, setFormValues) {
  const { name, type, checked, value } = event.target;
  setFormValues(prevValues => ({
    ...prevValues,
    [name]: type === 'checkbox' ? checked : value
  }));
}

export default function CreateProjectForm() {
  const [formValues, setFormValues] = useState({
    name: "",
    owner: {},
    isPublic: false
  });
  const [selectedUserId, setSelectedUserId] = useState("");
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      GetAllUsers().then((response) => setUsers(response.users));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = () => {
    const { name, owner, isPublic } = formValues;
    createProject(name, owner, isPublic);
    setFormValues({
      name: "",
      owner: {},
      isPublic: false
    });
    setSelectedUserId("");
  };

  return (
    <div className="card">
      <h2>Create Project</h2>
      <form>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={(event) => genericOnChange(event, setFormValues)}
          />
        </div>

        <div>
          <label htmlFor="owner">Owner: </label>
          <UserDropdown
            users={users}
            setOwner={(owner) => setFormValues(prevValues => ({
              ...prevValues,
              owner
            }))}
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
          />
        </div>

        <div>
          <label htmlFor="isPublic">Make the project public: </label>
          <input
            type="checkbox"
            id="isPublic"
            name="isPublic"
            checked={formValues.isPublic}
            onChange={(event) => genericOnChange(event, setFormValues)}
          />
        </div>
      </form>

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}
