import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodos,
  removeTodo,
  selectTodos,
  selectTodosLoading,
  selectTodosError,
} from '../reducers/todoSlice';
import TodoForm from './TodoForm';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const loading = useSelector(selectTodosLoading);
  const error = useSelector(selectTodosError);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div>
      <TodoForm />

      {loading && <p>Cargando tareas...</p>}
      {error && <p>Error: {error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {todos.map((todo) => (
          <div
            key={todo._id}
            style={{
              backgroundColor: '#f8f9fa',
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              border: '1px solid #dee2e6',
            }}
          >
            <h3 style={{ marginBottom: '0.5rem', color: '#0d6efd' }}>{todo.name}</h3>
            <p style={{ marginBottom: '0.25rem', color: '#6c757d' }}>
              {todo.description || 'Sin descripción'}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#495057' }}>
              Fecha límite: {new Date(todo.deadline).toLocaleDateString()}
            </p>
            <button
              onClick={() => dispatch(removeTodo(todo._id))}
              className="btn btn-danger"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;