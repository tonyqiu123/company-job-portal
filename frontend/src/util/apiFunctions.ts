import { JobInterface } from "./interfaces";

// api.ts
// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = 'company-job-portal-production.up.railway.app/api';

async function handleErrorResponse(response: Response) {
  try {
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function getJobs(params = {}, jobIds: string[] = [], search?: string, position?: string) {
  const queryString = new URLSearchParams(params).toString();

  return fetch(`${API_BASE_URL}/jobs?${queryString}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ jobIds, search, position })
  })
    .then(handleErrorResponse)
    .catch(error => {
      throw error;
    });
}

export async function getUserData(jwt: string) {
  return fetch(`${API_BASE_URL}/users/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
  })
    .then(handleErrorResponse)
    .catch(error => {
      throw error;
    });
}

export async function login(email: string, password: string) {
  return fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(handleErrorResponse)
    .catch(error => {
      throw error;
    });
}

export async function signup(firstName: string, lastName: string, email: string, password: string) {
  return fetch(`${API_BASE_URL}/users/`, {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, password }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(handleErrorResponse)
    .catch(error => {
      throw error;
    });
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
    .catch(error => {
      throw error;
    });
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
    .catch(error => {
      throw error;
    });
}

export async function applyJob(jwt: string, userId: string, jobId: string, action: string) {
  return fetch(`${API_BASE_URL}/jobs/apply/${jobId}`, {
    method: 'PUT',
    body: JSON.stringify({ userId, action }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  })
    .then(handleErrorResponse)
    .catch(error => {
      throw error;
    });
}

export async function getMonthlyData() {
  return fetch(`${API_BASE_URL}/monthlyData`)
    .then(handleErrorResponse)
    .catch(error => {
      throw error
    })
}

// ADMIN API
export async function validateAdminJwt(jwt: string) {
  return fetch(`${API_BASE_URL}/admin/protected`, {
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    },
  })
    .then(handleErrorResponse)
    .catch(error => {
      throw error;
    });
}

export async function adminLogin(password: string) {
  return fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    body: JSON.stringify({ password }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(handleErrorResponse)
    .catch(error => {
      throw error;
    });
}


export async function deleteJobs(jobs: string[], adminJwt: string | null) {
  return fetch(`${API_BASE_URL}/jobs/`, {
    method: 'DELETE',
    body: JSON.stringify({ jobIds: jobs }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminJwt}`
    },
  })
    .then(handleErrorResponse)
    .catch(error => {
      throw error;
    });
}

export async function getUsersById(params = {}, adminJwt: string, search?: string, userIds: string[] = []) {
  const queryString = new URLSearchParams(params).toString();

  return fetch(`${API_BASE_URL}/users/multipleUsersById?${queryString}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminJwt}`
    },
    body: JSON.stringify({ userIds, search })
  })
    .then(handleErrorResponse)
    .catch(error => {
      throw error;
    });
}

export async function updateJob(adminJwt: string, jobData: any) {
  return fetch(`${API_BASE_URL}/jobs/${jobData._id}`, {
    method: 'PUT',
    body: JSON.stringify(jobData),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminJwt}`
    },
  })
    .then(handleErrorResponse)
    .catch(error => {
      throw error;
    });
}

export async function getFileContent(fileName: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/users/files/${fileName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    handleErrorResponse(response);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const blob = await response.blob();
  const blobURL = URL.createObjectURL(blob);

  return blobURL;
}

export async function createJob(jwt: string, jobDetails: JobInterface) {
  return fetch(`${API_BASE_URL}/jobs/`, {
    method: 'POST',
    body: JSON.stringify(jobDetails),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  })
    .then(handleErrorResponse)
    .catch(error => {
      throw error;
    });
}
