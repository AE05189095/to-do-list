const API_BASE_URL = 'http://localhost:3000/api/goals'; // Asegúrate que la ruta base sea correcta
const API_KEY = '123456';

async function handleResponse(response) {
  const contentType = response.headers.get('content-type') || '';

  if (!response.ok) {
    if (contentType.includes('application/json')) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error desconocido');
    } else {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }
  }

  if (contentType.includes('application/json')) {
    return await response.json();
  } else {
    const text = await response.text();
    throw new Error(`Respuesta inesperada del servidor: ${text.substring(0, 100)}...`);
  }
}

export const fetchGoalsFromAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/getGoals`, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
  return await handleResponse(response);
};

export const addGoalToAPI = async (goal) => {
  const response = await fetch(`${API_BASE_URL}/addGoal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify(goal),
  });
  return await handleResponse(response);
};

export const deleteGoalFromAPI = async (id) => {
  const response = await fetch(`${API_BASE_URL}/removeGoal/${id}`, {
    method: 'DELETE',
    headers: {
      'x-api-key': API_KEY,
    },
  });
  return await handleResponse(response);
};