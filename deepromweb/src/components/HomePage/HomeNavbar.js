import { Navbar,Nav,Container, NavDropdown } from "react-bootstrap";

export default function HomeNavbar(props) {
    return (
            <Navbar bg="light" expand="lg">
            <Container>
            
            <Navbar.Brand href="/admin">
             <img src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24"/>
            </Navbar.Brand>
                <Nav id ='menus'>
                    <Nav.Link href="">บริการ</Nav.Link>
                    <Nav.Link href="">คำแนะนำ</Nav.Link>
                    <Nav.Link href="">ติดต่อเรา</Nav.Link>
                    <Nav.Link href="">เป็นส่วนหนึ่งกับเรา</Nav.Link>
                </Nav>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="TH" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/admin/">TH</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/admin/">EN</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>

                <Nav>
                    <Nav.Link href="/admin">ลงทะเบียน</Nav.Link>
                    <Nav.Link href="">|</Nav.Link>
                    <Nav.Link href="/admin">เข้าสู่ระบบ</Nav.Link>
                </Nav>
            </Container>
            </Navbar>
    );
}