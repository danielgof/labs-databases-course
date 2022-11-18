import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import StartPage from '../pages/startPage';
import Phones from '../pages/Phones';
import Users from '../pages/Users';
import Positions from '../pages/Positions';

const NavBar = () => {
  return (
    <>
      {/* <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/phones">Номера телефонов</Nav.Link>
            <Nav.Link href="/users">Данные о сотрудниках</Nav.Link>
            <Nav.Link href="/positions">Должности</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}

      <Navbar collapseOnSelect expand="md" bg="secondary" variant='dark' >
          <Container>
            <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                    <Nav.Link href="/phones">Номера телефонов</Nav.Link>
                    <Nav.Link href="/users">Данные о сотрудниках</Nav.Link>
                    <Nav.Link href="/positions">Должности</Nav.Link>
                </Nav>
            </Navbar.Collapse>
          </Container>
      </Navbar>

      <Router>
        <Routes>
        <Route exact path='/' element={<StartPage />}/>
        <Route exact path="/phones" element={<Phones />}/>
        <Route exact path="/users" element={<Users />}/>
        <Route exact path="/positions" element={<Positions />}/>
        </Routes>
      </Router>
    </>
  );
}

export default NavBar;