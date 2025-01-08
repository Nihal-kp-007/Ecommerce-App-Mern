import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("first");
    try {
      await registerUser({ name, email, password }).unwrap();
      setName("");
      setEmail("");
      setPassword("");
    toast.success("successfully registered");
      navigate("/");
    } catch (error) {
    toast.error(error.data.message);
    }
  };    

  return (
    <div
      style={{
        boxShadow: "2px 2px 5px 2px",
        padding: "10px",
        borderRadius: "15px",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p className="mt-6 text-sm text-center text-gray-600">
        Don't have an account?{" "}
        <Link to="/" className="text-teal-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUpScreen;
