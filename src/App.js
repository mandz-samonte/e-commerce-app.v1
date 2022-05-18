import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products/1").then(({ data }) => {
            console.log(data);
            setProduct(data);
        });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={product.image} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
