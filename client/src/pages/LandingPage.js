import './LandingPage.css';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import dish1 from '../images/dish1.png'
import dish2 from '../images/dish2.png'
import dish3 from '../images/dish3.png'

function LandingPage() {
  return (
    <div>
      <Navbar expand="lg" className="navbar">
        <Container >
          <Navbar.Brand className='navBrand'>
            UnderCooked
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/" className='home'>HOME</Nav.Link>
            <Nav.Link as={Link} to="/recipe" className='recipes'>RECIPES</Nav.Link>
            <Nav.Link as={Link} to="/login">LOGIN</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='lp'>
        <h1 className='lpText'>All-in-one place for delicious recipes</h1>
        <p className='bottomText'>The ultimate guide to easy recipes & inspiration</p>
      </div>
      <div>
        <img src={dish1} alt="dish1" className='dish1'></img>
        <img src={dish2} alt="dish2" className='dish2'></img>
        <img src={dish3} alt="dish3" className='dish3'></img>
      </div>
    </div>
  );
}

export default LandingPage;