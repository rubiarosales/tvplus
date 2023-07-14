import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './componentes/Navbar';
import Home from './componentes/Home';
import PelisDetalle from './componentes/PelisDetalle'
import { Route, Routes, Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detallepelis/:id" element={<PelisDetalle/>} />
      </Routes>

    </div>
  );
}

export default App;
