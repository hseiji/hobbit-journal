import { useContext} from 'react';
import { Context } from '../context/Context';
import { Navbar, Nav, Container } from 'react-bootstrap';
import "./navbarcomp.css";

export default function NavbarComp() {

    const PF = "https://hobbit-journal.herokuapp.com/images/";
    const { user, dispatch } = useContext(Context);

    const handleLogout = () => {
        dispatch({type: "LOGOUT"});
    }

    return (
        <div>
            <Navbar className="color-nav" expand="md">
                <Container>
                    <Navbar.Brand href="/" className="navbarTitle ml-0">Hobbiton</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto"
                            style={{ maxHeight: '300px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="#">About</Nav.Link>
                            
                            {/* <NavDropdown title="More" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">About</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Contact Us</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        <Nav className="me-0">
                            <Nav.Link href="/#/newpost">{user && "New Post"}</Nav.Link>
                            <Nav.Link href="/#/login">{!user && "Login"}</Nav.Link>
                            {/* <Nav.Link href="/settings">{user && "Settings"}</Nav.Link> */}
                            <Nav.Link href="/" onClick={handleLogout}>{user && "Logout"}</Nav.Link>
                            {user && 
                                ( user.profilePhoto ?
                                (<img className="topImg" src={PF + user.profilePhoto} alt="" />):
                                (<b>{user.username}</b>)
                            )}
                        </Nav>
                        {/* <Nav className="newPost">
                            <Nav.Link href="#">New Post</Nav.Link>
                        </Nav> */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
