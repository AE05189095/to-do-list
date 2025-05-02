import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import { removeTodo, editTodo } from '../../reducers/todoSlice'; // Importar la acción de editar
import './Item.scss';

function Item() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.value); // Acceder a las tareas desde Redux

  // Estados locales para el modal de edición
  const [showModal, setShowModal] = useState(false);
  const [editedTask, setEditedTask] = useState({
    id: null,
    name: '',
    description: '',
    deadline: '',
  });

  const handleDelete = (id) => {
    dispatch(removeTodo(id)); // Despachar acción para eliminar la tarea
  };

  const handleEdit = (todo) => {
    setEditedTask({ ...todo });
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    dispatch(editTodo({ id: editedTask.id, updatedTodo: editedTask }));
    setShowModal(false);
  };

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  return (
    <>
      {todos.map((todo) => (
        <Card key={todo.id} style={{ width: '18rem' }} className="mb-3">
          <Card.Body>
            <Card.Title>{todo.name}</Card.Title>
            <Card.Text>
              {todo.description || 'Sin descripción'} {/* Mostrar descripción si existe */}
            </Card.Text>
            <Card.Text>
              <small>Fecha límite: {todo.deadline}</small>
            </Card.Text>
            <div className="d-flex justify-content-center">
              <Button 
                variant="info" 
                onClick={() => handleEdit(todo)} 
                className="me-2 btn-editar"
              >
                Editar
              </Button>
              <Button 
                variant="danger" 
                onClick={() => handleDelete(todo.id)}
                className="btn-eliminar"
              >
                Eliminar
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}

      {/* Modal para editar tarea */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitulo">
              <Form.Label>Nombre de la Tarea o Meta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Terminar proyecto final"
                name="name"
                value={editedTask.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe tu meta o tarea..."
                name="description"
                value={editedTask.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFechaLimite">
              <Form.Label>Fecha Límite</Form.Label>
              <Form.Control
                type="date"
                name="deadline"
                value={editedTask.deadline}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Item;
