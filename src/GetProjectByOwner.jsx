import { useEffect, useState } from "react";
import { GetAllUsers, GetProjectByOwner } from "../request";
import UserDropdown from "./OwnerSelector";

export default function GetAllProjectsByUser() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      GetAllUsers().then((response) => setUsers(response.users));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!selectedUserId) return;
    // Llama a GetProjectByOwner y actualiza projects con la respuesta
    GetProjectByOwner(selectedUserId).then((response) => setProjects(response.project));
  }, [selectedUserId]);

  return (
    <div className="card-final">
      <h2>Get Project By Owner</h2>
      <UserDropdown
        users={users}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />
      <Estilizador project={projects} />
    </div>
  );
}

const Estilizador = ({ project }) => {
  return (
    <div className="project-table">
      <h2>Projects by Owner</h2>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Owner Name</th>
            <th>Institution</th>
            <th>Is Uploaded</th>
            <th>Is Public</th>
            <th>Filename</th>
            <th>Filetype</th>
            <th>Filesize</th>
            <th>Duration</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {project.map((proj, index) => (
            <tr key={index}>
              <td>{proj.name}</td>
              <td>{proj.owner.name}</td>
              <td>{proj.owner.institution}</td>
              <td>{proj.metadata.is_uploaded ? 'Yes' : 'No'}</td>
              <td>{proj.metadata.is_public ? 'Yes' : 'No'}</td>
              <td>{proj.metadata.filename || 'N/A'}</td>
              <td>{proj.metadata.filetype || 'N/A'}</td>
              <td>{proj.metadata.filesize} KB</td>
              <td>{proj.metadata.duration} min</td>
              <td>{new Date(proj.metadata.created_at * 1000).toLocaleString()}</td>
              <td>{new Date(proj.metadata.updated_at * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
