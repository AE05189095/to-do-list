import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addTodo } from '../../reducers/todoSlice'; // Asegúrate de que esta ruta sea correcta
import './Formulario.scss';

function Formulario() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear la tarea con un id único (puedes usar Date.now() para generar un id)
    const newTask = {
      id: Date.now(),
      name,
      description,
      deadline,
    };

    // Despachar la acción para agregar la tarea
    dispatch(addTodo(newTask));

    // Limpiar los campos del formulario
    setName('');
    setDescription('');
    setDeadline('');
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
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="submit-btn">
        Agregar Tarea
      </Button>
    </Form>
  );
}

export default Formulario;
