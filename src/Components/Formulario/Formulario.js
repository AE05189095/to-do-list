import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addGoalToAPI } from '../../reducers/goalsAPI';
import './Formulario.scss';

function Formulario() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      await addGoalToAPI({
        title: name,
        description,
        dueDate: deadline,
      });
      setSuccessMsg('Meta agregada correctamente');
      setName('');
      setDescription('');
      setDeadline('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="formulario">
      <Form.Group className="mb-3" controlId="formTitulo">
        <Form.Label className="form-label">Nombre de la Tarea o Meta</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: Terminar proyecto final"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescripcion">
        <Form.Label className="form-label">Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Describe tu meta o tarea..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFechaLimite">
        <Form.Label className="form-label">Fecha Límite</Form.Label>
        <Form.Control
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="submit-btn" disabled={loading}>
        {loading ? 'Agregando...' : 'Agregar Tarea'}
      </Button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {successMsg && <p style={{ color: 'green', marginTop: '10px' }}>{successMsg}</p>}
    </Form>
  );
}

export default Formulario;
