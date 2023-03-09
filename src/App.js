import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CatalogContainer from "./pages/catalog";
import Main from "./pages/main";

function App() {
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products/1").then(({ data }) => {
            console.log(data);
            setProduct(data);
        });
    }, []);

    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Main />} />
                    <Route exact path="/catalog" element={<CatalogContainer />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
