import React, { useState } from 'react';
import axios from 'axios';  // Import Axios
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';
import useKeywordSearch from '../hooks/useKeywordSearch';

function ProductsPage() {
    const [keyword, setKeyword] = useState("");  // State for capturing the keyword
    const [amount] = useState(10);  // Amount is fixed to 10 for simplicity
    const [searchTriggered, setSearchTriggered] = useState(false);  // State to manage when to trigger the query
    const [selectedProduct, setSelectedProduct] = useState(null);  // State to track selected product
    const [adImage, setAdImage] = useState(null);  // State to store the generated ad image

    // Use the hook for keyword search
    const { isLoading: searchLoading, error: searchError, data } = useKeywordSearch(searchTriggered ? keyword : "", amount);

    // Handle the input change for the keyword
    const handleKeywordChange = (event) => {
        setKeyword(event.target.value); // Update the keyword state
    };

    // Handle search button click
    const handleSearch = () => {
        if (keyword.trim() === "") {
            return;  // Do nothing if the keyword is empty
        }
        setSearchTriggered(true); // Set the flag to trigger the query
    };

    // Handle "Add" button click
    const handleAddProduct = (product) => {
        setSelectedProduct(product); // Set the selected product to the clicked product
    };

    // Handle "Generate Ad" button click
    const handleGenerateAd = async () => {
        if (!selectedProduct) {
            return;  // Do nothing if no product is selected
        }

        try {
            const response = await axios.post('https://127.0.0.1:5000/generate_ad', {
                product: selectedProduct.title // Send the product name to the backend
            });

            if (response.data.image) {
                setAdImage(response.data.image); // Set the generated image URL
            }
        } catch (error) {
            console.error('Error generating ad:', error);
        }
    };

    if (searchError) {
        console.log('Error fetching data: ', searchError);
    }

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
                                    value={keyword} // Bind the input field to the state
                                    onChange={handleKeywordChange} // Update keyword on input change
                                />
                                <Button variant="success" id="btnGroupAddon2" onClick={handleSearch}>
                                    Search
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row>
                        {/* First column: List of products */}
                        <Col md={8}>
                            {searchLoading ? (
                                <p>Loading...</p>
                            ) : searchError ? (
                                <p>Error: {searchError.message}</p>
                            ) : (
                                data && data.length > 0 ? (
                                    data.map((product, index) => (
                                        <Card key={index} className="bg-dark text-light mb-4">
                                            <Card.Body>
                                                <Card.Title className="text-lightgreen-1">{product.title}</Card.Title>
                                                <Card.Text>{product.main_category}</Card.Text>
                                                <Row>
                                                    <Col>
                                                        <p className="mb-1 text-lightgreen-2">${product.price}</p>
                                                    </Col>
                                                    <Col className="text-end">
                                                        <Button variant="success" onClick={() => handleAddProduct(product)}>View</Button>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                            <Card.Footer className="text-end">
                                                Average Rating: {product.average_rating} | Store: {product.store}
                                            </Card.Footer>
                                        </Card>
                                    ))
                                ) : (
                                    <p>No products found</p>
                                )
                            )}
                        </Col>

                        {/* Second column: Selected product details */}
                        {selectedProduct && (
                            <Col md={4}>
                                <Card className="bg-dark text-light mb-4">
                                    <Card.Body>
                                        <Card.Title className="text-lightgreen-1">{selectedProduct.title}</Card.Title>
                                        <Card.Text>Sentiment: {selectedProduct.sentiment}</Card.Text>
                                        <Card.Text>Review Score: {selectedProduct.review_score}</Card.Text>
                                        <Card.Text>Percentile: {selectedProduct.percentile}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="text-end">
                                        <Button variant="success" onClick={handleGenerateAd}>Generate Ad</Button>                                                
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )}
                    </Row>

                    {/* Display generated ad image */}
                    {adImage && (
                        <Row>
                            <Col>
                                <img src={adImage} alt="Generated Ad" style={{ width: '100%' }} />
                            </Col>
                        </Row>
                    )}
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default ProductsPage;
