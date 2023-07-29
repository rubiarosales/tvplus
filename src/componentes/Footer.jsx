import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../estilos/navbar.css';
import Nav from 'react-bootstrap/Nav';
import { BsFillEnvelopeFill,BsGithub, BsLinkedin,} from "react-icons/bs";
import '../App.css';

export default function Footer() {
  return (
    <Navbar className="fixed-bottom menu foot">
    <Container className='d-flex justify-content-between'>
      <Navbar.Brand className='text-white p-0'>
        <a
        href='https://www.themoviedb.org/'
        target='_blank'>
        <img
        
        alt="TMDB logo"
        src='../../blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
        width="30"
        height="30"
        className="d-inline-block align-bottom"
      /></a>{'  '}
        Rubia Rosales
      </Navbar.Brand>
      <Nav className="justify-content-end fs-4" defaultActiveKey="link-0">
        <Nav.Item >
          <Nav.Link className='text-white p-1' eventKey="link-0" href='https://www.linkedin.com/in/rubiarosales/' target='_Blank'><BsLinkedin/></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1"
          className='text-white p-1'href='https://github.com/rubiarosales?tab=repositories' target='_Blank'><BsGithub/></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2"
          className='text-white p-1' href='mailto:rubia.j.rosales@gmail.com'><BsFillEnvelopeFill/></Nav.Link>
        </Nav.Item>
       
      </Nav>
    </Container>
  </Navbar>
  )
}
