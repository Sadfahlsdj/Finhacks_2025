import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';

function ProductsPage() {
    // will retrieve the product data from keyword and return html for each product
    // const products = (keyword) => {}


    return (
        <div> 
            <Header />
            <Container className="my-5">
                <Row>
                    <Row className="mb-5 text-lightgreen-1 align-items-center">
                        <Col>
                            <h1 className="display-4 fw-bold">Products</h1>
                        </Col>
                        <Col>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product keywords..."
                                    aria-label="Enter product keywords..."
                                    aria-describedby="btnGroupAddon2"
                                />
                                <Button variant="success" id="btnGroupAddon2">Search</Button>
                            </InputGroup>
                        </Col>
                    </Row>

                    {/* Products */}
                    <Col md={8}>
                    <Card className="bg-dark text-light mb-4">
                        <Card.Body>
                        <Card.Title className="text-lightgreen-1">🛒 Product1</Card.Title>
                        <Card.Text>
                            This is a summary of the first post. It provides a brief overview of the content.
                        </Card.Text>
                        <Row>
                            <Col>
                            <p className="mb-1 text-lightgreen-2">123 sales</p>
                            <div>
                                <span className="badge bg-secondary me-2">tag1</span>
                                <span className="badge bg-secondary me-2">tag2</span>
                                <span className="badge bg-secondary">tag3</span>
                            </div>
                            </Col>
                            <Col className="text-end">
                            <Button variant="success">Add</Button>
                            </Col>
                        </Row>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            Updated: 2024-07-18 | Posted: 2024-07-18
                        </Card.Footer>
                    </Card>
                    <Card className="bg-dark text-light mb-4">
                        <Card.Body>
                        <Card.Title className="text-lightgreen-1">✅ Product 2</Card.Title>
                        <Card.Text>
                            This is a summary of the second post. It provides a brief overview of the content.
                        </Card.Text>
                        <Row>
                            <Col>
                            <p className="mb-1 text-lightgreen-2">123 sales</p>
                            <div>
                                <span className="badge bg-secondary me-2">tag1</span>
                                <span className="badge bg-secondary me-2">tag2</span>
                                <span className="badge bg-secondary">tag3</span>
                            </div>
                            </Col>
                            <Col className="text-end">
                            <Button variant="secondary">Remove</Button>
                            </Col>
                        </Row>
                        </Card.Body>
                        <Card.Footer className="text-end">
                        Updated: 2024-07-18 | Posted: 2024-07-18
                        </Card.Footer>
                    </Card>
                    </Col>
                    {/* end of products */}


                    {/* What's trending (?) */}
                    <Col md={4}>
                    <Card className="bg-dark text-light mb-4">
                        <Card.Body className="text-center">
                        <Card.Title>Trending Products 🔥</Card.Title>
                        <p>placeholder</p>
                        </Card.Body>
                    </Card>

                    {/* Statistics */}
                    <Card className="bg-dark text-light">
                        <Card.Body className="text-center">
                        <Card.Title>Statistics</Card.Title>

                        {/* div under is placeholder for stats/graphs */}
                        <div className="mb-4">
                            <p>selected product's statistics</p>
                            <img alt="statistics" style={{width: "50%"}} src="https://images.squarespace-cdn.com/content/v1/55b6a6dce4b089e11621d3ed/1585087896250-R3GZ6OFWYQRZUJRCJU3D/produce_monthly.png"/>
                        </div>
                        <Button variant="success">Generate Ad →</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>

    )
}

export default ProductsPage;