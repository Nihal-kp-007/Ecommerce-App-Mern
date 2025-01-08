import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useAuthUserMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useAuthUserMutation();
  const handleSubmit = async (e) => {
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

  useEffect(() => {
    if (userInfo) {
      navigate("/homepage");
    }
  }, [userInfo, navigate]);

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
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p className="mt-6 text-sm text-center text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-teal-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default LoginScreen;
