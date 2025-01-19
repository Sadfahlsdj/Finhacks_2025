import { Container, Row, Col, Nav } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="bg-dark text-light py-4">
            <Container>
                <Row>
                    <Col>
                        <p className="mb-0">© Inquisiv. 2025</p>
                    </Col>
                    <Col className="text-end">
                    <Nav>
                        <Nav.Link href="#usecases" className="text-light">
                        Use cases
                        </Nav.Link>
                        <Nav.Link href="#resources" className="text-light">
                        Resources
                        </Nav.Link>
                    </Nav>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;