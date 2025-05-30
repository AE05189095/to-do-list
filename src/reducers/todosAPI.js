const API_BASE_URL = 'http://localhost:3000/api/todos';
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

export const fetchTodosFromAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/getTodos`, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
  return await handleResponse(response);
};

export const addTodoToAPI = async (todo) => {
  const response = await fetch(`${API_BASE_URL}/addTodo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify(todo),
  });
  return await handleResponse(response);
};

export const deleteTodoFromAPI = async (id) => {
  const response = await fetch(`${API_BASE_URL}/removeTodo/${id}`, {
    method: 'DELETE',
    headers: {
      'x-api-key': API_KEY,
    },
  });
  return await handleResponse(response);
};