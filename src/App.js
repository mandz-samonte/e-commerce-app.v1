import { useEffect, useState } from "react";
import axios from "axios";
import TopNavigation from "./components/TopNavigation";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CatalogContainer from "./pages/catalog";
import Main from "./pages/main";
import CartProvider from "./providers/CartProvider";
import Checkout from "./pages/checkout";

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
                    </Routes>
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
