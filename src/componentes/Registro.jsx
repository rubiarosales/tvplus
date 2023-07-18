import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import '../estilos/log.css';
import { PiHandsClappingDuotone } from "react-icons/pi";
import Button from 'react-bootstrap/Button';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig/Firebase';
import { useState } from 'react';






function Registro() {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [user,setUser]=useState(null);


    const registrar = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(error)
                console.log(errorCode);
                console.log(errorMessage);
            });
            
    }


    return (
        <div className='m-4'>
            <h3 className='text-center text-white'>Bravo! Vamos a registrarte</h3>
            <h3 className='text-center text-white fs-2'><PiHandsClappingDuotone /></h3>
            <Form onSubmit={registrar} className='m-auto log-form p-4 d-flex flex-column'>
            <div className='mb-2 text-white'>
                    <Form.Label htmlFor="inputNombre5">Nombre</Form.Label>

                    <Form.Control
                        type="text"
                        id="inputNombre5"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        aria-describedby="nombreHelpBlock"
                    />

                </div>
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
                    <Form.Text id="passwordHelpBlock" muted>
                        La contraseña debe tener al menos 6 caracteres
                    </Form.Text>
                </div>


                <Button className='mt-3 w-50 align-self-center' variant="dark" type='submit'>Enviar</Button>
            </Form>

        </div>
    );
}

export default Registro;