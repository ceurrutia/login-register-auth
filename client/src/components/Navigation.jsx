import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useAuth } from '../context/AuthContext'; 
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const handleSignout = async () => {
    await signout();
    navigate('/'); 
  };

  return (
    <Navbar className="bg-body-tertiary" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/admin">Museum List</Nav.Link>
            <Nav.Link as={Link} to="#">Free Walking Tours</Nav.Link>
          </Nav>
          <Navbar.Text className="justify-content-end">
            {user ? (
              <>
                <i className="bi bi-person-circle"></i> USER: <Link to="/profile">{user.email}</Link>
                <button className="btn btn-danger ms-2" onClick={handleSignout}>Sign Out</button>
              </>
            ) : (
              'Not signed in'
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
