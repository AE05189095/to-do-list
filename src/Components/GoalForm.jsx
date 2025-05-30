import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGoal } from '../reducers/goalsSlice';

function GoalForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;  // fecha obligatoria también
    dispatch(addGoal({ title, description, dueDate }));
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Título de la meta"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        style={{ marginRight: '0.5rem' }}
      />
      <button type="submit" className="btn btn-primary">Agregar Meta</button>
    </form>
  );
}

export default GoalForm;
