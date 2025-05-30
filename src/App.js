import './App.scss';
import Menu from './Components/Menu';
import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Tasks from './Components/Tasks';
import GoalsList from './Components/GoalsList';

function App() {
  return (
    <div className="App">
      <Menu />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tareas" element={<Tasks />} />
          <Route path="/goals" element={<GoalsList />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;