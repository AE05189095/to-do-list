import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../reducers/todoSlice';

function TodoForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !deadline) return;

    dispatch(addTodo({ name, description, deadline }));
    setName('');
    setDescription('');
    setDeadline('');
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Título de la tarea"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ marginRight: '0.5rem' }}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginRight: '0.5rem' }}
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
        style={{ marginRight: '0.5rem' }}
      />
      <button type="submit" className="btn btn-primary">Agregar Tarea</button>
    </form>
  );
}

export default TodoForm;