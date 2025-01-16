import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateOrderMutation,
  useGetKeyQuery,
  useGetOrderByIdQuery,
  useOrderToPaidMutation,
} from "../slices/orderApiSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { clearCartItems, savePaymentResult } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [createOrder, { error, isLoading }] = useCreateOrderMutation();
  const [orderToPaid] = useOrderToPaidMutation()
  const {data} = useGetKeyQuery()
  console.log(data)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    const options = {
      key: "rzp_test_UJJJsR3J5cVNMy",
      key_secret: "4m7XXXOToBsFMRiDhN71PMop",
      amount: parseInt(cart.totalPrice * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + userInfo.name,
      name: "Ecommerce",
      description: "for testing purpose",
      handler: async function (response) {
        console.log(response);
        toast.success("Payment Successful");
        const paymentId = response.razorpay_payment_id;
        dispatch(savePaymentResult({ id: paymentId }));
        try {
          const res = await createOrder({
            cartItems: cart.cartItems,
            shipping: cart.shipping,
            paymentMethod: cart.paymentMethod,
            paymentResult: cart.paymentResult,
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
          }).unwrap();
          dispatch(clearCartItems());
          await orderToPaid(res._id)
          navigate(`/order/${res._id}`);
        } catch (error) {
          toast.error(error.message);
        }
      },

      theme: {
        color: "#3399cc",
      },
    };
    const pay = new window.Razorpay(options);
    pay.open();
  };

  useEffect(() => {
    if (!cart.shipping) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shipping, navigate, cart.paymentMethod]);
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shipping.address}, {cart.shipping.city}{" "}
                {cart.shipping.postalCode}, {cart.shipping.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/productinfo/${item._id}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default PlaceOrderScreen;
