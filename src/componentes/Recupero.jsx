import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import '../estilos/log.css';
import { HiOutlineEmojiSad } from "react-icons/hi";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useAuth } from './AuthContext';
import { auth } from '../firebaseConfig/Firebase';
import Swal from 'sweetalert2'


function Recupero() {

  const navigate = useNavigate();

  // const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  const [error, setError] = useState();
  // const [user,setUser]=useState(null);

  const { recuperar, user } = useAuth();


  const manejarReset = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await recuperar(auth, email);
      alertaRecuperar();
    //   navigate("/");
    } catch (error) {

      console.log(error.code)
      alertaError();
    }
  }

  const alertaRecuperar = ()=>{
    Swal.fire(
      ' ',
      'Se ha enviado un email a la casilla indicada para cambiar tu contraseña!',
      'success'
    )
  }

  const alertaError = ()=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${error.code}`,
     
    })
  }

  return (
    <div className='margen-sup'>
      { !user && <h3 className='text-center text-white'>Vamos a restablecer tu contraseña</h3>}
      <h3 className='text-center text-white fs-2'><HiOutlineEmojiSad /></h3>
      <Form onSubmit={manejarReset} className='m-auto log-form p-4 d-flex flex-column'>
        <div className='mb-2 text-white'>
          <Form.Label htmlFor="inputEmail5">Email</Form.Label>

          <Form.Control
            type="email"
            id="inputEmail5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelpBlock"
          />

        </div>

      

        {error && <p className='text-white text-center mt-3'>ERROR: {error}</p>}

        <Button className='mt-3 w-50 align-self-center' variant="dark" type='submit'>Enviar</Button>
      </Form>

    </div>
  );
}

export default Recupero;