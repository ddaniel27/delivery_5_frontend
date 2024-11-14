import { useState } from "react"
import { CreateUserRequest } from "../request"

function createUser(userData) {
  CreateUserRequest(userData)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })
}

export default function CreateUserForm() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    institution: '',
    city: '',
    birthdate: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  return (
    <div className="card">
      <h2>Create User</h2>
      <form>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" value={formValues.name} onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input type="text" name="email" value={formValues.email} onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" value={formValues.password} onChange={handleInputChange} />
        </div>
      
        <div>
          <label htmlFor="institution">Institution: </label>
          <input type="text" name="institution" value={formValues.institution} onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="city">City: </label>
          <input type="text" name="city" value={formValues.city} onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="birthdate">Birthdate: </label>
          <input type="date" name="birthdate" value={formValues.birthdate} onChange={handleInputChange} />
        </div>
      </form>

      <button
        onClick={() => {
            createUser(formValues)
            setFormValues({
              name: '',
              email: '',
              institution: '',
              city: '',
              birthdate: '',
              password: ''
            })
          }
        }
    >Create</button>
    </div>
  )
}
