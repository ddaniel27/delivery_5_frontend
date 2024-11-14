const baseUrl = 'http://localhost:3000/api'; 
const baseUrl2 = 'http://localhost:3001/api';
const projectUrl = baseUrl2 + '/project';
const userUrl = baseUrl + '/user';
async function CreateUserRequest(userData) {

    const requiredFields = ["email", "password", "name", "institution", "city", "birthdate"];
    for (const field of requiredFields) {
        if (!userData.hasOwnProperty(field) || userData[field] === "") {
            throw new Error(`El campo ${field} es obligatorio`);
        }
    }

    try {
        const response = await fetch(userUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
}

async function GetUserByID(id) {
  try {
    const response = await fetch(userUrl + '/' + id);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
}

async function GetAllUsers() {
  try {
    const response = await fetch(userUrl);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
}

async function CreateProjectRequest(projectData) {
    try {
        const response = await fetch(projectUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)
        });

        if (!response.ok) {
            throw new Error(`Error en la creación del proyecto: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function GetProjectByOwner(id) {
  try {
    const response = await fetch(projectUrl + '/owner/' + id);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const result = await response.json();
    if (result.project === null) {
      throw new Error('No se encontraron proyectos');
    }
    return result;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
}

export { 
  CreateUserRequest,
  GetUserByID,
  GetAllUsers,
  CreateProjectRequest,
  GetProjectByOwner
};
