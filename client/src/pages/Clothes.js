import "./Home.css";
import { Link } from "react-router-dom";
const Clothes = ({ data, loading, error }) => {
    console.log(data.categories[1].products);

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;

    const products = data.categories[1].products;

    return (
        <div>
            <h2>Category name</h2>

            <div className="catalog">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <img src={product.gallery[0]} alt="" />

                        {product.inStock && (
                            <Link
                                to={`/${product.category}/product/${product.id}`}
                                className="product-name"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="52"
                                    height="52"
                                    fill="white"
                                    className="bi bi-cart"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                            </Link>
                        )}

                        <p
                            
                            className="product-name"
                        >
                            {product.name}
                        </p>

                        <p className="product-price">
                            ${product.prices[0].amount}
                        </p>

                        {!product.inStock ? (
                            <div
                                style={{ display: "block" }}
                                className="out-of-stock"
                            >
                                OUT OF STOCK
                            </div>
                        ) : (
                            <div
                                style={{ display: "none" }}
                                className="out-of-stock"
                            >
                                OUT OF STOCK
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Clothes;
