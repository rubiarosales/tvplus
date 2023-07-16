import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './componentes/Navbar';
import Home from './componentes/Home';
import PelisDetalle from './componentes/PelisDetalle'
import { Route, Routes, Link } from 'react-router-dom';
import TvDetalle from './componentes/SeriesDetalle';
import Peliculas from './componentes/Peliculas';


function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detallepelis/:id" element={<PelisDetalle/>} />
        <Route path="/detalletv/:id" element={<TvDetalle/>} />
        <Route path="/peliculas" element={<Peliculas/>} />
      </Routes>

    </div>
  );
}

export default App;
