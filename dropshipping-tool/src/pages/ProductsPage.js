import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';
import useKeywordSearch from '../hooks/useKeywordSearch';

function ProductsPage({ keyword, amount }) {
    const { isLoading, error, data } = useKeywordSearch(keyword, amount);

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

                    <Col md={8}>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error.message}</p>
                        ) : (
                            data.map((product, index) => (
                                <Card key={index} className="bg-dark text-light mb-4">
                                    <Card.Body>
                                        <Card.Title className="text-lightgreen-1">{product.title}</Card.Title>
                                        <Card.Text>{product.main_category}</Card.Text>
                                        <Row>
                                            <Col>
                                                <p className="mb-1 text-lightgreen-2">{product.sales} sales</p>
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
                            ))
                        )}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default ProductsPage;
