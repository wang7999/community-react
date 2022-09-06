import { types } from "@/app/constant";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const menus = Object.keys(types).map((key) => ({name: types[key],code: key}))

export const Header = () => {
  const expand = "md";
  const navigate = useNavigate()
  
  return (
    <Navbar bg="white" expand={expand} className="border-bottom mb-3">
      <Container fluid="xl">
        <Navbar.Brand href="/">
          <span className="fs-4">Community</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
            <span className="fs-4">Community</span>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-grow-1 pe-3">
              <Nav.Link href="/index" className="fs-5">首页</Nav.Link>
              {menus.map(item => <Nav.Link href={'/'+item.code} key={item.code} className="fs-5">{item.name}</Nav.Link>)}
              
            </Nav>
            <div className="">
              <Button variant="outline-primary"><i className="bi bi-search"></i></Button>
              <Button variant="outline-primary" className="ms-2" onClick={() => navigate('/login')}>登录</Button>
              <Button variant="outline-primary" className="ms-2">注册</Button>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
