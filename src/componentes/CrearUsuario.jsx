import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import '../estilos/log.css';
import { PiHandsClappingDuotone } from "react-icons/pi";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { collection, addDoc } from 'firebase/firestore/lite';
import { db } from '../firebaseConfig/Firebase';



function CrearUsuario() {


    const navigate = useNavigate();
    //1. declaracion de variables de estado
    const [nombre, setNombre] = useState("");
    const [avatar, setAvatar] = useState("");
    const [error, setError] = useState();

    //llamo el usuario actual desde el AuthContext
    const { user } = useAuth();
    console.log(user);

    //llamo el registro desde el AuthContext
    // const { registrar, cargarDatos } = useAuth();



    //2. Referencia a la BD
    const userCollection = collection(db, "Usuarios");

    //3. Creación de Alerta

    const alertaRegistro = () => {
        Swal.fire({
            // position: 'top-end',
            icon: 'success',
            title: 'Usuario creado exitosamente',
            showConfirmButton: false,
            timer: 1500
        })
    }

    //4. Asincronismo con la bd
    const nuevoUsuario = async () => {
        try {
            await addDoc(userCollection, {
                UserId: user.uid,
                Nombre: nombre,
                Email: user.email,
                Imagen: avatar

            });
            alertaRegistro();
            console.log(user)
            navigate('/')
        } catch (error) {
            setError(error)
        }
        
    }



return (
    <div className='m-4'>


        <h3 className='text-center text-white'>Bravo! Vamos a registrarte</h3>
        <h3 className='text-center text-white fs-2'><PiHandsClappingDuotone /></h3>
        <Form onSubmit={nuevoUsuario} className='m-auto log-form p-4 d-flex flex-column'>
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
                    value={user.email}
                    aria-describedby="emailHelpBlock"
                />

            </div>

            <div className='mb-2 text-white'>
                <Form.Label htmlFor="inputPassword5">URL de Imagen</Form.Label>

                <Form.Control
                    type="text"
                    id="inputImg5"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    aria-describedby="imgHelpBlock"
                />
                
            </div>
            

            {error && <p className='text-white text-center mt-3'>ERROR: {error}</p>}

            <Button className='mt-3 w-50 align-self-center' variant="dark" type='submit'>Guardar</Button>
        </Form>

    </div>
);
}

export default CrearUsuario;