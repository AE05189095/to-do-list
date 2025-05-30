import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGoals,
  removeGoal,
  selectGoals,
  selectGoalsLoading,
  selectGoalsError,
} from '../reducers/goalsSlice';
import GoalForm from './GoalForm';

const GoalsList = () => {
  const dispatch = useDispatch();
  const goals = useSelector(selectGoals);
  const loading = useSelector(selectGoalsLoading);
  const error = useSelector(selectGoalsError);

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  return (
    <div>
      <h2>Mis Metas</h2>
      <GoalForm />

      {loading && <p>Cargando metas...</p>}
      {error && <p>Error: {error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {goals.map((goal) => (
          <div
            key={goal._id}
            style={{
              backgroundColor: '#f8f9fa',
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              border: '1px solid #dee2e6',
            }}
          >
            <h3 style={{ marginBottom: '0.5rem', color: '#0d6efd' }}>{goal.title}</h3>
            <p style={{ marginBottom: '0.5rem', color: '#6c757d' }}>
              {goal.description || 'Sin descripción'}
            </p>
            <button
              onClick={() => dispatch(removeGoal(goal._id))}
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

export default GoalsList;
