import { Button, Col, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("Razor Pay");
  const {shipping} = useSelector((state) => state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const submitHandler = () => {
    dispatch(savePaymentMethod(paymentMethod))
    navigate("/placeorder")
  }

  useEffect(() => {
    if (!shipping) {
      navigate("/shipping")
    }
  },[navigate, shipping])
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              className="my-2"
              type="radio"
              label="RazorPay"
              id="Pay"
              name="paymentMethod"
              value="RazorPay"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
