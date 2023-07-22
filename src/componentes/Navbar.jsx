import '../estilos/navbar.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import { HiUsers } from "react-icons/hi";
import { HiMiniArrowRightOnRectangle } from "react-icons/hi2";
// import { useContext } from 'react';
// import { UserContext } from '../App';
import { useAuth } from './AuthContext';

function Menu() {
const navigate = useNavigate();
  // const user = useContext(UserContext);
  const { user , userData } = useAuth();
  const { salir } = useAuth();
const manejarSalida = async () =>{
  
  try {
    await salir();
    console.log("Sesión cerrada");
    navigate('/');
  } catch (error) {
    console.log(error)
  }

  
}
console.log(user);
  return (
        <Navbar key='false' expand='false' className="menu"data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="#"><Link className='text-decoration-none text-white text-center' to='/'>TV plus</Link></Navbar.Brand>
           
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
 

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-false`}
              aria-labelledby={`offcanvasNavbarLabel-expand-false`}
              placement="end"
              data-bs-theme="dark"
              className="menu-off"
            >
              {user? <div className='d-flex justify-content-end align-items-end'>
                <h3 className='text-white text-end mx-1'>Hola! {userData.Nombre} </h3>
                <img className='avatar-sm' src={userData.Imagen} alt={userData.Nombre}/>
              </div> : ""}
              
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                  
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1"><Link className='text-decoration-none text-white text-center' to='/'>Inicio</Link></Nav.Link>
                  <Nav.Link href="#action2"><Link className='text-decoration-none text-white text-center' to='/peliculas'>Peliculas</Link></Nav.Link>
                  <Nav.Link href="#action2"><Link className='text-decoration-none text-white text-center' to='/seriestv'>Series</Link></Nav.Link>
                  <NavDropdown
                    title="Categorías"
                    id={`offcanvasNavbarDropdown-expand-false`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Buscar"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-light">Search</Button>
                </Form>
                {!user && <Nav.Link href="#action2"><Link className={`text-decoration-none text-white text-center fs-3`} to='/login'><HiUsers/></Link></Nav.Link>}
                {user && <Nav.Link href="#action2"><Link className='text-decoration-none text-white text-center fs-3' onClick={manejarSalida}><HiMiniArrowRightOnRectangle/></Link></Nav.Link>}

              </Offcanvas.Body> 
              
            </Navbar.Offcanvas>
           
          </Container>
        </Navbar>
);
}

export default Menu;