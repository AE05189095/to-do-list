// App.js
import './App.scss';
import Item from './Components/Item/Item';
import Menu from './Components/Menu/Menu';
import Container from 'react-bootstrap/Container';
import Formulario from './Components/Formulario/Formulario';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function App() {
  return (
    <div className="App">
      <Menu />
      <Container>
        <Row>
          <Col><Formulario /></Col>
          <Col>
            {/* Solo renderiza una vez el componente Item */}
            <Item />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
