import {
  Badge,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Nav.Link as={Link} to={"/homepage"} className="">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart /> Cart
                <Badge pill bg="success" style={{ marginLeft: "5PX" }}>
                  {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                </Badge>
              </Nav.Link>
              <NavDropdown title={userInfo?.name} id="username">
                <Nav.Link as={Link} to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </Nav.Link>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
