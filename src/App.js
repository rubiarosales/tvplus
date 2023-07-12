import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './componentes/Navbar';
import Destacadas from './componentes/Destacadas';
import Recomendadas from './componentes/Recomendadas';
import DescubrePelis from './componentes/DescubrePelis';
import DescubreTV from './componentes/DescubreTV';
import Generos from './componentes/Generos';




function App() {
  return (
    <div className="App">
      <Menu/>
      <Destacadas/>
      <Recomendadas/>
      <DescubrePelis/>
      <DescubreTV/>
      <Generos/>


    </div>
  );
}

export default App;
