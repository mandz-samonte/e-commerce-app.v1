import { useEffect, useState } from "react";
import axios from "axios";
import TopNavigation from "./components/TopNavigation";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CatalogContainer from "./pages/catalog";
import Main from "./pages/main";
import CartProvider from "./providers/CartProvider";
import Checkout from "./pages/checkout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Onboarding from "./pages/onboarding";

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="min-h-screen bg-gray-100 flex flex-col">
                    <TopNavigation />
                    <Routes>
                        <Route exact path="/" element={<Main />} />
                        <Route exact path="/catalog" element={<CatalogContainer />} />
                        <Route exact path="/checkout" element={<Checkout />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/forgot-password" element={<ForgotPassword />} />
                        <Route exact path="/onboarding" element={<Onboarding />} />
                    </Routes>
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
