import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { dbCollections } from '../firebaseConfig/Collections';
import { useAuth } from './AuthContext';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { db } from '../firebaseConfig/Firebase';
import Swal from 'sweetalert2';
import { collection } from 'firebase/firestore';



export default function EditarUsuario() {

    const navigate = useNavigate();
    const { id } = useParams();

console.log(id)

    //1. declaracion de variables de estado


    //llamo el usuario actual desde el AuthContext
    const { user, userData ,getUsuarioById} = useAuth();

    // const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState(userData.Nombre);
    const [email, setEmail] = useState(userData.Email);
    const [avatar, setAvatar] = useState(userData.Imagen);
    const [error, setError] = useState();
    const [data, setData] = useState([]);




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

    const getImg = (e) => {
        setAvatar(e.target.src)
        // return avatar
    }
    console.log(avatar)
    //2. Asignar datos modificados

    // const cambio = (e) =>{
    //     e.preventDefault();
    //     setAvatar ({[e.target.name]: [e.target.value]})
    // }


//Alerta guardado
// const MySwal = withReactContent(Swal);
const alertaGuardado = () => {

    Swal.fire(
       { 
        title:'Tus datos han sido editados.',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,}
    )

}

    // Declarar el update (crUd)
    const update = async (e) => {
        e.preventDefault();
        const usuario = doc(db, dbCollections.Usuarios, id);
        const data = {
            Nombre: nombre,
            Email: email,
            Imagen: avatar,
        };
        try {
            await updateDoc(usuario, data);
            alertaGuardado();
            getUsuarioById(id);
            // fue la unica forma que encontré para volver al perfil :S
            setTimeout(()=>navigate('/perfil/id'),1500)
            
            console.log("Seactualizo correctamente")
        } catch (error) {
            console.log(error)
        }
    }
    console.log(nombre)
    console.log(avatar)

    return (
        <div className='margen-sup'>


            <h3 className='text-center text-white'>Editar Perfil</h3>

            <Form
                onSubmit={update}
                className='m-auto log-form p-4 d-flex flex-column'>
                <img className='perfil-img m-auto' src={avatar}
                />

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
                        readOnly
                        type="email"
                        id="inputEmail5"
                        value={userData.Email}
                        aria-describedby="emailHelpBlock"
                    />

                </div>

                {/* <div className='mb-2 text-white'>
                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>

                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        value={userData}
                        onChange={cambio}
                        aria-describedby="passwordHelpBlock"
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                        La contraseña debe tener al menos 6 caracteres
                    </Form.Text>
                </div> */}
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

                <Button className='mt-3 w-50 align-self-center' variant="dark" type='submit'
                >Guardar</Button>
            </Form>

        </div>
    );

}
