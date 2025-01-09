import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useAuthUserMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { Col, Row } from "react-bootstrap";

function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login] = useAuthUserMutation();
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials(res));
        setEmail("");
        setPassword("");
        toast.success("successfully logged");
        navigate("/homepage");
      } catch (error) {
        toast.error(error.data.message);
      }
    };
  
  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to={"/register"}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
