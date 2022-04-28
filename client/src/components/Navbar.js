import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCart } from "../features/cartSlice";
import { useQuery, gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

const CATEGORIES_QUERY = gql`
    query {
        categories {
            name
            products {
                prices {
                    currency {
                        label
                        symbol
                    }
                }
            }
        }
    }
`;


const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data, loading, error } = useQuery(CATEGORIES_QUERY);
    console.log(data);

    const cart = useSelector(state => state.cart);

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;

    const qtyIncreaseHandler = (item) => {
        dispatch(addToCart(item))
    }
    
    const qtyDecreaseHandler = (item) => {
        dispatch(decreaseCart(item))
    }

    const viewBagHandler = () => {
        navigate("/cart");
    };

    return (
        <div>
            <nav>
                <div className="nav-links">
                    <ul>
                        {data.categories.map((category) => (
                            <li key={category.name}>
                                <NavLink
                                    to={`/${category.name}`}
                                    className={({ isActive }) =>
                                        isActive ? "active-link" : ""
                                    }
                                >
                                    {category.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="logo">MAYRA</div>

                <div className="cart-overview">
                    <ul className="currency-switcher">
                        <li className="currency-selector">
                            £{" "}
                            <span>
                                <i className="fa-solid fa-angle-down open"></i>
                                <i className="fa-solid fa-angle-up close"></i>
                            </span>
                            <ul className="currencies">
                                {data.categories.map((category) =>
                                    category.products.map((pdt) =>
                                        pdt.prices.map(
                                            (price) => (
                                                <li key={uuidv4()}>
                                                    {
                                                        price.currency
                                                            .symbol}{" "}
                                                    {
                                                        price.currency.label}
                                                </li>
                                            )
                                        )
                                    )
                                )}
                            </ul>
                        </li>

                        <li className="cart">
                            <i className="fa-brands fa-opencart"></i>

                            <div className="cart-item-number">
                                {cart.cartTotalQty}
                            </div>

                            <div className="viewport-overlay"></div>

                            <div className="cart-overlay">
                                <div className="title">
                                    <p>
                                        <span>My Bag</span>,{" "}
                                        <span>
                                            {cart.cartTotalQty}{" "}
                                            {cart.cartTotalQty <= 1
                                                ? "item"
                                                : "items"}
                                        </span>
                                    </p>
                                </div>

                                {cart.cartItems.length === 0 ? (
                                    <>
                                        <h3 className="empty-bag">
                                            Your bag is empty!
                                        </h3>
                                    </>
                                ) : (
                                    <>
                                        <div className="item-details">
                                            {cart.cartItems.map((item) => (
                                                <>
                                                    <div
                                                        className="item-detail"
                                                        key={item.id}
                                                    >
                                                        <p className="item-name">
                                                            {item.name}
                                                        </p>

                                                        <p className="item-desc">
                                                            {item.brand}
                                                        </p>

                                                        <p className="item-price">
                                                            ${item.price}
                                                        </p>

                                                        <div className="item-size">
                                                            <span className="selected">
                                                                {item.attribute}
                                                            </span>
                                                            <span className="not-selected">
                                                                M
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="item-visual">
                                                        <div className="qty-details">
                                                            <p
                                                                className="plus"
                                                                onClick={
                                                                    qtyIncreaseHandler
                                                                }
                                                            >
                                                                +
                                                            </p>

                                                            <p className="qty">
                                                                1
                                                            </p>

                                                            <p
                                                                className="minus"
                                                                onClick={
                                                                    qtyDecreaseHandler
                                                                }
                                                            >
                                                                -
                                                            </p>
                                                        </div>

                                                        <img
                                                            src={item.gallery}
                                                            alt=""
                                                            className="item-img"
                                                        />
                                                    </div>
                                                </>
                                            ))}
                                        </div>

                                        <div className="cart-overlay-total">
                                            <p className="total">Total</p>
                                            <p className="total-amount">
                                                $100.00
                                            </p>
                                        </div>

                                        <div className="cart-overlay-actions">
                                            <button
                                                type="button"
                                                className="btn view-bag"
                                                onClick={viewBagHandler}
                                            >
                                                VIEW BAG
                                            </button>

                                            <button
                                                type="button"
                                                className="btn checkout"
                                            >
                                                CHECKOUT
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
export default Navbar