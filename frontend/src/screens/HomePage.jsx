import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Loader from "../components/Loader.jsx";

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
   
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error.data.message}</div>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products &&
              products.map((product, index) => {
                return (
                  <Col sm={12} md={6} lg={4} xl={3} key={index}>
                    <Product product={product} />
                  </Col>
                );
              })}
          </Row>
        </>
      )}
    </>
  );
};

export default HomePage;
