import { useQuery, gql } from "@apollo/client";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Product from "./pages/Product";


const PRODUCTS_QUERY = gql`
query{
    categories {
      name
      products {
      id
      name
      inStock
      brand
      gallery
      category
      description
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
    }
  }
}
`;

function App() {
    const { data, loading, error } = useQuery(PRODUCTS_QUERY);
    console.log(data);

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;

  return <div className="container">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/product/:id" element={<Product />} />

        <Route path="/cart" element={<Cart />} />
    </Routes>
    </BrowserRouter>
    </div>;
}

export default App;
