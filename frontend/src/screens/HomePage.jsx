import { Col, Row } from "react-bootstrap";
import products from "../../products.js";
import Product from "../components/Product";

const HomePage = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product, index) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={index}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomePage;
