import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Formulario.scss'; // Si tienes estilos propios

function Formulario() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formTitulo">
        <Form.Label>Nombre de la Tarea o Meta</Form.Label>
        <Form.Control type="text" placeholder="Ej: Terminar proyecto final" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescripcion">
        <Form.Label>Descripción</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Describe tu meta o tarea..." />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFechaLimite">
        <Form.Label>Fecha Límite</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Agregar Tarea
      </Button>
    </Form>
  );
}

export default Formulario;
