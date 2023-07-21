import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import '../estilos/log.css';
import { PiHandsClappingDuotone } from "react-icons/pi";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';




function Registro() {


    const navigate = useNavigate();
    //1. declaracion de variables de estado
    // const [nombre, setNombre] = useState("");
    // // const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();

    //llamo el usuario actual desde el AuthContext
    const { user } = useAuth();
    console.log(user);

    //llamo el registro desde el AuthContext
    const { registrar, cargarDatos } = useAuth();

    const manejarRegistro = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await registrar(email, password);
            console.log(user);
            navigate('/crearusuario')
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setError("Email ya resgistrado")
            } else {
                if (error.code === "auth/weak-password") {
                    setError("Contraseña muy débil")
                } else {
                    setError(error.code)
                }
            }
        }

    }



    return (
        <div className='m-4'>


            <h3 className='text-center text-white'>Bravo! Vamos a registrarte</h3>
            <h3 className='text-center text-white fs-2'><PiHandsClappingDuotone /></h3>
            <Form onSubmit={manejarRegistro} className='m-auto log-form p-4 d-flex flex-column'>
                {/* <div className='mb-2 text-white'>
                    <Form.Label htmlFor="inputNombre5">Nombre</Form.Label>

                    <Form.Control
                        type="text"
                        id="inputNombre5"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        aria-describedby="nombreHelpBlock"
                    />

                </div> */}
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


                {error && <p className='text-white text-center mt-3'>ERROR: {error}</p>}

                <Button className='mt-3 w-50 align-self-center' variant="dark" type='submit'>Enviar</Button>
            </Form>

        </div>
    );
}

export default Registro;