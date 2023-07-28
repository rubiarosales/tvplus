import '../estilos/navbar.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import '../estilos/perfil.css';
import Accordion from 'react-bootstrap/Accordion';
import { useAuth } from './AuthContext';
import Favoritos from './Favoritos';

export default function Perfil() {

    const { user, userData } = useAuth();
    const navigate = useNavigate();
    //  const AEditar = (e) =>{
    //     e.preventDefault();
    //     navigate(`/editarperfil/${user.uid}`);
    //  }

    return (
        <div className='user-profile margen-sup'>
            <h3>Hola {userData.Nombre}</h3>
            <Accordion className='acordeon' defaultActiveKey={['0']} alwaysOpen flush>
                <Accordion.Item eventKey="0" className='acordeon'>
                    <Accordion.Header className='acordeon-header'>Datos Personales</Accordion.Header>
                    <Accordion.Body>

                        <Form
                            className='d-flex flex-column flex-sm-row justify-content-around align-items-center perfil-form'>
                            <img className='perfil-img' src={userData.Imagen} />

                            <div className='d-flex flex-column perfil-data'>
                                <div className='mb-2 text-white'>
                                    <Form.Label htmlFor="inputNombre5">Nombre</Form.Label>

                                    <Form.Control
                                        type="text"
                                        id="inputNombre5"
                                        value={userData.Nombre}
                                        // onChange={(e) => setNombre(e.target.value)}
                                        aria-describedby="nombreHelpBlock"
                                    />

                                </div>
                                <div className='mb-2 text-white'>
                                    <Form.Label htmlFor="inputEmail5">Email</Form.Label>

                                    <Form.Control
                                        type="email"
                                        id="inputEmail5"
                                        value={userData.Email}
                                        // onChange={(e) => setEmail(e.target.value)}
                                        aria-describedby="emailHelpBlock"
                                    />

                                </div>
                            </div>




                        </Form>
                        <div className='text-center perfil-opt m-auto d-flex justify-content-between'>

                            {/* <Button className='mt-4   align-self-center' variant="dark" type='submit'
                            onClick={AEditar}
                            >Modificar datos</Button> */}
<Button className='mt-4 align-self-center' variant="dark" type='submit'>
                            <Link to={`/editarusuario/${user.uid}`} className='text-decoration-none text-white'
                            >Modificar datos</Link></Button>

                            <Button className='mt-4 align-self-center' variant="dark" type='submit'>Eliminar cuenta</Button>
                        </div>

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1"
                className='acordeon'>
                    <Accordion.Header >Tus Películas Favoritas</Accordion.Header>
                    <Accordion.Body>
                        
                        <Favoritos/>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2"
                className='acordeon'>
                    <Accordion.Header >Tus Series Favoritas</Accordion.Header>
                    <Accordion.Body>
                      <p className='text-white'>  ***En construcción***</p>
                        <Favoritos/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
