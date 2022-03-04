import React from 'react'
import "assets/styles/navbar.css"
import { Navbar,Container } from "react-bootstrap";

const AdminNavbar = () => {
    return <header className='Navbar'>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/admin">BackEnd</Navbar.Brand>
                
            </Container>
        </Navbar>
        </header>
}

export default AdminNavbar; 