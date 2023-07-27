import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import '../estilos/log.css';
import { PiHandsClappingDuotone } from "react-icons/pi";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { setDoc, doc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig/Firebase';
import Swal from 'sweetalert2'
import axios from 'axios';

function Registro() {


    const navigate = useNavigate();
    //1. declaracion de variables de estado

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [avatar, setAvatar] = useState("");
    const [error, setError] = useState();
    const [data, setData] = useState([]);


    //llamo el usuario actual desde el AuthContext
    const { user } = useAuth();

    //llamado a la api de Rick&Morty para usar imagen de avatar
    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character/?name=rick&status=alive`)
            .then((response) => {
                console.log(response.data.results);
                setData(response.data.results);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])


    //llamo el registro desde el AuthContext
    const { registrar } = useAuth();

    const manejarRegistro = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const usuarioCreado = await registrar(email, password);
            await nuevoUsuario(usuarioCreado);
            // navigate('/crearusuario')
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


    //2. Referencia a la BD
    // const userCollection = collection(db, "Usuarios");
    // const userDoc =  doc(db,"Usuarios", newUser.uid)

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

    //4. Asincronismo con la bd (Crud)
    const nuevoUsuario = async (user) => {

        if (user && user.uid) {
            console.log("Usuario válido:", user);

            const userDoc = doc(db, `Usuarios/${user.uid}`);
            try {
                await setDoc(userDoc, {
                    // UserId: newUser.uid,
                    Nombre: nombre,
                    Email: email,
                    Imagen: avatar
                });
                alertaRegistro();
                console.log("Alerta correcta")
                setTimeout(()=>{navigate('/')},2000);
            } catch (error) {
                setError(error);
                console.error("Error en la operación setDoc:", error);
            }
        }
        console.log("No funciona nuevoUsuario")
    }

    
    const getImg=(e)=>{
        setAvatar(e.target.src)
    }


    return (
        <div className='m-4 margen-sup'>


            <h3 className='text-center text-white'>Bravo! Vamos a registrarte</h3>
            <h3 className='text-center text-white fs-2'><PiHandsClappingDuotone /></h3>
            <Form onSubmit={manejarRegistro} className='m-auto log-form p-4 d-flex flex-column'>
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
                <div className='mb-2 text-white'>
                    <Form.Label htmlFor="inputPassword5">Selecciona un avatar</Form.Label>

                    <Form.Control
                        type="text"
                        id="inputImg5"
                        value={avatar}
                        aria-describedby="imgHelpBlock"
                    />

                    <div className='mt-2'>
                    {data.map((dato) => (
                        <img onClick={getImg} key={dato.id} className='m-1 avatar-img' src={dato.image} />
                    ))}

                    </div>
                </div>

                {error && <p className='text-white text-center mt-3'>ERROR: {error}</p>}

                <Button className='mt-3 w-50 align-self-center' variant="dark" type='submit'>Enviar</Button>
            </Form>

        </div>
    );
}

export default Registro;