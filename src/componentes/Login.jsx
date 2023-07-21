import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import '../estilos/log.css';
import { HiOutlineEmojiSad } from "react-icons/hi";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useAuth } from './AuthContext';

function Login() {

  const navigate = useNavigate();

  // const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  // const [user,setUser]=useState(null);

  const { entrar } = useAuth();
  const { user } = useAuth();

  const manejarLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await entrar(email, password);
      navigate("/");
    } catch (error) {

      console.log(error)
      if (error.code === "auth/wrong-password") {
        setError("La contraseña es incorrecta")
      } else {
        if (error.code === "auth/user-not-found") {
          setError("Usuario no registrado")
        } else {
          setError(error.code)
        }
      }
    }
  }

console.log(user)
  return (
    <div className='m-4'>
      { !user && <h3 className='text-center text-white'>Ups! Parece que no has ingresado</h3>}
      <h3 className='text-center text-white fs-2'><HiOutlineEmojiSad /></h3>
      <Form onSubmit={manejarLogin} className='m-auto log-form p-4 d-flex flex-column'>
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

        <div className='mb-2 text-white'>
          <Form.Label htmlFor="inputPassword5">Password</Form.Label>

          <Form.Control
            type="password"
            id="inputPassword5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby="passwordHelpBlock"
          />
        </div>
        <div>
          <Form.Text className='text-white' id="registroHelpBlock">
            No tienes cuenta? <Link className=' text-white text-center ' to='/registro'>Regístrate</Link>
          </Form.Text>
        </div>
        <div>
          <Form.Text className='text-white' id="recuperoHelpBlock">
            Olvidaste tu contraseña? <Link className=' text-white text-center ' to='/recuperar'>Recupérala</Link>
          </Form.Text>
        </div>

        {error && <p className='text-white text-center mt-3'>ERROR: {error}</p>}

        <Button className='mt-3 w-50 align-self-center' variant="dark" type='submit'>Enviar</Button>
      </Form>

    </div>
  );
}

export default Login;