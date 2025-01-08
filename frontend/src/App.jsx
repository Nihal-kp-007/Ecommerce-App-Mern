import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import HomePage from "./screens/HomePage";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";

const App = () => {
  return (
    <>

      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/productinfo/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/" element={<LoginScreen />} />
            <Route path="/register" element={<SignUpScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
