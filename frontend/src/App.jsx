import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import HomePage from "./screens/HomePage";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Header from "./components/Header";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PrivateRoutes from "./components/PrivateRoutes";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

const App = () => {
  return (
    <>
      <Header />

      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<SignUpScreen />} />
            <Route path="/productinfo/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="" element={<PrivateRoutes />}>
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
