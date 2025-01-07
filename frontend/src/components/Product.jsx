import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-stars";
import Rating from "./Rating";

const Product = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="my-3 p-3 rounded"
      onClick={() => navigate(`/productinfo/${product._id}`)}
    >
      <Card.Img src={product.image} variant="top" />

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Title as="div">
            <Rating value={product.rating} />
          </Card.Title>
        </Link>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
