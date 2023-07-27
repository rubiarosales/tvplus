import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './componentes/Navbar';
import Home from './componentes/Home';
import PelisDetalle from './componentes/PelisDetalle'
import { Route, Routes, Link } from 'react-router-dom';
import TvDetalle from './componentes/SeriesDetalle';
import Peliculas from './componentes/Peliculas';
import Series from './componentes/Series';
import { BrowserRouter } from 'react-router-dom';
import Login from './componentes/Login';
import Registro from './componentes/Registro';

import AuthProvider, { UserContext } from './componentes/AuthContext'; //ESTO LO TENGO QUE IMPORTAR EN CADA COMPONENTE QUE USE USER
import React, { useContext } from 'react';//ESTO TAMBIEN
import Recupero from './componentes/Recupero';
import ProtectedRoute from './componentes/ProtectedRoute';
import CrearUsuario from './componentes/CrearUsuario';
import Perfil from './componentes/Perfil';
import EditarUsuario from './componentes/EditarUsuario';


function App() {

  // const user = useContext(UserContext); // eESTO LO DEFINO EN CADA COMPONENTE QUE USE USER Y TOMA LOS DATOS DE AUTHCONTEXT

  return (



    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/recuperar" element={<Recupero />} />
            <Route path="/detallepelis/:id" element={
              <ProtectedRoute>
                <PelisDetalle />
              </ProtectedRoute>} />
            <Route path="/detalletv/:id" element={
              <ProtectedRoute>
                <TvDetalle />
              </ProtectedRoute>
            } />
            <Route path="/crearusuario" element={
              <ProtectedRoute>
                <CrearUsuario />
              </ProtectedRoute>
            } />

            <Route path="/editarusuario/:id" element={
              <ProtectedRoute>
                <EditarUsuario />
              </ProtectedRoute>
            } />
            <Route path="/peliculas" element={<Peliculas />} />
            <Route path="/seriestv" element={<Series />} />
            <Route path="/perfil/:id" element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>



  );
}

export default App;
