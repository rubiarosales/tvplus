import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import '../estilos/log.css';
import { HiOutlineEmojiSad } from "react-icons/hi";
import Button from 'react-bootstrap/Button';


function Login() {
  return (
    <div className='m-4'>
      <h3 className='text-center text-white'>Ups! Parece que no has ingresado</h3>
      <h3 className='text-center text-white fs-2'><HiOutlineEmojiSad/></h3>
      <Form className='m-auto log-form p-4 d-flex flex-column'>
        <div className='mb-2 text-white'>
          <Form.Label htmlFor="inputEmail5">Email</Form.Label>

          <Form.Control
            type="email"
            id="inputEmail5"
            aria-describedby="emailHelpBlock"
          />

        </div>

        <div className='mb-2 text-white'>
          <Form.Label htmlFor="inputPassword5">Password</Form.Label>

          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
          />
        </div>
       <div>
       <Form.Text className='text-white' id="registroHelpBlock">
          No tienes cuenta? <Link className=' text-white text-center ' to='/registro'>Regístrate</Link>
        </Form.Text>
        </div>

        <Button className='mt-3 w-50 align-self-center' variant="dark" type='submit'>Enviar</Button>
      </Form>

    </div>
  );
}

export default Login;