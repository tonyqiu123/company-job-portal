// api.ts
const API_BASE_URL = 'http://localhost:5000/api';


async function handleErrorResponse(response: Response) {
  if (!response.ok) {
    const error = {
      statusCode: response.status,
      message: response.statusText
    };
    console.log(error.message)
    throw error;
  }
  return response.json();
}

export async function getJobs(params = {}) {
  const queryString = new URLSearchParams(params).toString();

  return fetch(`${API_BASE_URL}/jobs?${queryString}`)
    .then(handleErrorResponse);
}


export async function getSingleJobData(jobId: string) {
  return fetch(`${API_BASE_URL}/jobs/${jobId}`)
    .then(handleErrorResponse);
}

export async function getUserData(jwt: string) {
  return fetch(`${API_BASE_URL}/users/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
  })
    .then(handleErrorResponse);
}

export async function login(email: string, password: string) {
  return fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(handleErrorResponse);
}

export async function signup(firstName: string, lastName: string, email: string, password: string) {
  return fetch(`${API_BASE_URL}/users/`, {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, password }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(handleErrorResponse);
}

export async function updateUser(jwt: string, userData: any) {
  return fetch(`${API_BASE_URL}/users/`, {
    method: 'PUT',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
  })
    .then(handleErrorResponse)
}

export async function uploadFile(jwt: string, file: any) {
  const formData = new FormData();
  formData.append('file', file);
  return fetch(`${API_BASE_URL}/users/upload-file`, {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${jwt}`
    },
  })
    .then(handleErrorResponse)
}


// ADMIN API
export async function adminLogin(password: string) {
  return fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    body: JSON.stringify({ password }),
    headers: { 'Content-Type': 'application/json' }

  })
    .then(handleErrorResponse)
}

export async function deleteJobs(jobs: string[]) {
  return fetch(`${API_BASE_URL}/jobs/`, {
    method: 'DELETE',
    body: JSON.stringify({ jobIds: jobs }),
    headers: { 'Content-Type': 'application/json' }

  })
    .then(handleErrorResponse)
}